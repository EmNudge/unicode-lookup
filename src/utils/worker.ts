import type {
	WorkerMessageWithoutId,
	WorkerResponseFromMessage,
} from './types.d';

export function sendMessage<T extends WorkerMessageWithoutId>(
	worker: Worker,
	message: T,
): Promise<WorkerResponseFromMessage<T>> {
	const id = self.crypto.randomUUID();
	worker.postMessage({ ...message, id });

	return new Promise((res) => {
		const onMessage = (e: MessageEvent) => {
			if (e.data.id !== id) return;

			res(e.data.payload);
			worker.removeEventListener('message', onMessage);
		};
		worker.addEventListener('message', onMessage);
	});
}
