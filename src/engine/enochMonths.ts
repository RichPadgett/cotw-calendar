/*
 * File: src/engine/enochMonths.ts
 * Purpose: Calendar calculation engine module for building Enoch calendar dates, months, years, and feast metadata.
 * Author: rpadgett
 */

import { EnochMonth } from "../models/calendar";

/**
 * Defines the ordered Enoch month metadata used by the engine and UI.
 * Each entry supplies names, seasons, theme colors, and symbol assets for month rendering.
 */
export const ENOCH_MONTHS: EnochMonth[] = [
  {
    number: 1,

    name: "Abib",

    alternateName: "Nisan",

    hebrew: "אביב",

    paleoHebrew: "𐤏𐤁𐤉𐤁",

    season: "spring",

    symbolImage: require("../../assets/enoch/months/abib.png"),

    themeColor: "#a1d050" // Abib
  },

  {
    number: 2,

    name: "Ziv",

    hebrew: "זיו",

    paleoHebrew: "𐤆𐤉𐤅",

    season: "spring",

    symbolImage: require("../../assets/enoch/months/ziv.png"),

    themeColor: "#78ba14" // Ziv
  },

  {
    number: 3,

    name: "Sivan",

    hebrew: "סיון",

    paleoHebrew: "𐤎𐤉𐤅𐤍",

    season: "spring",

    symbolImage: require("../../assets/enoch/months/sivan.png"),

    themeColor: "#4d7c0f" // Sivan
  },

  {
    number: 4,

    name: "Tammuz",

    hebrew: "תמוז",

    paleoHebrew: "𐤕𐤌𐤅𐤆",

    season: "summer",

    symbolImage: require("../../assets/enoch/months/tammuz.png"),

    themeColor: "#fde047" // Tammuz
  },

  {
    number: 5,

    name: "Av",

    hebrew: "אב",

    paleoHebrew: "𐤀𐤁",

    season: "summer",

    symbolImage: require("../../assets/enoch/months/av.png"),

    themeColor: "#facc15" // Av
  },

  {
    number: 6,

    name: "Elul",

    hebrew: "אלול",

    paleoHebrew: "𐤀𐤋𐤅𐤋",

    season: "summer",

    symbolImage: require("../../assets/enoch/months/elul.png"),

    themeColor: "#ca8a04" // Elul
  },

  {
    number: 7,

    name: "Tishri",

    alternateName: "Ethanim",

    hebrew: "תשרי",

    paleoHebrew: "𐤕𐤔𐤓𐤉",

    season: "fall",

    symbolImage: require("../../assets/enoch/months/ethanim.png"),

    themeColor: "#fdba74" // Tishri/Ethanim
  },

  {
    number: 8,

    name: "Bul",

    hebrew: "בול",

    paleoHebrew: "𐤁𐤅𐤋",

    season: "fall",

    symbolImage: require("../../assets/enoch/months/bul.png"),

    themeColor: "#f97316" // Bul
  },

  {
    number: 9,

    name: "Kislev",

    hebrew: "כסלו",

    paleoHebrew: "𐤊𐤎𐤋𐤅",

    season: "fall",

    symbolImage: require("../../assets/enoch/months/kislev.png"),

    themeColor: "#c2410c" // Kislev
  },

  {
    number: 10,

    name: "Tevet",

    hebrew: "טבת",

    paleoHebrew: "𐤈𐤁𐤕",

    season: "winter",

    symbolImage: require("../../assets/enoch/months/tevet.png"),

    themeColor: "#7dd3fc" // Tevet
  },

  {
    number: 11,

    name: "Shevat",

    hebrew: "שבט",

    paleoHebrew: "𐤔𐤁𐤈",

    season: "winter",

    symbolImage: require("../../assets/enoch/months/shevat.png"),

    themeColor: "#2da8dd" // Shevat
  },

  {
    number: 12,

    name: "Adar",

    hebrew: "אדר",

    paleoHebrew: "𐤀𐤃𐤓",

    season: "winter",

    symbolImage: require("../../assets/enoch/months/adar.png"),

    themeColor: "#0369a1" // Adar
  },
];
