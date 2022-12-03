import {runTextractorServer} from "./textractorServer";
import GoogleTranslator from "./translation/translators/GoogleTranslator";
import axios from "axios";

axios.defaults.adapter = 'http';

const translateText = (originalText: string): Promise<string> => {
    return new GoogleTranslator().translate(originalText, 'en', 'ru');
};

const showSentenceInternal = (textContainer: HTMLElement, textContainerWrapper: HTMLElement, originalText: string, translatedTextPromise: Promise<string>): void => {
    const sentenceOriginalElement = document.createElement('div');
    sentenceOriginalElement.classList.add('sentence-original');
    sentenceOriginalElement.textContent = originalText;

    const sentenceTranslatedElement = document.createElement('div');
    sentenceTranslatedElement.classList.add('sentence-translated');
    sentenceTranslatedElement.textContent = 'Translating...';

    translatedTextPromise
        .then(translatedText => {
            sentenceTranslatedElement.textContent = translatedText;
        })
        .catch(error => {
            console.error('An error occurred while translating', error)
            sentenceTranslatedElement.textContent = 'Error while translating';
        });

    const sentenceElement = document.createElement('div');
    sentenceElement.classList.add('sentence');
    sentenceElement.append(sentenceOriginalElement, sentenceTranslatedElement);

    textContainer.append(sentenceElement);

    textContainerWrapper.scrollTo(0, textContainerWrapper.scrollHeight);
};

window.addEventListener("DOMContentLoaded", () => {
    const textContainerWrapper = document.getElementById('text-wrapper');
    const textContainer = document.getElementById('text');

    runTextractorServer((sentence) => {
        const {text, meta} = sentence;

        showSentenceInternal(textContainer, textContainerWrapper, text, translateText(text));
    });
});
