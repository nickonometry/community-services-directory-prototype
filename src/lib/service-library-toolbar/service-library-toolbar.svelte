<script>
  import { createEventDispatcher } from 'svelte';
  import { preloadCode } from '$app/navigation';
  import { filterText } from '../../globalStore';
  const dispatch = createEventDispatcher();

  const dispatchSearchValue = (e) => {
    dispatch('on-search', e.target.value);
  };

  const dispatchOpenPreview = (e) => {
    dispatch('on-open-preview', e);
  };
</script>

<div class="container">
  <forge-toolbar>
    <div slot="start" class="search-container">
      <h2 class="forge-typography--heading3" slot="start">Service library</h2>
      <forge-text-field>
        <forge-icon slot="leading" name="filter_list" external></forge-icon>
        <input type="text" id="service-search" placeholder="Search for a service" bind:value={$filterText} on:input={(e) => dispatchSearchValue(e)} />
      </forge-text-field>
    </div>
    <div slot="end">
      <div class="desktop-actions">
        <forge-stack inline>
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div>
            <forge-button href="/service-directory" target="_blank">
              <forge-icon name="preview" external></forge-icon>
              <span>View service directory</span>
            </forge-button>
            <!-- <forge-button on:click={dispatchOpenPreview}>
              <forge-icon name="preview" external></forge-icon>
              <span>View service directory</span>
            </forge-button> -->
            <forge-tooltip>Navigate to the service directory website</forge-tooltip>
          </div>
          <forge-button
            href="/create-service-link"
            variant="outlined"
            on:focus={async () => {
              await preloadCode(`/create-service-link`);
            }}>
            <forge-icon name="add" external></forge-icon>
            <span>Add a service</span>
          </forge-button>
        </forge-stack>
      </div>
      <div class="mobile-actions">
        <forge-stack inline gap="8px">
          <forge-icon-button>
            <forge-icon name="preview" external></forge-icon>
            <forge-tooltip>Resident preview</forge-tooltip>
          </forge-icon-button>
          <forge-icon-button href="/create-service-link">
            <forge-icon name="add" external></forge-icon>
            <forge-tooltip>Add a service</forge-tooltip>
          </forge-icon-button>
        </forge-stack>
      </div>
    </div>
  </forge-toolbar>
</div>

<style lang="scss">
  .container {
    container-type: inline-size;
  }

  .search-container {
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
    gap: 24px;
    width: 100%;

    forge-text-field {
      --forge-field-height: 36px;
      width: 100%;
      min-width: 768px;
    }
  }

  .mobile-actions {
    display: none;
  }

  @container (max-width: 1320px) {
    .search-container {
      forge-text-field {
        display: none;
      }
    }

    .desktop-actions {
      display: none;
    }

    .mobile-actions {
      display: block;
      color: var(--forge-theme-primary);
    }
  }
</style>
