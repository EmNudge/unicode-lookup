import type {  WorkerMessageResponse, WorkerMessageWithoutId } from "./types";

export function sendMessage(worker: Worker, message: WorkerMessageWithoutId) {
    const id = self.crypto.randomUUID();
    worker.postMessage({ ...message, id });

    return new Promise(res => {
        const onMessage = (e: MessageEvent) => {
            if (e.data.id !== id) return;
    
            res(e.data.payload as WorkerMessageResponse)
            worker.removeEventListener('message', onMessage);
        }
        worker.addEventListener('message', onMessage);
    });
}
