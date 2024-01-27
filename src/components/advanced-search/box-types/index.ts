import CodepointRange from './CodepointRange.svelte';
import NameIncludes from './NameIncludes.svelte';
import RegexMatch from './RegexMatch.svelte';
import UnicodeProperty from './UnicodeProperty.svelte';
import UnicodePlane from './UnicodePlane.svelte';
import UnicodeBlock from './UnicodeBlock.svelte';
import BidiClass from './BidiClass.svelte';

export const boxTypeMap = new Map([
  ['Codepoint Range', CodepointRange],
  ['Name Includes', NameIncludes],
  ['Regex Match', RegexMatch],
  ['Unicode Property', UnicodeProperty],
  ['Unicode Plane', UnicodePlane],
  ['Unicode Block', UnicodeBlock],
  ['Bidi Class', BidiClass],
]);