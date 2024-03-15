<script>
  import { columnConfigurations } from './../lib/services-table/column-configuration.js';
  import { browser } from '$app/environment';
  import { filterText, filteredServices, serviceFilters } from '../globalStore';
  import MobileTable from '../lib/mobile-table/mobile-table.svelte';
  import previewDialog from '../lib/preview-dialog/preview-dialog.svelte';
  import ServiceLibraryToolbar from '../lib/service-library-toolbar/service-library-toolbar.svelte';
  import ServicesTable from '../lib/services-table/services-table.svelte';
  let innerWidth;
  let publishedChip;
  let unpublishedChip;
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
        unpublishedChip.selected = false;
      }

      if (e.detail.value === 'unpublished') {
        serviceFilters.update((state) => [...state.filter((s) => s !== 'published')]);
        publishedChip.selected = false;
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
              <forge-chip value="featured">Featured</forge-chip>
              <forge-chip value="published" bind:this={publishedChip}>Published</forge-chip>
              <forge-chip value="unpublished" bind:this={unpublishedChip}>Unpublished</forge-chip>
            </forge-chip-set>
          </div>
          <ServicesTable services={$filteredServices} />
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

  forge-chip {
    // --forge-chip-shape: 8px;
  }
</style>
