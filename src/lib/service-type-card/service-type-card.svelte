<script>
  import { createEventDispatcher } from 'svelte';
  export let icon;
  export let iconLibrary;
  export let serviceType;
  export let serviceDescription;
  export let isSelected = false;

  const dispatch = createEventDispatcher();
  const dispatchSelected = () => {
    dispatch('service-selected', serviceType);
  };
</script>

<div class="service-container">
  <forge-card outlined style="--forge-card-padding: 0" class:selected={isSelected}>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <forge-button-area id="button-area" on:click={dispatchSelected}>
      <button slot="button" aria-labelledby="button-area-heading"></button>
      <div class="service-card__container">
        <div class="service-card__inner">
          <forge-icon name={icon} external external-type={iconLibrary}></forge-icon>
          <span id="button-area-heading" class="forge-typography--heading2">{serviceType} service</span>
          <div>
            <forge-icon name="info_outline" external class="info"></forge-icon>
            <forge-tooltip position="top-start" delay="250">
              <div class="tooltip__inner">
                <forge-icon slot="icon" name="info_outline" external></forge-icon>
                <forge-stack gap="4px">
                  <div class="forge-typography--heading2">{serviceType}</div>
                  <div class="forge-typography--body1">{serviceDescription}</div>
                </forge-stack>
              </div>
            </forge-tooltip>
          </div>
        </div>
      </div>
    </forge-button-area>
  </forge-card>
</div>

<style lang="scss">
  .selected::part(root) {
    border-color: var(--forge-theme-primary);
    background-color: var(--forge-theme-info-container);
  }

  .service-card__container {
    display: grid;
    gap: 16px;
    align-items: center;
  }

  .service-card__inner {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 16px;
    align-items: center;
    padding: 16px;

    forge-icon {
      font-size: 44px;
      color: var(--forge-theme-text-medium);
    }

    .info {
      font-size: 24px;
    }
  }

  forge-card[outlined] {
    --forge-card-padding: 16px;
  }

  .tooltip__inner {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: start;
    text-align: left;
    gap: 16px;

    forge-icon {
      font-size: 36px;
      color: white;
    }
  }
</style>
