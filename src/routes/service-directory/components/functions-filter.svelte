<script>
  import { createEventDispatcher } from 'svelte';
  import { functionsCache, functionFilters } from '../../../globalStore.js';

  const dispatch = createEventDispatcher();
  const dispatchDepartmentsSelected = (e) => {
    const wasFilterUnchecked = e.target.checked;
    console.log(wasFilterUnchecked);
    if (wasFilterUnchecked) {
      // remove from array here

      return;
    }
    // functionFilters.update((state) => [...state, e.detail.value]);

    dispatch('filter-selected', e);
  };
</script>

{$functionFilters}
<forge-list on:change={(e) => dispatchDepartmentsSelected(e)}>
  <forge-stack gap="0">
    {#each $functionsCache as func}
      <forge-list-item value={func.value}>
        <span slot="title">{func.label}</span>
        <forge-checkbox slot="leading"></forge-checkbox>
      </forge-list-item>
    {/each}
  </forge-stack>
</forge-list>

<style>
  forge-list-item {
    --forge-list-item-gap: 16px;
    --forge-list-item-padding: 0;
  }
  @media screen and (max-width: 900px) {
    forge-list-item {
      margin-inline-start: -12px;
    }
  }
</style>
