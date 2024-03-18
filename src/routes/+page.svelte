<script>
  import { onMount } from 'svelte';
  import { columnConfigurations } from './../lib/services-table/column-configuration.js';
  import { browser } from '$app/environment';
  import { filterText, filteredServices, serviceFilters } from '../globalStore';
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

  const onChipSelected = (e) => {
    if (e.detail.selected) {
      if (e.detail.value === 'published') {
        serviceFilters.update((state) => [...state.filter((s) => s !== 'unpublished')]);
      }

      if (e.detail.value === 'unpublished') {
        serviceFilters.update((state) => [...state.filter((s) => s !== 'published')]);
      }
      serviceFilters.update((state) => [...state, e.detail.value]);
    } else {
      serviceFilters.update((state) => [...state.filter((s) => s !== e.detail.value)]);
    }
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
          <div class="filter-container">
            <forge-chip-set type="filter" on:forge-chip-select={(e) => onChipSelected(e)}>
              <forge-chip value="featured" selected={$serviceFilters.some((s) => s === 'featured')}>Featured</forge-chip>
              <forge-chip value="published" selected={$serviceFilters.some((s) => s === 'published')}>Published</forge-chip>
              <forge-chip value="unpublished" selected={$serviceFilters.some((s) => s === 'unpublished')}>Unpublished</forge-chip>
            </forge-chip-set>
          </div>
          {#if $filteredServices.length > 0}
            <ServicesTable services={$filteredServices} />
          {/if}
          {#if $filteredServices.length === 0}
            <div class="padding-16">
              <p class="forge-typography--body1">No services match your filter criteria. Please adjust and try again</p>
            </div>
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

  .filter-container {
    padding-inline: 16px;
    padding-block-end: 16px;
  }

  .table-card {
    --forge-card-padding: 0;
  }

  .table-container {
    padding-block-start: 16px;
  }
</style>
