/*
 * File: src/data/hebrewStrokeData.ts
 * Purpose: Real hand-drawn stroke-order path data + letter metadata + shared
 * calligraphic style (layered stroke widths/colors, matching the source SVGs'
 * edge/primary/inner ink layers) for the 22 modern Hebrew letters, extracted
 * from assets/svg/hebrew-letters/modern/. Each stroke's arc length and start
 * point are precomputed so the tile can reveal it via strokeDasharray/
 * strokeDashoffset and show a numbered stroke-order marker, matching the
 * source SVGs' visual richness (react-native-svg can't run their SMIL/mask
 * animation directly).
 */

export const HEBREW_STROKE_VIEW_BOX = '0 0 720 720';

export const HEBREW_STROKE_STYLE = {
  primaryWidth: 42,
  edgeWidth: 48,
  innerWidth: 27,
  ink: "#24170f",
  innerInk: "#4a3221",
  accent: "#8a6a3c",
  paper: "#f7f1e5",
};

export type HebrewStroke = { d: string; length: number; startX: number; startY: number };

export type HebrewCalligraphyLetter = {
  order: number;
  name: string;
  character: string;
  transliteration: string;
};

export const HEBREW_CALLIGRAPHY_LETTERS: HebrewCalligraphyLetter[] = [
  { order: 1, name: "Aleph", character: "\u05d0", transliteration: "\u02be" },
  { order: 2, name: "Bet", character: "\u05d1", transliteration: "b/v" },
  { order: 3, name: "Gimel", character: "\u05d2", transliteration: "g" },
  { order: 4, name: "Dalet", character: "\u05d3", transliteration: "d" },
  { order: 5, name: "He", character: "\u05d4", transliteration: "h" },
  { order: 6, name: "Vav", character: "\u05d5", transliteration: "v/w" },
  { order: 7, name: "Zayin", character: "\u05d6", transliteration: "z" },
  { order: 8, name: "Chet", character: "\u05d7", transliteration: "\u1e25" },
  { order: 9, name: "Tet", character: "\u05d8", transliteration: "\u1e6d" },
  { order: 10, name: "Yod", character: "\u05d9", transliteration: "y" },
  { order: 11, name: "Kaf", character: "\u05db", transliteration: "k/kh" },
  { order: 12, name: "Lamed", character: "\u05dc", transliteration: "l" },
  { order: 13, name: "Mem", character: "\u05de", transliteration: "m" },
  { order: 14, name: "Nun", character: "\u05e0", transliteration: "n" },
  { order: 15, name: "Samekh", character: "\u05e1", transliteration: "s" },
  { order: 16, name: "Ayin", character: "\u05e2", transliteration: "\u02bf" },
  { order: 17, name: "Pe", character: "\u05e4", transliteration: "p/f" },
  { order: 18, name: "Tsadi", character: "\u05e6", transliteration: "\u1e63" },
  { order: 19, name: "Qof", character: "\u05e7", transliteration: "q" },
  { order: 20, name: "Resh", character: "\u05e8", transliteration: "r" },
  { order: 21, name: "Shin", character: "\u05e9", transliteration: "sh/s" },
  { order: 22, name: "Tav", character: "\u05ea", transliteration: "t" },
];

