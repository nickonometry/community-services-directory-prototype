<script>
  import { onMount } from 'svelte';
  import { servicesCache } from '../../globalStore';
  export let status;
  export let service;
  export let index;
  let switchControl;

  onMount(() => {
    if (status === 'Published') {
      switchControl.selected = true;
    }
  });

  const onStatusChange = (e) => {
    const status = e.detail;
    // servicesCache.update((state) => [...state, $customServiceLinkForm]);
    if (status) {
      servicesCache.update((services) => {
        services.find((s) => s.id === service.id).status = 'Published';
        return services;
      });
    } else {
      servicesCache.update((services) => {
        services.find((s) => s.id === service.id).status = 'Unpublished';
        return services;
      });
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
