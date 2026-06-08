import type { StoryChapter } from "@/types/story";

// 1 Samuel 24 — David Spares Saul's Life at En-gedi
// Story flow:
//   scene-1-cave  →(B) scene-2-heart →(B) scene-3-confront →(B) scene-4-judgment →(B) BEST ENDING
//   Other choices lead to poor / neutral / worst endings inline.

export const chapter1: StoryChapter = {
  id: "chapter-1-cave",
  chapterNumber: 1,
  title: "Choice in the Cave",
  titleKo: "동굴 속의 선택",
  subtitle: "삼상 24장",
  coverTheme: "The Cave of En-gedi",
  coverThemeKo: "엔게디 동굴",
  synopsis:
    "B.C. circa 1010. Fugitive David encounters a once-in-a-lifetime chance to end his suffering — Saul walks into his cave. What will David choose?",
  synopsisKo:
    "B.C. 약 1010년. 사울의 추격을 피해 엔게디 광야로 도망친 다윗에게 예상치 못한 기회가 찾아왔습니다. 사울이 혼자 동굴 안으로 들어왔습니다. 다윗은 어떤 선택을 할 것인가?",
  keyTheme: "Honoring God's Anointed",
  keyThemeKo: "하나님의 기름 부음을 경외함",
  openingVerse: {
    reference: "삼상 24:12",
    text: "May the LORD judge between you and me. And may the LORD avenge me on you, but my hand will not touch you.",
    textKo:
      "원하건대 여호와께서 나와 왕 사이를 판단하사 여호와께서 나를 위하여 왕에게 보복하시기를 원하나이다 나의 손으로는 왕을 해하지 않겠나이다",
  },

  scenes: [
    // ─────────────────────────────────────────────────────────────
    // SCENE 1 : 엔게디의 동굴 (삼상 24:1-4)
    // ─────────────────────────────────────────────────────────────
    {
      id: "scene-1-cave",
      title: "The Cave of En-gedi",
      titleKo: "엔게디의 동굴",
      narrativeText:
        "After defeating the Philistines, Saul received a report: 'David is in the wilderness of En-gedi.' He took three thousand chosen men and set out to hunt him. Near the sheep pens along the road, Saul entered a cave alone — the very cave where David and his men were hiding in the depths. His men whispered urgently: 'This is the day the LORD spoke of. Your enemy is in your hands!'",
      narrativeTextKo:
        "블레셋 사람들을 물리치고 돌아온 사울 왕에게 전갈이 왔습니다. \"다윗이 엔게디 광야에 있나이다!\" 사울은 이스라엘 최정예 용사 삼천 명을 이끌고 추격에 나섰습니다.\n\n그러던 중 길가의 양 우리 근처에 이르렀을 때, 사울이 혼자 동굴로 들어왔습니다. 바로 다윗과 그의 부하들이 숨어있던 그 동굴이었습니다. 다윗의 부하들이 숨죽이며 속삭였습니다.\n\n\"지금입니다, 장군! 여호와께서 오늘 원수를 당신 손에 넘겨주셨습니다. 네 생각에 좋을 대로 행하십시오!\"",
      contextVerse: {
        reference: "삼상 24:3-4",
        text: "He came to the sheep pens along the way; a cave was there, and Saul went in to relieve himself. David and his men were far back in the cave. The men said, 'This is the day the LORD spoke of when he said to you, I will give your enemy into your hands for you to deal with as you wish.'",
        textKo:
          "길 가 양의 우리에 이른즉 굴이 있는지라 사울이 그 굴에 들어가 발을 가리우더라 다윗과 그의 사람들이 그 굴 깊숙한 곳에 앉아 있더니 다윗의 사람들이 이르되 보소서 여호와께서 당신에게 이르시기를 내가 원수를 네 손에 넘기리니 네 생각에 좋을 대로 그에게 행하라 하시더니 이것이 그 날이니이다 하니",
      },
      choices: [
        {
          id: "s1-kill",
          choiceText: "Strike Saul down now. God has given this moment.",
          choiceTextKo: "지금 사울을 죽인다. 하나님이 이 기회를 주신 것이다.",
          isGodsWay: false,
          consequence: {
            outcomeText:
              "David raised his sword. The deed was done. His men cheered, but David felt hollow — the victory tasted like ash.",
            outcomeTextKo:
              "다윗이 칼을 들어 사울을 쳤습니다. 부하들은 환호했지만, 다윗의 마음은 텅 비어 있었습니다. 그것은 승리가 아니었습니다. 마치 무언가 영원히 깨져버린 것 같은 공허함만 남았습니다. 이스라엘 전체가 다윗을 두려워하기 시작했고, 그 두려움 속에서 다윗은 자신이 원하던 왕이 아닌 사람이 되어 있었습니다.",
            godsHeartComment:
              "David acted out of human calculation, not faith. God's anointed was not David's to remove — that authority belongs to God alone. The throne was promised, but God's path to it never required David's hands to be stained with Saul's blood.",
            godsHeartCommentKo:
              "다윗은 하나님을 신뢰하는 대신 자신의 판단을 따랐습니다. 하나님의 기름 부음 받은 자를 제거하는 것은 다윗의 권한 밖에 있는 일이었습니다. 왕위는 약속받았지만, 하나님은 결코 다윗의 손으로 사울을 치는 방법을 택하지 않으셨습니다. 기름 부음은 하나님의 권위를 상징하며, 그것을 짓밟는 것은 하나님을 짓밟는 것과 같습니다.",
            verseSupport: {
              reference: "시편 105:15",
              text: "Do not touch my anointed ones; do my prophets no harm.",
              textKo:
                "나의 기름 부은 자를 손대지 말며 나의 선지자들을 해하지 말라 하셨도다",
            },
            alignmentImpact: "negative",
            faithScore: -15,
            nextSceneId: null,
            endingType: "worst",
          },
        },
        {
          id: "s1-robe",
          choiceText:
            "Spare him, but cut the corner of his robe as silent proof.",
          choiceTextKo:
            "살려두되, 겉옷 자락만 조용히 잘라 증거로 남기겠다.",
          isGodsWay: true,
          consequence: {
            outcomeText:
              "David crept forward in silence and with one careful motion, cut the edge of Saul's robe. Saul never knew. He rose and walked out of the cave, leaving David alone with a small piece of cloth — and a strangely troubled heart.",
            outcomeTextKo:
              "다윗이 소리 없이 다가가 사울의 겉옷 자락을 가만히 잘랐습니다. 사울은 전혀 알아차리지 못한 채 동굴을 나갔습니다. 다윗은 잘려진 겉옷 자락을 손에 쥐고 동굴 깊숙이 돌아왔습니다. 부하들은 더 행동하기를 원했지만, 다윗의 마음속에는 이미 다른 목소리가 울리고 있었습니다.",
            godsHeartComment:
              "David chose restraint over revenge — a small but profound act of trust in God. The piece of cloth was not proof of David's cunning; it was evidence of his reverence. He saw Saul not as an enemy to destroy but as the LORD's anointed to be protected.",
            godsHeartCommentKo:
              "다윗은 복수 대신 절제를 선택했습니다. 이것은 인간적 용기가 아닌 하나님을 향한 경외심에서 나온 결정이었습니다. 그 겉옷 자락 하나는 단순한 증거물이 아니라, 다윗이 하나님의 통치를 인정한다는 신앙 고백이었습니다. 그러나 다윗의 마음이 찔렸습니다. 그것은 성령의 음성이었습니다.",
            verseSupport: {
              reference: "삼상 24:6",
              text: "He said to his men, 'The LORD forbid that I should do such a thing to my master, the LORD's anointed, or lay my hand on him; for he is the anointed of the LORD.'",
              textKo:
                "그의 사람들에게 이르되 내가 손을 들어 여호와의 기름 부음을 받은 내 주를 치는 것은 여호와께서 금하시는 것이니 그는 여호와의 기름 부음을 받은 자가 됨이니라 하고",
            },
            alignmentImpact: "positive",
            faithScore: 10,
            nextSceneId: "scene-2-heart",
            endingType: undefined,
          },
        },
        {
          id: "s1-wait",
          choiceText:
            "Do nothing. This doesn't feel like God's moment. Just wait.",
          choiceTextKo:
            "아무것도 하지 않겠다. 이것이 하나님의 뜻인지 모르겠다. 기다리겠다.",
          isGodsWay: false,
          consequence: {
            outcomeText:
              "David held his breath and did nothing. Saul finished and walked out of the cave. The men were bitterly disappointed. The moment passed like smoke.",
            outcomeTextKo:
              "다윗은 숨을 죽이고 아무것도 하지 않았습니다. 사울이 동굴을 나가자 기회는 연기처럼 사라졌습니다. 부하들은 낙심했고, 다윗은 무언가 할 수 있었는데 하지 못한 허전함을 안고 동굴 깊숙이 물러났습니다. 도피 생활은 계속되었고, 이 만남은 아무 열매 없이 끝났습니다.",
            godsHeartComment:
              "Waiting can be wisdom, but God had prepared this moment as an opportunity for courage and truth. True patience is not passive silence — it is confident action in step with God's timing. David had the evidence in his hands; he needed only the courage to use it rightly.",
            godsHeartCommentKo:
              "기다림이 지혜가 될 수 있습니다. 그러나 하나님은 이 순간을 화해와 증언의 기회로 준비하셨습니다. 진정한 인내는 수동적 침묵이 아니라, 하나님의 뜻 안에서 담대히 나아가는 것입니다. 하나님은 다윗에게 진실을 드러낼 용기 있는 한 걸음을 원하셨습니다.",
            verseSupport: {
              reference: "잠언 28:1",
              text: "The wicked flee though no one pursues, but the righteous are as bold as a lion.",
              textKo:
                "악인은 쫓아오는 자가 없어도 도망하나 의인은 사자 같이 담대하니라",
            },
            alignmentImpact: "neutral",
            faithScore: -3,
            nextSceneId: null,
            endingType: "neutral",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // SCENE 2 : 찔린 마음 (삼상 24:5-7)
    // ─────────────────────────────────────────────────────────────
    {
      id: "scene-2-heart",
      title: "A Troubled Heart",
      titleKo: "찔린 마음",
      narrativeText:
        "After Saul left, David stared at the small piece of robe in his hand. Suddenly his heart smote him. Just a corner of cloth — yet the weight of it was crushing. His men pushed in close: 'We can still reach him! Give the word and it's done!'",
      narrativeTextKo:
        "사울이 동굴 밖으로 나간 뒤, 다윗은 손에 든 겉옷 자락을 바라보았습니다. 그 순간 마음이 찔렸습니다. 고작 옷자락 한 조각인데, 가슴이 무거웠습니다. 하나님의 기름 부음 받은 자의 옷을 잘랐다는 사실이 다윗을 눌렀습니다.\n\n부하들이 다시 다가왔습니다.\n\n\"아직 늦지 않았습니다! 지금 나가면 사울을 잡을 수 있습니다. 이 기회를 놓치지 마십시오!\"",
      contextVerse: {
        reference: "삼상 24:5-6",
        text: "Afterward, David was conscience-stricken for having cut off a corner of his robe. He said to his men, 'The LORD forbid that I should do such a thing to my master, the LORD's anointed, or lay my hand on him; for he is the anointed of the LORD.'",
        textKo:
          "그리한 후에 사울의 옷자락 벰으로 말미암아 다윗의 마음이 찔려 그의 사람들에게 이르되 내가 손을 들어 여호와의 기름 부음을 받은 내 주를 치는 것은 여호와께서 금하시는 것이니 그는 여호와의 기름 부음을 받은 자가 됨이니라 하고",
      },
      choices: [
        {
          id: "s2-pursue",
          choiceText:
            "The men are right. Act now — this prick of conscience is weakness.",
          choiceTextKo:
            "부하들의 말이 맞다. 지금 행동해야 한다. 마음의 찔림은 나약함이다.",
          isGodsWay: false,
          consequence: {
            outcomeText:
              "David steeled himself and moved toward the cave mouth. But his feet slowed with every step. In the end, he could not do it — the moment had passed, and he returned empty-handed to his men.",
            outcomeTextKo:
              "다윗이 다시 마음을 굳히고 동굴 입구로 향했습니다. 그러나 발걸음은 점점 느려졌습니다. 결국 사울의 뒤를 쫓지 못하고 빈 손으로 돌아왔습니다. 부하들은 실망했고, 다윗은 그 자리에서 자신의 흔들리는 마음을 다시 마주해야 했습니다. 기회도 잃었고, 신뢰도 잃었습니다.",
            godsHeartComment:
              "When God speaks through conscience, ignoring it leads nowhere good. The prick of David's heart was not weakness — it was the Holy Spirit's voice. Dismissing divine conviction is the first step toward spiritual numbness.",
            godsHeartCommentKo:
              "양심의 경고를 무시하는 것은 더 큰 실수로 이어집니다. 다윗의 마음이 찔린 것은 나약함이 아니라 하나님이 말씀하시는 것이었습니다. 성령이 이미 진실을 속삭이고 계셨습니다. 그 목소리를 외면하는 것은 신앙의 퇴보입니다.",
            verseSupport: {
              reference: "로마서 2:15",
              text: "They show that the requirements of the law are written on their hearts, their consciences also bearing witness.",
              textKo:
                "이런 이들은 그 마음에 새긴 율법의 행위를 나타내어 그 양심이 증거가 되고",
            },
            alignmentImpact: "negative",
            faithScore: -10,
            nextSceneId: null,
            endingType: "poor",
          },
        },
        {
          id: "s2-stand",
          choiceText:
            "The LORD forbid that I touch the LORD's anointed. Stand down.",
          choiceTextKo:
            "여호와의 기름 부으신 내 주를 치는 것은 결코 할 수 없다. 물러서라.",
          isGodsWay: true,
          consequence: {
            outcomeText:
              "David rose and stood before his men. His voice was calm but final: 'The LORD forbid that I lay my hand on him — he is the LORD's anointed.' The men fell silent. Saul walked on, unknowing.",
            outcomeTextKo:
              "다윗이 일어나 부하들 앞에 섰습니다. 그의 목소리는 고요했지만 흔들림이 없었습니다. \"여호와의 기름 부음 받은 내 주를 치는 것은 내가 결코 할 수 없다. 그는 여호와의 기름 부음 받은 자이니라!\" 부하들은 불만스러웠지만 더 이상 말하지 못했습니다. 다윗은 말씀으로 자신의 마음도, 부하들도 제지했습니다.",
            godsHeartComment:
              "David obeyed conscience and led his men to do the same. True leadership in God's kingdom is not about commanding armies — it is about commanding yourself to honor God first, even at personal cost. David's restraint here was more powerful than any sword.",
            godsHeartCommentKo:
              "다윗은 양심의 소리에 순종하고 부하들도 그 길로 이끌었습니다. 하나님 나라의 진정한 리더십은 군대를 지휘하는 것이 아니라, 하나님을 경외함으로 자기 자신을 먼저 다스리는 것입니다. 이 순간 다윗의 절제는 그 어떤 칼보다 강력했습니다.",
            verseSupport: {
              reference: "삼상 24:7",
              text: "David rebuked his men and did not allow them to attack Saul. And Saul left the cave and went his way.",
              textKo:
                "다윗이 이 말로 자기 사람들을 막아 그들로 사울을 해하지 못하게 하니라 사울이 일어나 굴에서 나가 자기 길을 가니라",
            },
            alignmentImpact: "positive",
            faithScore: 10,
            nextSceneId: "scene-3-confront",
            endingType: undefined,
          },
        },
        {
          id: "s2-hide",
          choiceText:
            "Say nothing. Saul is already gone. Let it end here in silence.",
          choiceTextKo:
            "아무 말도 하지 않겠다. 사울이 나갔으니 이것으로 끝이다.",
          isGodsWay: false,
          consequence: {
            outcomeText:
              "David retreated to the back of the cave without a word. He sat holding the torn cloth, feeling the weight of a moment not fully lived. The chance for truth had been in his hand.",
            outcomeTextKo:
              "다윗은 아무 말 없이 동굴 깊숙이 물러났습니다. 잘라낸 겉옷 자락을 손에 쥔 채 한참을 앉아 있었습니다. 화해의 기회가 손 안에 있었는데, 그 기회는 이제 사라졌습니다. 도피 생활은 끝이 보이지 않았고, 오늘의 결정은 내일의 기회를 닫아버렸습니다.",
            godsHeartComment:
              "The robe piece in David's hand was meant to be a bridge — to truth, to reconciliation, to God's work in Saul's heart. God sometimes places the means of testimony in our hands, and all that is needed is the courage to step forward and speak truth.",
            godsHeartCommentKo:
              "다윗의 손에 든 겉옷 자락은 진실을 드러낼 다리였습니다. 화해의 기회이자, 사울의 마음에 역사하시는 하나님의 도구였습니다. 때로 하나님은 증언의 수단을 우리 손에 쥐여 주십니다. 필요한 것은 오직 앞으로 나아가 진실을 말할 용기뿐입니다.",
            verseSupport: {
              reference: "히브리서 10:39",
              text: "But we do not belong to those who shrink back and are destroyed, but to those who have faith and are saved.",
              textKo:
                "우리는 물러가 멸망할 자가 아니요 오직 영혼을 구원함에 이르는 믿음을 가진 자니라",
            },
            alignmentImpact: "neutral",
            faithScore: -3,
            nextSceneId: null,
            endingType: "neutral",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // SCENE 3 : 사울을 부르다 (삼상 24:8-11)
    // ─────────────────────────────────────────────────────────────
    {
      id: "scene-3-confront",
      title: "Calling Out to Saul",
      titleKo: "사울을 부르다",
      narrativeText:
        "David emerged from the cave. Saul's back was moving away in the distance. In his hand was the torn corner of the robe — the only proof that he had been within arm's reach of the king and chosen mercy. What would he do with this moment?",
      narrativeTextKo:
        "다윗이 동굴 어귀로 나왔습니다. 저 멀리 사울이 길을 걷고 있었습니다. 손에는 잘라낸 겉옷 자락이 들려 있었습니다. 다윗의 결백을 증명할 수 있는 유일한 증거. 이것으로 무엇을 할 것인가?\n\n사울의 등이 점점 멀어지고 있었습니다.",
      contextVerse: {
        reference: "삼상 24:8",
        text: "Then David went out of the cave and called out to Saul, 'My lord the king!' When Saul looked behind him, David bowed down and prostrated himself with his face to the ground.",
        textKo:
          "다윗도 일어나 굴에서 나가 사울의 뒤에서 외쳐 이르되 내 주 왕이여 하매 사울이 돌아보는지라 다윗이 땅에 엎드려 절하니라",
      },
      choices: [
        {
          id: "s3-silent",
          choiceText:
            "Let him go in silence. Words would only fall on deaf ears.",
          choiceTextKo:
            "조용히 보내주겠다. 말로 설명해봤자 믿지 않을 것이다.",
          isGodsWay: false,
          consequence: {
            outcomeText:
              "David watched Saul disappear over the ridge without a word. He had the evidence but not the courage to speak. The truth stayed inside the cave.",
            outcomeTextKo:
              "다윗은 사울이 지평선 너머로 사라지는 것을 말없이 지켜보았습니다. 증거는 있었지만 입을 열지 않았습니다. 진실은 동굴 안에 묻혔습니다. 다윗의 결백은 증명되지 않았고, 사울의 마음은 변화될 기회를 얻지 못했습니다. 그날의 침묵은 또 다른 긴 도피 생활의 시작이었습니다.",
            godsHeartComment:
              "Silence is not always humility. Sometimes it is fear dressed as wisdom. God had placed the truth in David's hands and the opening in front of him — but David chose comfort over courage. Truth left unspoken cannot heal what needs to be healed.",
            godsHeartCommentKo:
              "침묵이 항상 겸손은 아닙니다. 때로는 두려움이 지혜처럼 위장하는 것입니다. 하나님은 진실을 다윗의 손에 쥐여 주시고, 기회의 문을 열어놓으셨습니다. 그러나 다윗은 용기 대신 안락함을 택했습니다. 말하지 않은 진실은 치유가 필요한 것을 치유할 수 없습니다.",
            verseSupport: {
              reference: "잠언 27:5",
              text: "Better is open rebuke than hidden love.",
              textKo: "드러난 책망이 숨은 사랑보다 더 나은 것이라",
            },
            alignmentImpact: "neutral",
            faithScore: -3,
            nextSceneId: null,
            endingType: "neutral",
          },
        },
        {
          id: "s3-bow",
          choiceText:
            "'My lord the king!' — Call to him and bow with face to the ground.",
          choiceTextKo:
            "\"내 주 왕이여!\" — 사울을 부르며 나아가 땅에 엎드려 절한다.",
          isGodsWay: true,
          consequence: {
            outcomeText:
              "David's voice rang across the wilderness. 'My lord the king!' Saul turned. David bowed face to the ground, then rose and lifted the corner of the robe. 'Today the LORD delivered you into my hands in the cave. Some urged me to kill you, but I spared you. See this robe — I could have struck, but I did not.'",
            outcomeTextKo:
              "다윗의 목소리가 광야를 가로질러 울려 퍼졌습니다. \"내 주 왕이여!\" 사울이 뒤를 돌아보았습니다. 다윗이 땅에 엎드려 절하고, 이어 겉옷 자락을 들어 보였습니다.\n\n\"오늘 하나님이 굴 안에서 왕을 내 손에 넘겨주셨습니다. 어떤 이는 왕을 죽이라 했으나 내가 살려드렸습니다. 이 자락이 그 증거입니다. 왕을 죽이지 않겠나이다. 나는 왕에게 잘못한 것이 없습니다.\"",
            godsHeartComment:
              "David bowed before his enemy. This was not defeat — it was the posture of a man who trusted God to defend his name. He did not need to hide his truth or wield his strength. In this moment of humility, David revealed the character of a true king.",
            godsHeartCommentKo:
              "다윗은 원수 앞에 무릎을 꿇었습니다. 이것은 굴욕이 아니라, 하나님이 자신의 이름을 지켜주실 것을 신뢰하는 사람의 자세였습니다. 진실을 감출 필요도, 힘을 과시할 필요도 없었습니다. 이 겸손의 순간에 다윗은 진정한 왕의 품격을 드러냈습니다.",
            verseSupport: {
              reference: "삼상 24:11",
              text: "See, my father, look at this piece of your robe in my hand! I cut off the corner of your robe but did not kill you. See that there is nothing in my hand to indicate that I am guilty of wrongdoing or rebellion.",
              textKo:
                "내 아버지여 보소서 내 손에 있는 왕의 옷자락을 보소서 내가 왕을 죽이지 아니하고 겉옷 자락만 베었은즉 내 손에 악이나 죄과가 없는 줄 아시고 깨달으소서 내가 왕에게 범죄한 것도 없고 왕의 생명을 해하려 한 것도 없는데 왕이 내 생명을 취하러 다니시나이다",
            },
            alignmentImpact: "positive",
            faithScore: 10,
            nextSceneId: "scene-4-judgment",
            endingType: undefined,
          },
        },
        {
          id: "s3-surround",
          choiceText:
            "Lead the men out and surround Saul. Force him to acknowledge the truth.",
          choiceTextKo:
            "부하들을 이끌고 나가 사울을 포위하겠다. 힘으로 항복을 받아내겠다.",
          isGodsWay: false,
          consequence: {
            outcomeText:
              "David led his men out. Saul's soldiers saw them and instantly drew swords. A tense standoff filled the valley. No one moved. The moment of potential reconciliation curdled into the edge of battle.",
            outcomeTextKo:
              "다윗이 부하들을 이끌고 동굴 밖으로 뛰쳐나왔습니다. 사울의 군사들이 즉각 반응하여 칼을 뽑았습니다. 긴장된 대치가 광야를 가득 채웠습니다. 화해가 될 수 있었던 순간이 전쟁의 기운으로 뒤덮였습니다. 겉옷 자락을 꺼내 설명할 기회조차 사라졌고, 결국 다윗은 피를 흘리지 않고 물러나야 했습니다.",
            godsHeartComment:
              "Force cannot carry truth. God's way is not to overwhelm but to speak plainly with evidence in hand. The sword David held was not the one made of iron — it was the torn corner of cloth. That was the weapon God had given him for this battle.",
            godsHeartCommentKo:
              "힘으로는 진실을 전달할 수 없습니다. 하나님의 방법은 압도하는 것이 아니라, 명백한 증거를 들고 담대히 말하는 것입니다. 다윗에게 주어진 진짜 무기는 쇠칼이 아니라 겉옷 자락이었습니다. 하나님이 이 전투를 위해 준비하신 것이 무엇인지 알아야 했습니다.",
            verseSupport: {
              reference: "스가랴 4:6",
              text: "Not by might nor by power, but by my Spirit, says the LORD Almighty.",
              textKo:
                "만군의 여호와께서 말씀하시되 이는 힘으로 되지 아니하며 능력으로 되지 아니하고 오직 나의 영으로 되느니라",
            },
            alignmentImpact: "negative",
            faithScore: -8,
            nextSceneId: null,
            endingType: "poor",
          },
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // SCENE 4 : 판단은 하나님께 (삼상 24:12-22)
    // ─────────────────────────────────────────────────────────────
    {
      id: "scene-4-judgment",
      title: "Let God Be the Judge",
      titleKo: "판단은 하나님께",
      narrativeText:
        "Saul's voice broke. Tears ran down the king's face. 'Is that your voice, David my son? You are more righteous than I. You have treated me well, but I have treated you badly. When a man finds his enemy, does he let him go unharmed? May the LORD reward you for what you did today. I know that you will surely be king.' Saul was weeping. David stood before the broken king and had to decide what to say.",
      narrativeTextKo:
        "사울의 목소리가 떨렸습니다. 눈물이 왕의 볼을 타고 흘러내렸습니다.\n\n\"다윗 내 아들아, 이것이 네 목소리냐? 너는 나보다 의롭도다. 네가 나에게 선을 행하였거늘 나는 너에게 악을 행하였도다. 사람이 자기 원수를 만나고도 이렇게 평안히 보내겠느냐? 여호와께서 오늘 네가 내게 행한 일을 갚으시기를 원하노라. 나는 네가 왕이 될 것을 안다.\"\n\n사울이 울고 있었습니다. 다윗은 무너진 왕 앞에 서서 무슨 말을 해야 할지 결정해야 했습니다.",
      contextVerse: {
        reference: "삼상 24:17",
        text: "He said to David, 'You are more righteous than I. You have treated me well, but I have treated you badly.'",
        textKo:
          "다윗에게 이르되 너는 나보다 의롭도다 너는 내게 선을 행하였거늘 나는 너를 악으로 갚았으니",
      },
      choices: [
        {
          id: "s4-return",
          choiceText:
            "The king repents. Accept his word and return with him to Jerusalem.",
          choiceTextKo:
            "왕이 뉘우치셨다. 말씀을 받아들이고 함께 예루살렘으로 돌아가겠다.",
          isGodsWay: false,
          consequence: {
            outcomeText:
              "David agreed and walked with Saul toward Jerusalem. Within days, Saul's fear of David returned and the hunt began again. David had trusted the man's tears instead of waiting on God's timing.",
            outcomeTextKo:
              "다윗이 동의하고 사울과 함께 예루살렘으로 향했습니다. 그러나 며칠이 지나지 않아 사울의 마음이 다시 변했습니다. 두려움과 질투가 그 눈물을 삼켜버렸고, 다윗은 다시 도망자가 되어야 했습니다. 눈물이 진심이었을 수도 있지만, 그것이 하나님의 때는 아니었습니다.",
            godsHeartComment:
              "God did not tell David to trust Saul's repentance — He told David to trust God. Saul's tears were real in the moment but not rooted in genuine transformation. Naive trust is not the same as God-centered faith. Wisdom sometimes means receiving grace without surrendering discernment.",
            godsHeartCommentKo:
              "하나님은 다윗에게 사울의 회개를 믿으라 하지 않으셨습니다. 하나님 자신을 신뢰하라 하셨습니다. 사울의 눈물은 그 순간 진심이었을 수 있지만, 진정한 변화의 뿌리가 없었습니다. 순진한 신뢰는 하나님 중심의 믿음과 다릅니다. 지혜는 때로 은혜를 받으면서도 분별력을 포기하지 않는 것입니다.",
            verseSupport: {
              reference: "잠언 14:15",
              text: "A simple man believes anything, but a prudent man gives thought to his steps.",
              textKo:
                "어리석은 자는 모든 것을 믿거니와 슬기로운 자는 자기의 행동을 삼가느니라",
            },
            alignmentImpact: "negative",
            faithScore: -5,
            nextSceneId: null,
            endingType: "poor",
          },
        },
        {
          id: "s4-god-judge",
          choiceText:
            "'May the LORD judge between us. I will not lift my hand against you.'",
          choiceTextKo:
            "\"여호와께서 우리 사이를 심판하시기를 원합니다. 내 손으로는 왕을 해치지 않겠습니다.\"",
          isGodsWay: true,
          consequence: {
            outcomeText:
              "David bowed low and spoke evenly: 'May the LORD judge between you and me, and may the LORD avenge me on you. But my hand will not touch you.' Saul wept and returned home. David and his men went back to their stronghold. Each went his own way — and God's plan moved forward in its own time.",
            outcomeTextKo:
              "다윗이 엎드린 채 차분하게 말했습니다. \"여호와는 나와 왕 사이를 판단하사 나를 위하여 왕에게 보복하시기를 원하나이다. 나의 손으로는 왕을 해하지 않겠나이다.\"\n\n사울은 눈물을 닦고 집으로 돌아갔습니다. 다윗은 그의 부하들과 함께 산성으로 올라갔습니다. 각자 자신의 길로 돌아갔고, 하나님의 계획은 하나님의 때에 따라 나아갔습니다.",
            godsHeartComment:
              "This is the pinnacle of David's faith in this chapter: he surrendered justice to God. He did not deny the wrong done to him. He named it clearly, held up the evidence, but refused to be the one to balance the scales. 'Vengeance is mine,' says the LORD — and David believed it enough to act on it.",
            godsHeartCommentKo:
              "이것이 이 챕터에서 다윗 믿음의 정점입니다. 다윗은 심판을 하나님께 맡겼습니다. 자신에게 행해진 잘못을 부인하지 않았습니다. 분명히 진술했고, 증거를 들어 보였습니다. 그러나 저울을 맞추는 자가 되기를 거부했습니다. '원수 갚는 것은 내게 있다'고 주께서 말씀하셨고, 다윗은 그것을 충분히 믿어 실제로 행동했습니다.",
            verseSupport: {
              reference: "로마서 12:19",
              text: "Do not take revenge, my dear friends, but leave room for God's wrath, for it is written: 'It is mine to avenge; I will repay,' says the Lord.",
              textKo:
                "내 사랑하는 자들아 너희가 친히 원수를 갚지 말고 하나님의 진노하심에 맡기라 기록되었으되 원수 갚는 것이 내게 있으니 내가 갚으리라고 주께서 말씀하시니라",
            },
            alignmentImpact: "positive",
            faithScore: 15,
            nextSceneId: null,
            endingType: "best",
          },
        },
        {
          id: "s4-demand",
          choiceText:
            "Pour out the pain. Demand acknowledgment of all the suffering Saul caused.",
          choiceTextKo:
            "쌓인 억울함을 쏟아낸다. 그동안 얼마나 괴로웠는지 왕이 알아야 한다.",
          isGodsWay: false,
          consequence: {
            outcomeText:
              "David's composure broke and his grievances poured out. Saul's eyes hardened as the accusations mounted. The tear-filled repentance turned cold. Soldiers moved in. The moment of grace collapsed.",
            outcomeTextKo:
              "다윗의 감정이 터져나왔습니다. 쌓였던 억울함, 두려움, 분노가 한꺼번에 쏟아졌습니다. 사울의 눈이 굳어지며 눈물이 사라졌습니다. 고백은 방어로 바뀌었고, 군사들이 다가왔습니다. 은혜의 순간이 무너졌습니다.",
            godsHeartComment:
              "Anger is not wrong — but the timing and manner matter greatly. God had opened a door for peace, and David's grief was real and valid. Yet pouring out pain onto a momentarily repentant Saul closed the very door God had opened. Righteous anger still requires wisdom about when and how to speak.",
            godsHeartCommentKo:
              "분노는 나쁜 것이 아닙니다. 그러나 시기와 방식이 크게 중요합니다. 하나님은 화해의 문을 열어주셨고, 다윗의 슬픔은 진실되고 정당했습니다. 그러나 잠시 뉘우치는 사울에게 고통을 쏟아내는 것은 하나님이 열어두신 문을 닫아버리는 것이었습니다. 의로운 분노도 언제, 어떻게 말할 것인지의 지혜를 필요로 합니다.",
            verseSupport: {
              reference: "에베소서 4:26",
              text: "In your anger do not sin: Do not let the sun go down while you are still angry.",
              textKo:
                "분을 내어도 죄를 짓지 말며 해가 지도록 분을 품지 말고",
            },
            alignmentImpact: "negative",
            faithScore: -8,
            nextSceneId: null,
            endingType: "poor",
          },
        },
      ],
    },
  ],

  bestEndingReward: {
    title: "The Way of the Anointed",
    titleKo: "기름 부음 받은 자의 길",
    verse: {
      reference: "시편 37:5-6",
      text: "Commit your way to the LORD; trust in him and he will do this: He will make your righteous reward shine like the dawn, your vindication like the noonday sun.",
      textKo:
        "네 길을 여호와께 맡기라 그를 의지하면 그가 이루시고 네 의를 빛같이 나타내시며 네 공의를 정오의 빛같이 하시리로다",
    },
  },

  sceneCount: 4,
  choiceCount: 12,
  unlocked: true,
};
