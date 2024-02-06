<script>
  import { serviceLinkForm } from '../store';
  console.log($serviceLinkForm);
</script>

<forge-toolbar no-border>
  <h3 slot="start" class="forge-typography--heading3">Preview</h3>
</forge-toolbar>
<div class="preview-container">
  <forge-card outlined>
    {$serviceLinkForm.serviceType}
    {$serviceLinkForm.title}
    {$serviceLinkForm.description}
    {$serviceLinkForm.group}
    {$serviceLinkForm.icon}
  </forge-card>
</div>

<style lang="scss">
  .preview-container {
    padding: 16px;

    forge-card {
      --forge-card-padding: 16px;
    }
  }
</style>
