<script>
  import { browser } from '$app/environment';
  import { sortedServices } from '../globalStore';
  import previewDialog from '../lib/preview-dialog/preview-dialog.svelte';
  import ServicesTable from '../lib/services-table/services-table.svelte';
  let searchString;
  let filteredServices = $sortedServices;

  const openFullPreview = () => {
    if (browser) {
      const dialog = document.createElement('forge-dialog');
      document.body.append(dialog);
      dialog.open = true;
      let pd = new previewDialog({
        target: dialog,
        props: { dialogRef: dialog }
      });
    }
  };

  const onSearch = (e) => {
    let searchTerm = e.target.value.toLowerCase();
    if (!searchTerm) {
      filteredServices = $sortedServices;
      return;
    }
    filteredServices = filteredServices.filter((fs) => {
      if (
        fs.serviceTitle.toLowerCase().includes(searchTerm) ||
        fs.serviceDescription.toLowerCase().includes(searchTerm) ||
        fs.department.label.toLowerCase().includes(searchTerm) ||
        fs.status.toLowerCase().includes(searchTerm)
      ) {
        return fs;
      }
    });
  };
</script>

<div class="page-container">
  <forge-card class="table-card">
    <forge-toolbar>
      <div slot="start" class="search-container">
        <h2 class="forge-typography--heading3">Service library</h2>
        <forge-text-field>
          <forge-icon slot="leading" name="filter_list" external></forge-icon>
          <input type="text" id="service-search" bind:value={searchString} placeholder="Search for a service" on:input={(e) => onSearch(e)} />
        </forge-text-field>
      </div>
      <forge-stack slot="end" inline>
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div>
          <forge-button on:click={openFullPreview}>
            <forge-icon name="preview" external></forge-icon>
            <span>Resident preview</span>
          </forge-button>
          <forge-tooltip>Preview what the public service directory looks like on your city website</forge-tooltip>
        </div>
        <forge-button href="/create-service-link" variant="outlined">
          <forge-icon name="add" external></forge-icon>
          <span>Add a service</span>
        </forge-button>
      </forge-stack>
    </forge-toolbar>
    <div class="table-container">
      <ServicesTable services={filteredServices} />
    </div>
  </forge-card>
</div>

<style lang="scss">
  .page-container {
    padding: 16px;
  }

  .search-container {
    display: flex;
    align-items: center;
    gap: 24px;
    width: 100%;

    forge-text-field {
      --forge-text-field-height: 40px;
      width: 320px;
    }
  }

  .table-card {
    --forge-card-padding: 0;
  }

  .table-container {
    padding-block: 16px;
  }
</style>
