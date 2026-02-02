import type { BidiClass, UnicodeMapData, UnicodeMappings } from "@emnudge/unicode-query";

// Re-export types used elsewhere in the app
export type { BidiClass } from "@emnudge/unicode-query";

type FilterData =
  | { type: "character"; value: RegExp }
  | { type: "name"; value: RegExp | string }
  | { type: "range"; value: [number, number] }
  | { type: "bidi"; value: BidiClass };

export type Filter = FilterData & { negated?: boolean };

export type WorkerAPI = {
  "load-table": {
    request: {
      id: string;
    };
    response: UnicodeMappings;
  };
  "simple-query": {
    request: {
      id: string;
      payload: string;
    };
    response: [number, UnicodeMapData][];
  };
  "advanced-query": {
    request: {
      id: string;
      payload: Filter[];
    };
    response: [number, UnicodeMapData][];
  };
};

export type WorkerMessageRequest<T extends keyof WorkerAPI = keyof WorkerAPI> = {
  name: T;
} & WorkerAPI[T]["request"];

export type WorkerMessageResponse<T extends keyof WorkerAPI> = WorkerAPI[T]["response"];
