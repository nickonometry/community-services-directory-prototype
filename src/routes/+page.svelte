<script>
  import { onMount } from 'svelte';

  export let data;
  let table;
  let services = data.data.services.sort((a, b) =>
    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : b.name.toLowerCase() > a.name.toLowerCase() ? -1 : 0
  );

  let columnConfigurations = [
    {
      property: 'name',
      header: 'Service Name',
      sortable: true,
      initialSort: true,
      filter: true
    },
    {
      property: 'lastAccessDate',
      header: 'Last Accessed',
      sortable: true,
      filter: true
    },
    {
      property: 'department',
      header: 'Department',
      sortable: true,
      filter: true
    },
    {
      property: 'status',
      header: 'Status',
      sortable: true,
      filter: true
    },
    {
      property: 'actions',
      header: 'Actions',
      sortable: true,
      filter: true
    }
  ];

  onMount(() => {
    table = document.querySelector('forge-table');
    table.data = services;
    table.columnConfigurations = columnConfigurations;
  });
</script>

<forge-toolbar>
  <h2 slot="start" class="forge-typography--heading3">Services</h2>
  <forge-stack slot="end" inline>
    <forge-button variant="raised" href="/create-service-link">
      <forge-icon name="add" external></forge-icon>
      <span>Add a service</span>
    </forge-button>
  </forge-stack>
</forge-toolbar>
<div class="page-container">
  <forge-card class="table-card">
    <!-- <forge-toolbar>
      <forge-text-field id="text-field" slot="start">
        <forge-icon slot="leading" name="filter_list" external></forge-icon>
        <input type="text" id="text-field-input" placeholder="Filter services" />
      </forge-text-field>
    </forge-toolbar> -->
    {#if services.length}
      <forge-table data={services} {columnConfigurations}></forge-table>
    {/if}
  </forge-card>
</div>

<style>
  .page-container {
    padding: 16px;
  }

  .table-card {
    --forge-card-padding: 0;
  }
</style>
