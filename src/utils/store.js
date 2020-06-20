// async function to complete once a store contains a value that passes
export const onStoreValidator = (store, validator) => new Promise((res) => {
    const unsubscribe = store.subscribe(val => {
        if (!validator(val)) return;
        res(val);
        unsubscribe();
    })
})

export const onStoreTrue = store => onStoreValidator(store, Boolean);