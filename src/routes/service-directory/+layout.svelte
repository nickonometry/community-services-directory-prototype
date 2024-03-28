<script>
  import { onMount } from 'svelte';
  import { loadForgeComponents } from '$lib/utils/forge-components.js';
  import { fade } from 'svelte/transition';
  import '../../app.scss';
  import { servicesCache } from '../../globalStore';
  import BrandedHeader from '../../lib/branded-header/branded-header.svelte';
  export let data;
  let services = data.data.data;
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
    <div slot="header">
      <BrandedHeader />
    </div>
    <main slot="body" transition:fade={{ delay: 0, duration: 200 }}>
      <slot />
    </main>
  </forge-scaffold>
{/if}

<style lang="scss">
  [slot='logo'] {
    svg {
      fill: black;
    }
  }

  forge-scaffold {
    --forge-scaffold-height: 100%;
  }

  [slot='body']::before {
    content: '';
    background: url('https://www.itl.cat/pngfile/big/212-2125505_3840-x-material-design-light-gray.jpg') no-repeat center center;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    opacity: 0.3;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
</style>
