<script lang="ts">
  import type { IColumnConfiguration } from '@tylertech/forge';
  import MobileServiceCard from '../mobile-service-card/mobile-service-card.svelte';

  export let columnConfigurations: IColumnConfiguration[] = [];
  export let data: any[] = [];
</script>

<div class="grid">
  <!-- <forge-text-field class="span-full">
    <forge-icon slot="leading" name="filter_list" external></forge-icon>
    <input type="text" id="service-search" placeholder="Search for a service" />
  </forge-text-field> -->
  {#each data as d, index}
    <MobileServiceCard {index} service={d} />
  {/each}
</div>

<style lang="scss">
  forge-card {
    --forge-card-padding: 0;
  }

  forge-stack {
    padding: 16px;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 16px;
    padding-inline: 16px;
  }
</style>
