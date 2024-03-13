<script>
  export let imageUrl;
  export let title;
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
    height: 250px;
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
</style>
