// Sequence/data for each level band. Rule options are strings for UI, but could be more structured later.
// All random logic is deterministic per call for UX stability.

export interface RuleSet {
  label: string;
  generator: (start: number) => number[];
  distractors?: string[];
  missing?: boolean;
}

function shuffle<T>(arr: T[]): T[] {
  return arr
    .map((v) => [Math.random(), v] as const)
    .sort(([a], [b]) => a - b)
    .map(([, v]) => v);
}

// Level 1–3: simple +/-
export function generateLevel1_3(): { sequence: number[], rules: string[], correctIdx: number } {
  const step = Math.random() < 0.5 ? 1 : 2;
  const adding = Math.random() < 0.7; // Prefer addition for simplicity
  let start: number;
  if (adding) {
    start = Math.floor(Math.random() * 8) + 2;
  } else {
    start = Math.floor(Math.random() * 8) + 10; // Higher start for subtraction
  }
  const seq = Array.from({length: 4}, (_, i) => adding ? start + i*step : start - i*step);
  const rule = adding ? `Add ${step} each time` : `Subtract ${step} each time`;
  const distractors = shuffle([
    adding ? `Subtract ${step} each time` : `Add ${step} each time`,
    `Multiply by ${step} each time`,
  ]);
  const rules = shuffle([rule, ...distractors]);
  const correctIdx = rules.indexOf(rule);
  return { sequence: seq, rules, correctIdx };
}

// Level 4–6: x2, x3
export function generateLevel4_6(): { sequence: number[], rules: string[], correctIdx: number } {
  const start = Math.floor(Math.random() * 4) + 2;
  const multi = Math.random() < 0.5 ? 2 : 3;
  const seq = Array.from({length: 4}, (_, i) => start * Math.pow(multi, i));
  const rule = `Multiply by ${multi} each time`;
  const distractors = shuffle([
    `Add ${multi} each time`, 
    multi === 2 ? `Square each time` : `Cube each time`,
  ]);
  const rules = shuffle([rule, ...distractors]);
  const correctIdx = rules.indexOf(rule);
  return { sequence: seq, rules, correctIdx };
}

// Level 7–9: larger numbers, better distractors
export function generateLevel7_9(): { sequence: number[], rules: string[], correctIdx: number } {
  const op = Math.floor(Math.random()*3); // 0: +5, 1: -5, 2: x2
  let start: number;
  let seq: number[] = [];
  let rule = "";
  let distractors: string[] = [];
  if(op === 0) {
    start = Math.floor(Math.random() * 20) + 20;
    seq = Array.from({length: 4}, (_, i) => start + i*5);
    rule = `Add 5 each time`;
    distractors = [`Subtract 5 each time`, `Multiply by 2 each time`];
  } else if(op === 1) {
    start = Math.floor(Math.random() * 20) + 40; // Higher start for subtraction
    seq = Array.from({length: 4}, (_, i) => start - i*5);
    rule = `Subtract 5 each time`;
    distractors = [`Add 5 each time`, `Divide by 2 each time`];
  } else {
    start = Math.floor(Math.random() * 10) + 5;
    seq = Array.from({length: 4}, (_, i) => start * Math.pow(2, i));
    rule = `Multiply by 2 each time`;
    distractors = [`Add 2 each time`, `Square each time`];
  }
  const rules = shuffle([rule, ...distractors]);
  const correctIdx = rules.indexOf(rule);
  return { sequence: seq, rules, correctIdx };
}

// Level 10+: missing value, alternation, squaring, mixed
export function generateLevel10plus(): { sequence: (number|null)[], rules: string[], correctIdx: number } {
  const caseType = Math.floor(Math.random()*3);
  if(caseType === 0) { // Missing number (additive)
    const step = Math.floor(Math.random()*4)+2;
    const start = Math.floor(Math.random()*25)+10;
    const seq = [start, start+step, null, start+step*3];
    const rule = `Add ${step} each time`;
    const distractors = [`Subtract ${step} each time`, `Multiply by 2 each time`];
    const rules = shuffle([rule, ...distractors]);
    const correctIdx = rules.indexOf(rule);
    return { sequence: seq, rules, correctIdx };
  } else if(caseType === 1) { // Alternating
    const start = Math.floor(Math.random()*10) + 2;
    const step1 = Math.floor(Math.random()*3)+2;
    const step2 = Math.floor(Math.random()*3)+2;
    const seq = [start, start+step1, start+step1-step2, start+2*step1-step2];
    const rule = `Alternate +${step1}, -${step2}`;
    const distractors = [`Add ${step1} each time`, `Add ${step2} each time`];
    const rules = shuffle([rule, ...distractors]);
    const correctIdx = rules.indexOf(rule);
    return { sequence: seq, rules, correctIdx };
  } else { // Squaring
    const start = Math.floor(Math.random()*3)+2;
    const seq = [start, start**2, (start**2)**2, (((start**2)**2)**2)];
    const rule = "Square previous each time";
    const distractors = ["Add 2 each time", "Multiply by 2 each time"];
    const rules = shuffle([rule, ...distractors]);
    const correctIdx = rules.indexOf(rule);
    return { sequence: seq, rules, correctIdx };
  }
}

export function getGeneratedSequence(level: number) {
  if(level <= 3) return generateLevel1_3();
  if(level <= 6) return generateLevel4_6();
  if(level <= 9) return generateLevel7_9();
  return generateLevel10plus();
}

