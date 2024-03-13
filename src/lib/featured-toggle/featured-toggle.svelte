<script>
  import { onMount } from 'svelte';
  import { servicesCache } from '../../globalStore';
  export let status;
  export let service;
  export let index;
  let switchControl;

  onMount(() => {
    if (status) {
      switchControl.selected = true;
    }
  });

  const onFeaturedChanged = (e) => {
    servicesCache.update((services) => {
      services.find((s) => s.id === service.id).isFeatured = e.detail;
      return services;
    });
  };
</script>

<div class="switch-container">
  <forge-switch id={`featured-switch-${index}`} aria-label="Active" on:forge-switch-change={(e) => onFeaturedChanged(e)} bind:this={switchControl}>
    <span class="sr-only">Published</span>
  </forge-switch>
</div>

<style>
  forge-switch {
    --forge-switch-track-on-color: var(--forge-theme-success-container-low);
    --forge-switch-handle-on-color: var(--forge-theme-success-container-high);
    --forge-switch-icon-on-color: var(--forge-theme-on-success-container-high);
  }
  .switch-container {
    width: max-content;
    display: flex;
    align-items: center;
    gap: 8px;
  }
</style>
