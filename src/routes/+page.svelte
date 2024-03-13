<script>
  import { columnConfigurations } from './../lib/services-table/column-configuration.js';
  import { browser } from '$app/environment';
  import { filteredServices, filterText, sortedServices } from '../globalStore';
  import MobileTable from '../lib/mobile-table/mobile-table.svelte';
  import previewDialog from '../lib/preview-dialog/preview-dialog.svelte';
  import ServiceLibraryToolbar from '../lib/service-library-toolbar/service-library-toolbar.svelte';
  import ServicesTable from '../lib/services-table/services-table.svelte';
  let innerWidth;
  let breakpoint = 1320;

  const openFullPreview = () => {
    if (browser) {
      const dialog = document.createElement('forge-dialog');
      document.body.append(dialog);
      dialog.open = true;
      let pd = new previewDialog({
        target: dialog,
        props: { dialogRef: dialog }
      });
    }
  };

  const onSearch = (e) => {
    let searchTerm = e.detail.toLowerCase();
    filterText.update(() => searchTerm);
  };
</script>

<svelte:window bind:innerWidth />

{#if innerWidth}
  <div class="page-container">
    <forge-card class="table-card">
      <ServiceLibraryToolbar on:on-search={(e) => onSearch(e)} on:on-open-preview={openFullPreview} />
      <div class="table-container">
        {#if innerWidth <= breakpoint}
          <MobileTable {columnConfigurations} data={$sortedServices} />
        {/if}
        {#if innerWidth > breakpoint}
          <ServicesTable services={$sortedServices} />
        {/if}
      </div>
    </forge-card>
  </div>
{/if}

<style lang="scss">
  .container {
    container-type: inline-size;
  }
  .page-container {
    padding: 16px;
  }

  .table-card {
    --forge-card-padding: 0;
  }

  .table-container {
    padding-block: 16px;
  }
</style>
