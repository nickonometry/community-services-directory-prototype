<script>
  import { openConfirmationDialog } from './../../lib/utils/utils.js';
  import { onMount } from 'svelte';
  import { beforeNavigate } from '$app/navigation';
  import SelectServiceType from '../../lib/select-service-type/select-service-type.svelte';
  import PreviewStep from '../../lib/preview-step/preview-step.svelte';
  import { customServiceLinkForm, clearForm } from '../../lib/custom-form-store';
  import CustomServiceLinkForm from '../../lib/custom-service-link-form/custom-service-link-form.svelte';
  import { servicesCache } from '../../globalStore';
  import TylerApplicationForm from '../../lib/tyler-application-form/tyler-application-form.svelte';

  let innerWidth;
  let stepper;
  let steps = [];
  let stepSelected = 0;
  let showValidation = false;

  beforeNavigate(() => {
    clearForm();
  });

  onMount(() => {
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
    if (!$customServiceLinkForm.serviceType) {
      showValidation = true;
      return;
    }
    steps[stepSelected].completed = true;
    steps[stepSelected].optionalLabel = 'Completed';
    stepper.steps = steps;
    stepSelected = stepSelected + 1;
    stepper.selectedIndex = stepSelected;
  };

  const onPreviousClicked = () => {
    stepSelected = stepSelected - 1;
    stepper.selectedIndex = stepSelected;
  };

  const onSave = () => {
    servicesCache.update((state) => [...state, $customServiceLinkForm]);
    openConfirmationDialog('Your new service has been created');
  };
</script>

<svelte:window bind:innerWidth />

<forge-card class="step-container__card">
  <forge-toolbar>
    <div slot="start">
      <h2 class="forge-typography--heading3">Create a new service</h2>
    </div>
  </forge-toolbar>
  <div class="padding-16">
    <forge-stepper id="stepper" linear vertical={innerWidth < 1024 ? 'true' : null} bind:this={stepper}></forge-stepper>
  </div>
  <forge-view-switcher index={stepSelected}>
    <forge-view>
      <SelectServiceType {showValidation} />
    </forge-view>
    <forge-view>
      {#if $customServiceLinkForm.serviceType === 'custom'}
        <CustomServiceLinkForm />
      {/if}
      {#if $customServiceLinkForm.serviceType === 'integration'}
        Integration form
      {/if}
      {#if $customServiceLinkForm.serviceType === 'tyler application'}
        <TylerApplicationForm />
      {/if}
      {#if $customServiceLinkForm.serviceType === 'partner'}
        Partner form
      {/if}
    </forge-view>
    <forge-view>
      <PreviewStep />
    </forge-view>
  </forge-view-switcher>
  <forge-toolbar inverted>
    <forge-button variant="outlined" on:click={onPreviousClicked} slot="start" disabled={stepSelected === 0}>Previous</forge-button>
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
    max-width: 900px;
    width: 100%;
    margin: 0 auto;

    &__card {
      --forge-card-padding: 0;
      max-width: 900px;
      margin: 24px auto;
    }
  }

  forge-step::part(button) {
    width: 100%;
  }

  /* When the browser is at least 1024px and below */
  @media screen and (max-width: 1024px) {
    .step-container__card {
      margin: 16px;
    }
  }
</style>
