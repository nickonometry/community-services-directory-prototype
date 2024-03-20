<script>
  import PortlandLogo from '../portland-logo/portland-logo.svelte';
  // TO DO - use this on the mocked up municpality website later on
  // const openMobileMenu = () => {
  //   mobileNavDrawer.open = true;
  // };

  // const navItems = [
  //   {
  //     label: 'Services',
  //     value: 'services'
  //   },
  //   {
  //     label: 'Resident',
  //     value: 'resident'
  //   },
  //   {
  //     label: 'Business',
  //     value: 'business'
  //   },
  //   {
  //     label: 'Government',
  //     value: 'government'
  //   },
  //   {
  //     label: 'Departments',
  //     value: 'departments'
  //   },
  //   {
  //     label: 'Connect',
  //     value: 'connect'
  //   }
  // ];
</script>

<forge-toolbar auto-height class="portland-header" no-border>
  <forge-stack inline alignment="center" slot="start">
    <PortlandLogo />
  </forge-stack>
  <!-- TO DO - use this on the mocked up municpality website later on -->
  <!-- <forge-stack slot="end" inline alignment="center">
    <div class="desktop-nav">
      {#each navItems as navItem}
        <forge-button class="white-button">{navItem.label}</forge-button>
      {/each}
    </div>
    <forge-icon-button on:click={openMobileMenu} class="mobile-nav">
      <forge-icon name="menu" external aria-label="Open menu" style="color: white; font-size: 48px"></forge-icon>
    </forge-icon-button>
  </forge-stack> -->
</forge-toolbar>

<!-- TO DO - use this on the mocked up municpality website later on -->
<!-- <forge-modal-drawer bind:this={mobileNavDrawer} direction="right" class="filter-drawer" slot="right" style="z-index: 25">
  <forge-list>
    {#each navItems as navItem}
      <forge-list-item selected={navItem.value === 'services'}>{navItem.label}</forge-list-item>
    {/each}
  </forge-list>
</forge-modal-drawer> -->

<style>
  .portland-header {
    position: relative;
    --forge-toolbar-background: #003b4d;
    --forge-toolbar-start-start-shape: 0;
    --forge-toolbar-start-end-shape: 0;
    box-shadow:
      0 3px 6px rgba(0, 0, 0, 0.16),
      0 3px 6px rgba(0, 0, 0, 0.23);
    z-index: 20;
    --forge-toolbar-padding-block: 8px;
  }
</style>
