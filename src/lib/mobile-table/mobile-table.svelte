<script lang="ts">
  import ServicesEmptyState from './../services-empty-state/services-empty-state.svelte';
  import MobileServiceCard from '../mobile-service-card/mobile-service-card.svelte';
  import { filterText } from '../../globalStore';
  import FilterChips from '../filter-chips/filter-chips.svelte';

  export let data: any[] = [];

  const onSearch = (e) => {
    let searchTerm = e.target.value.toLowerCase();
    filterText.update(() => searchTerm);
  };
</script>

<div class="grid">
  <forge-text-field class="span-full">
    <forge-icon slot="leading" name="filter_list" external></forge-icon>
    <input type="text" id="service-search" placeholder="Search for a service" bind:value={$filterText} on:input={(e) => onSearch(e)} />
  </forge-text-field>
  <div class="span-full">
    <FilterChips />
  </div>
  {#if data.length}
    {#each data as d}
      <MobileServiceCard service={d} />
    {/each}
  {/if}
  {#if !data.length}
    <ServicesEmptyState />
  {/if}
</div>

<style lang="scss">
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 16px;
    padding-inline: 16px;
    padding-block-end: 16px;
  }
</style>
