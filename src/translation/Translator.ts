interface Translator {
    translate(text: string, sourceLanguage: string, targetLanguage: string): Promise<string>;
}