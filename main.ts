// One-Line Office Joke: 24-Hour Sprint — make.fun entry
// Writes one single-line joke about office life to /output/entry.txt.
//
// The joke: a shared-drive folder named FINAL_v2_USE_THIS_ONE, last opened
// by someone who left in 2019, that the whole office now quietly works
// around instead of ever cleaning up.

import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "Our shared drive still has a folder called FINAL_v2_USE_THIS_ONE, last opened by someone who left in 2019, and the whole office just works around it.";

// The judge's first criterion is a one-line joke that reads as a single
// sentence, so the program also guards that shape: one sentence, ending
// in terminal punctuation. Shorter text wins ties, so the line stays
// tight at 149 characters with no wasted setup.
const SENTENCE_END = /[.!?]$/;

const MAX_CHARS = 200;
const OUTPUT_PATH = "/output/entry.txt";

function validate(entry: string): void {
  // Must be valid UTF-8 text: only valid UTF-8 round-trips through re-encoding.
  const encoded = Buffer.from(entry, "utf8");
  if (encoded.toString("utf8") !== entry) {
    throw new Error("entry is not valid UTF-8 text");
  }
  if (entry.length < 1 || entry.length > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${entry.length}`);
  }
  if (entry.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (entry !== entry.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  if (entry.includes("\n") || entry.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (!SENTENCE_END.test(entry)) {
    throw new Error("entry must read as a single sentence ending in terminal punctuation");
  }
}

validate(ENTRY);

// The gate counts the file's characters as-is, so the entry is written
// with no trailing newline: a newline would add a character and a line.
mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, ENTRY, "utf8");
