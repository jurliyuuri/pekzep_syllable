function from_latin_transcription(input) {
    const has_onset = input.match(/^[^aeiouy]/i) !== null;
    const has_tone_letter = input.match(/[012]$/i) !== null;

    const onset = has_onset ? input.match(/^[^aeiouy]/i)[0] : '';
    const tone = has_tone_letter ? input.match(/[012]$/i)[0] : '0';
    const rime_without_tone = input.slice(has_onset ? 1 : 0, has_tone_letter ? -1 : undefined);
    console.log(rime_without_tone);
    const has_coda = rime_without_tone.match(/[ptkmn]$/i) !== null;
    const coda = has_coda ? rime_without_tone[rime_without_tone.length - 1] : '';
    const nucleus = has_coda ? rime_without_tone.slice(0, -1) : rime_without_tone;
    return { onset, nucleus, coda, tone };
}

console.log(from_latin_transcription("y"));
console.log(from_latin_transcription("i2"));
console.log(from_latin_transcription("ap1"));
console.log(from_latin_transcription("po1"));
console.log(from_latin_transcription("uaip2"));
console.log(from_latin_transcription("hue"));
console.log(from_latin_transcription("huep2"));