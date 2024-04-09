<script>
  import ServiceCard from '../service-card/service-card.svelte';
  import { customServiceLinkForm } from '../custom-service-link-form/custom-service-link-form-store';
</script>

<forge-toolbar no-border>
  <h3 slot="center" class="forge-typography--heading2">Here's a preview of your new service card. Looks good!</h3>
</forge-toolbar>

<div class="preview-container">
  <ServiceCard icon={$customServiceLinkForm.iconName} title={$customServiceLinkForm.title} description={$customServiceLinkForm.description} />
</div>

<style lang="scss">
  .preview-container {
    padding: 16px;
    width: 300px;
    margin: 0 auto;

    forge-card {
      --forge-card-padding: 0;
      width: 320px;
    }
  }
</style>
