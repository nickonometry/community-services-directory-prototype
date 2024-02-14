<script>
  import ServiceCard from '../service-card/service-card.svelte';
  import { customServiceLinkForm } from '../store';
</script>

<forge-toolbar no-border>
  <h3 slot="start" class="forge-typography--heading3">Preview</h3>
</forge-toolbar>
<div class="preview-container">
  <ServiceCard
    icon={$customServiceLinkForm.icon}
    title={$customServiceLinkForm.serviceTitle}
    description={$customServiceLinkForm.serviceDescription}
    url={$customServiceLinkForm.url} />
</div>

<style lang="scss">
  .preview-container {
    padding: 16px;
    width: 300px;

    forge-card {
      --forge-card-padding: 0;
      width: 320px;
    }
  }
</style>
