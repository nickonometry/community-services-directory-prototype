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
  <forge-button slot="end" href="/login"> Sign in </forge-button>
</forge-app-bar>

<style>
  .portland-header {
    position: relative;
    --forge-app-bar-height: auto;
    --forge-app-bar-background: var(--branding-primary-color);
    --forge-app-bar-row-padding: 16px;

    &::part(root) {
      padding-block: 8px;
    }
  }
</style>
