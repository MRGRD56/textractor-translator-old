import * as monaco from 'monaco-editor';

window.addEventListener("DOMContentLoaded", () => {
    const originalTextTransformerInput = document.getElementById('original-text-transformer-javascript')!;
    monaco.editor.create(originalTextTransformerInput, {
        value: 'console.log("HTEREFE");',
        language: 'javascript'
    });
});