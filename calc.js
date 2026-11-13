// GTU Hero practice tools (shared by 4 repos). Plain JS, no dependencies.
const F = {
  // BE01000081 Basic Mechanical Engineering unit weightages (official syllabus, via GTU Hero's BME guide)
  bme: {
    units: [
      ['Unit 1: Basic Terminology and Energy Sources', 14, 'theory'],
      ['Unit 2: Properties of Gases and Steam', 22, 'theory'],
      ['Unit 3: Heat Engines and IC Engines', 20, 'theory'],
      ['Unit 4: Steam Boilers', 10, 'practical hours, diagrams in theory paper'],
      ['Unit 5: Air Compressors and Pumps', 10, 'theory'],
      ['Unit 6: Refrigeration and Air Conditioning', 8, 'theory'],
      ['Unit 7: Couplings, Clutches, Brakes, Power Transmission', 10, 'practical hours, short notes in theory paper'],
      ['Unit 8: Engineering Materials', 6, 'theory'],
    ],
    plan(totalHours) {
      if (!(totalHours > 0)) throw Error('hours must be positive');
      const sum = F.bme.units.reduce((s, u) => s + u[1], 0);
      return F.bme.units.map(([name, w, note]) => ({ name, w, note, hours: (totalHours * w) / sum }));
    },
  },
  // GTU Physics unit weightages (official syllabus PDFs, via GTU Hero's Physics guide)
  phy: {
    codes: {
      '3110011': { label: '3110011 (Group I)', units: [['Properties of Matter', 7, 19], ['Waves, Motion and Acoustics', 7, 19], ['Ultrasonic and NDT', 9, 25], ['Superconductivity', 6, 17], ['Lasers', 7, 20]],
        top: ['Ruby laser construction and working: 9/9 papers', 'Twisting couple, torsion or torsional pendulum: 9/9', 'NDT (definition, pros and cons, DT vs NDT): 9/9', 'Critical field or critical current numerical: 9/9', 'Laser applications: 8/9', 'Reverberation time numerical (Sabine): 8/9'] },
      '3110018': { label: '3110018 (Group 2)', units: [['Electronic Materials', 8, 22], ['Semiconductors', 10, 27], ['Light-Semiconductor Interaction', 6, 17], ['Measurements', 6, 17], ['Superconductivity', 6, 17]],
        top: ['Solar cell or photovoltaic effect: 9/9 papers', 'Critical field or critical current numerical: 8/9', 'Kronig-Penney model: 7/9', 'Type I vs Type II superconductors: 7/9', 'Hot point probe: 7/9', 'Four probe method: 7/9'] },
      'BE01000021': { label: 'BE01000021 / BE01R00021 (all branches)', units: [['Properties of Matter', 6, 13], ['Waves, Motion and Acoustics', 8, 18], ['Optics', 8, 18], ['Quantum Physics', 8, 18], ['Lasers', 8, 18], ['New Engineering Materials', 7, 15]],
        top: ['A laser question: 4/4 papers', 'Schrodinger equation or particle in a box: 4/4', 'A semiconductor question (p-n junction, n vs p type or Zener): 4/4', "Young's double slit, Michelson, de Broglie, Heisenberg: 3/4 each"] },
    },
    plan(code, totalHours) {
      const c = F.phy.codes[code]; if (!c) throw Error('unknown code ' + code);
      if (!(totalHours > 0)) throw Error('hours must be positive');
      const sum = c.units.reduce((s, u) => s + u[2], 0);
      return c.units.map(([name, hrs, w]) => ({ name, hrs, w, hours: (totalHours * w) / sum }));
    },
  },
  // CPI x 10 vs actual aggregate marks percentage
  agg: {
    parse: (s) => s.trim().split(/\n|;/).filter((l) => l.trim()).map((l) => { const [gp, cr, mk, mx] = l.trim().split(/[\s,]+/).map(Number); if ([gp, cr, mk, mx].some((v) => !isFinite(v))) throw Error('each line needs: gradePoint credits marks maxMarks'); return { gp, cr, mk, mx }; }),
    cpi: (rows) => rows.reduce((s, r) => s + r.gp * r.cr, 0) / rows.reduce((s, r) => s + r.cr, 0),
    aggregate: (rows) => (100 * rows.reduce((s, r) => s + r.mk, 0)) / rows.reduce((s, r) => s + r.mx, 0),
  },
  // C printf format specifiers for an int
  fmt: {
    show(n) {
      if (!Number.isInteger(n) || n < -2147483648 || n > 2147483647) throw Error('enter a 32-bit int');
      const u = n >>> 0;
      return { d: String(n), u: String(u), o: u.toString(8), x: u.toString(16), X: u.toString(16).toUpperCase(), bin: u.toString(2).padStart(32, '0').replace(/(.{8})(?=.)/g, '$1 '), c: n >= 32 && n <= 126 ? String.fromCharCode(n) : null, hx: '0x' + u.toString(16), w5: String(n).padStart(5), l5: String(n).padEnd(5), z5: n < 0 ? '-' + String(-n).padStart(4, '0') : String(n).padStart(5, '0') };
    },
  },
};
if (typeof module !== 'undefined') module.exports = F;
