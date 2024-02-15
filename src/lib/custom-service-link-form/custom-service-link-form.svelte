<script>
  import { onMount } from 'svelte';
  import IconPicker from '../icon-picker/icon-picker.svelte';
  import { customServiceLinkForm } from '../custom-form-store';
  import { servicesCache } from '../../globalStore';
  import HelpPopup from '../help-popup/help-popup.svelte';
  let selectGroup;
  let form;
  let formIsValid = false;

  let services = $servicesCache;
  let departments = [];

  services.forEach((s) => {
    let departmentObject = {};
    departmentObject.label = s.department;
    departmentObject.value = s.department;
    departments.push(departmentObject);
  });

  onMount(() => {
    form = document.querySelector('#form');
    form.addEventListener('change', () => {
      formIsValid = !Object.values(customServiceLinkForm).some((x) => x !== null && x !== '');
    });
    selectGroup.options = departments.sort((a, b) =>
      a.value.toLowerCase() > b.value.toLowerCase() ? 1 : b.value.toLowerCase() > a.value.toLowerCase() ? -1 : 0
    );
  });

  function onFeatureChange(event) {
    customServiceLinkForm.update((state) => ({
      ...state,
      isFeatured: event.target.value
    }));
  }

  function onPartnerAccessChange(event) {
    customServiceLinkForm.update((state) => ({
      ...state,
      allowPartnerAccess: event.target.value
    }));
  }

  function onDepartmentChange(event) {
    customServiceLinkForm.update((state) => ({
      ...state,
      department: event.target.value
    }));
  }

  function onIconSelected(event) {
    customServiceLinkForm.update((state) => ({ ...state, iconName: event.detail }));
  }

  function onStatusChange(event) {
    let isPublished = event.detail;
    let value = '';
    if (isPublished) {
      value = 'Published';
    } else {
      value = 'Unpublished';
    }
    customServiceLinkForm.update((state) => ({ ...state, status: value }));
  }
</script>

<forge-toolbar no-border>
  <h3 slot="center" class="forge-typography--heading2">Next let's fill out the custom service details</h3>
</forge-toolbar>

<form class="form" id="form">
  <forge-stack>
    <forge-text-field required>
      <label for="service-title">Service title</label>
      <input type="text" id="service-title" bind:value={$customServiceLinkForm.serviceTitle} required />
    </forge-text-field>
    <forge-text-field required>
      <label for="service-title">Service description</label>
      <textarea type="text" id="service-title" bind:value={$customServiceLinkForm.serviceDescription} required />
    </forge-text-field>
    <forge-stack inline stretch>
      <forge-radio-group>
        <div class="flex-center--row flex-gap-0">
          <forge-label legend>Featured</forge-label>
          <div class="custom-icon">
            <forge-icon-button dense>
              <forge-icon name="help_outline" external></forge-icon>
            </forge-icon-button>
          </div>
          <forge-popover trigger-type="hover" arrow placement="right">
            <div style="width: 800px;">
              <HelpPopup imageUrl="featured-services.png" title="Featured services">
                <p>
                  Featured services show up at the top of your services directory. We recommend to use this if you want showcase seasonal content or
                  services that you want to be the most visible
                </p>
              </HelpPopup>
            </div>
          </forge-popover>
        </div>

        <div>
          <forge-radio name="featured" value="true" on:change={onFeatureChange} required>Yes</forge-radio>
          <forge-radio name="featured" value="false" on:change={onFeatureChange} required>No</forge-radio>
        </div>
      </forge-radio-group>
      <forge-radio-group>
        <forge-label legend>Allow partners to access this service?</forge-label>
        <div>
          <forge-radio name="partners" value="true" on:change={onPartnerAccessChange}>Yes</forge-radio>
          <forge-radio name="partners" value="false" on:change={onPartnerAccessChange}>No</forge-radio>
        </div>
      </forge-radio-group>
    </forge-stack>
    <IconPicker
      on:icon-selected={(v) => {
        onIconSelected(v);
      }} />
    <forge-select label="Department" bind:this={selectGroup} on:change={onDepartmentChange} required> </forge-select>
    <forge-text-field required>
      <label for="planning">Planning</label>
      <input type="text" id="planning" bind:value={$customServiceLinkForm.planning} required />
    </forge-text-field>
    <forge-text-field required>
      <label for="url">Url</label>
      <input type="text" id="url" bind:value={$customServiceLinkForm.url} required />
    </forge-text-field>
    <div class="switch-container">
      <forge-switch id="forge-switch-01" required aria-label="Active" on:forge-switch-change={(e) => onStatusChange(e)}>
        <span>Published</span>
      </forge-switch>
      <div class="custom-icon" id="tooltip-host">
        <forge-icon-button dense>
          <forge-icon name="help_outline" external></forge-icon>
        </forge-icon-button>
        <forge-tooltip target="#tooltip-host" delay="200">Publishing a service will make it viewable to the public</forge-tooltip>
      </div>
    </div>
  </forge-stack>
  <p>{JSON.stringify($customServiceLinkForm, null, 2)}</p>
</form>

<style lang="scss">
  .form {
    width: 100%;
    padding: 16px;
  }

  .switch-container {
    width: max-content;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .custom-icon {
    margin-inline-start: 4px;
    color: var(--forge-theme-text-medium);
    display: grid;
    place-content: center;

    forge-icon {
      font-size: 18px;
      cursor: help;
    }
  }
</style>
