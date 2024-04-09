<script>
  import ServicesEmptyState from './../../lib/services-empty-state/services-empty-state.svelte';
  import { columnConfigurations } from '../../lib/services-table/column-configuration';
  import { browser } from '$app/environment';
  import { filterText, filteredServices, servicesCache } from '../../globalStore';
  import MobileTable from '../../lib/mobile-table/mobile-table.svelte';
  import previewDialog from '../../lib/resident-view/resident-view.svelte';
  import ServiceLibraryToolbar from '../../lib/service-library-toolbar/service-library-toolbar.svelte';
  import ServicesTable from '../../lib/services-table/services-table.svelte';
  import FilterChips from '../../lib/filter-chips/filter-chips.svelte';
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
          <MobileTable {columnConfigurations} data={$filteredServices} />
        {/if}
        {#if innerWidth > breakpoint}
          <div style="padding-inline: 16px; padding-block-end: 16px;">
            <FilterChips />
          </div>
          {#if $filteredServices.length > 0}
            <ServicesTable services={$filteredServices} />
          {/if}
          {#if $filteredServices.length === 0}
            <ServicesEmptyState />
          {/if}
        {/if}
      </div>
    </forge-card>
  </div>
{/if}

<style lang="scss">
  .page-container {
    padding: 24px;
    max-width: 1600px;
    margin: 0 auto;
  }

  @media screen and (max-width: 768px) {
    .page-container {
      padding: 0;
    }
  }

  .table-card {
    --forge-card-padding: 0;
  }

  .table-container {
    padding-block-start: 16px;
  }
</style>
