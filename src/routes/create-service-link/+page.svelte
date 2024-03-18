<script>
  import MobileStepper from './../../lib/mobile-stepper/mobile-stepper.svelte';
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
  let steps = [
    { label: 'Service type', completed: false },
    { label: 'Service details', optionalLabel: 'Not started', completed: false },
    { label: 'Preview', completed: false }
  ];
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
  <forge-scaffold>
    <forge-toolbar slot="header" id="stepper-header">
      <forge-stack inline alignment="center" slot="before-start" gap="0">
        <forge-icon-button href="/">
          <forge-icon name="arrow_back" external></forge-icon>
        </forge-icon-button>
        <h2 class="forge-typography--heading3">Create a new service</h2>
      </forge-stack>
    </forge-toolbar>
    <div slot="body">
      <div class="padding-16" id="stepper-container">
        <forge-stepper linear bind:this={stepper} {steps}></forge-stepper>
      </div>
      <div class="mobile-stepper">
        <MobileStepper {stepSelected} {steps} />
      </div>
      <forge-view-switcher index={stepSelected}>
        <forge-view>
          <SelectServiceType {showValidation} />
        </forge-view>
        <forge-view>
          {#if $customServiceLinkForm.serviceType === 'custom'}
            <CustomServiceLinkForm />
          {/if}
          {#if $customServiceLinkForm.serviceType === 'tyler application'}
            <TylerApplicationForm />
          {/if}
        </forge-view>
        <forge-view>
          <PreviewStep />
        </forge-view>
      </forge-view-switcher>
    </div>
    <forge-toolbar inverted slot="footer">
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
  </forge-scaffold>
</forge-card>

<style lang="scss">
  .mobile-stepper {
    display: none;
  }
  .step-container__card {
    max-width: 768px;
    margin: 24px auto;
    --forge-card-padding: 0;
  }
  forge-step::part(button) {
    width: 100%;
  }

  /* When the browser is at least 1024px and below */
  @media screen and (max-width: 1024px) {
    .step-container__card {
      margin: 0;
      height: 100%;
    }

    .mobile-stepper {
      display: block;
    }

    #stepper-header {
      display: none;
    }

    #stepper-container {
      display: none;
    }
  }
</style>
