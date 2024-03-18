<script>
  import { openToast } from './../utils/utils.js';
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

  const onStatusChange = (e) => {
    setTimeout(() => {
      const status = e.detail;
      if (status) {
        servicesCache.update((services) => {
          services.find((s) => s.id === service.id).isPublished = true;
          return services;
        });
      } else {
        servicesCache.update((services) => {
          services.find((s) => s.id === service.id).isPublished = false;
          return services;
        });
      }
      openToast('Service updated!');
    }, 250);
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
