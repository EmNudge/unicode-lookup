import CodepointRange from './CodepointRange.svelte';
import NameIncludes from './NameIncludes.svelte';
import IsNearChar from './IsNearChar.svelte';
import RegexMatch from './RegexMatch.svelte';
import UnicodeProperty from './UnicodeProperty.svelte';
import UnicodePlane from './UnicodePlane.svelte';
import UnicodeBlock from './UnicodeBlock.svelte';

export const boxTypeMap = new Map([
  ['Codepoint Range', CodepointRange],
  ['Name Includes', NameIncludes],
  ['Is Near Char', IsNearChar],
  ['Regex Match', RegexMatch],
  ['Unicode Property', UnicodeProperty],
  ['Unicode Plane', UnicodePlane],
  ['Unicode Block', UnicodeBlock],
]);