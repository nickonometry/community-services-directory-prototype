<script>
  import { createEventDispatcher } from 'svelte';
  import { departmentsCache, functionsCache } from '../../../globalStore.js';

  const dispatch = createEventDispatcher();
  const dispatchDepartmentsSelected = (e) => {
    dispatch('department-selected', e.detail);
  };
</script>

<forge-list>
  <forge-stack gap="0">
    {#each $functionsCache as func}
      <forge-list-item on:forge-list-item-select={(e) => dispatchDepartmentsSelected(e)} value={func.value}>
        <span slot="title">{func.label}</span>
        <forge-checkbox slot="leading"> </forge-checkbox>
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
