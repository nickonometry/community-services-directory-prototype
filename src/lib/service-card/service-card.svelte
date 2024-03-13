<script>
  import { onMount } from 'svelte';
  import { randomBrightColorPicker } from '../utils/color-picker';

  export let icon;
  export let title;
  export let description;
  let avatarColor;

  onMount(() => {
    avatarColor = randomBrightColorPicker();
  });
</script>

<forge-card raised>
  <forge-button-area id="button-area">
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
  }

  forge-toolbar {
    --forge-toolbar-height: 40px;
    --forge-toolbar-min-height: 40px;
  }

  forge-button-area {
    height: 100%;
    display: grid;
  }

  .card__inner {
    display: grid;
    grid-template-columns: 1fr;
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
    p {
      padding: 0;
      margin: 0;
    }
  }

  forge-avatar {
    --forge-avatar-size: 64px;
  }
</style>
