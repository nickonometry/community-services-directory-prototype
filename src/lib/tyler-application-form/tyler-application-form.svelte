<script>
  import { onMount } from 'svelte';
  import { beforeNavigate } from '$app/navigation';
  import { tylerApplicationServiceForm, clearForm } from '../custom-form-store';
  import { servicesCache } from '../../globalStore';
  import HelpPopup from '../help-popup/help-popup.svelte';
  import KeywordsInput from '../keywords-input/keywords-input.svelte';
  import PublishSwitch from '../publish-switch/publish-switch.svelte';
  export let isEdit = false;
  let availableServicesDropdown;
  let departmentSelect;
  let currentIndex = 0;
  let form;
  let formIsValid = false;

  beforeNavigate(() => {
    clearForm();
  });

  let services = $servicesCache;
  let departments = [];

  services.forEach((s) => {
    let departmentObject = s.department;
    departments.push(departmentObject);
  });
  departments = [...new Set(departments)];

  const uniqueDepartments = Object.values(departments.reduce((acc, obj) => ({ ...acc, [obj.value]: obj }), {}));

  let availableServices = [
    { label: 'Resident Access - Parking Ticket', value: 'parking-ticket' },
    { label: 'Resident Access - Motor Vehicle Tax', value: 'motor-vehicle-tax' },
    { label: 'Resident Access - Personal Property Tax', value: 'personal-property-tax' }
  ];

  onMount(() => {
    form = document.querySelector('#form');
    form.addEventListener('change', () => {
      formIsValid = !Object.values(tylerApplicationServiceForm).some((x) => x !== null && x !== '');
    });
    availableServicesDropdown.options = availableServices.sort((a, b) =>
      a.value.toLowerCase() > b.value.toLowerCase() ? 1 : b.value.toLowerCase() > a.value.toLowerCase() ? -1 : 0
    );
    departmentSelect.options = uniqueDepartments.sort((a, b) =>
      a.value.toLowerCase() > b.value.toLowerCase() ? 1 : b.value.toLowerCase() > a.value.toLowerCase() ? -1 : 0
    );
    if (isEdit) {
      availableServicesDropdown.value = $tylerApplicationServiceForm.department.value;
    }
  });

  function onAvailableServicesChange(event) {
    if (event.detail === 'parking-ticket') {
      currentIndex++;
    }
    tylerApplicationServiceForm.update((state) => ({
      ...state,
      tylerService: event.detail
    }));
    tylerApplicationServiceForm.update((state) => ({ ...state, serviceTitle: 'Parking Ticket' }));
    tylerApplicationServiceForm.update((state) => ({ ...state, serviceDescription: 'Pay outstanding parking ticket' }));
    tylerApplicationServiceForm.update((state) => ({ ...state, iconName: 'perm_device_information' }));
  }

  function onFeatureChange(event) {
    tylerApplicationServiceForm.update((state) => ({
      ...state,
      isFeatured: event.target.value
    }));
  }

  function onPartnerAccessChange(event) {
    tylerApplicationServiceForm.update((state) => ({
      ...state,
      allowPartnerAccess: event.target.value
    }));
  }

  function onDepartmentChange(event) {
    tylerApplicationServiceForm.update((state) => ({
      ...state,
      department: {
        label: services.find((s) => s.department.value === event.detail).department.label,
        value: event.detail
      }
    }));
  }

  function onStatusChange(event) {
    let isPublished = event.detail;
    let value = '';
    if (isPublished) {
      value = 'Published';
    } else {
      value = 'Unpublished';
    }
    tylerApplicationServiceForm.update((state) => ({ ...state, status: value }));
  }
</script>

{#if !isEdit}
  <forge-toolbar no-border>
    <h3 slot="center" class="forge-typography--heading2">Now let's select an existing service</h3>
  </forge-toolbar>
{/if}

<form class="form" id="form">
  <forge-stack>
    <forge-select label="Available services" bind:this={availableServicesDropdown} on:change={onAvailableServicesChange} required> </forge-select>
    <forge-view-switcher animation-type="fade" index={currentIndex}>
      <forge-view></forge-view>
      <forge-view>
        <forge-stack>
          <div class="icon-title__container">
            <forge-icon name={$tylerApplicationServiceForm.iconName} external class="preview-icon"></forge-icon>
            <forge-stack>
              <forge-label-value>
                <span slot="label">Service title</span>
                <span slot="value">{$tylerApplicationServiceForm.serviceTitle}</span>
              </forge-label-value>
              <forge-label-value>
                <span slot="label">Service description</span>
                <span slot="value">{$tylerApplicationServiceForm.serviceDescription}</span>
              </forge-label-value>
            </forge-stack>
          </div>

          <forge-stack inline stretch>
            <forge-radio-group>
              <div class="flex-center--row flex-gap-0">
                <forge-label legend>Featured</forge-label>
                <div class="custom-icon">
                  <forge-icon-button dense>
                    <forge-icon name="help_outline" external></forge-icon>
                  </forge-icon-button>
                </div>
                <forge-popover trigger-type="click" arrow placement="right">
                  <div style="width: 800px;">
                    <HelpPopup imageUrl="/featured-services.png" title="Featured services">
                      <p>
                        Featured services show up at the top of your services directory. We recommend using this if you want showcase seasonal content
                        or services that you want to be the most visible
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
          <forge-select label="Department" bind:this={departmentSelect} on:change={onDepartmentChange} required> </forge-select>
          <KeywordsInput />
          <forge-text-field required>
            <label for="url">Url</label>
            <input type="text" id="url" bind:value={$tylerApplicationServiceForm.url} required />
          </forge-text-field>
          <PublishSwitch on:publish-toggled={(e) => onStatusChange(e.detail)} />
        </forge-stack>
      </forge-view>
    </forge-view-switcher>
  </forge-stack>
</form>

<!-- <p>{JSON.stringify($tylerApplicationServiceForm, null, 2)}</p> -->

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

  .icon-title__container {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 24px;
    padding-block: 24px;
    background-color: rgb(250, 250, 250);
    border-radius: 4px;
    border: 1px solid var(--forge-theme-text-lowest);
  }
</style>
