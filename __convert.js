import { from_latin, to_kana } from "./pekzep_syllable.js";
import fs from "fs";

// [char, kana]
const kana_pronunciation_table = fs.readFileSync("PRONUNCIATIONS.tsv", { encoding: 'utf-8' })
    .split(/\r?\n/)
    .map(line => line.split("\t"));

// [char, latin]
const latin_pronunciation_table = fs.readFileSync("字_音.tsv", { encoding: 'utf-8' })
    .split(/\r?\n/)
    .map(line => line.split("\t"))
    .slice(1);

for (const [char, latin] of latin_pronunciation_table) {
    const kana_from_table = kana_pronunciation_table.find(([char_, kana]) => char_ === char)?.[1];
    const kana_from_latin = to_kana(from_latin(latin));
    if (!kana_from_table) {
        continue;
    }

    if (kana_from_table !== kana_from_latin) {
        console.log(`Mismatch for ${char}: ${latin} => ${kana_from_table} vs ${kana_from_latin}`);
    }
}

let newfile = "";
for (const [char, kana] of kana_pronunciation_table) {
    const latin_from_table = latin_pronunciation_table.find(([char_, latin]) => char_ === char)?.[1];
    newfile += `${char}\t${latin_from_table ?? ""}\t${kana}\n`;
}
fs.writeFileSync("PRONUNCIATIONS2.tsv", newfile, { encoding: 'utf-8' });