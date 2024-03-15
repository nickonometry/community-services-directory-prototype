<script>
  import { onMount } from 'svelte';
  import { randomBrightColorPicker } from '../utils/color-picker';

  export let service;
  let avatar;

  onMount(() => {
    avatar.style.setProperty('--forge-avatar-background', randomBrightColorPicker());
  });
</script>

<forge-card>
  <div class="card-inner">
    <div class="padding-16">
      <forge-stack>
        <div class="card-header">
          <forge-avatar bind:this={avatar}>
            <forge-icon name={service.iconName} external style="color: white;"></forge-icon>
          </forge-avatar>
          <forge-stack inline alignment="center">
            <forge-badge theme={service.isPublished ? 'success' : 'info-secondary'}>
              {service.isPublished ? 'Published' : 'Unpublished'}
            </forge-badge>
            {#if service.isFeatured}
              <forge-icon name="star" external></forge-icon>
            {/if}
          </forge-stack>
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
    </div>

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
</style>
