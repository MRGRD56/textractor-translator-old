import safeEval from 'safe-eval';
import Sentence from "../types/Sentence";

class Transformer {
    constructor(public readonly name: string, private readonly sourceCode: string) {
    }

    transform(sentence: Sentence): string | undefined {
        const context = {
            transformer: {
                transform: (sentence: Sentence): unknown => sentence.text
            }
        };

        safeEval(this.sourceCode, context);
        const {transform} = context.transformer;
        if (typeof transform === 'function') {
            const transformed = transform(sentence);
            if (typeof transformed === 'string') {
                return transformed;
            }
            if (transformed == null) {
                return undefined;
            }

            return String(transformed);
        }

        return sentence.text;
    }
}

export default Transformer;