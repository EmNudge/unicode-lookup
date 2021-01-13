import { writable } from 'svelte/store';

export type Box = 
  { name: 'Codepoint Range', data: { from: number, to: number } }
  | { name: 'Name Includes', data: string }
  | { name: 'Is Near Char', data: { char: string, distance: number } }
  | { name: 'Regex Match', data: { regex: RegExp, matchOn: 'Character' | 'Name' } }
  | { name: 'In Unicode Block', data: string }
  | { name: 'In Unicode Plane', data: string }
  | { name: 'Unicode Property', data: string }

export const getNewBox = (): Box => ({
  name: 'Codepoint Range',
  data: { from: 0, to: 65535 }
});

export enum BoxSetType {
  Require = 'Require',
  Exclude = 'Exclude',
}
// TODO: ensure Exclude type has only 1 box. Maybe do it with different ypes?
export interface BoxSet {
  type: BoxSetType,
  boxes: Box[],
}
export const getNewBoxSet = (): BoxSet => ({
  type: BoxSetType.Require,
  boxes: [getNewBox()]
});

export const boxSetsStore = writable<BoxSet[]>([getNewBoxSet()]);