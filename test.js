const F = require('./calc.js');
const a = (x, y, tol = 1e-9) => { if (Math.abs(x - y) > tol * Math.max(1, Math.abs(y))) throw Error(x + ' vs ' + y); };
const eq = (x, y) => { if (x !== y) throw Error(JSON.stringify(x) + ' vs ' + JSON.stringify(y)); };

// BME: weightages sum to 100, Units 2 + 3 = 42% (both from GTU Hero's BME guide)
eq(F.bme.units.reduce((s, u) => s + u[1], 0), 100);
eq(F.bme.units[1][1] + F.bme.units[2][1], 42);
let p = F.bme.plan(50); a(p.reduce((s, u) => s + u.hours, 0), 50); a(p[1].hours, 11); a(p[2].hours, 10);

// Physics: weightages per code (rounded in the syllabus, so they add to about 100)
for (const k of Object.keys(F.phy.codes)) { const s = F.phy.codes[k].units.reduce((t, u) => t + u[2], 0); if (s < 99 || s > 101) throw Error(k + ' sums to ' + s); }
eq(F.phy.codes['3110011'].units[2][2], 25);
p = F.phy.plan('3110018', 30); a(p.reduce((s, u) => s + u.hours, 0), 30);

// CPI vs aggregate: GTU Hero CPI guide example, 55% in every subject gives grade BC (7 points) -> CPI 7, CPI x 10 = 70%, aggregate 55%
let rows = F.agg.parse('7 4 55 100\n7 3 55 100\n7 4 55 100\n7 2 55 100');
a(F.agg.cpi(rows) * 10, 70); a(F.agg.aggregate(rows), 55);
// Semester 1 of the guide's CPI example: (8x4 + 7x3 + 9x4 + 8x2) / 13 = 105/13
rows = F.agg.parse('8 4 80 100; 7 3 70 100; 9 4 90 100; 8 2 80 100'); a(F.agg.cpi(rows), 105 / 13);

// printf specifiers, cross-checked against the C program output in specifiers.c
let f = F.fmt.show(65); eq(f.o, '101'); eq(f.x, '41'); eq(f.c, 'A');
eq(f.hx, '0x41'); eq(f.w5, '   65'); eq(f.l5, '65   '); eq(f.z5, '00065');
f = F.fmt.show(255); eq(f.o, '377'); eq(f.X, 'FF'); eq(f.bin.endsWith('11111111'), true);
f = F.fmt.show(-1); eq(f.u, '4294967295'); eq(f.x, 'ffffffff');
let threw = false; try { F.fmt.show(1.5); } catch (e) { threw = true; } eq(threw, true);
console.log('All checks passed');
