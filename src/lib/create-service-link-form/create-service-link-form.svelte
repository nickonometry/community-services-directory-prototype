<script>
  import { onMount } from 'svelte';
  import IconPicker from '../icon-picker/icon-picker.svelte';
  import { serviceLinkForm } from '../store';
  let selectGroup;
  let form;
  let formIsValid = false;

  onMount(() => {
    form = document.querySelector('#form');
    form.addEventListener('change', () => {
      formIsValid = !Object.values(serviceLinkForm).some((x) => x !== null && x !== '');
    });
    selectGroup.options = [
      {
        label: 'Group one',
        value: 'group-one'
      },
      {
        label: 'Group three',
        value: 'group-three'
      },
      {
        label: 'Group four',
        value: 'group-four'
      }
    ];
  });

  function onFeatureChange(event) {
    serviceLinkForm.update((state) => ({ ...state, feature: event.target.value }));
  }

  function onPartnerAccessChange(event) {
    serviceLinkForm.update((state) => ({ ...state, partnerAccess: event.target.value }));
  }

  function onGroupChange(event) {
    serviceLinkForm.update((state) => ({ ...state, group: event.target.value }));
  }

  function onIconSelected(event) {
    serviceLinkForm.update((state) => ({ ...state, icon: event.detail }));
  }
</script>

<forge-toolbar no-border>
  <h3 slot="start" class="forge-typography--heading3">Service details</h3>
</forge-toolbar>
<form class="form" id="form">
  <forge-stack>
    <forge-text-field required>
      <label for="service-title">Service title</label>
      <input type="text" id="service-title" bind:value={$serviceLinkForm.title} required />
    </forge-text-field>
    <forge-text-field required>
      <label for="service-title">Service description</label>
      <textarea type="text" id="service-title" bind:value={$serviceLinkForm.description} required />
    </forge-text-field>
    <forge-stack gap="0">
      <div role="radiogroup" aria-label="Choose a feature" class="flex-center--row">
        <span>Feature:</span>
        <forge-radio name="feature" value="true" on:change={onFeatureChange} required>Yes</forge-radio>
        <forge-radio name="feature" value="false" on:change={onFeatureChange} required>No</forge-radio>
      </div>
      <div role="radiogroup" aria-label="Allow partners to access this service?" class="flex-center--row">
        <span>Allow partners to access this service?</span>
        <forge-radio name="partner-access" value="true" on:change={onPartnerAccessChange} required>Yes</forge-radio>
        <forge-radio name="partner-access" value="false" on:change={onPartnerAccessChange} required>No</forge-radio>
      </div>
    </forge-stack>
    <IconPicker
      on:icon-selected={(v) => {
        onIconSelected(v);
      }} />
    <forge-select label="Add a group" bind:this={selectGroup} on:change={onGroupChange} required> </forge-select>
    <forge-text-field required>
      <label for="planning">Planning</label>
      <input type="text" id="planning" bind:value={$serviceLinkForm.planning} required />
    </forge-text-field>
    <forge-text-field required>
      <label for="url">Url</label>
      <input type="text" id="url" bind:value={$serviceLinkForm.url} required />
    </forge-text-field>
  </forge-stack>
</form>

<style>
  .form {
    width: 100%;
    padding: 16px;
  }
</style>
