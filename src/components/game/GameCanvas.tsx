"use client";
import { useRef, useEffect, MutableRefObject } from 'react';
import * as THREE from 'three';
import type { Controls, JoystickState } from '@/hooks/usePlayerControls';

export type GameScene =
  | 'awakening' | 'cliff' | 'encounter'
  | 'question'  | 'result' | 'wilderness';

export interface GameCanvasProps {
  scene:             GameScene;
  sceneRef:          MutableRefObject<GameScene>;
  pausedRef:         MutableRefObject<boolean>;
  controls:          MutableRefObject<Controls>;
  joystick:          MutableRefObject<JoystickState>;
  onPositionChange:  MutableRefObject<(pos: THREE.Vector3) => void>;
}

// ─── Helpers ────────────────────────────────────────────────────────────────
function makeMat(color: number, emissive: number, emissiveInt: number, roughness = 0.65) {
  return new THREE.MeshStandardMaterial({ color, emissive, emissiveIntensity: emissiveInt, roughness, metalness: 0.05 });
}

function buildHumanoid(scene: THREE.Scene, mat: THREE.Material, scale = 1): THREE.Group {
  const g = new THREE.Group();
  g.scale.setScalar(scale);
  const add = (geo: THREE.BufferGeometry, y: number, x = 0, rz = 0) => {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, y, 0);
    m.rotation.z = rz;
    m.castShadow = true;
    g.add(m);
  };
  add(new THREE.SphereGeometry(0.19, 12, 12), 1.68);            // head
  add(new THREE.CylinderGeometry(0.07, 0.08, 0.2, 8), 1.44);   // neck
  add(new THREE.BoxGeometry(0.48, 0.72, 0.24), 0.98);           // torso
  add(new THREE.BoxGeometry(0.42, 0.25, 0.22), 0.58);           // hips
  add(new THREE.CylinderGeometry(0.07, 0.06, 0.58, 8), 0.95, -0.3, 0.18);  // L arm
  add(new THREE.CylinderGeometry(0.07, 0.06, 0.58, 8), 0.95,  0.3, -0.18); // R arm
  add(new THREE.CylinderGeometry(0.09, 0.07, 0.6, 8),  0.28, -0.14);       // L leg
  add(new THREE.CylinderGeometry(0.09, 0.07, 0.6, 8),  0.28,  0.14);       // R leg
  scene.add(g);
  return g;
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function GameCanvas({
  sceneRef, pausedRef, controls, joystick, onPositionChange,
}: GameCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Renderer ─────────────────────────────────────────────────
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

    // ── Scene + Camera ────────────────────────────────────────────
    const threeScene = new THREE.Scene();
    threeScene.fog = new THREE.FogExp2(0x000000, 0.09);
    threeScene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(65, mount.clientWidth / mount.clientHeight, 0.1, 300);
    camera.position.set(0, 6, 10);
    camera.lookAt(0, 1, 0);

    // ── Lights ───────────────────────────────────────────────────
    const ambient = new THREE.AmbientLight(0x6080AA, 0.04);
    threeScene.add(ambient);

    const sunLight = new THREE.DirectionalLight(0xC0D870, 0);
    sunLight.position.set(15, 25, -10);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.set(512, 512);
    sunLight.shadow.camera.far = 80;
    sunLight.shadow.camera.left = -20;
    sunLight.shadow.camera.right = 20;
    sunLight.shadow.camera.top = 20;
    sunLight.shadow.camera.bottom = -20;
    threeScene.add(sunLight);

    // ── Ground ───────────────────────────────────────────────────
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x060810, roughness: 1 });
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(80, 100), groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.z = -20;
    ground.receiveShadow = true;
    threeScene.add(ground);

    // Path stones
    const pathMat = new THREE.MeshStandardMaterial({ color: 0x0D1825, emissive: new THREE.Color(0x1A2A3F), emissiveIntensity: 0.22, roughness: 0.9 });
    for (const z of [-1, -4, -8, -12, -16, -20]) {
      const s = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 2.2), pathMat);
      s.rotation.x = -Math.PI / 2;
      s.position.set(0, 0.012, z);
      threeScene.add(s);
    }

    // ── Stars (instanced) ─────────────────────────────────────────
    const starGeo = new THREE.BufferGeometry();
    const starPositions: number[] = [];
    for (let i = 0; i < 900; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 70 + Math.random() * 30;
      starPositions.push(r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
    }
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
    const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xCCDDFF, size: 0.25, sizeAttenuation: true }));
    threeScene.add(stars);

    // ── Cliff group ───────────────────────────────────────────────
    const cliffGroup = new THREE.Group();
    const ledge = new THREE.Mesh(new THREE.BoxGeometry(50, 1.2, 0.5), new THREE.MeshStandardMaterial({ color: 0x050A14, roughness: 1 }));
    ledge.position.set(0, -0.6, -23);
    cliffGroup.add(ledge);
    const distOrb = new THREE.Mesh(new THREE.SphereGeometry(0.55, 16, 16), new THREE.MeshStandardMaterial({ emissive: new THREE.Color(0xF0D080), emissiveIntensity: 10, color: 0xC9A84C }));
    distOrb.position.set(0, 3.5, -42);
    cliffGroup.add(distOrb);
    const distLight = new THREE.PointLight(0xC9A84C, 5, 32, 2);
    distLight.position.set(0, 4, -40);
    cliffGroup.add(distLight);
    cliffGroup.visible = false;
    threeScene.add(cliffGroup);

    // ── Result FX ────────────────────────────────────────────────
    const resultGroup = new THREE.Group();
    const resultLight1 = new THREE.PointLight(0xC9A84C, 0, 45, 2);
    resultLight1.position.set(0, 7, -22);
    const resultLight2 = new THREE.PointLight(0xFFFFFF, 0, 30, 2);
    resultLight2.position.set(0, 12, -22);
    const haloMesh = new THREE.Mesh(new THREE.TorusGeometry(7, 0.1, 8, 80), new THREE.MeshStandardMaterial({ emissive: new THREE.Color(0xF0D080), emissiveIntensity: 4, color: 0xC9A84C }));
    haloMesh.position.set(0, 2, -23);
    haloMesh.rotation.x = Math.PI / 2;
    haloMesh.visible = false;
    resultGroup.add(resultLight1, resultLight2, haloMesh);
    threeScene.add(resultGroup);

    // ── Wilderness extras ─────────────────────────────────────────
    const wildGroup = new THREE.Group();
    const rockMat = new THREE.MeshStandardMaterial({ color: 0x2A3818, roughness: 1 });
    for (const [x, z, s] of [[-6, -28, 0.5], [8, -32, 0.65], [-9, -36, 0.42], [5, -24, 0.55]] as [number, number, number][]) {
      const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(s, 0), rockMat);
      rock.position.set(x, s * 0.7, z);
      rock.castShadow = true;
      wildGroup.add(rock);
    }
    const treeMat = new THREE.MeshStandardMaterial({ color: 0x1A3010, roughness: 0.9 });
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x3A2510, roughness: 1 });
    for (const [x, z] of [[-10, -30], [10, -34], [-7, -42]] as [number, number][]) {
      const tree = new THREE.Group();
      const cone = new THREE.Mesh(new THREE.ConeGeometry(0.8, 3.5, 8), treeMat);
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
    const npcMat = makeMat(0xC9A84C, 0xC9A84C, 3.0, 0.15);
    const npcHeadMat = makeMat(0xF0D080, 0xF0D080, 4.0, 0.15);
    const npcGroup = new THREE.Group();
    // body parts
    const npcBody = buildHumanoid(npcGroup as any, npcMat, 1.08);
    // override head material
    (npcBody.children[0] as THREE.Mesh).material = npcHeadMat;
    // robe overlay
    const robe = new THREE.Mesh(new THREE.ConeGeometry(0.32, 0.85, 10, 1, true), new THREE.MeshStandardMaterial({ color: 0xC9A84C, emissive: new THREE.Color(0xC9A84C), emissiveIntensity: 2.0, roughness: 0.2, side: THREE.DoubleSide }));
    robe.position.y = 0.4;
    npcGroup.add(robe);
    // halo ring
    const npcHalo = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.028, 8, 40), new THREE.MeshStandardMaterial({ emissive: new THREE.Color(0xFFE898), emissiveIntensity: 5, color: 0xF0D080 }));
    npcHalo.position.y = 2.1;
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
    for (let i = 0; i < 50; i++) {
      sparklePos.push((Math.random() - 0.5) * 3, Math.random() * 4, (Math.random() - 0.5) * 2);
    }
    sparkleGeo.setAttribute('position', new THREE.Float32BufferAttribute(sparklePos, 3));
    const sparklePts = new THREE.Points(sparkleGeo, new THREE.PointsMaterial({ color: 0xF0D080, size: 0.08, sizeAttenuation: true, transparent: true, opacity: 0.8 }));
    sparklePts.position.set(0, 0, -24);
    sparklePts.visible = false;
    threeScene.add(sparklePts);

    // ── Player ────────────────────────────────────────────────────
    const playerMat = makeMat(0xD8CDB8, 0x9A8868, 0.25, 0.7);
    const playerGroup = new THREE.Group();
    buildHumanoid(playerGroup as any, playerMat);
    const playerLight = new THREE.PointLight(0xF0E8D8, 0.6, 5, 2);
    playerLight.position.y = 0.7;
    playerGroup.add(playerLight);
    threeScene.add(playerGroup);

    // ── Game state ────────────────────────────────────────────────
    const camLerpPos = new THREE.Vector3(0, 6, 10);
    const camLookAt  = new THREE.Vector3(0, 1, 0);
    const posOut     = new THREE.Vector3();
    let bobTimer = 0;
    let walkClock = 0;
    let prevScene: GameScene = 'awakening';
    let lastTime  = performance.now();

    // ── Render loop ───────────────────────────────────────────────
    renderer.setAnimationLoop(() => {
      const now   = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime    = now;
      const t     = now * 0.001;

      const sc       = sceneRef.current;
      const isPaused = pausedRef.current;

      // ── Scene switch ─────────────────────────────────────────
      if (sc !== prevScene) {
        prevScene = sc;
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
            break;
        }
      }

      // ── Stars (only in dark scenes) ──────────────────────────
      stars.visible = sc === 'awakening' || sc === 'cliff';

      // ── NPC ──────────────────────────────────────────────────
      const npcVisible = ['encounter', 'question', 'result', 'wilderness'].includes(sc);
      npcGroup.visible  = npcVisible;
      sparklePts.visible = sc === 'encounter' || sc === 'result';

      if (npcVisible) {
        const isWild = sc === 'wilderness';
        if (isWild) {
          walkClock += delta;
          npcGroup.position.z = -26 - (walkClock * 2.5 % 22);
          npcGroup.position.y = 1.0 + Math.abs(Math.sin(walkClock * 4)) * 0.04;
          sparklePts.position.z = npcGroup.position.z;
          npcMat.emissiveIntensity = 1.5;
          npcHeadMat.emissiveIntensity = 1.2;
        } else {
          npcGroup.position.set(0, 1.0 + Math.sin(t * 1.3) * 0.06, -24);
          npcMat.emissiveIntensity = 3.0;
          npcHeadMat.emissiveIntensity = 4.0;
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

      // ── Player movement ──────────────────────────────────────
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
        } else {
          playerGroup.position.y *= 0.8;
        }

        const zFar = sc === 'wilderness' ? -50 : -22;
        playerGroup.position.x = THREE.MathUtils.clamp(playerGroup.position.x, -12, 12);
        playerGroup.position.z = THREE.MathUtils.clamp(playerGroup.position.z, zFar, 5);
      }

      // ── Camera ───────────────────────────────────────────────
      camLerpPos.set(playerGroup.position.x * 0.35, 6, playerGroup.position.z + 10);
      camera.position.lerp(camLerpPos, 0.055);
      camLookAt.set(playerGroup.position.x, 1.2, playerGroup.position.z);
      camera.lookAt(camLookAt);

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
