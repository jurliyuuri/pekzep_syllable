import { from_latin, to_kana } from "./pekzep_syllable.js";
import test from 'ava';
{
    const inputs = ["y",
        "i2",
        "ap1",
        "po1",
        "uaip2",
        "hue",
        "huep2",
        "zap2"];

    const answers = [{ onset: '', nucleus: 'y', coda: '', tone: '0' }
        , { onset: '', nucleus: 'i', coda: '', tone: '2' }
        , { onset: '', nucleus: 'a', coda: 'p', tone: '1' }
        , { onset: 'p', nucleus: 'o', coda: '', tone: '1' }
        , { onset: '', nucleus: 'uai', coda: 'p', tone: '2' }
        , { onset: 'h', nucleus: 'ue', coda: '', tone: '0' }
        , { onset: 'h', nucleus: 'ue', coda: 'p', tone: '2' }
        , { onset: 'ź', nucleus: 'a', coda: 'p', tone: '2' }];

    test('from_latin', t => {
        for (let i = 0; i < inputs.length; i++) {
            const result = from_latin(inputs[i]);
            t.deepEqual(result, answers[i], `from_latin(${inputs[i]}) should be ${JSON.stringify(answers[i])}`);
        }
    });

}

{
    const inputs = [((("y"))), ((("i2"))), ((("ap1"))), ((("po1"))), ((("uaip2"))), ((("hue"))), ((("huep2"))), (("zap2"))];
    const answers = [
        "ユ·",
        "イー⤴",
        "アㇷ゚→",
        "ポウ→",
        "ワイㇷ゚⤴",
        "ホゥェゥ·",
        "ホゥェゥㇷ゚⤴",
        "チャㇷ゚⤴"];
    test('to_kana ∘ from_latin', t => {
        for (let i = 0; i < inputs.length; i++) {
            const result = to_kana(from_latin(inputs[i]));
            t.deepEqual(result, answers[i], `to_kana ∘ from_latin(${inputs[i]}) should be ${answers[i]}`);
        }
    });
}
