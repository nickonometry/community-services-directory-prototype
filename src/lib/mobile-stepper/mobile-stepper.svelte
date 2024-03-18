<script>
  export let stepSelected;
  export let steps = [];
</script>

<!-- {#each steps as step}
  {step.label}
{/each} -->
<forge-toolbar auto-height>
  <div slot="start" class="progress-container">
    <forge-circular-progress aria-label=".25" determinate="true" progress=".25" track>
      <div>{stepSelected + 1} of {steps.length}</div>
    </forge-circular-progress>
    <div>
      <div class="forge-typography--heading3">{steps[stepSelected].label}</div>
      {#if stepSelected !== steps.length - 1}
        <div class="forge-typography--label2">Next: {steps[stepSelected + 1].label}</div>
      {/if}
    </div>
  </div>
</forge-toolbar>

<style>
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
</style>
