<script>
  import { onMount } from 'svelte';
  export let status;
  export let index;
  let switchControl;

  onMount(() => {
    if (status === 'Published') {
      switchControl.selected = true;
    }
  });

  const onStatusChange = () => {
    console.log('changed');
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
