<script>
  import { onMount } from 'svelte';
  import { loadForgeComponents } from '$lib/utils/forge-components.js';
  import '../app.scss';
  import Nav from '../lib/nav/nav.svelte';
  import { servicesCache } from '../globalStore';

  export let data;
  servicesCache.update((state) => ({ ...state, data }));

  let isLoaded = false;
  onMount(async () => {
    loadForgeComponents();
    Promise.allSettled([window.customElements.whenDefined('forge-split-view')]).then(() => (isLoaded = true));
  });
</script>

{#if isLoaded}
  <forge-scaffold>
    <forge-app-bar title-text="Community Service Directory" href="/" slot="header">
      <forge-tooltip position="left">Toggle theme</forge-tooltip>
    </forge-app-bar>

    <forge-mini-drawer slot="body-left">
      <Nav />
    </forge-mini-drawer>

    <main slot="body">
      <slot />
    </main>
  </forge-scaffold>
{/if}

<style>
</style>
