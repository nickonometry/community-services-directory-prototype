<script>
  import { browser } from '$app/environment';
  import { popoverA11y } from './../utils/utils.js';
  import { onMount } from 'svelte';
  import { beforeNavigate } from '$app/navigation';
  import IconPicker from '../icon-picker/icon-picker.svelte';
  import { customServiceLinkForm, clearForm } from './custom-service-link-form-store.js';
  import { servicesCache, departmentsCache, functionsCache } from '../../globalStore';
  import HelpPopup from '../help-popup/help-popup.svelte';
  import KeywordsInput from '../keywords-input/keywords-input.svelte';
  import PublishSwitch from '../publish-switch/publish-switch.svelte';
  export let isEdit = false;
  let departmentOptions = [];
  let departmentSelect;
  let functionsSelect;
  let form;
  let serviceId;

  beforeNavigate(() => {
    clearForm();
  });

  // Get the Service Id that we're editing
  if (isEdit && browser) {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop)
    });
    serviceId = params.id;
  }

  onMount(async () => {
    departmentOptions = $departmentsCache.map((dept) => {
      return { label: dept.name, value: dept.id };
    });
    departmentSelect.options = departmentOptions;
    functionsSelect.options = $functionsCache;

    if (isEdit) {
      departmentSelect.value = $customServiceLinkForm.departmentId;
      functionsSelect.value = $customServiceLinkForm.functions;
    }
  });

  function onFeatureChange(event) {
    customServiceLinkForm.update((state) => ({
      ...state,
      isFeatured: event.target.value
    }));
  }

  function onDepartmentChange(event) {
    customServiceLinkForm.update((state) => ({
      ...state,
      departmentId: event.detail
    }));
  }

  function onFunctionsSelectChange(event) {
    customServiceLinkForm.update((state) => ({
      ...state,
      functions: event.detail
    }));
  }

  function onIconSelected(event) {
    customServiceLinkForm.update((state) => ({ ...state, iconName: event.detail }));
  }

  function onStatusChange(event) {
    customServiceLinkForm.update((state) => ({ ...state, isPublished: event.detail }));
  }
</script>

{#if !isEdit}
  <forge-toolbar no-border>
    <h3 slot="center" class="forge-typography--heading2">Next let's fill out the user-defined service details</h3>
  </forge-toolbar>
{/if}

<form class="form" id="form" bind:this={form}>
  <forge-stack>
    <forge-text-field required float-label-type={isEdit ? 'always' : 'auto'}>
      <label for="service-title">Service title</label>
      <input type="text" id="service-title" bind:value={$customServiceLinkForm.title} required />
    </forge-text-field>
    <forge-text-field required float-label-type={isEdit ? 'always' : 'auto'}>
      <label for="service-title">Service description</label>
      <textarea type="text" id="service-title" bind:value={$customServiceLinkForm.description} required />
    </forge-text-field>
    <forge-stack inline stretch>
      <forge-radio-group>
        <forge-stack inline gap="0" alignment="center">
          <forge-label legend>Featured</forge-label>
          <div class="custom-icon">
            <forge-icon-button
              id="featured-popover"
              dense
              aria-expanded="false"
              on:blur={(e) => popoverA11y(e, false)}
              on:mouseleave={(e) => popoverA11y(e, false)}
              on:focus={(e) => popoverA11y(e, true)}
              on:mouseenter={(e) => popoverA11y(e, true)}>
              <forge-icon name="help_outline" external></forge-icon>
            </forge-icon-button>
          </div>
          <forge-popover trigger-type="hover" arrow placement="auto" hover-delay="500" aria-labelledby="featured-popover" role="region">
            <div class="popup-container">
              <HelpPopup imageUrl="/featured-services.png" title="Featured services">
                <p>
                  Featured services show up at the top of your services directory. We recommend using this if you want showcase seasonal content or
                  services that you want to be the most visible
                </p>
              </HelpPopup>
            </div>
          </forge-popover>
        </forge-stack>

        <div>
          <forge-radio name="featured" value="true" on:change={onFeatureChange} checked={$customServiceLinkForm.isFeatured} required>Yes</forge-radio>
          <forge-radio name="featured" value="false" on:change={onFeatureChange} checked={!$customServiceLinkForm.isFeatured} required
            >No</forge-radio>
        </div>
      </forge-radio-group>
    </forge-stack>
    <IconPicker
      {isEdit}
      on:icon-selected={(v) => {
        onIconSelected(v);
      }} />
    <forge-select
      label="Department"
      bind:this={departmentSelect}
      on:change={onDepartmentChange}
      required
      float-label-type={isEdit ? 'always' : 'auto'}>
    </forge-select>

    <forge-select
      multiple
      label="Functions"
      bind:this={functionsSelect}
      on:change={onFunctionsSelectChange}
      required
      float-label-type={isEdit ? 'always' : 'auto'}>
    </forge-select>

    {#if $customServiceLinkForm.keywords}
      <KeywordsInput keywords={$customServiceLinkForm.keywords} />
    {/if}

    <forge-text-field required float-label-type={isEdit ? 'always' : 'auto'}>
      <label for="url">Url</label>
      <input type="text" id="url" bind:value={$customServiceLinkForm.url} required />
    </forge-text-field>
    <PublishSwitch on:publish-toggled={(e) => onStatusChange(e.detail)} isPublished={$customServiceLinkForm.isPublished} />
  </forge-stack>
</form>

<!-- <p>{JSON.stringify($customServiceLinkForm, null, 2)}</p> -->

<style lang="scss">
  @import '../../mixins.scss';
  .form {
    width: 100%;
    padding: 16px;
  }

  .popup-container {
    @include responsive-help-popover-container;
  }
</style>
