<script>
  import { createEventDispatcher } from 'svelte';
  import { departmentsCache } from './../../../globalStore.js';

  const dispatch = createEventDispatcher();
  const dispatchDepartmentsSelected = (e) => {
    dispatch('department-selected', e.detail);
  };
</script>

<forge-list>
  <forge-stack gap="8">
    {#each $departmentsCache as dept}
      <forge-list-item on:forge-list-item-select={(e) => dispatchDepartmentsSelected(e)} value={dept.value} dense>
        <span slot="title">{dept.label}</span>
        <forge-checkbox slot="leading"> </forge-checkbox>
      </forge-list-item>
    {/each}
  </forge-stack>
</forge-list>

<style>
  forge-list-item {
    --forge-list-item-dense-gap: 0;
    --forge-list-item-padding: 0;
  }
  @media screen and (max-width: 900px) {
    forge-list-item {
      margin-inline-start: -12px;
    }
  }
</style>
