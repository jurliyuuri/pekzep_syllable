export function from_latin(input_string) {
    const has_onset = input_string.match(/^[^aeiouy]/i) !== null;
    const has_tone_letter = input_string.match(/[012]$/i) !== null;

    let onset = has_onset ? input_string.match(/^[^aeiouy]/i)[0] : '';
    const tone = has_tone_letter ? input_string.match(/[012]$/i)[0] : '0';
    const rime_without_tone = input_string.slice(has_onset ? 1 : 0, has_tone_letter ? -1 : undefined);
    const has_coda = rime_without_tone.match(/[ptkmn]$/i) !== null;
    const coda = has_coda ? rime_without_tone[rime_without_tone.length - 1] : '';
    const nucleus = has_coda ? rime_without_tone.slice(0, -1) : rime_without_tone;

    return normalize_z({ onset, nucleus, coda, tone });
}

function normalize_z(o) {
    if (o.onset !== 'z') {
        return o;
    }

    if (
        (o.nucleus === 'a' && o.coda === 'p' && o.tone === '2'
        ) || (o.nucleus === 'a' && o.coda === 't' && o.tone === '1'
        ) || (o.nucleus === 'au' && o.coda === '' && o.tone === ''
        ) || (o.nucleus === 'i' && o.coda === 'p' && o.tone === '1'
        ) || (o.nucleus === 'i' && o.coda === 't' && o.tone === '1'
        ) || (o.nucleus === 'e' && o.coda === '.' && o.tone === '1'
        ) || (o.nucleus === 'e' && o.coda === 'p' && o.tone === '1'
        ) || (o.nucleus === 'ie' && o.coda === '' && o.tone === '1'
        )) {
        return { onset: 'ź', nucleus: o.nucleus, coda: o.coda, tone: o.tone };
    }

    return o;
}

export function to_kana(o) {
    const tone_mark = ['·', '→', '⤴'][o.tone];

    let onset_plus_nucleus = (() => {
        if (o.onset === '') {
            return {
                a: "アー", e: "エゥー", u: "ウー", i: "イー", ai: "アイ", au: "アウ", ei: "エイ", o: "オウ", y: "ユー",
                ia: "ヤー", ie: "イェー", iau: "ヤウ", iei: "イェイ", io: "ヨウ",
                ua: "ワー", ue: "ウェゥー", ui: "ウイ", uai: "ワイ", uau: "ワウ", uo: "ウォウ"
            }[o.nucleus];
        }

        const p_plus_nucleus = {
            a: "パー", e: "ペゥー", u: "プー", i: "ピー", ai: "パイ", au: "パウ", ei: "ペイ", o: "ポウ", y: "ピュー",
            ia: "ピアー", ie: "ピエー", iau: "ピアウ", iei: "ピエイ", io: "ピオウ",
            ua: "プアー", ue: "プェゥー", ui: "プイ", uai: "プアイ", uau: "プアウ", uo: "プオウ"
        }[o.nucleus];

        const 五十音表 = {
            p: { A: "パ", I: "ピ", U: "プ", E: "ペ", O: "ポ" },
            b: { A: "バ", I: "ビ", U: "ブ", E: "ベ", O: "ボ" },
            m: { A: "マ", I: "ミ", U: "ム", E: "メ", O: "モ" },
            c: { A: "サ", I: "スィ", U: "ス", E: "セ", O: "ソ" },
            s: { A: "ザ", I: "ズィ", U: "ズ", E: "ゼ", O: "ゾ" },
            x: { A: "シャ", I: "シ", U: "シュ", E: "シェ", O: "ショ" },
            z: { A: "ツァ", I: "ツィ", U: "ツ", E: "ツェ", O: "ツォ" },
            ź: { A: "チャ", I: "チ", U: "チュ", E: "チェ", O: "チョ" },
            t: { A: "タ", I: "ティ", U: "トゥ", E: "テ", O: "ト" },
            d: { A: "ダ", I: "ディ", U: "ドゥ", E: "デ", O: "ド" },
            n: { A: "ナ", I: "ニ", U: "ヌ", E: "ネ", O: "ノ" },
            l: { A: "ラ", I: "リ", U: "ル", E: "レ", O: "ロ" },
            k: { A: "カ", I: "キ", U: "ク", E: "ケ", O: "コ" },
            g: { A: "ガ", I: "ギ", U: "グ", E: "ゲ", O: "ゴ" },
            h: { A: "ハ", I: "ヒ", U: "ホゥ", E: "ヘ", O: "ホ" },
        };

        // p_plus_nucleus の先頭の文字により、どの段を使うか決定する
        const 段 = { パ: "A", ピ: "I", プ: "U", ペ: "E", ポ: "O" }[p_plus_nucleus[0]];

        return 五十音表[o.onset][段] + p_plus_nucleus.slice(1);
    })();

    if (o.onset === 'ź' && o.nucleus === 'e') {
        onset_plus_nucleus = "チェー";
    }
    if (o.onset === 'x' && o.nucleus === 'e') {
        onset_plus_nucleus = "シェー";
    }

    const coda = (() => {
        if (o.coda === '') {
            return '';
        } else if (o.coda === 'p') {
            return 'ㇷ゚';
        } else if (o.coda === 't') {
            return 'ㇳ';
        } else if (o.coda === 'k') {
            return 'ㇰ';
        } else if (o.coda === 'm') {
            return 'ㇺ';
        } else if (o.coda === 'n') {
            return 'ン';
        }
    })();

    const omit_長音符 = o.coda !== "" || o.tone === "0";
    onset_plus_nucleus = omit_長音符 ? onset_plus_nucleus.replace(/ー/g, '') : onset_plus_nucleus;

    const omit_ウ_after_オ段 = (o.nucleus === "o" || o.nucleus === "io" || o.nucleus === "uo") && o.coda !== "";
    onset_plus_nucleus = omit_ウ_after_オ段 ? onset_plus_nucleus.replace(/ウ$/g, '') : onset_plus_nucleus;

    return onset_plus_nucleus + coda + tone_mark;
}
