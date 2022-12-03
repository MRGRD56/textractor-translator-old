interface Sentence {
    text: string;
    meta?: SentenceMeta;
}

export interface SentenceMeta {
    isCurrentSelect: boolean;
    processId: number;
    threadNumber: number;
    threadName: number;
    timestamp: number;
}

export default Sentence;