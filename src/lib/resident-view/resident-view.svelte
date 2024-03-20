<script>
  import PortlandLogo from './../portland-logo/portland-logo.svelte';
  import ServiceCard from '../service-card/service-card.svelte';
  import Banner from './banner/banner.svelte';
  import { servicesCache } from '../../globalStore';
  import BrandedHeader from '../branded-header/branded-header.svelte';
  let mobileNavDrawer;
  export let dialogRef = null;
</script>

<div class="container">
  <forge-scaffold>
    <div slot="header">
      <BrandedHeader />
    </div>
    <div slot="body">
      <div class="page-grid">
        <div class="banner-container">
          <Banner />
        </div>
        <div class="search-container">
          <forge-text-field id="text-field" variant="filled">
            <forge-icon slot="trailing" name="search" external></forge-icon>
            <input type="text" id="text-field-input" placeholder="How can we help you?" />
          </forge-text-field>
        </div>
        <div class="services-card-container">
          <forge-card class="main-card">
            <forge-stack gap="32">
              <div class="services-grid">
                <h3 class="forge-typography--heading3 span-full">Featured Services</h3>
                {#each $servicesCache as service}
                  {#if service.isFeatured}
                    <ServiceCard icon={service.iconName} title={service.serviceTitle} description={service.serviceDescription} />
                  {/if}
                {/each}
                <div class="view-all-container span-full">
                  <forge-button href="/service-directory">
                    <span>View all</span>
                    <forge-icon name="chevron_right" external></forge-icon>
                  </forge-button>
                </div>
              </div>

              <div class="services-grid">
                <h3 class="forge-typography--heading3 span-full">Popular Services</h3>
                {#each $servicesCache as service, index}
                  {#if index < 5}
                    <ServiceCard icon={service.iconName} title={service.serviceTitle} description={service.serviceDescription} />
                  {/if}
                {/each}
                <div class="view-all-container span-full">
                  <forge-button href="/service-directory">
                    <span>View all</span>
                    <forge-icon name="chevron_right" external></forge-icon>
                  </forge-button>
                </div>
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

  .mobile-nav {
    display: none;
  }

  .page-grid {
    @include card-overlay-page-grid();
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

  .main-card::part(root) {
    background-color: rgba(255, 255, 255, 0.8);
  }

  .services-card-container {
    z-index: 2;
    max-width: 1264px;
    width: 100%;
    margin: 0 auto;
    grid-column: 1;
    grid-row: 4/12;
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
  }

  .view-all-container {
    display: flex;
    width: 100%;
    justify-content: flex-end;
  }

  @media screen and (max-width: 860px) {
    .desktop-nav {
      display: none;
    }

    .mobile-nav {
      display: block;
    }
  }
</style>
