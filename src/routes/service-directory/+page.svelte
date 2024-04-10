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
  let searchTerm;

  onMount(async () => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('searchTerm')) {
      searchTerm = searchParams.get('searchTerm');
      filterText.set(searchTerm);
    } else {
      filterText.set('');
    }

    // Make sure we reset the store since the codotype shares one store
    serviceFilters.set([]);
  });

  const onSearch = (e) => {
    let searchTerm = e.target.value.toLowerCase();
    filterText.update(() => searchTerm);
  };

  const openFilterSidesheet = () => {
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
                <h3 class="forge-typography--heading2" id="filter-group-label">Filter by function</h3>
              </forge-stack>
              <div role="group" aria-labelledby="filter-group-label">
                <FunctionsFilter on:filter-selected={(e) => onFilterSelected(e)} />
              </div>
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
              {#each $filteredServices as service}
                {#if service.isPublished}
                  <DirectoryServiceCard {service} />
                {/if}
              {/each}
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
      display: grid;
      gap: 16px;
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
