<script>
  import CreateServiceLinkForm from '$lib/create-service-link-form/create-service-link-form.svelte';
  import { onMount } from 'svelte';
  import SelectServiceType from '../../lib/select-service-type/select-service-type.svelte';
  import PreviewStep from '../../lib/preview-step/preview-step.svelte';
  import { serviceLinkForm } from '../../lib/store';
  let stepper;
  let steps = [];
  let stepSelected = 0;

  onMount(() => {
    stepper = document.querySelector('#stepper');
    stepper.selectedIndex = 0;

    stepper.addEventListener('forge-step-select', ({ detail }) => {
      stepper.selectedIndex = detail;
      stepSelected = detail;
    });

    steps = [
      { label: 'Service type', completed: false },
      { label: 'Service details', optionalLabel: 'Not started', completed: false },
      { label: 'Preview', completed: false }
    ];

    stepper.steps = steps;
  });

  const onNextClicked = () => {
    steps[stepSelected].completed = true;
    stepper.steps = steps;
    stepSelected = stepSelected + 1;
    stepper.selectedIndex = stepSelected;
  };

  const onSave = () => {
    console.log('form saved');
  };
</script>

<forge-scaffold>
  <forge-drawer slot="body-left">
    <forge-toolbar slot="header" class="stepper-toolbar" no-border>
      <div slot="start">
        <forge-icon-button>
          <forge-icon name="arrow_back" external></forge-icon>
        </forge-icon-button>
        <h2 class="forge-typography--heading3">Service library</h2>
      </div>
    </forge-toolbar>
    <div class="padding-16">
      <forge-stepper vertical="true" id="stepper"> </forge-stepper>
    </div>
  </forge-drawer>
  <div slot="body" class="step-container">
    <forge-card class="step-container__card">
      <forge-view-switcher index={stepSelected}>
        <forge-view><SelectServiceType /></forge-view>
        <forge-view><CreateServiceLinkForm /></forge-view>
        <forge-view>
          <PreviewStep />
        </forge-view>
      </forge-view-switcher>
      <forge-toolbar inverted>
        <forge-stack slot="end" inline>
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          {#if stepSelected === 2}
            <forge-button variant="raised" on:click={onSave}>Save</forge-button>
          {:else}
            <forge-button variant="raised" on:click={onNextClicked}>Next</forge-button>
          {/if}
        </forge-stack>
      </forge-toolbar>
    </forge-card>
    <!-- <p>{JSON.stringify($serviceLinkForm, 0, 2)}</p> -->
  </div>
</forge-scaffold>

<style lang="scss">
  .stepper-toolbar {
    --forge-toolbar-padding: 0;
  }

  .stepper-toolbar div {
    display: flex;
    align-items: center;
  }

  .step-container {
    padding: 24px;
    max-width: 768px;

    &__card {
      --forge-card-padding: 0;
    }
  }

  forge-step::part(button) {
    width: 100%;
  }
</style>
