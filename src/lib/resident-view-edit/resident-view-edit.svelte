<script>
  import ServiceCard from '../service-card/service-card.svelte';
  import { servicesCache } from '../../globalStore';
  let popularServices = [];
  import { flip } from 'svelte/animate';
  import { dndzone } from 'svelte-dnd-action';
  import Banner from '../resident-view/banner/banner.svelte';
  import EmptyServiceCard from '../empty-service-card/empty-service-card.svelte';

  const dragStyle = {
    borderRadius: '8px',
    backgroundColor: 'var(--forge-theme-surface-dim)'
  };

  let items = $servicesCache.filter((s) => {
    return s.isFeatured && s.isPublished;
  });

  const flipDurationMs = 300;
  function handleDndConsiderFavorites(e) {
    items = e.detail.items;
  }
  function handleDndFinalizeFavorites(e) {
    items = e.detail.items;
  }

  // This is just simulating a list of popular services. This would ideally be based on usage analytics
  $servicesCache.forEach((s) => {
    if (s.isPublished && !s.isFeatured) {
      popularServices.push(s);
    }
  });
</script>

<div class="container">
  <forge-scaffold>
    <div slot="body">
      <div class="page-grid">
        <div class="banner-container">
          <Banner />
        </div>
        <div class="search-container">
          <forge-text-field id="text-field" variant="filled">
            <forge-icon slot="trailing" name="search" external></forge-icon>
            <input type="text" id="text-field-input" placeholder="How can we help you?" disabled />
          </forge-text-field>
        </div>
        <div class="services-card-container">
          <forge-card class="card" raised>
            <div style="padding: 16px">
              <forge-inline-message theme="warning">
                <forge-stack alignment="center" inline>
                  <forge-icon name="drag_indicator" external></forge-icon>
                  <div>
                    Drag your services into the order you'd like to see them. You can also reorder them with your arrow keys. You can show 8 featured
                    services at a time.
                  </div>
                </forge-stack>
              </forge-inline-message>
            </div>
            <forge-toolbar no-border>
              <h3 class="forge-typography--heading3 span-full" slot="start">Featured Services</h3>
            </forge-toolbar>
            <forge-stack gap="32">
              <section
                aria-label="A list of your favorite services"
                class="services-grid"
                use:dndzone={{ items, flipDurationMs, dropTargetStyle: dragStyle }}
                on:consider={handleDndConsiderFavorites}
                on:finalize={handleDndFinalizeFavorites}>
                {#each items as service (service.id)}
                  <div animate:flip={{ duration: flipDurationMs }} class="drag-div" aria-label={service.serviceTitle}>
                    <ServiceCard icon={service.iconName} title={service.serviceTitle} description={service.serviceDescription} url={service.url} />
                  </div>
                {/each}
              </section>
              <div class="services-grid">
                <EmptyServiceCard />
                <EmptyServiceCard />
                <EmptyServiceCard />
                <EmptyServiceCard />
              </div>
            </forge-stack>
          </forge-card>
        </div>
      </div>
    </div>
  </forge-scaffold>
</div>

<style lang="scss">
  @import '../../mixins.scss';

  .container {
    background-color: var(--forge-theme-surface-dim);
    height: 100%;
  }

  .card {
    --forge-card-padding: 0;
  }

  .mobile-nav {
    display: none;
  }

  forge-inline-message::part(root) {
    width: 100%;
  }

  .page-grid {
    @include card-overlay-page-grid();
  }

  .drag-div {
    height: 100%;
  }

  .banner-container {
    grid-column: 1;
    grid-row: 1/5;
    z-index: 1;
  }

  .logo {
    // height: 100%;
    width: 250px;
  }

  .white-button {
    --forge-button-color: white;
  }

  .services-card-container {
    z-index: 2;
    max-width: 1264px;
    width: 100%;
    margin: 0 auto;
    grid-column: 1;
    grid-row: 4/9;
  }

  .search-container {
    z-index: 2;
    grid-column: 1;
    grid-row: 2;
    margin: 0 auto;
    max-width: 600px;
    width: 100%;
    padding-inline: 16px;

    forge-text-field {
      padding-block-start: 24px;
    }
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1rem;
    height: fit-content;
    padding: 16px;
  }

  .view-all-container {
    display: flex;
    width: 100%;
    justify-content: flex-end;
  }

  @media screen and (max-width: 860px) {
    .services-card-container {
      padding: 16px;
    }
    .desktop-nav {
      display: none;
    }

    .mobile-nav {
      display: block;
    }
  }
</style>
