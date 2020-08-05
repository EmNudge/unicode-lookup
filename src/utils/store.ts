import type { Readable } from 'svelte/store';

// async function to complete once a store contains a value that passes
type boolFunc<T> = (input: T) => boolean;
export const onStoreValidator = <T>(store: Readable<T>, validator: boolFunc<T>): Promise<T> => new Promise((res) => {
    const unsubscribe = store.subscribe(val => {
        if (!validator(val)) return;
        res(val);
        unsubscribe();
    })
})

export const onStoreTrue = <T>(store: Readable<T>) => onStoreValidator<T>(store, Boolean);