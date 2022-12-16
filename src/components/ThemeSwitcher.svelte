<script lang="ts">
  import SunIcon from '$icons/sun.svelte';
	import { onMount } from 'svelte';

  let isDarkTheme = false;
  const updateTheme = (darkTheme: boolean) => {
    const newTheme = darkTheme ? 'dark' : 'light';;
    document.documentElement.dataset.theme = newTheme;
    localStorage.setItem('color-scheme', newTheme);
  }

  const getColorSchemeLS = () => localStorage.getItem('color-scheme') as 'dark' | 'light' | null;

  onMount(() => {
    const colorSchemeMedia = window.matchMedia('(prefers-color-scheme: dark)');
    const onColorSchemeChange = (e: MediaQueryListEvent) => {
      if (getColorSchemeLS()) return;
      isDarkTheme = e.matches;
    };
    colorSchemeMedia.addEventListener('change', onColorSchemeChange);

    const colorSchemeLS = getColorSchemeLS();
    console.log({ colorSchemeLS })
    if (colorSchemeLS) {
      isDarkTheme = colorSchemeLS === 'dark';
    } else {
      const isSystemDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
      isDarkTheme = isSystemDarkTheme;
    }

    updateTheme(isDarkTheme);
    return () => colorSchemeMedia.removeEventListener('change', onColorSchemeChange);
  });

  const toggleTheme = () => {
    isDarkTheme = !isDarkTheme;
    updateTheme(isDarkTheme);
  }
</script>

<style>
  button {
    cursor: pointer;
    margin: 0;
    background: none;
    border: none;
    padding: 0 10px;
    opacity: .6;
  }
  button:active {
    transform: scale(.9);
  }
</style>

<button on:click={toggleTheme}>
  <SunIcon />
</button>