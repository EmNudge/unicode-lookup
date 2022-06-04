export function sendMessage(worker: Worker, name: string, payload?: any) {
    const id = Math.random().toString(36).slice(2);
    worker.postMessage({ name, id, payload });

    return new Promise(res => {
        const onMessage = (e: MessageEvent) => {
            if (e.data.id !== id) return;
    
            res(e.data.payload)
            worker.removeEventListener('message', onMessage);
        }
        worker.addEventListener('message', onMessage);
    });
}