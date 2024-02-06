<script>
  import ServiceTypeCard from '../service-type-card/service-type-card.svelte';
  import { serviceLinkForm } from '../store';
  let currentSelected = '';
  const onServiceSelected = (serviceName) => {
    let service = serviceName.toLowerCase();
    currentSelected = service;
    updateServiceInStore(serviceName);
  };

  function updateServiceInStore(serviceName) {
    serviceLinkForm.update((state) => ({ ...state, serviceType: serviceName }));
  }
</script>

<forge-toolbar no-border>
  <h3 slot="start" class="forge-typography--heading3">Select a service type</h3>
</forge-toolbar>
<div class="service-type__container">
  <ServiceTypeCard
    isSelected={currentSelected === 'custom'}
    on:service-selected={(e) => onServiceSelected(e.detail)}
    serviceType="Custom"
    serviceDescription="Create a custom service that links to anywhere on the web"
    icon="build"
    iconLibrary="standard">
  </ServiceTypeCard>
  <ServiceTypeCard
    isSelected={currentSelected === 'integration'}
    on:service-selected={(e) => onServiceSelected(e.detail)}
    serviceType="Integration"
    serviceDescription="This is the description for the integration service"
    icon="connection"
    iconLibrary="extended">
  </ServiceTypeCard>
  <ServiceTypeCard
    isSelected={currentSelected === 'partner'}
    on:service-selected={(e) => onServiceSelected(e.detail)}
    serviceType="Partner"
    serviceDescription="Find a nearby Partner service and add it to your services list"
    icon="groups"
    iconLibrary="standard">
  </ServiceTypeCard>
  <ServiceTypeCard
    isSelected={currentSelected === 'tcp'}
    on:service-selected={(e) => onServiceSelected(e.detail)}
    serviceType="TCP"
    serviceDescription="Link to a Tyler Cloud Platform specific service"
    icon="tyler_talking_t_logo"
    iconLibrary="custom">
  </ServiceTypeCard>
</div>

<style lang="scss">
  .service-type__container {
    padding: 16px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
</style>
