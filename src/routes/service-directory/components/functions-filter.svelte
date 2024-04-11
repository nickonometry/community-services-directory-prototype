<script>
  import { functionsCache, functionFilters } from '../../../globalStore.js';

  const filterServicesByFunction = (e) => {
    const wasFilterUnchecked = e.target.checked;
    const filterApplied = Number(e.target.value);

    // remove from array here
    if (!wasFilterUnchecked) {
      $functionFilters = $functionFilters.filter((f) => {
        return f !== filterApplied;
      });
      return;
    }

    functionFilters.update((state) => [...state, filterApplied]);
  };
</script>

<forge-stack>
  {#each $functionsCache as func}
    <forge-checkbox on:change={filterServicesByFunction} value={func.value}>
      <span class="forge-typography--body2">{func.label}</span>
    </forge-checkbox>
  {/each}
</forge-stack>

<style>
  forge-checkbox {
    --forge-checkbox-justify: start;
    --forge-checkbox-gap: 16px;
  }
</style>
