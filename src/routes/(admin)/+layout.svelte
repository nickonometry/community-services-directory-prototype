<script>
  import Nav from './../../lib/nav/nav.svelte';
  import AdminAppBar from './../../lib/admin-app-bar/admin-app-bar.svelte';
  import { onMount } from 'svelte';
  import { loadForgeComponents } from '$lib/utils/forge-components.js';
  import { fade } from 'svelte/transition';
  import '../../app.scss';
  import { servicesCache } from '../../globalStore';
  export let data;
  let isMobile;
  let modalDrawerIsOpen = false;
  let innerWidth;
  let services = data.data.data;
  if (!$servicesCache.length) {
    servicesCache.set(services);
  }

  let isLoaded = false;

  onMount(async () => {
    loadForgeComponents();
    Promise.allSettled([window.customElements.whenDefined('forge-scaffold')]).then(() => (isLoaded = true));
  });

  const toggleDrawer = () => {
    modalDrawerIsOpen = !modalDrawerIsOpen;
  };
</script>

<svelte:window bind:innerWidth />

<forge-scaffold>
  <div slot="header">
    <AdminAppBar showMenu={innerWidth < 1024} on:menu-click={toggleDrawer} />
  </div>

  {#if innerWidth < 1024}
    <forge-modal-drawer slot="body-left" open={modalDrawerIsOpen} on:forge-modal-drawer-close={toggleDrawer}>
      <Nav on:nav-item-clicked={toggleDrawer} />
    </forge-modal-drawer>
  {/if}

  {#if innerWidth >= 1024}
    <forge-mini-drawer slot="body-left">
      <Nav />
    </forge-mini-drawer>
  {/if}

  {#key data.data.pathname}
    <main slot="body" transition:fade={{ delay: 0, duration: 200 }}>
      <slot />
    </main>
  {/key}
</forge-scaffold>

<style lang="scss">
  [slot='logo'] {
    svg {
      fill: white;
    }
  }

  forge-scaffold {
    --forge-scaffold-height: 100%;
  }

  main {
    // scrollbar-gutter: stable both-edges;
  }

  @media screen and (max-width: 1024px) {
    main {
      scrollbar-gutter: auto;
    }
  }
</style>
