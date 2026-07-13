/*
 * File: src/data/paleoHebrewStrokeData.ts
 * Purpose: Real hand-drawn stroke-order path data + letter metadata + shared
 * calligraphic style for the 22 Paleo-Hebrew letters, extracted from
 * assets/svg/hebrew-letters/paleo/. Educational reconstruction, not an
 * attested universal ancient standard (see the set's README). See
 * hebrewStrokeData.ts for why start points / layered style are precomputed.
 */

export const PALEO_HEBREW_STROKE_VIEW_BOX = '0 0 720 720';

export const PALEO_HEBREW_STROKE_STYLE = {
  primaryWidth: 42,
  edgeWidth: 48,
  innerWidth: 27,
  ink: "#24170f",
  innerInk: "#4a3221",
  accent: "#8a6a3c",
  paper: "#f7f1e5",
};

export type PaleoHebrewStroke = { d: string; length: number; startX: number; startY: number };

export type PaleoHebrewLetter = {
  order: number;
  name: string;
  paleo: string;
  modern: string;
  transliteration: string;
};

export const PALEO_HEBREW_LETTERS: PaleoHebrewLetter[] = [
  { order: 1, name: "Aleph", paleo: "\ud802\udd00", modern: "\u05d0", transliteration: "\u02be" },
  { order: 2, name: "Bet", paleo: "\ud802\udd01", modern: "\u05d1", transliteration: "b/v" },
  { order: 3, name: "Gimel", paleo: "\ud802\udd02", modern: "\u05d2", transliteration: "g" },
  { order: 4, name: "Dalet", paleo: "\ud802\udd03", modern: "\u05d3", transliteration: "d" },
  { order: 5, name: "He", paleo: "\ud802\udd04", modern: "\u05d4", transliteration: "h" },
  { order: 6, name: "Waw", paleo: "\ud802\udd05", modern: "\u05d5", transliteration: "w" },
  { order: 7, name: "Zayin", paleo: "\ud802\udd06", modern: "\u05d6", transliteration: "z" },
  { order: 8, name: "Het", paleo: "\ud802\udd07", modern: "\u05d7", transliteration: "\u1e25" },
  { order: 9, name: "Tet", paleo: "\ud802\udd08", modern: "\u05d8", transliteration: "\u1e6d" },
  { order: 10, name: "Yod", paleo: "\ud802\udd09", modern: "\u05d9", transliteration: "y" },
  { order: 11, name: "Kaf", paleo: "\ud802\udd0a", modern: "\u05db", transliteration: "k/kh" },
  { order: 12, name: "Lamed", paleo: "\ud802\udd0b", modern: "\u05dc", transliteration: "l" },
  { order: 13, name: "Mem", paleo: "\ud802\udd0c", modern: "\u05de", transliteration: "m" },
  { order: 14, name: "Nun", paleo: "\ud802\udd0d", modern: "\u05e0", transliteration: "n" },
  { order: 15, name: "Samekh", paleo: "\ud802\udd0e", modern: "\u05e1", transliteration: "s" },
  { order: 16, name: "Ayin", paleo: "\ud802\udd0f", modern: "\u05e2", transliteration: "\u02bf" },
  { order: 17, name: "Pe", paleo: "\ud802\udd10", modern: "\u05e4", transliteration: "p/f" },
  { order: 18, name: "Tsade", paleo: "\ud802\udd11", modern: "\u05e6", transliteration: "\u1e63" },
  { order: 19, name: "Qof", paleo: "\ud802\udd12", modern: "\u05e7", transliteration: "q" },
  { order: 20, name: "Resh", paleo: "\ud802\udd13", modern: "\u05e8", transliteration: "r" },
  { order: 21, name: "Shin", paleo: "\ud802\udd14", modern: "\u05e9", transliteration: "\u0161" },
  { order: 22, name: "Taw", paleo: "\ud802\udd15", modern: "\u05ea", transliteration: "t" },
];

