<script>
  import { onMount } from 'svelte';
  import { randomBrightColorPicker } from '../utils/color-picker';

  export let icon;
  export let title;
  export let description;
  export let url;
  let avatarColor;

  onMount(() => {
    avatarColor = randomBrightColorPicker();
  });

  const onServiceCardClick = (e) => {
    if (url) {
      window.open(url, '_blank');
    }
  };
</script>

<forge-card>
  <forge-button-area id="button-area" on:click={() => onServiceCardClick()} aria-label="Navigate to this service homepage">
    <!-- simulating an anchor link, the button-area component should support this eventually -->
    <button slot="button" aria-labelledby="button-area-heading"></button>
    <div class="card__inner">
      <forge-avatar style={`--forge-avatar-background: ${avatarColor}`}>
        <div class="card__icon">
          <forge-icon name={icon} external></forge-icon>
        </div>
      </forge-avatar>
      <div class="card__content">
        <forge-stack>
          <div class="forge-typography--heading3">
            {title}
          </div>
          <p class="forge-typography--body1">{description}</p>
        </forge-stack>
      </div>
    </div>
  </forge-button-area>
</forge-card>

<style lang="scss">
  forge-card {
    --forge-card-padding: 0;
    height: 100%;
  }

  forge-button-area {
    height: 100%;
    display: grid;
  }

  .card__inner {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 64px 1fr;
    gap: 16px;
    height: 100%;
    align-items: center;
    justify-items: center;
    text-align: center;
    padding: 16px;
  }

  .card__icon {
    forge-icon {
      font-size: 36px;
      color: white;
    }
  }

  .card__content {
    align-self: start;

    p {
      padding: 0;
      margin: 0;
    }
  }

  forge-avatar {
    --forge-avatar-size: 64px;
  }
</style>
