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

<forge-app-bar auto-height class="portland-header" no-border>
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

  <forge-button slot="end" class="sign-in-button"> Sign in </forge-button>
</forge-app-bar>

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
    --forge-app-bar-height: auto;
    --forge-app-bar-background: #003b4d;
    --forge-app-bar-row-padding: 8px;

    &::part(root) {
      padding-block: 8px;
    }
  }

  .sign-in-button {
    margin-inline-end: 16px;
  }
</style>
