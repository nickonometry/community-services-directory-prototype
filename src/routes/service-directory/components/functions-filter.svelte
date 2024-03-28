<script>
  import { createEventDispatcher } from 'svelte';
  import { functionsCache, functionFilters } from '../../../globalStore.js';

  const dispatch = createEventDispatcher();
  const dispatchDepartmentsSelected = (e) => {
    const wasFilterUnchecked = e.target.checked;
    const filterApplied = e.target.value;
    if (!wasFilterUnchecked) {
      // remove from array here
      $functionFilters = $functionFilters.filter((f) => {
        return f !== filterApplied;
      });
      return;
    }
    functionFilters.update((state) => [...state, filterApplied]);
    dispatch('filter-selected', e);
  };
</script>

<forge-list on:change={(e) => dispatchDepartmentsSelected(e)}>
  <forge-stack gap="0">
    {#each $functionsCache as func}
      <forge-list-item>
        <span slot="title">{func.label}</span>
        <forge-checkbox slot="leading" value={func.value}></forge-checkbox>
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
