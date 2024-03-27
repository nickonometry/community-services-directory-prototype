<script>
  import { onMount } from 'svelte';
  import { loadForgeComponents } from '$lib/utils/forge-components.js';
  import '../../app.scss';

  onMount(async () => {
    loadForgeComponents();
  });
</script>

<slot />
