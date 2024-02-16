<script>
  import { onMount } from 'svelte';
  import { columnConfigurations } from './column-configuration.js';
  export let services;
  let table;

  onMount(() => {
    table = document.querySelector('forge-table');
    table.data = services;
    table.columnConfigurations = columnConfigurations;
  });
</script>

<forge-table data={services} {columnConfigurations} roomy filter="true"></forge-table>
