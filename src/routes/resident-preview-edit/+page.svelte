<script>
  import ResidentViewEdit from '../../lib/resident-view-edit/resident-view-edit.svelte';
  import { servicesCache } from '../../globalStore';
  import ServiceCard from '../../lib/service-card/service-card.svelte';
</script>

<forge-toolbar>
  <forge-stack alignment="center" inline slot="before-start">
    <forge-icon-button href="/">
      <forge-icon name="arrow_back" external></forge-icon>
    </forge-icon-button>
    <h2 class="forge-typography--heading3">Edit your service homepage</h2>
  </forge-stack>
</forge-toolbar>
<div class="edit-container">
  <forge-drawer>
    <div class="drawer-inner">
      <forge-stack>
        <h3 class="forge-typography--subheading3">Your services</h3>
        <ul>
          <forge-stack>
            {#each $servicesCache as service}
              {#if service.isPublished && !service.isFeatured}
                <ServiceCard icon={service.iconName} title={service.serviceTitle} description={service.serviceDescription} url="" />
              {/if}
            {/each}
          </forge-stack>
        </ul>
      </forge-stack>
    </div>
  </forge-drawer>
  <div class="card-container">
    <forge-card raised>
      <ResidentViewEdit />
    </forge-card>
  </div>
</div>

<style>
  .edit-container {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 24px;
  }

  .card-container {
    padding-inline: 64px;
    padding-block: 24px;
  }

  forge-drawer {
    --forge-drawer-width: 320px;
  }

  .drawer-inner {
    padding: 16px;
  }

  ul {
    padding: 0;
    margin: 0;
  }
</style>
