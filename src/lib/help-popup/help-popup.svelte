<script>
  export let imageUrl;
  export let title;
  export let text;
</script>

<div class="image-container">
  <img src={imageUrl} alt="" />
</div>
<div class="padding-16">
  <forge-stack>
    <h1 class="forge-typography--heading3">{title}</h1>
    <slot />
  </forge-stack>
</div>

<style lang="scss">
  .image-container {
    object-fit: cover;
  }
</style>
