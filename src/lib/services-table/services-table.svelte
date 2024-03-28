<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { columnConfigurations } from './column-configuration.js';
  import { customServiceLinkForm } from '../custom-service-link-form/custom-service-link-form-store.js';
  export let services;
  let table;
  let sortPropertyName = 'serviceTitle';
  let sortDirection = 'DESC';

  onMount(() => {
    table = document.querySelector('forge-table');
    table.data = services;
    table.columnConfigurations = columnConfigurations;
  });

  const onSort = (e) => {
    sortPropertyName = columnConfigurations[e.detail.columnIndex].property;
    sortDirection = e.detail.direction;
    table.data = sortData();
  };

  const onRowClicked = (e) => {
    let rowData = e.detail.data;
    customServiceLinkForm.set(rowData);
    goto(`/edit-service?id=${rowData.id}`);
  };

  const sortData = () => {
    if (sortPropertyName.length) {
      return [...services].sort((a, b) => {
        if (sortDirection === 'DESC') {
          return b[sortPropertyName].toString().localeCompare(a[sortPropertyName]);
        } else if (sortDirection === 'ASC') {
          return a[sortPropertyName].toString().localeCompare(b[sortPropertyName]);
        } else {
          return 0;
        }
      });
    } else {
      return services;
    }
  };
</script>

<forge-table
  data={services}
  {columnConfigurations}
  roomy
  layout-type="fixed"
  filter="true"
  on:forge-table-sort={(e) => onSort(e)}
  allow-row-click="true"
  on:forge-table-row-click={(e) => onRowClicked(e)}>
</forge-table>
