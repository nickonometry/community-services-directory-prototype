<script>
  import { browser } from '$app/environment';
  import { sortedServices } from '../globalStore';
  import previewDialog from '../lib/preview-dialog/preview-dialog.svelte';
  import ServicesTable from '../lib/services-table/services-table.svelte';

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
</script>

<div class="page-container">
  <forge-card class="table-card">
    <forge-toolbar>
      <h2 slot="start" class="forge-typography--heading3">Services</h2>
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
    <ServicesTable services={$sortedServices} />
  </forge-card>
</div>

<style>
  .page-container {
    padding: 16px;
  }

  .table-card {
    --forge-card-padding: 0;
  }
</style>
