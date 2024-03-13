<script>
  import { onMount } from 'svelte';
  export let dialogRef = null;
  export let message;

  onMount(() => {
    dialogRef.addEventListener('forge-dialog-close', () => {
      closeDialog();
    });
  });

  const closeDialog = () => {
    dialogRef.open = false;
    dialogRef.remove();
  };
</script>

<forge-scaffold style="width: 400px">
  <div slot="body">
    <img src="https://cdn.forge.tylertech.com/v1/images/spot/thumbs-up-spot.svg" alt="" height="150" width="150" />
    <p>{message}</p>
    <forge-button href="/" variant="filled" on:click={closeDialog}>Close dialog</forge-button>
  </div>
</forge-scaffold>

<style>
  [slot='body'] {
    padding: 16px;
    display: grid;
    place-content: center;
    justify-items: center;
    gap: 24px;
  }
</style>
