<script>
  import { departmentsCache } from './../../../globalStore.js';
</script>

<forge-list>
  <forge-stack gap="8">
    {#each $departmentsCache as dept}
      <forge-list-item>
        <span slot="title">{dept.label}</span>
        <forge-checkbox slot="leading"> </forge-checkbox>
      </forge-list-item>
    {/each}
  </forge-stack>
</forge-list>

<style>
  forge-list-item {
    --forge-list-item-dense-gap: 8px;
    --forge-list-item-padding: 0;
  }
  @media screen and (max-width: 900px) {
    forge-list-item {
      margin-inline-start: -12px;
    }
  }
</style>
