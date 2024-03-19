<script>
  import PortlandLogo from './../portland-logo/portland-logo.svelte';
  import ServiceCard from '../service-card/service-card.svelte';
  import Banner from './banner/banner.svelte';
  import { servicesCache } from '../../globalStore';
  import { onMount } from 'svelte';
  export let dialogRef = null;

  onMount(() => {});
</script>

<div class="container">
  <forge-scaffold>
    <forge-toolbar slot="header" auto-height class="portland-header" no-border>
      <forge-stack inline alignment="center" slot="start">
        <PortlandLogo />
      </forge-stack>
      <forge-stack slot="end" inline>
        <forge-button class="white-button">Resident</forge-button>
        <forge-button class="white-button">Business</forge-button>
        <forge-button class="white-button">Government</forge-button>
        <forge-button class="white-button">Departments</forge-button>
        <forge-button class="white-button">Connect</forge-button>
      </forge-stack>
    </forge-toolbar>
    <div slot="body">
      <Banner />
      <div class="services-card-container">
        <div class="search-container">
          <forge-text-field id="text-field" variant="filled">
            <forge-icon slot="trailing" name="search" external></forge-icon>
            <input type="text" id="text-field-input" placeholder="How can we help you?" />
          </forge-text-field>
        </div>
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
  </forge-scaffold>
</div>

<style lang="scss">
  .container {
    background-color: var(--forge-theme-surface-dim);
    height: 100%;
  }

  .portland-header {
    position: relative;
    --forge-toolbar-background: #003b4d;
    --forge-toolbar-start-start-shape: 0;
    --forge-toolbar-start-end-shape: 0;
    box-shadow:
      0 3px 6px rgba(0, 0, 0, 0.16),
      0 3px 6px rgba(0, 0, 0, 0.23);
    z-index: 20;
    --forge-toolbar-padding-block: 8px;
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
    max-width: 1264px;
    width: 100%;
    margin: calc(-34dvh + 88px) auto;
    z-index: 1;
    position: relative;
    padding: 24px;

    forge-card {
      margin-block-start: -150px;
    }
  }

  .search-container {
    height: 25dvh;
    margin: 0 auto;
    max-width: 600px;

    forge-text-field {
      padding-block-start: 24px;
    }
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    // grid-template-rows: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1rem;
    height: fit-content;
  }

  .view-all-container {
    display: flex;
    width: 100%;
    justify-content: flex-end;
  }
</style>
