<script>
  import ServicesEmptyState from './../../lib/services-empty-state/services-empty-state.svelte';
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { filterText, filteredServices, serviceFilters } from './../../globalStore.js';
  import Banner from './components/banner.svelte';
  import DirectoryServiceCard from './components/directory-service-card.svelte';
  import FilterSidesheet from './components/filter-sidesheet.svelte';
  import FunctionsFilter from './components/functions-filter.svelte';
  let filterDrawer;
  let serviceFilterInput;
  let windowWidth;
  let pageBreakpoint = 1024;

  onMount(() => {
    // Make sure we reset the store since the codotype shares one store
    filterText.set('');
    serviceFilters.set([]);
  });

  const onSearch = (e) => {
    let searchTerm = e.target.value.toLowerCase();
    filterText.update(() => searchTerm);
  };

  const openFilterSidesheet = () => {
    console.log('sidesheet opened');
    filterDrawer.open = true;
  };

  const onFilterSelected = (e) => {
    let filterApplied = e.detail.value;
  };
</script>

<svelte:window bind:innerWidth={windowWidth} />

<div class="page-grid">
  <div class="banner-container">
    <Banner />
  </div>
  <div class="card-container">
    <forge-card>
      <div class="directory-card-inner" transition:fade={{ delay: 0, duration: 200 }}>
        <div class="filters">
          <forge-card>
            <forge-stack>
              <forge-stack inline alignment="center">
                <forge-icon name="filter_list" external></forge-icon>
                <h3 class="forge-typography--heading2">Filter by function</h3>
              </forge-stack>
              <FunctionsFilter on:filter-selected={(e) => onFilterSelected(e)} />
            </forge-stack>
          </forge-card>
        </div>

        <div class="services-list">
          <forge-stack>
            <forge-text-field id="text-field" variant="filled" class="span-full" bind:this={serviceFilterInput}>
              <forge-icon slot="leading" name="search" external></forge-icon>
              <input type="text" id="service-filter" placeholder="Search for a service.." bind:value={$filterText} on:input={(e) => onSearch(e)} />
              {#if windowWidth <= pageBreakpoint}
                <div class="mobile-filter-button" slot="accessory">
                  <forge-icon-button on:click={() => openFilterSidesheet()}>
                    <forge-icon name="filter_list" external></forge-icon>
                  </forge-icon-button>
                </div>
              {/if}
            </forge-text-field>
            <forge-modal-drawer bind:this={filterDrawer} direction="right" class="filter-drawer">
              <FilterSidesheet dialogRef={filterDrawer} />
            </forge-modal-drawer>
            {#if !$filteredServices.length}
              <div>
                <ServicesEmptyState />
              </div>
            {/if}
            <ul>
              <forge-stack>
                {#each $filteredServices as service}
                  {#if service.isPublished}
                    <DirectoryServiceCard {service} />
                  {/if}
                {/each}
              </forge-stack>
            </ul>
          </forge-stack>
        </div>
      </div>
    </forge-card>
  </div>
</div>

<style lang="scss">
  @import '../../mixins.scss';
  .mobile-filter-button {
    display: none;
  }

  .page-grid {
    @include card-overlay-page-grid();
  }

  .banner-container {
    grid-column: 1;
    grid-row: 1/5;
    z-index: 1;
  }

  .card-container {
    z-index: 2;
    max-width: 1264px;
    width: 100%;
    margin: 0 auto;
    grid-column: 1;
    grid-row: 4/12;
  }

  .directory-card-inner {
    display: grid;
    grid-template-columns: 344px 1fr;
    row-gap: 24px;
    column-gap: 56px;
  }

  forge-modal-drawer:not([open]) {
    visibility: hidden;
  }

  .services-list {
    ul {
      margin: 0;
      padding: 0;
    }
  }

  .filter-drawer {
    --forge-drawer-width: 70vw;
  }

  @media screen and (max-width: 1024px) {
    .filters {
      display: none;
    }

    .directory-card-inner {
      grid-template-columns: 1fr;
      padding: 0;
    }

    .mobile-filter-button {
      display: block;
    }
  }
</style>
