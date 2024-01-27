import BidiClass from './BidiClass.svelte';
import CodepointRange from './CodepointRange.svelte';
import NameIncludes from './NameIncludes.svelte';
import RegexMatch from './RegexMatch.svelte';
import UnicodeBlock from './UnicodeBlock.svelte';
import UnicodePlane from './UnicodePlane.svelte';
import UnicodeProperty from './UnicodeProperty.svelte';

export const boxTypeMap = new Map([
	['Codepoint Range', CodepointRange],
	['Name Includes', NameIncludes],
	['Regex Match', RegexMatch],
	['Unicode Property', UnicodeProperty],
	['Unicode Plane', UnicodePlane],
	['Unicode Block', UnicodeBlock],
	['Bidi Class', BidiClass],
]);
