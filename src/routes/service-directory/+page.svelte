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

<div class="page-grid">
  <div class="banner-container">
    <Banner />
  </div>
  <div class="card-container">
    <forge-card>
      <!-- MOBILE -->
      <div class="mobile-filters">
        <forge-text-field id="text-field" variant="filled">
          <forge-icon slot="leading" name="search" external></forge-icon>
          <input type="text" id="service-filter" placeholder="Search for a service..." bind:value={$filterText} on:input={(e) => onSearch(e)} />
          <forge-icon-button on:click={() => openFilterSidesheet()} slot="accessory">
            <forge-icon name="filter_list" external></forge-icon>
          </forge-icon-button>
        </forge-text-field>
        <forge-modal-drawer bind:this={filterDrawer} direction="right" class="filter-drawer">
          <FilterSidesheet dialogRef={filterDrawer} />
        </forge-modal-drawer>
      </div>
      <!-- MOBILE -->

      <!-- DESKTOP -->
      <div class="directory-card-inner" transition:fade={{ delay: 0, duration: 200 }}>
        <div class="filters">
          <forge-stack>
            <forge-text-field id="text-field" variant="filled">
              <forge-icon slot="leading" name="search" external></forge-icon>
              <input type="text" id="service-filter" placeholder="Search for a service.." bind:value={$filterText} on:input={(e) => onSearch(e)} />
            </forge-text-field>
            <FunctionsFilter on:filter-selected={(e) => onFilterSelected(e)} />
          </forge-stack>
        </div>

        <div class="services-list">
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
        </div>
      </div>
      <!-- DESKTOP -->
    </forge-card>
  </div>
</div>

<style lang="scss">
  @import '../../mixins.scss';
  .mobile-filters {
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
    padding: 16px;
    gap: 56px;
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

    .mobile-filters {
      display: block;
      padding-block-end: 16px;
    }
  }
</style>
