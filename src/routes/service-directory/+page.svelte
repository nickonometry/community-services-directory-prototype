<script>
  import { onMount } from 'svelte';
  import { departmentsCache, filterText, filteredServices, serviceFilters, servicesCache } from './../../globalStore.js';
  import Banner from './components/banner.svelte';
  import DirectoryServiceCard from './components/directory-service-card.svelte';
  import FilterSidesheet from './components/filter-sidesheet.svelte';
  import DepartmentFilter from './components/department-filter.svelte';
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
</script>

<div class="page-grid">
  <div class="banner-container">
    <Banner />
  </div>
  <div class="card-container">
    <forge-card>
      <div class="mobile-filters">
        <forge-text-field id="text-field" variant="filled">
          <forge-icon slot="leading" name="search" external></forge-icon>
          <input type="text" id="service-filter" placeholder="Search by keyword..." bind:value={$filterText} on:input={(e) => onSearch(e)} />
          <forge-icon-button on:click={() => openFilterSidesheet()} slot="accessory">
            <forge-icon name="filter_list" external></forge-icon>
          </forge-icon-button>
        </forge-text-field>

        <forge-modal-drawer bind:this={filterDrawer} direction="right" class="filter-drawer">
          <FilterSidesheet dialogRef={filterDrawer} />
        </forge-modal-drawer>
      </div>
      <div class="directory-card-inner">
        <div class="filters">
          <forge-stack>
            <forge-text-field id="text-field" variant="filled">
              <forge-icon slot="leading" name="search" external></forge-icon>
              <input type="text" id="service-filter" placeholder="Search by keyword..." bind:value={$filterText} on:input={(e) => onSearch(e)} />
            </forge-text-field>
            <DepartmentFilter />
          </forge-stack>
        </div>
        <div class="services-list">
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
    </forge-card>
  </div>
</div>

<style lang="scss">
  .mobile-filters {
    display: none;
  }
  .page-grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(12, 1fr);
    height: 100%;
    width: 100%;
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
