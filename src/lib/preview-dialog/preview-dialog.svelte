<script>
  import ServiceCard from '../service-card/service-card.svelte';
  import Banner from './banner/banner.svelte';
  import { servicesCache } from '../../globalStore';
  export let dialogRef = null;

  const onDialogClose = () => {
    dialogRef.open = false;
    dialogRef.remove();
  };
</script>

<forge-toolbar>
  <div slot="start">
    <h1 class="forge-typography--heading4">Preview</h1>
  </div>
</forge-toolbar>
<div class="dialog__container">
  <forge-scaffold>
    <forge-app-bar slot="header">
      <forge-stack inline gap="16" slot="end">
        <forge-button dense>
          <forge-icon name="accessibility" external></forge-icon>
          Accessibility Settings
        </forge-button>
        <forge-button dense>
          <forge-icon name="translate" external></forge-icon>
          Translate
        </forge-button>
      </forge-stack>
    </forge-app-bar>
    <forge-toolbar slot="header">
      <div slot="start">
        <h2 class="forge-typography--heading4">Portland, ME</h2>
      </div>
      <forge-stack slot="end" inline>
        <forge-button>Resident</forge-button>
        <forge-button>Business</forge-button>
        <forge-button>Government</forge-button>
        <forge-button>Departments</forge-button>
        <forge-button>Connect</forge-button>
      </forge-stack>
    </forge-toolbar>
    <div slot="body">
      <Banner />
      <div class="services-card-container">
        <div class="search-container">
          <forge-text-field id="text-field">
            <forge-icon slot="trailing" name="search" external></forge-icon>
            <input type="text" id="text-field-input" placeholder="How can we help you?" />
          </forge-text-field>
        </div>
        <forge-card class="main-card">
          <forge-stack gap="32">
            <div class="services-grid">
              <h3 class="forge-typography--heading3 span-full">Featured Services</h3>
              {#each $servicesCache.data.data as service}
                {#if service.isFeatured}
                  <ServiceCard icon={service.iconName} title={service.serviceTitle} description={service.serviceDescription} />
                {/if}
              {/each}
              <div class="view-all-container span-full">
                <forge-button>
                  <span>View all</span>
                  <forge-icon name="chevron_right" external></forge-icon>
                </forge-button>
              </div>
            </div>

            <div class="services-grid">
              <h3 class="forge-typography--heading3 span-full">Popular Services</h3>
              {#each $servicesCache.data.data as service, index}
                {#if index < 5}
                  <ServiceCard icon={service.iconName} title={service.serviceTitle} description={service.serviceDescription} />
                {/if}
              {/each}
              <div class="view-all-container span-full">
                <forge-button>
                  <span>View all</span>
                  <forge-icon name="chevron_right" external></forge-icon>
                </forge-button>
              </div>
            </div>

            <div class="services-grid">
              <h3 class="forge-typography--heading3 span-full">Government Partners</h3>
              {#each $servicesCache.data.data as service}
                {#if service.allowPartnerAccess}
                  <ServiceCard icon={service.iconName} title={service.serviceTitle} description={service.serviceDescription} />
                {/if}
              {/each}
              <div class="view-all-container span-full">
                <forge-button>
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
  .dialog__container {
    height: 95dvh;
    width: 95dvw;
    background-color: var(--forge-theme-surface-dim);
  }

  forge-app-bar {
    --forge-app-bar-height: 32px;
    --forge-app-bar-elevation: 0;

    forge-icon {
      font-size: 18px;
    }
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
      width: 100%;
      --forge-text-field-theme-background: white;
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
