<script>
  import { onMount } from 'svelte';
  import { loadForgeComponents } from '$lib/utils/forge-components.js';
  import { fade } from 'svelte/transition';
  import '../../app.scss';
  import { servicesCache } from '../../globalStore';
  export let data;
  let services = data.data.data;
  servicesCache.set(services);
  let isLoaded = false;

  onMount(async () => {
    loadForgeComponents();
    Promise.allSettled([window.customElements.whenDefined('forge-split-view')]).then(() => (isLoaded = true));
  });
</script>

{#if isLoaded}
  <forge-scaffold>
    <main slot="body" transition:fade={{ delay: 0, duration: 200 }}>
      <slot />
    </main>
  </forge-scaffold>
{/if}

<style lang="scss">
  [slot='logo'] {
    svg {
      fill: white;
    }
  }

  forge-scaffold {
    --forge-scaffold-height: 100%;
  }
</style>
