import type { WorkerAPI } from "./types.d";

export function sendMessage<T extends keyof WorkerAPI>(
  worker: Worker,
  message: Omit<WorkerAPI[T]["request"], "id">,
): Promise<WorkerAPI[T]["response"]> {
  const id = self.crypto.randomUUID();
  worker.postMessage({ ...message, id });

  return new Promise((res) => {
    const onMessage = (e: MessageEvent) => {
      if (e.data.id !== id) return;

      res(e.data.payload);
      worker.removeEventListener("message", onMessage);
    };
    worker.addEventListener("message", onMessage);
  });
}