export const PALEO_HEBREW_LETTER_STROKES: Record<number, PaleoHebrewStroke[]> = {
  1: [{ d: "M210 500 C220.8 488.3 255.0 455.0 275 430 C295.0 405.0 310.8 381.7 330 350 C349.2 318.3 380.0 258.3 390 240", length: 318.0, startX: 210.0, startY: 500.0 }, { d: "M505 505 C496.7 491.7 471.7 450.8 455 425 C438.3 399.2 425.8 380.0 405 350 C384.2 320.0 342.5 262.5 330 245", length: 313.5, startX: 505.0, startY: 505.0 }, { d: "M245 365 C256.7 362.5 290.0 352.5 315 350 C340.0 347.5 368.8 347.5 395 350 C421.2 352.5 459.2 362.5 472 365", length: 230.3, startX: 245.0, startY: 365.0 }],
  2: [{ d: "M230 235 L230 500", length: 265.0, startX: 230.0, startY: 235.0 }, { d: "M230 250 C270.0 250.0 425.0 241.7 470 250 C515.0 258.3 495.0 291.7 500 300", length: 307.7, startX: 230.0, startY: 250.0 }, { d: "M230 500 C270.0 500.0 425.0 508.3 470 500 C515.0 491.7 495.0 458.3 500 450", length: 307.7, startX: 230.0, startY: 500.0 }, { d: "M500 300 L500 450", length: 150.0, startX: 500.0, startY: 300.0 }],
  3: [{ d: "M250 220 C273.3 241.7 348.3 303.3 390 350 C431.7 396.7 481.7 475.0 500 500", length: 377.3, startX: 250.0, startY: 220.0 }, { d: "M390 350 L290 500", length: 180.3, startX: 390.0, startY: 350.0 }],
  4: [{ d: "M225 240 L500 240", length: 275.0, startX: 225.0, startY: 240.0 }, { d: "M500 240 L320 500", length: 316.2, startX: 500.0, startY: 240.0 }],
  5: [{ d: "M220 230 L220 500", length: 270.0, startX: 220.0, startY: 230.0 }, { d: "M220 230 L500 230", length: 280.0, startX: 220.0, startY: 230.0 }, { d: "M500 230 L500 500", length: 270.0, startX: 500.0, startY: 230.0 }, { d: "M220 365 L430 365", length: 210.0, startX: 220.0, startY: 365.0 }],
  6: [{ d: "M275 240 L455 240", length: 180.0, startX: 275.0, startY: 240.0 }, { d: "M365 240 L365 500", length: 260.0, startX: 365.0, startY: 240.0 }],
  7: [{ d: "M250 240 L470 240", length: 220.0, startX: 250.0, startY: 240.0 }, { d: "M360 240 L360 500", length: 260.0, startX: 360.0, startY: 240.0 }, { d: "M300 315 L420 315", length: 120.0, startX: 300.0, startY: 315.0 }],
  8: [{ d: "M230 240 L230 500", length: 260.0, startX: 230.0, startY: 240.0 }, { d: "M490 240 L490 500", length: 260.0, startX: 490.0, startY: 240.0 }, { d: "M230 240 L490 240", length: 260.0, startX: 230.0, startY: 240.0 }],
  9: [{ d: "M245 260 C264.2 253.3 321.7 220.0 360 220 C398.3 220.0 453.3 231.7 475 260 C496.7 288.3 497.5 350.0 490 390 C482.5 430.0 463.3 481.7 430 500 C396.7 518.3 323.3 518.3 290 500 C256.7 481.7 237.5 430.0 230 390 C222.5 350.0 242.5 281.7 245 260", length: 914.9, startX: 245.0, startY: 260.0 }, { d: "M300 320 L420 440", length: 169.7, startX: 300.0, startY: 320.0 }],
  10: [{ d: "M280 260 L440 260", length: 160.0, startX: 280.0, startY: 260.0 }, { d: "M360 260 L330 360", length: 104.4, startX: 360.0, startY: 260.0 }],
  11: [{ d: "M480 240 C460.0 259.2 360.0 311.7 360 355 C360.0 398.3 460.0 475.8 480 500", length: 361.5, startX: 480.0, startY: 240.0 }, { d: "M360 355 L250 355", length: 110.0, startX: 360.0, startY: 355.0 }],
  12: [{ d: "M450 170 C438.3 188.3 398.3 243.3 380 280 C361.7 316.7 353.3 353.3 340 390 C326.7 426.7 306.7 481.7 300 500", length: 364.7, startX: 450.0, startY: 170.0 }, { d: "M300 500 L470 500", length: 170.0, startX: 300.0, startY: 500.0 }],
  13: [{ d: "M220 500 C220.0 458.3 198.3 270.0 220 250 C241.7 230.0 306.7 380.0 350 380 C393.3 380.0 458.3 230.0 480 250 C501.7 270.0 480.0 458.3 480 500", length: 886.0, startX: 220.0, startY: 500.0 }, { d: "M220 500 L480 500", length: 260.0, startX: 220.0, startY: 500.0 }],
  14: [{ d: "M250 240 L250 500", length: 260.0, startX: 250.0, startY: 240.0 }, { d: "M250 240 L470 500", length: 340.6, startX: 250.0, startY: 240.0 }],
  15: [{ d: "M360 210 C380.8 221.7 464.2 243.3 485 280 C505.8 316.7 505.8 391.7 485 430 C464.2 468.3 401.7 510.0 360 510 C318.3 510.0 255.8 468.3 235 430 C214.2 391.7 214.2 316.7 235 280 C255.8 243.3 339.2 221.7 360 210", length: 907.4, startX: 360.0, startY: 210.0 }, { d: "M300 300 L420 420", length: 169.7, startX: 300.0, startY: 300.0 }, { d: "M420 300 L300 420", length: 169.7, startX: 420.0, startY: 300.0 }],
  16: [{ d: "M250 240 C263.3 258.3 311.7 306.7 330 350 C348.3 393.3 355.0 475.0 360 500", length: 289.8, startX: 250.0, startY: 240.0 }, { d: "M470 240 C456.7 258.3 408.3 306.7 390 350 C371.7 393.3 365.0 475.0 360 500", length: 289.8, startX: 470.0, startY: 240.0 }],
  17: [{ d: "M240 500 C240.0 458.3 201.7 291.7 240 250 C278.3 208.3 426.7 236.7 470 250 C513.3 263.3 500.0 303.3 500 330 C500.0 356.7 498.3 396.7 470 410 C441.7 423.3 353.3 410.0 330 410", length: 817.6, startX: 240.0, startY: 500.0 }, { d: "M330 410 L500 500", length: 192.4, startX: 330.0, startY: 410.0 }],
  18: [{ d: "M240 240 C255.0 258.3 300.0 306.7 330 350 C360.0 393.3 405.0 475.0 420 500", length: 317.2, startX: 240.0, startY: 240.0 }, { d: "M480 240 C465.0 258.3 420.0 306.7 390 350 C360.0 393.3 315.0 475.0 300 500", length: 317.2, startX: 480.0, startY: 240.0 }, { d: "M300 500 L500 500", length: 200.0, startX: 300.0, startY: 500.0 }],
  19: [{ d: "M360 220 C380.8 230.8 464.2 253.3 485 285 C505.8 316.7 505.8 378.3 485 410 C464.2 441.7 401.7 475.0 360 475 C318.3 475.0 255.8 441.7 235 410 C214.2 378.3 214.2 316.7 235 285 C255.8 253.3 339.2 230.8 360 220", length: 836.1, startX: 360.0, startY: 220.0 }, { d: "M360 475 L360 550", length: 75.0, startX: 360.0, startY: 475.0 }],
  20: [{ d: "M240 500 C240.0 458.3 208.3 291.7 240 250 C271.7 208.3 386.7 238.3 430 250 C473.3 261.7 488.3 278.3 500 320 C511.7 361.7 500.0 470.0 500 500", length: 737.0, startX: 240.0, startY: 500.0 }],
  21: [{ d: "M240 240 L290 500", length: 264.8, startX: 240.0, startY: 240.0 }, { d: "M360 220 L360 500", length: 280.0, startX: 360.0, startY: 220.0 }, { d: "M480 240 L430 500", length: 264.8, startX: 480.0, startY: 240.0 }, { d: "M290 500 C301.7 491.7 336.7 450.0 360 450 C383.3 450.0 418.3 491.7 430 500", length: 174.9, startX: 290.0, startY: 500.0 }],
  22: [{ d: "M240 240 L480 500", length: 353.8, startX: 240.0, startY: 240.0 }, { d: "M480 240 L240 500", length: 353.8, startX: 480.0, startY: 240.0 }],
};
