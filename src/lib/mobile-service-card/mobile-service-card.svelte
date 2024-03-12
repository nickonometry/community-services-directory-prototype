<script>
  import { onMount } from 'svelte';
  import { randomBrightColorPicker } from '../utils/color-picker';

  export let index;
  export let service;
  console.log(service);
  let avatar;

  onMount(() => {
    avatar.style.setProperty('--forge-avatar-background', randomBrightColorPicker());
  });
</script>

<forge-card>
  <div class="card-inner">
    <forge-stack>
      <div class="card-header">
        <forge-avatar bind:this={avatar}>
          <forge-icon name={service.iconName} external style="color: white;"></forge-icon>
        </forge-avatar>
        <div class="flex-center--row">
          <forge-badge theme={service.status.toLowerCase() === 'published' ? 'success' : 'info-secondary'}>
            {service.status}
          </forge-badge>
          {#if service.isFeatured}
            <forge-icon name="star" external></forge-icon>
          {/if}
        </div>
      </div>
      <forge-label-value>
        <span slot="label">Service name</span>
        <span slot="value">{service.serviceTitle}</span>
      </forge-label-value>
      <forge-label-value>
        <span slot="label">Service description</span>
        <span slot="value">{service.serviceDescription}</span>
      </forge-label-value>
      <forge-label-value>
        <span slot="label">Department</span>
        <span slot="value">{service.department.label}</span>
      </forge-label-value>
    </forge-stack>

    <!-- TODO - make this configurable and not customer specific -->
    <forge-toolbar inverted>
      <forge-button href="" slot="end">
        <span>Edit service</span>
        <forge-icon name="arrow_right" slot="end" external />
      </forge-button>
    </forge-toolbar>
  </div>
</forge-card>

<style>
  .card-inner {
    display: grid;
    grid-template-rows: 1fr auto;
    height: 100%;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: start;
  }

  forge-stack {
    padding: 16px;
  }
</style>
