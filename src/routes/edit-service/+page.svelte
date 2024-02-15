<script>
  import { onMount } from 'svelte';
  import CustomServiceLinkForm from '../../lib/custom-service-link-form/custom-service-link-form.svelte';
  import { servicesCache } from '../../globalStore';
  let serviceId;
  let editData;

  const getServiceById = (serviceId) => {
    return $servicesCache.find((s) => s.id === serviceId);
  };

  onMount(() => {
    const searchParams = new URLSearchParams(window.location.search);
    serviceId = searchParams.get('name');
    editData = getServiceById(serviceId);
  });
</script>

<div class="container">
  <forge-card class="container__card">
    <forge-toolbar style="--forge-toolbar-padding: 0;">
      <div slot="start" class="flex-center--row flex-gap-0">
        <forge-icon-button href="/">
          <forge-icon name="arrow_back" external></forge-icon>
        </forge-icon-button>
        <h2 class="forge-typography--heading3">Edit service</h2>
      </div>
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <forge-button slot="end" theme="error" style="margin-inline-end: 16px;">
        <forge-icon name="delete" external></forge-icon>
        <span>Delete service</span>
      </forge-button>
    </forge-toolbar>
    <CustomServiceLinkForm isEdit="true"></CustomServiceLinkForm>
  </forge-card>
</div>

<style lang="scss">
  .container {
    padding: 24px;
    max-width: 1024px;
    width: 100%;
    margin: 0 auto;

    &__card {
      --forge-card-padding: 0;
      max-width: 1024px;
      margin: 24px auto;
    }
  }
</style>
