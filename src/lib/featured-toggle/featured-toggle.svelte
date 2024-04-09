<script>
  import { onMount } from 'svelte';
  import { servicesCache } from '../../globalStore';
  import { fetchServices, openToast, supabase } from '../utils/utils';
  export let status;
  export let service;
  export let index;
  let switchControl;

  onMount(() => {
    if (status) {
      switchControl.selected = true;
    }
  });

  const onFeaturedChanged = async (e) => {
    const { data, error } = await supabase.from('services').update({ isFeatured: e.detail }).eq('id', service.id).select();
    if (error) {
      openToast('There was an error with the update');
    }

    if (data) {
      fetchServices();
    }
  };
</script>

<div class="switch-container">
  <forge-switch id={`featured-switch-${index}`} aria-label="Active" on:forge-switch-change={(e) => onFeaturedChanged(e)} bind:this={switchControl}>
    <span class="sr-only">Published</span>
  </forge-switch>
</div>

<style>
  forge-switch {
    --forge-switch-track-on-color: var(--forge-theme-success-container);
    --forge-switch-handle-on-color: var(--forge-theme-success);
    --forge-switch-icon-on-color: var(--forge-theme-on-success);
  }
  .switch-container {
    width: max-content;
    display: flex;
    align-items: center;
    gap: 8px;
  }
</style>