export const HEBREW_LETTER_STROKES: Record<number, HebrewStroke[]> = {
  1: [{ d: "M250 260 C268.3 278.3 323.3 330.0 360 370 C396.7 410.0 451.7 478.3 470 500", length: 325.9, startX: 250.0, startY: 260.0 }, { d: "M470 250 C456.7 265.0 418.3 298.3 390 340 C361.7 381.7 315.0 473.3 300 500", length: 304.2, startX: 470.0, startY: 250.0 }, { d: "M280 390 L420 360", length: 143.2, startX: 280.0, startY: 390.0 }],
  2: [{ d: "M250 250 C286.7 250.0 428.3 241.7 470 250 C511.7 258.3 495.0 270.0 500 300 C505.0 330.0 500.0 408.3 500 430", length: 418.9, startX: 250.0, startY: 250.0 }, { d: "M500 430 C491.7 441.7 490.0 488.3 450 500 C410.0 511.7 291.7 500.0 260 500", length: 280.6, startX: 500.0, startY: 430.0 }, { d: "M260 500 L230 455", length: 54.1, startX: 260.0, startY: 500.0 }],
  3: [{ d: "M300 245 C315.0 252.5 369.2 265.8 390 290 C410.8 314.2 423.3 355.0 425 390 C426.7 425.0 404.2 481.7 400 500", length: 322.5, startX: 300.0, startY: 245.0 }, { d: "M410 425 L500 500", length: 117.2, startX: 410.0, startY: 425.0 }],
  4: [{ d: "M250 250 L500 250", length: 250.0, startX: 250.0, startY: 250.0 }, { d: "M460 250 L430 500", length: 251.8, startX: 460.0, startY: 250.0 }],
  5: [{ d: "M245 250 L480 250", length: 235.0, startX: 245.0, startY: 250.0 }, { d: "M475 250 L460 500", length: 250.4, startX: 475.0, startY: 250.0 }, { d: "M260 350 L260 500", length: 150.0, startX: 260.0, startY: 350.0 }],
  6: [{ d: "M330 250 L430 250", length: 100.0, startX: 330.0, startY: 250.0 }, { d: "M390 250 L375 500", length: 250.4, startX: 390.0, startY: 250.0 }],
  7: [{ d: "M290 250 L455 250", length: 165.0, startX: 290.0, startY: 250.0 }, { d: "M385 250 L370 500", length: 250.4, startX: 385.0, startY: 250.0 }],
  8: [{ d: "M255 250 L255 500", length: 250.0, startX: 255.0, startY: 250.0 }, { d: "M470 250 L470 500", length: 250.0, startX: 470.0, startY: 250.0 }, { d: "M255 250 L470 250", length: 215.0, startX: 255.0, startY: 250.0 }],
  9: [{ d: "M275 260 C275.0 291.7 265.8 410.0 275 450 C284.2 490.0 302.5 491.7 330 500 C357.5 508.3 413.3 508.3 440 500 C466.7 491.7 481.7 478.3 490 450 C498.3 421.7 490.0 350.0 490 330", length: 576.3, startX: 275.0, startY: 260.0 }, { d: "M490 330 C480.0 316.7 455.0 263.3 430 250 C405.0 236.7 361.7 241.7 340 250 C318.3 258.3 306.7 291.7 300 300", length: 258.3, startX: 490.0, startY: 330.0 }],
  10: [{ d: "M330 260 L425 260", length: 95.0, startX: 330.0, startY: 260.0 }, { d: "M400 260 L365 350", length: 96.6, startX: 400.0, startY: 260.0 }],
  11: [{ d: "M275 250 C304.2 250.0 412.5 240.0 450 250 C487.5 260.0 491.7 280.0 500 310 C508.3 340.0 508.3 398.3 500 430 C491.7 461.7 487.5 488.3 450 500 C412.5 511.7 304.2 500.0 275 500", length: 646.9, startX: 275.0, startY: 250.0 }],
  12: [{ d: "M360 170 C370.0 170.0 409.2 155.0 420 170 C430.8 185.0 424.2 245.0 425 260", length: 153.5, startX: 360.0, startY: 170.0 }, { d: "M425 260 C419.2 283.3 407.5 360.0 390 400 C372.5 440.0 331.7 483.3 320 500", length: 266.9, startX: 425.0, startY: 260.0 }],
  13: [{ d: "M260 500 C263.3 458.3 260.0 271.7 280 250 C300.0 228.3 347.5 370.0 380 370 C412.5 370.0 459.2 228.3 475 250 C490.8 271.7 475.0 458.3 475 500", length: 827.9, startX: 260.0, startY: 500.0 }, { d: "M260 500 L475 500", length: 215.0, startX: 260.0, startY: 500.0 }],
  14: [{ d: "M320 250 C338.3 250.0 411.7 225.0 430 250 C448.3 275.0 430.0 375.0 430 400", length: 265.7, startX: 320.0, startY: 250.0 }, { d: "M430 400 C424.2 416.7 416.7 483.3 395 500 C373.3 516.7 315.8 500.0 300 500", length: 204.3, startX: 430.0, startY: 400.0 }],
  15: [{ d: "M360 240 C376.7 245.0 436.7 250.0 460 270 C483.3 290.0 496.7 329.2 500 360 C503.3 390.8 496.7 430.8 480 455 C463.3 479.2 429.2 497.5 400 505 C370.8 512.5 330.8 512.5 305 500 C279.2 487.5 255.0 457.5 245 430 C235.0 402.5 237.5 361.7 245 335 C252.5 308.3 270.8 285.8 290 270 C309.2 254.2 348.3 245.0 360 240", length: 844.9, startX: 360.0, startY: 240.0 }],
  16: [{ d: "M285 250 C293.3 273.3 322.5 348.3 335 390 C347.5 431.7 355.8 481.7 360 500", length: 261.5, startX: 285.0, startY: 250.0 }, { d: "M455 250 C446.7 273.3 420.8 348.3 405 390 C389.2 431.7 367.5 481.7 360 500", length: 267.5, startX: 455.0, startY: 250.0 }],
  17: [{ d: "M270 500 C270.0 458.3 240.8 291.7 270 250 C299.2 208.3 406.7 239.2 445 250 C483.3 260.8 490.8 285.0 500 315 C509.2 345.0 509.2 399.2 500 430 C490.8 460.8 483.3 488.3 445 500 C406.7 511.7 299.2 500.0 270 500", length: 911.9, startX: 270.0, startY: 500.0 }, { d: "M350 330 L430 330", length: 80.0, startX: 350.0, startY: 330.0 }],
  18: [{ d: "M280 250 C290.0 269.2 321.7 323.3 340 365 C358.3 406.7 381.7 477.5 390 500", length: 273.7, startX: 280.0, startY: 250.0 }, { d: "M470 250 C461.7 270.0 443.3 328.3 420 370 C396.7 411.7 345.0 478.3 330 500", length: 288.3, startX: 470.0, startY: 250.0 }, { d: "M330 500 L470 500", length: 140.0, startX: 330.0, startY: 500.0 }],
  19: [{ d: "M270 250 C303.3 250.0 432.5 238.3 470 250 C507.5 261.7 491.7 290.0 495 320 C498.3 350.0 499.2 400.0 490 430 C480.8 460.0 465.8 488.3 440 500 C414.2 511.7 352.5 500.0 335 500", length: 588.3, startX: 270.0, startY: 250.0 }, { d: "M390 360 L350 540", length: 184.4, startX: 390.0, startY: 360.0 }],
  20: [{ d: "M260 250 C290.8 250.0 405.0 240.8 445 250 C485.0 259.2 490.8 263.3 500 305 C509.2 346.7 500.0 467.5 500 500", length: 466.4, startX: 260.0, startY: 250.0 }],
  21: [{ d: "M265 250 L300 500", length: 252.4, startX: 265.0, startY: 250.0 }, { d: "M365 235 L365 500", length: 265.0, startX: 365.0, startY: 235.0 }, { d: "M470 250 L430 500", length: 253.2, startX: 470.0, startY: 250.0 }, { d: "M300 500 C310.8 492.5 343.3 455.0 365 455 C386.7 455.0 419.2 492.5 430 500", length: 160.7, startX: 300.0, startY: 500.0 }],
  22: [{ d: "M255 250 L470 250", length: 215.0, startX: 255.0, startY: 250.0 }, { d: "M290 250 L280 500", length: 250.2, startX: 290.0, startY: 250.0 }, { d: "M470 250 L455 500", length: 250.4, startX: 470.0, startY: 250.0 }],
};
