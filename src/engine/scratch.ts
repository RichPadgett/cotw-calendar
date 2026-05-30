/*
 * File: src/engine/scratch.ts
 * Purpose: Calendar calculation engine module for building Enoch calendar dates, months, years, and feast metadata.
 * Author: rpadgett
 */

// temp test helper

const start = new Date("2026-03-18");

const next = new Date(start);

next.setDate(next.getDate() + 364);

console.log(next.toISOString());

