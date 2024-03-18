<script>
  export let stepSelected;
  export let steps = [];
  $: currentStep = stepSelected + 1;
  $: progress = currentStep / steps.length;
</script>

<forge-toolbar auto-height>
  <div slot="start" class="progress-container">
    <forge-circular-progress
      aria-label={progress}
      {progress}
      determinate="true"
      track
      style={stepSelected === steps.length - 1 ? '--forge-theme-tertiary: var(--forge-theme-success);' : ''}>
      {#if stepSelected !== steps.length - 1}
        <div>{stepSelected + 1} of {steps.length}</div>
      {:else}
        <forge-icon class="success-icon" name="check" external></forge-icon>
      {/if}
    </forge-circular-progress>
    <div class="step-info">
      <div>
        <div class="forge-typography--heading2">{steps[stepSelected].label}</div>
        {#if stepSelected !== steps.length - 1}
          <div class="forge-typography--label2">Next: {steps[stepSelected + 1].label}</div>
        {/if}
      </div>
      <forge-button slot="end" class="view-steps">View steps</forge-button>
    </div>
  </div>
</forge-toolbar>

<style>
  forge-toolbar {
    --forge-toolbar-padding-block: 8px;
  }
  .progress-container {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 16px;
    align-items: center;
  }

  forge-circular-progress {
    height: 72px;
    width: 72px;
    margin-block: 8px;
  }

  .view-steps {
    margin-inline-start: -8px;
  }

  .success {
    --forge-theme-tertiary: var(--forge-theme-success);
    --forge-circular-progress-track-fill-color: var(--forge-theme-success-container-high);
  }
  .success-icon {
    font-size: 32px;
    color: var(--forge-theme-success);
  }
</style>
