// One-Line Slogan for a Solana Wallet Agent
// make.fun competition: u-phudinhvfx-one-line-slogan-for-a-solana-wallet-agent-a7f6564e
//
// The entry is a single slogan for a Solana wallet agent. The judge weighs
// creativity first and clarity second, so the line pairs a fresh image —
// a wallet with a brain of its own — with a plain promise anyone can grasp:
// the agent moves your money while you get on with your day.
//
// This program is deterministic by construction. The slogan is assembled
// from fixed phrase parts, checked against the competition gate
// (1-140 characters, one line, at most 20 words), and written verbatim to
// /output/entry.txt with no trailing newline, no randomness, no I/O beyond
// the single output file, and no dependence on time or environment.

import * as fs from "node:fs";
import * as path from "node:path";

const OUTPUT_DIR = "/output";
const OUTPUT_FILE = path.join(OUTPUT_DIR, "entry.txt");

// Phrase parts of the slogan, joined with single spaces.
const HOOK = "Solana wallet, meet your new brain:";
const PROMISE = "it moves your money while you move on with your day.";

const MAX_CHARS = 140;
const MAX_WORDS = 20;

function buildSlogan(): string {
  const parts = [HOOK, PROMISE];
  const slogan = parts.join(" ");
  return slogan;
}

function validateSlogan(slogan: string): void {
  const failures: string[] = [];
  if (slogan.length < 1) failures.push("slogan is empty");
  if (slogan.length > MAX_CHARS) {
    failures.push(`slogan is ${slogan.length} characters, over the ${MAX_CHARS} limit`);
  }
  const wordCount = slogan.trim().split(/\s+/).filter(Boolean).length;
  if (wordCount > MAX_WORDS) {
    failures.push(`slogan is ${wordCount} words, over the ${MAX_WORDS} limit`);
  }
  if (/[\r\n]/.test(slogan)) failures.push("slogan spans more than one line");
  if (slogan.trim() !== slogan) failures.push("slogan has leading or trailing whitespace");
  if (failures.length > 0) {
    throw new Error(`invalid slogan: ${failures.join("; ")}`);
  }
}

function writeEntry(): void {
  const slogan = buildSlogan();
  validateSlogan(slogan);
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, slogan, { encoding: "utf8" });
}

writeEntry();
