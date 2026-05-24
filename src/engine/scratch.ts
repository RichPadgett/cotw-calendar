// temp test helper

const start = new Date("2026-03-18");

const next = new Date(start);

next.setDate(next.getDate() + 364);

console.log(next.toISOString());

