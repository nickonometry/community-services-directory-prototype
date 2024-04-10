<script>
  import { fetchServices, openToast, supabase } from './../utils/utils.js';
  import { onMount } from 'svelte';
  import { servicesCache } from '../../globalStore';
  export let service;
  export let index;
  let switchControl;

  onMount(() => {
    if (service.isPublished) {
      switchControl.selected = true;
    }
  });

  const onStatusChange = async (e) => {
    const { data, error } = await supabase.from('services').update({ isPublished: e.detail }).eq('id', service.id).select();
    if (error) {
      openToast('There was an error with the update');
    }

    if (data) {
      openToast('Service updated successfully');
      fetchServices();
    }
  };
</script>

<div class="switch-container">
  <forge-switch id={`status-switch-${index}`} aria-label="Active" on:forge-switch-change={(e) => onStatusChange(e)} bind:this={switchControl}>
    <span class="sr-only">Published</span>
  </forge-switch>
</div>

<style>
  .switch-container {
    width: max-content;
    display: flex;
    align-items: center;
    gap: 8px;
  }
</style>
