<script>
  import { onMount } from 'svelte';
  import { departmentsCache, filterText, filteredServices, serviceFilters, servicesCache } from './../../globalStore.js';
  import Banner from './components/banner.svelte';
  import DirectoryServiceCard from './components/directory-service-card.svelte';

  onMount(() => {
    // Make sure we reset the store since the codotype shares one store
    filterText.set('');
    serviceFilters.set([]);
  });

  const onSearch = (e) => {
    let searchTerm = e.target.value.toLowerCase();
    filterText.update(() => searchTerm);
  };
</script>

<div class="page-grid">
  <div class="banner-container">
    <Banner />
  </div>
  <div class="card-container">
    <forge-card>
      <div class="directory-card-inner">
        <div class="filters">
          <forge-stack>
            <forge-text-field id="text-field" variant="filled">
              <forge-icon slot="leading" name="search" external></forge-icon>
              <input type="text" id="service-filter" placeholder="Search by keyword..." bind:value={$filterText} on:input={(e) => onSearch(e)} />
            </forge-text-field>
            <forge-list dense>
              <forge-stack gap="8">
                {#each $departmentsCache as dept}
                  <forge-list-item>
                    <span slot="title">{dept.label}</span>
                    <forge-checkbox slot="leading"> </forge-checkbox>
                  </forge-list-item>
                {/each}
              </forge-stack>
            </forge-list>
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
    max-width: 1024px;
    width: 100%;
    margin: 0 auto;
    grid-column: 1;
    grid-row: 4/12;
  }

  .directory-card-inner {
    display: grid;
    grid-template-columns: auto 1fr;
    padding: 16px;
    gap: 56px;
  }

  forge-list-item {
    --forge-list-item-dense-gap: 8px;
    --forge-list-item-padding: 0;
  }

  .services-list {
    ul {
      margin: 0;
      padding: 0;
    }
  }
</style>
