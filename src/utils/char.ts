type CodepointNum = "hex" | "oct" | "dec";
export function getNum(num: number, type?: CodepointNum) {
  if (type === 'hex') return `0x${num.toString(16).toLowerCase().padStart(4, '0')}`;
  if (type === 'oct') return `0${num.toString(8).padStart(4, '0')}`;
  return String(num);
}