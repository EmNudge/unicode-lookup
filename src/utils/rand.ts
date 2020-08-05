const ids: string[] = [];

export function getID(): string {
    const id = Math.random().toString(16).slice(2);
    
    // basically impossible it exists, but whatever
    if (ids.includes(id)) return getID();
    
    ids.push(id);
    return id;
}