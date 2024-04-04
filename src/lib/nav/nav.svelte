<script>
  let navItems = [
    {
      label: 'Service library',
      value: 'service-library',
      href: '/',
      icon: 'format_list_bulleted'
    },
    {
      label: 'Settings',
      value: 'settings',
      href: '/settings',
      icon: 'settings'
    }
  ];
</script>

<forge-list>
  {#each navItems as navItem, index}
    <forge-list-item id={`nav-item-${navItem.value}`} href={navItem.href}>
      <forge-icon slot="leading" name={navItem.icon} external></forge-icon>
      {navItem.label}
      <forge-tooltip target={`nav-item-${navItem.value}`}>{navItem.label}</forge-tooltip>
    </forge-list-item>
  {/each}
</forge-list>
