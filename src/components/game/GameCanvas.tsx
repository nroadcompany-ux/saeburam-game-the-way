"use client";
import { useRef, useEffect, MutableRefObject } from 'react';
import * as THREE from 'three';
import type { Controls, JoystickState } from '@/hooks/usePlayerControls';

export type GameScene =
  | 'awakening' | 'cliff' | 'encounter'
  | 'question'  | 'result' | 'wilderness';

export interface GameCanvasProps {
  scene:            GameScene;
  sceneRef:         MutableRefObject<GameScene>;
  pausedRef:        MutableRefObject<boolean>;
  controls:         MutableRefObject<Controls>;
  joystick:         MutableRefObject<JoystickState>;
  onPositionChange: MutableRefObject<(pos: THREE.Vector3) => void>;
  onReady?:         () => void;
}

// ─── Helpers ───────────────────────────────────────────────────────────────
function makeMat(color: number, emissive: number, emissiveInt: number, roughness = 0.65) {
  return new THREE.MeshStandardMaterial({ color, emissive, emissiveIntensity: emissiveInt, roughness, metalness: 0.05 });
}

interface HumanoidPivots {
  group: THREE.Group;
  lArm: THREE.Group; rArm: THREE.Group;
  lLeg: THREE.Group; rLeg: THREE.Group;
}

function buildHumanoid(parent: THREE.Object3D, mat: THREE.Material, scale = 1): HumanoidPivots {
  const g = new THREE.Group();
  g.scale.setScalar(scale);

  const addStatic = (geo: THREE.BufferGeometry, y: number, x = 0) => {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, y, 0);
    m.castShadow = true;
    g.add(m);
  };

  addStatic(new THREE.SphereGeometry(0.19, 12, 12), 1.68);
  addStatic(new THREE.CylinderGeometry(0.07, 0.08, 0.2, 8), 1.44);
  addStatic(new THREE.BoxGeometry(0.48, 0.72, 0.24), 0.98);
  addStatic(new THREE.BoxGeometry(0.42, 0.25, 0.22), 0.58);

  const makeLimb = (geo: THREE.BufferGeometry, px: number, py: number, my: number): THREE.Group => {
    const pivot = new THREE.Group();
    pivot.position.set(px, py, 0);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.y = my;
    mesh.castShadow = true;
    pivot.add(mesh);
    g.add(pivot);
    return pivot;
  };

  const lArm = makeLimb(new THREE.CylinderGeometry(0.07, 0.06, 0.58, 8), -0.3,  1.28, -0.29);
  const rArm = makeLimb(new THREE.CylinderGeometry(0.07, 0.06, 0.58, 8),  0.3,  1.28, -0.29);
  const lLeg = makeLimb(new THREE.CylinderGeometry(0.09, 0.07, 0.6,  8), -0.14, 0.47, -0.30);
  const rLeg = makeLimb(new THREE.CylinderGeometry(0.09, 0.07, 0.6,  8),  0.14, 0.47, -0.30);

  parent.add(g);
  return { group: g, lArm, rArm, lLeg, rLeg };
}

