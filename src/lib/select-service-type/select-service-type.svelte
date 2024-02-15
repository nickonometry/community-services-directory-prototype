<script>
  import ServiceTypeCard from '../service-type-card/service-type-card.svelte';
  import { fade } from 'svelte/transition';
  import { customServiceLinkForm } from '../custom-form-store';
  export let showValidation = false;
  let currentSelected = '';
  const onServiceSelected = (serviceName) => {
    showValidation = false;
    let service = serviceName.toLowerCase();
    currentSelected = service;
    updateServiceTypeInStore(serviceName);
  };

  function updateServiceTypeInStore(type) {
    customServiceLinkForm.update((state) => ({ ...state, serviceType: type.toLowerCase() }));
  }
</script>

<forge-toolbar no-border>
  <h3 slot="center" class="forge-typography--heading2 stepper-info">Let's start by selecting a service type</h3>
</forge-toolbar>

<div class="service-type__container">
  {#if showValidation}
    <forge-inline-message class="span-full" theme="warning">
      <div class="flex-center--row">
        <forge-icon slot="icon" name="warning" external></forge-icon>
        <div>A service type is required</div>
      </div>
    </forge-inline-message>
  {/if}
  <ServiceTypeCard
    isSelected={currentSelected === 'custom'}
    on:service-selected={(e) => onServiceSelected(e.detail)}
    serviceType="Custom"
    serviceDescription="Create a custom service that links to anywhere on the web"
    icon="build"
    iconLibrary="standard"></ServiceTypeCard>
  <ServiceTypeCard
    isSelected={currentSelected === 'integration'}
    on:service-selected={(e) => onServiceSelected(e.detail)}
    serviceType="Integration"
    serviceDescription="This is the description for the integration service"
    icon="connection"
    iconLibrary="extended"></ServiceTypeCard>
  <ServiceTypeCard
    isSelected={currentSelected === 'partner'}
    on:service-selected={(e) => onServiceSelected(e.detail)}
    serviceType="Partner"
    serviceDescription="Find a nearby Partner service and add it to your service directory"
    icon="groups"
    iconLibrary="standard"></ServiceTypeCard>
  <ServiceTypeCard
    isSelected={currentSelected === 'tcp'}
    on:service-selected={(e) => onServiceSelected(e.detail)}
    serviceType="TCP"
    serviceDescription="Link to a Tyler Cloud Platform specific service"
    icon="tyler_talking_t_logo"
    iconLibrary="custom"></ServiceTypeCard>
</div>

<style lang="scss">
  .service-type__container {
    padding-inline: 16px;
    padding-block: 16px 24px;
    display: grid;
    gap: 16px;
    max-width: 768px;
    margin: 0 auto;
  }

  forge-inline-message::part(root) {
    width: 100%;
  }
</style>
