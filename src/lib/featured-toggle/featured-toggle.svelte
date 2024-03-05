<script>
  import { onMount } from 'svelte';
  export let status;
  export let index;
  let switchControl;

  onMount(() => {
    if (status) {
      switchControl.selected = true;
    }
  });

  const onStatusChange = () => {
    console.log('changed');
  };
</script>

<div class="switch-container">
  <forge-switch id={`featured-switch-${index}`} aria-label="Active" on:forge-switch-change={(e) => onStatusChange(e)} bind:this={switchControl}>
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
