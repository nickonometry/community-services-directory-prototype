<script>
  import TylFooter from './../service-directory/components/tyl-footer.svelte';
  import { onMount } from 'svelte';
  import { loadForgeComponents } from '$lib/utils/forge-components.js';
  import { fade } from 'svelte/transition';
  import '../../app.scss';
  import { servicesCache } from '../../globalStore';
  import { fetchDepartments, fetchFunctions, fetchServices } from '../../lib/utils/utils';
  export let data;

  let isLoaded = false;

  onMount(async () => {
    loadForgeComponents();
    await fetchDepartments();
    await fetchFunctions();
    await fetchServices();
    isLoaded = true;
    // Promise.allSettled([window.customElements.whenDefined('forge-scaffold')]).then(() => (isLoaded = true));
  });
</script>

{#if isLoaded}
  <forge-scaffold>
    <main slot="body" transition:fade={{ delay: 0, duration: 200 }}>
      <slot />
    </main>
    <div slot="footer">
      <TylFooter />
    </div>
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
