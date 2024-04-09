<script>
  import { fetchServiceById, fetchServices, openConfirmationDialog, supabase } from '../../../lib/utils/utils.js';
  import { onMount } from 'svelte';
  import CustomServiceLinkForm from '../../../lib/custom-service-link-form/custom-service-link-form.svelte';
  import { servicesCache } from '../../../globalStore';
  import { customServiceLinkForm } from '../../../lib/custom-service-link-form/custom-service-link-form-store.js';
  let serviceId;
  let service;

  onMount(async () => {
    const searchParams = new URLSearchParams(window.location.search);
    serviceId = searchParams.get('id');
    service = await fetchServiceById(serviceId);
    customServiceLinkForm.set(service);
  });

  const onDelete = async () => {
    const { data, error } = await supabase.from('services').delete().eq('id', service.id).select();
    if (error) {
      openToast('There was an error when trying to delete this service');
    }
    if (data) {
      openConfirmationDialog('Your service has been deleted');
    }
    fetchServices();
  };

  const onSave = async () => {
    const { data, error } = await supabase.from('services').update($customServiceLinkForm).eq('id', $customServiceLinkForm.id).select();
    if (error) {
      console.log(error);
    }
    if (data) {
      openConfirmationDialog('Your service has been updated and saved');
      // Fetch a fresh copy of the data, could optimistically save the record as well
      fetchServices();
    }
  };
</script>

<forge-card>
  <forge-scaffold>
    <forge-toolbar style="--forge-toolbar-padding: 0;" slot="header">
      <div slot="start" class="flex-center--row flex-gap-0">
        <forge-icon-button href="/">
          <forge-icon name="arrow_back" external></forge-icon>
        </forge-icon-button>
        <h2 class="forge-typography--heading3">Edit service</h2>
      </div>
      <forge-button slot="end" theme="error" style="margin-inline-end: 16px;" on:click={onDelete}>
        <forge-icon name="delete" external></forge-icon>
        <span>Delete service</span>
      </forge-button>
    </forge-toolbar>

    <div slot="body">
      {#if service}
        <CustomServiceLinkForm isEdit="true"></CustomServiceLinkForm>
      {:else}
        <p>LOADING!!!!!</p>
      {/if}
    </div>
    <forge-toolbar inverted slot="footer">
      <forge-stack slot="end" inline>
        <forge-button href="/">Cancel</forge-button>
        <forge-button variant="raised" on:click={onSave}>Save</forge-button>
      </forge-stack>
    </forge-toolbar>
  </forge-scaffold>
</forge-card>

<style lang="scss">
  @import '../../../mixins.scss';

  forge-card {
    @include add-edit-service-page-layout();
  }
  @media screen and (max-width: 768px) {
    forge-card {
      height: 100%;
      margin: 0;
    }
  }
</style>