// ─── Component ─────────────────────────────────────────────────────────────
export default function GameCanvas({
  sceneRef, pausedRef, controls, joystick, onPositionChange, onReady,
}: GameCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Renderer ──────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    mount.appendChild(renderer.domElement);

    const onResize = () => {
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    // ── Scene + Camera ─────────────────────────────────────────────
    const threeScene = new THREE.Scene();
    threeScene.fog = new THREE.FogExp2(0x000000, 0.09);
    threeScene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(65, mount.clientWidth / mount.clientHeight, 0.1, 300);
    camera.position.set(0, 6, 10);

    // ── Lights ────────────────────────────────────────────────────
    const ambient = new THREE.AmbientLight(0x6080AA, 0.04);
    threeScene.add(ambient);

    const sunLight = new THREE.DirectionalLight(0xC0D870, 0);
    sunLight.position.set(15, 25, -10);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.set(512, 512);
    sunLight.shadow.camera.far  = 80;
    sunLight.shadow.camera.left = -20; sunLight.shadow.camera.right = 20;
    sunLight.shadow.camera.top  =  20; sunLight.shadow.camera.bottom = -20;
    threeScene.add(sunLight);

    // ── Ground ────────────────────────────────────────────────────
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x060810, roughness: 1 });
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(80, 100), groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.z = -20;
    ground.receiveShadow = true;
    threeScene.add(ground);

    // Path stones
    const pathMat = new THREE.MeshStandardMaterial({
      color: 0x0D1825, emissive: new THREE.Color(0x1A2A3F), emissiveIntensity: 0.22, roughness: 0.9,
    });
    for (const z of [-1, -4, -8, -12, -16, -20, -25, -30, -35, -40]) {
      const s = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 2.2), pathMat);
      s.rotation.x = -Math.PI / 2;
      s.position.set(0, 0.012, z);
      threeScene.add(s);
    }

    // ── Stars ─────────────────────────────────────────────────────
    const STAR_COUNT = 1200;
    const starPositions = new Float32Array(STAR_COUNT * 3);
    const starSizes     = new Float32Array(STAR_COUNT);
    for (let i = 0; i < STAR_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 70 + Math.random() * 30;
      starPositions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = r * Math.cos(phi);
      starPositions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
      starSizes[i] = 0.15 + Math.random() * 0.25;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
    starGeo.setAttribute('size',     new THREE.Float32BufferAttribute(starSizes, 1));
    const starMat = new THREE.PointsMaterial({ color: 0xCCDDFF, size: 0.22, sizeAttenuation: true, transparent: true });
    const stars = new THREE.Points(starGeo, starMat);
    threeScene.add(stars);

    // ── Cliff group ───────────────────────────────────────────────
    const cliffGroup = new THREE.Group();
    const ledge = new THREE.Mesh(
      new THREE.BoxGeometry(50, 1.2, 0.5),
      new THREE.MeshStandardMaterial({ color: 0x050A14, roughness: 1 }),
    );
    ledge.position.set(0, -0.6, -23);
    cliffGroup.add(ledge);
    const distOrb = new THREE.Mesh(
      new THREE.SphereGeometry(0.55, 16, 16),
      new THREE.MeshStandardMaterial({ emissive: new THREE.Color(0xF0D080), emissiveIntensity: 10, color: 0xC9A84C }),
    );
    distOrb.position.set(0, 3.5, -42);
    cliffGroup.add(distOrb);
    const distLight = new THREE.PointLight(0xC9A84C, 5, 32, 2);
    distLight.position.set(0, 4, -40);
    cliffGroup.add(distLight);
    cliffGroup.visible = false;
    threeScene.add(cliffGroup);

    // ── Result FX ─────────────────────────────────────────────────
    const resultGroup = new THREE.Group();
    const resultLight1 = new THREE.PointLight(0xC9A84C, 0, 45, 2);
    resultLight1.position.set(0, 7, -22);
    const resultLight2 = new THREE.PointLight(0xFFFFFF, 0, 30, 2);
    resultLight2.position.set(0, 12, -22);
    const haloMesh = new THREE.Mesh(
      new THREE.TorusGeometry(7, 0.1, 8, 80),
      new THREE.MeshStandardMaterial({ emissive: new THREE.Color(0xF0D080), emissiveIntensity: 4, color: 0xC9A84C }),
    );
    haloMesh.position.set(0, 2, -23);
    haloMesh.rotation.x = Math.PI / 2;
    haloMesh.visible = false;
    resultGroup.add(resultLight1, resultLight2, haloMesh);
    threeScene.add(resultGroup);

    // ── Wilderness extras ─────────────────────────────────────────
    const wildGroup = new THREE.Group();
    const rockMat = new THREE.MeshStandardMaterial({ color: 0x2A3818, roughness: 1 });
    for (const [x, z, s] of [[-6,-28,0.5],[8,-32,0.65],[-9,-36,0.42],[5,-24,0.55],[12,-40,0.48],[-4,-45,0.6]] as [number,number,number][]) {
      const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(s, 0), rockMat);
      rock.position.set(x, s * 0.7, z);
      rock.castShadow = true;
      wildGroup.add(rock);
    }
    const treeMat  = new THREE.MeshStandardMaterial({ color: 0x1A3010, roughness: 0.9 });
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x3A2510, roughness: 1 });
    for (const [x, z] of [[-10,-30],[10,-34],[-7,-42],[14,-26],[-12,-48]] as [number,number][]) {
      const tree = new THREE.Group();
      const cone  = new THREE.Mesh(new THREE.ConeGeometry(0.8, 3.5, 8), treeMat);
      cone.position.y = 1.5; cone.castShadow = true;
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.5, 6), trunkMat);
      trunk.position.y = 0.25; trunk.castShadow = true;
      tree.add(cone, trunk);
      tree.position.set(x, 0, z);
      wildGroup.add(tree);
    }
    wildGroup.visible = false;
    threeScene.add(wildGroup);

    // ── NPC ───────────────────────────────────────────────────────
    const npcMat     = makeMat(0xC9A84C, 0xC9A84C, 3.0, 0.15);
    const npcHeadMat = makeMat(0xF0D080, 0xF0D080, 4.0, 0.15);
    const npcGroup   = new THREE.Group();

    const npcPivots = buildHumanoid(npcGroup, npcMat, 1.08);
    // Override head material
    (npcPivots.group.children[0] as THREE.Mesh).material = npcHeadMat;

    // Robe overlay
    const robe = new THREE.Mesh(
      new THREE.ConeGeometry(0.32, 0.85, 10, 1, true),
      new THREE.MeshStandardMaterial({ color: 0xC9A84C, emissive: new THREE.Color(0xC9A84C), emissiveIntensity: 2.0, roughness: 0.2, side: THREE.DoubleSide }),
    );
    robe.position.y = 0.4;
    npcGroup.add(robe);

    // Halo
    const npcHalo = new THREE.Mesh(
      new THREE.TorusGeometry(0.35, 0.028, 8, 40),
      new THREE.MeshStandardMaterial({ emissive: new THREE.Color(0xFFE898), emissiveIntensity: 5, color: 0xF0D080 }),
    );
    npcHalo.position.y = 2.2;
    npcHalo.rotation.x = Math.PI / 2;
    npcGroup.add(npcHalo);

    const npcLight = new THREE.PointLight(0xC9A84C, 4.5, 12, 2);
    npcLight.position.y = 0.5;
    npcGroup.add(npcLight);

    npcGroup.position.set(0, 1.0, -24);
    npcGroup.visible = false;
    threeScene.add(npcGroup);

    // ── NPC sparkle particles ─────────────────────────────────────
    const sparkleGeo = new THREE.BufferGeometry();
    const sparklePos: number[] = [];
    for (let i = 0; i < 60; i++) {
      sparklePos.push((Math.random() - 0.5) * 3, Math.random() * 4, (Math.random() - 0.5) * 2);
    }
    sparkleGeo.setAttribute('position', new THREE.Float32BufferAttribute(sparklePos, 3));
    const sparklePts = new THREE.Points(
      sparkleGeo,
      new THREE.PointsMaterial({ color: 0xF0D080, size: 0.08, sizeAttenuation: true, transparent: true, opacity: 0.8 }),
    );
    sparklePts.position.set(0, 0, -24);
    sparklePts.visible = false;
    threeScene.add(sparklePts);

    // ── Player ────────────────────────────────────────────────────
    const playerMat    = makeMat(0xD8CDB8, 0x9A8868, 0.25, 0.7);
    const playerGroup  = new THREE.Group();
    const playerPivots = buildHumanoid(playerGroup, playerMat);
    const playerLight  = new THREE.PointLight(0xF0E8D8, 0.6, 5, 2);
    playerLight.position.y = 0.7;
    playerGroup.add(playerLight);
    threeScene.add(playerGroup);

    // ── Camera state ──────────────────────────────────────────────
    const camPos  = new THREE.Vector3(0, 6, 10);
    const camLook = new THREE.Vector3(0, 1.2, 0);
    const camTgtP = new THREE.Vector3();
    const camTgtL = new THREE.Vector3();
    let shakeTimer = 0;
    const SHAKE_MAG = 0.07;

    // ── Game state ────────────────────────────────────────────────
    let bobTimer   = 0;
    let walkClock  = 0;
    let npcWalk    = 0;
    let prevScene: GameScene = 'awakening';
    let lastTime   = performance.now();
    const posOut   = new THREE.Vector3();

    // Signal ready
    onReady?.();

    // ── Render loop ───────────────────────────────────────────────
    renderer.setAnimationLoop(() => {
      const now   = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime    = now;
      const t     = now * 0.001;

      const sc       = sceneRef.current;
      const isPaused = pausedRef.current;

      // ── Scene switch ──────────────────────────────────────────
      if (sc !== prevScene) {
        prevScene = sc;
        shakeTimer = 0.35; // trigger brief camera shake on every scene change
        const setFog = (c: number, d: number) => {
          (threeScene.fog as THREE.FogExp2).color.set(c);
          (threeScene.fog as THREE.FogExp2).density = d;
          threeScene.background = new THREE.Color(c);
        };
        switch (sc) {
          case 'awakening':
            setFog(0x000000, 0.09);
            ambient.color.set(0x6080AA); ambient.intensity = 0.04;
            sunLight.intensity = 0;
            groundMat.color.set(0x060810);
            cliffGroup.visible = false; wildGroup.visible = false;
            resultLight1.intensity = 0; resultLight2.intensity = 0; haloMesh.visible = false;
            pathMat.color.set(0x0D1825); pathMat.emissive.set(0x1A2A3F);
            break;
          case 'cliff':
            setFog(0x020510, 0.06);
            ambient.color.set(0x7090BB); ambient.intensity = 0.07;
            cliffGroup.visible = true; wildGroup.visible = false;
            break;
          case 'encounter':
            setFog(0x020510, 0.05);
            ambient.intensity = 0.09;
            cliffGroup.visible = true;
            break;
          case 'question':
            setFog(0x010308, 0.12);
            ambient.color.set(0x4060AA); ambient.intensity = 0.05;
            cliffGroup.visible = false;
            break;
          case 'result':
            setFog(0x0A1828, 0.025);
            ambient.color.set(0xC9A84C); ambient.intensity = 0.6;
            sunLight.intensity = 0.8;
            resultLight1.intensity = 25; resultLight2.intensity = 12;
            haloMesh.visible = true;
            cliffGroup.visible = false;
            walkClock = 0;
            break;
          case 'wilderness':
            setFog(0x0D1A0D, 0.018);
            ambient.color.set(0x80BB60); ambient.intensity = 0.55;
            sunLight.color.set(0xC0D870); sunLight.intensity = 1.4;
            groundMat.color.set(0x1A2A0E);
            pathMat.color.set(0x2A3A18); pathMat.emissive.set(0x3A5020);
            cliffGroup.visible = false;
            resultLight1.intensity = 0; resultLight2.intensity = 0; haloMesh.visible = false;
            wildGroup.visible = true;
            walkClock = 0; npcWalk = 0;
            break;
        }
      }

      // ── Stars twinkle ─────────────────────────────────────────
      stars.visible = sc === 'awakening' || sc === 'cliff';
      if (stars.visible) {
        starMat.opacity = 0.7 + Math.sin(t * 0.8) * 0.15 + Math.sin(t * 2.3) * 0.08;
      }

      // ── NPC ───────────────────────────────────────────────────
      const npcVisible = ['encounter', 'question', 'result', 'wilderness'].includes(sc);
      npcGroup.visible   = npcVisible;
      sparklePts.visible = sc === 'encounter' || sc === 'result';

      if (npcVisible) {
        const isWild = sc === 'wilderness';
        if (isWild) {
          walkClock += delta;
          npcWalk   += delta;
          npcGroup.position.z = -26 - (walkClock * 2.5 % 22);
          npcGroup.position.y = 1.0 + Math.abs(Math.sin(walkClock * 6)) * 0.03;
          sparklePts.position.z = npcGroup.position.z;
          npcMat.emissiveIntensity     = 1.5;
          npcHeadMat.emissiveIntensity = 1.2;
          npcGroup.rotation.y = Math.PI; // NPC faces away (leads)

          // NPC walk animation
          const nws = Math.sin(npcWalk * 9) * 0.4;
          npcPivots.lArm.rotation.x =  nws;
          npcPivots.rArm.rotation.x = -nws;
          npcPivots.lLeg.rotation.x = -nws * 1.1;
          npcPivots.rLeg.rotation.x =  nws * 1.1;
        } else {
          // Float animation
          npcGroup.position.set(0, 1.0 + Math.sin(t * 1.3) * 0.06, -24);
          npcMat.emissiveIntensity     = 3.0;
          npcHeadMat.emissiveIntensity = 4.0;

          // NPC faces player in encounter
          if (sc === 'encounter') {
            const dx = playerGroup.position.x - npcGroup.position.x;
            const dz = playerGroup.position.z - npcGroup.position.z;
            const targetY = Math.atan2(dx, dz);
            const diff = ((targetY - npcGroup.rotation.y + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
            npcGroup.rotation.y += diff * 0.04;
          }

          // Idle sway for arms
          npcPivots.lArm.rotation.x = Math.sin(t * 0.9) * 0.08;
          npcPivots.rArm.rotation.x = Math.sin(t * 0.9 + Math.PI) * 0.08;
          npcPivots.lLeg.rotation.x = 0;
          npcPivots.rLeg.rotation.x = 0;
        }

        npcLight.intensity = (isWild ? 2.5 : 4.5) + Math.sin(t * 2.2) * 0.5;

        // Sparkle jitter
        if (sparklePts.visible) {
          const pos = sparklePts.geometry.attributes.position as THREE.BufferAttribute;
          for (let i = 0; i < pos.count; i++) {
            pos.setY(i, Math.abs(Math.sin(t * 1.5 + i * 0.4)) * 4);
          }
          pos.needsUpdate = true;
        }
      }

      // ── Player movement ───────────────────────────────────────
      if (!isPaused) {
        const kb = controls.current;
        const js = joystick.current;
        let dx = (kb.left ? -1 : 0) + (kb.right ? 1 : 0) + js.x;
        let dz = (kb.forward ? -1 : 0) + (kb.backward ? 1 : 0) + js.y;
        const len    = Math.sqrt(dx * dx + dz * dz);
        const moving = len > 0.02;

        if (moving) {
          dx /= len; dz /= len;
          playerGroup.position.x += dx * 4.5 * delta;
          playerGroup.position.z += dz * 4.5 * delta;
          const angle = Math.atan2(dx, dz);
          const diff  = ((angle - playerGroup.rotation.y + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
          playerGroup.rotation.y += diff * 0.14;
          bobTimer += delta * 9;
          playerGroup.position.y = Math.abs(Math.sin(bobTimer)) * 0.04;

          // Walk animation
          const sw = Math.sin(bobTimer) * 0.45;
          playerPivots.lArm.rotation.x =  sw;
          playerPivots.rArm.rotation.x = -sw;
          playerPivots.lLeg.rotation.x = -sw * 1.2;
          playerPivots.rLeg.rotation.x =  sw * 1.2;
        } else {
          playerGroup.position.y *= 0.8;
          // Return to rest
          playerPivots.lArm.rotation.x *= 0.8;
          playerPivots.rArm.rotation.x *= 0.8;
          playerPivots.lLeg.rotation.x *= 0.8;
          playerPivots.rLeg.rotation.x *= 0.8;
        }

        const zFar = sc === 'wilderness' ? -50 : -22;
        playerGroup.position.x = THREE.MathUtils.clamp(playerGroup.position.x, -12, 12);
        playerGroup.position.z = THREE.MathUtils.clamp(playerGroup.position.z, zFar, 5);
      }

      // ── Cinematic camera ───────────────────────────────────────
      const pp = playerGroup.position;
      let camSpeed = 0.06;

      switch (sc) {
        case 'awakening':
          camTgtP.set(pp.x * 0.35, 6, pp.z + 10);
          camTgtL.set(pp.x * 0.5, 1.2, pp.z - 1);
          break;
        case 'cliff':
          camTgtP.set(pp.x * 0.25, 4.5, pp.z + 9);
          camTgtL.set(0, 0.4, pp.z - 6);
          camSpeed = 0.045;
          break;
        case 'encounter':
          camTgtP.set(pp.x * 0.2, 4.5, pp.z + 7);
          camTgtL.set(0, 1.5, -22);
          camSpeed = 0.035;
          break;
        case 'question':
          camTgtP.set(1.8, 3.5, -16.5);
          camTgtL.set(-0.3, 2.0, -24);
          camSpeed = 0.022;
          break;
        case 'result':
          // Slow cinematic orbit
          camTgtP.set(
            Math.sin(t * 0.13) * 7,
            3.5 + Math.sin(t * 0.2) * 0.4,
            -22 + Math.cos(t * 0.13) * 7,
          );
          camTgtL.set(0, 2.4, -24);
          camSpeed = 0.012;
          break;
        case 'wilderness':
          camTgtP.set(pp.x * 0.3, 5, pp.z + 9);
          camTgtL.set(0, 1.5, npcGroup.position.z + 4);
          camSpeed = 0.04;
          break;
      }

      camPos.lerp(camTgtP, camSpeed);
      camLook.lerp(camTgtL, camSpeed * 1.8);

      // Camera shake on scene transition
      if (shakeTimer > 0) {
        shakeTimer -= delta;
        const sf = (shakeTimer / 0.35) * SHAKE_MAG;
        camera.position.copy(camPos);
        camera.position.x += Math.sin(t * 58) * sf;
        camera.position.y += Math.cos(t * 43) * sf * 0.6;
      } else {
        camera.position.copy(camPos);
      }
      camera.lookAt(camLook);

      // ── Position callback ─────────────────────────────────────
      posOut.copy(playerGroup.position);
      onPositionChange.current(posOut);

      renderer.render(threeScene, camera);
    });

    return () => {
      renderer.setAnimationLoop(null);
      renderer.dispose();
      window.removeEventListener('resize', onResize);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
}
