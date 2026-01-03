// All 46 basic Katakana characters
export const KATAKANA_CHARACTERS = [
  // Vowels
  { character: 'ア', romaji: 'a' },
  { character: 'イ', romaji: 'i' },
  { character: 'ウ', romaji: 'u' },
  { character: 'エ', romaji: 'e' },
  { character: 'オ', romaji: 'o' },
  
  // K-row
  { character: 'カ', romaji: 'ka' },
  { character: 'キ', romaji: 'ki' },
  { character: 'ク', romaji: 'ku' },
  { character: 'ケ', romaji: 'ke' },
  { character: 'コ', romaji: 'ko' },
  
  // S-row
  { character: 'サ', romaji: 'sa' },
  { character: 'シ', romaji: 'shi' },
  { character: 'ス', romaji: 'su' },
  { character: 'セ', romaji: 'se' },
  { character: 'ソ', romaji: 'so' },
  
  // T-row
  { character: 'タ', romaji: 'ta' },
  { character: 'チ', romaji: 'chi' },
  { character: 'ツ', romaji: 'tsu' },
  { character: 'テ', romaji: 'te' },
  { character: 'ト', romaji: 'to' },
  
  // N-row
  { character: 'ナ', romaji: 'na' },
  { character: 'ニ', romaji: 'ni' },
  { character: 'ヌ', romaji: 'nu' },
  { character: 'ネ', romaji: 'ne' },
  { character: 'ノ', romaji: 'no' },
  
  // H-row
  { character: 'ハ', romaji: 'ha' },
  { character: 'ヒ', romaji: 'hi' },
  { character: 'フ', romaji: 'fu' },
  { character: 'ヘ', romaji: 'he' },
  { character: 'ホ', romaji: 'ho' },
  
  // M-row
  { character: 'マ', romaji: 'ma' },
  { character: 'ミ', romaji: 'mi' },
  { character: 'ム', romaji: 'mu' },
  { character: 'メ', romaji: 'me' },
  { character: 'モ', romaji: 'mo' },
  
  // Y-row
  { character: 'ヤ', romaji: 'ya' },
  { character: 'ユ', romaji: 'yu' },
  { character: 'ヨ', romaji: 'yo' },
  
  // R-row
  { character: 'ラ', romaji: 'ra' },
  { character: 'リ', romaji: 'ri' },
  { character: 'ル', romaji: 'ru' },
  { character: 'レ', romaji: 're' },
  { character: 'ロ', romaji: 'ro' },
  
  // W-row
  { character: 'ワ', romaji: 'wa' },
  { character: 'ヲ', romaji: 'wo' },
  
  // N
  { character: 'ン', romaji: 'n' },
];

// Utility function to get random unique characters
export const getRandomCharacters = (characters, count) => {
  const shuffled = [...characters].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, characters.length));
};