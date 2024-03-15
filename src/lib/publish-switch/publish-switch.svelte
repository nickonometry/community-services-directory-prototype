<script>
  import { createEventDispatcher } from 'svelte';
  export let isPublished;
  const dispatch = createEventDispatcher();

  function onStatusChange(event) {
    dispatch('publish-toggled', event);
  }
</script>

<div class="switch-container">
  <forge-switch
    id="forge-switch-01"
    required
    aria-label="Active"
    on:forge-switch-change={(e) => onStatusChange(e)}
    selected={isPublished ? 'true' : null}>
    <span>Published</span>
  </forge-switch>
  <div class="custom-icon" id="tooltip-host">
    <forge-icon-button dense>
      <forge-icon name="help_outline" external></forge-icon>
    </forge-icon-button>
    <forge-tooltip target="#tooltip-host" delay="200">Publishing a service will make it viewable to the public</forge-tooltip>
  </div>
</div>

<style>
  .switch-container {
    width: max-content;
    display: flex;
    align-items: center;
    gap: 8px;
  }
</style>
