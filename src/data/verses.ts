import { BibleVerse } from "@/types/game";

export const FEATURED_VERSES: BibleVerse[] = [
  {
    id: "john-14-6",
    book: "John",
    bookKo: "요한복음",
    chapter: 14,
    verse: 6,
    text: "Jesus answered, 'I am the way and the truth and the life. No one comes to the Father except through me.'",
    textKo: "예수께서 이르시되 내가 곧 길이요 진리요 생명이니 나로 말미암지 않고는 아버지께로 올 자가 없느니라",
    testament: "new",
  },
  {
    id: "psalm-119-105",
    book: "Psalms",
    bookKo: "시편",
    chapter: 119,
    verse: 105,
    text: "Your word is a lamp for my feet, a light on my path.",
    textKo: "주의 말씀은 내 발에 등이요 내 길에 빛이니이다",
    testament: "old",
  },
  {
    id: "proverbs-3-5-6",
    book: "Proverbs",
    bookKo: "잠언",
    chapter: 3,
    verse: 5,
    text: "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    textKo: "너는 마음을 다하여 여호와를 신뢰하고 네 명철을 의지하지 말라 너는 범사에 그를 인정하라 그리하면 네 길을 지도하시리라",
    testament: "old",
  },
  {
    id: "jer-29-11",
    book: "Jeremiah",
    bookKo: "예레미야",
    chapter: 29,
    verse: 11,
    text: "For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you, plans to give you hope and a future.",
    textKo: "여호와의 말씀이니라 너희를 향한 나의 생각을 내가 아나니 평안이요 재앙이 아니니라 너희에게 미래와 희망을 주는 것이니라",
    testament: "old",
  },
  {
    id: "rom-8-28",
    book: "Romans",
    bookKo: "로마서",
    chapter: 8,
    verse: 28,
    text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
    textKo: "우리가 알거니와 하나님을 사랑하는 자 곧 그의 뜻대로 부르심을 입은 자들에게는 모든 것이 합력하여 선을 이루느니라",
    testament: "new",
  },
];

export const BIBLE_BOOKS = {
  old: [
    { en: "Genesis", ko: "창세기" },
    { en: "Exodus", ko: "출애굽기" },
    { en: "Psalms", ko: "시편" },
    { en: "Proverbs", ko: "잠언" },
    { en: "Isaiah", ko: "이사야" },
    { en: "Jeremiah", ko: "예레미야" },
  ],
  new: [
    { en: "Matthew", ko: "마태복음" },
    { en: "Mark", ko: "마가복음" },
    { en: "Luke", ko: "누가복음" },
    { en: "John", ko: "요한복음" },
    { en: "Acts", ko: "사도행전" },
    { en: "Romans", ko: "로마서" },
    { en: "Revelation", ko: "요한계시록" },
  ],
};
