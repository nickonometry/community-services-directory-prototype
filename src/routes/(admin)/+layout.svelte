<script>
  import Nav from './../../lib/nav/nav.svelte';
  import AdminAppBar from './../../lib/admin-app-bar/admin-app-bar.svelte';
  import { onMount } from 'svelte';
  import { loadForgeComponents } from '$lib/utils/forge-components.js';
  import { fade } from 'svelte/transition';
  import '../../app.scss';
  import { fetchDepartments, fetchFunctions, fetchServices, supabase } from '../../lib/utils/utils';
  export let data;
  let modalDrawerIsOpen = false;
  let innerWidth;
  let isLoaded;

  onMount(async () => {
    loadForgeComponents();
    await fetchDepartments();
    await fetchFunctions();
    await fetchServices();
    isLoaded = true;
  });

  const toggleDrawer = () => {
    modalDrawerIsOpen = !modalDrawerIsOpen;
  };
</script>

<svelte:window bind:innerWidth />

{#if isLoaded}
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

  @media screen and (max-width: 1024px) {
    main {
      scrollbar-gutter: auto;
    }
  }
</style>
