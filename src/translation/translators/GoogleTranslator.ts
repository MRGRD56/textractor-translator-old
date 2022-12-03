import axios from "axios";

class GoogleTranslator implements Translator {
    async translate(text: string, sourceLanguage: string, targetLanguage: string): Promise<string> {
        const url = `https://translate.googleapis.com/translate_a/single`;
        const response = await axios.request<any[]>({
            url,
            method: 'GET',
            params: {
                client: 'gtx',
                dt: 't',
                sl: sourceLanguage,
                tl: targetLanguage,
                q: text
            }
        })

        return response.data[0][0][0] as string;
    }
}

export default GoogleTranslator;