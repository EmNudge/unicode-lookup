<script lang="ts">
  import Input from '../Input.svelte';
  import Dropdown from '../Dropdown.svelte';
  import { getRegexFromString } from './utils';

  let regex: RegExp = /[A-Za-z]/u;
  let matchOn: 'Character' | 'Name' = 'Character';

  type Data = { regex: RegExp, matchOn: 'Character' | 'Name' };
	export let data: Data = { regex, matchOn };
  
  $: {
    data = { regex, matchOn };
  }

  function validateRegex(_text: string, mutatedValue: RegExp) {
    if (mutatedValue) return true;
    return 'invalid regex';
  }
</script>

<span>Regex</span>
<Input 
  placeholder="regular expression"
  mutator={getRegexFromString} 
  validator={validateRegex}
  bind:value={regex} />
  
<span>Match On</span>
<Dropdown 
  options={['Character', 'Name']}
  bind:value={matchOn} />