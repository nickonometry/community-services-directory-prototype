<script>
  import { createEventDispatcher } from 'svelte';

  export let showMenu;
  const dispatch = createEventDispatcher();

  const dispatchMenuClicked = () => {
    dispatch('menu-click');
  };
</script>

<forge-app-bar title-text="Community Services Admin" href="/">
  <div slot="logo">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
      ><title>Tyler Technologies, Inc. Logo</title><path d="M0 0h24v24H0V0z" fill="none"></path><path
        d="M4.5 7.9c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5S3 10.2 3 9.4s.7-1.5 1.5-1.5M7 10.4c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5-1.5-.7-1.5-1.5.7-1.5 1.5-1.5m2.5 2.5c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5S8 15.2 8 14.4s.7-1.5 1.5-1.5m0 5c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5S8 20.2 8 19.4s.7-1.5 1.5-1.5m2.5-2.5c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5-1.5-.7-1.5-1.5.7-1.5 1.5-1.5m2.5-2.5c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5-1.5-.7-1.5-1.5.7-1.5 1.5-1.5m-5-5c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5S8 10.2 8 9.4s.7-1.5 1.5-1.5M12 5.4c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5-1.5-.7-1.5-1.5.7-1.5 1.5-1.5m2.5 2.5c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5-1.5-.7-1.5-1.5.7-1.5 1.5-1.5m2.5 2.5c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5-1.5-.7-1.5-1.5.7-1.5 1.5-1.5m2.5 2.5c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5-1.5-.7-1.5-1.5.7-1.5 1.5-1.5m-5-10c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5S13 5.2 13 4.4s.7-1.5 1.5-1.5m3 13c0 .3-.3.6-.6.6s-.6-.3-.6-.6.3-.6.6-.6.6.3.6.6zm-.1 0c0-.3-.2-.5-.5-.5s-.5.2-.5.5.2.5.5.5.5-.2.5-.5zm-.6.4l-.1-.7h.3c.2 0 .2.1.2.2s-.1.2-.2.2l.2.3h-.1l-.2-.3h-.1v.3zm.1-.4c.1 0 .2 0 .2-.1s-.1-.1-.2-.1h-.2v.2h.2z"
      ></path
      ></svg>
  </div>
  {#if showMenu}
    <forge-icon-button slot="start" on:click={dispatchMenuClicked}>
      <forge-icon name="menu" external></forge-icon>
    </forge-icon-button>
  {/if}
  <forge-tooltip position="left">Toggle theme</forge-tooltip>
</forge-app-bar>

<style>
  svg {
    fill: white;
  }
</style>
