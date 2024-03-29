<script>
  import ServiceTypeCard from '../service-type-card/service-type-card.svelte';
  import { customServiceLinkForm } from '../custom-service-link-form/custom-service-link-form-store';
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
  <!-- <ServiceTypeCard
    isSelected={currentSelected === 'tyler application'}
    on:service-selected={(e) => onServiceSelected(e.detail)}
    serviceType="Tyler application"
    serviceDescription="These community services are available as part of your licensed Tyler applications and require minimal configuration. For example, Resident Access Parking Ticket payment."
    icon="tyler_talking_t_logo"
    iconLibrary="custom"></ServiceTypeCard> -->
  <ServiceTypeCard
    isSelected={currentSelected === 'user-defined'}
    on:service-selected={(e) => onServiceSelected(e.detail)}
    serviceType="User-Defined"
    serviceDescription="These are custom defined services that require complete setup and configuration."
    icon="build"
    iconLibrary="standard"></ServiceTypeCard>
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

  @media screen and (max-width: 1024px) {
    h3 {
      padding-block-start: 16px;
    }
  }
</style>
