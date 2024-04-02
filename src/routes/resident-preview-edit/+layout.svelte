<script>
  import AdminAppBar from './../../lib/admin-app-bar/admin-app-bar.svelte';
  import TylFooter from './../service-directory/components/tyl-footer.svelte';
  import { onMount } from 'svelte';
  import { loadForgeComponents } from '$lib/utils/forge-components.js';
  import { fade } from 'svelte/transition';
  import '../../app.scss';
  import { servicesCache } from '../../globalStore';
  export let data;
  let services = data.data.data;

  // Only load servies JSON if it hasn't been loaded yet. This is just for the prototype
  if (!$servicesCache.length) {
    servicesCache.set(services);
  }

  let isLoaded = false;

  onMount(async () => {
    loadForgeComponents();
    Promise.allSettled([window.customElements.whenDefined('forge-scaffold')]).then(() => (isLoaded = true));
  });
</script>

{#if isLoaded}
  <forge-scaffold>
    <div slot="header" style="pointer-events: none;">
      <AdminAppBar />
    </div>
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
