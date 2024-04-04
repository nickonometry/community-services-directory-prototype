<script>
  import { openToast } from './../../../../../lib/utils/utils.js';
  import { createEventDispatcher, onMount } from 'svelte';
  import { departmentsCache } from '../../../../../globalStore';
  export let isEdit = false;
  export let inputId = 'department-name';
  export let departmentIndex;
  let departmentInputValue = '';

  onMount(() => {
    if (isEdit) {
      departmentInputValue = $departmentsCache[departmentIndex].label;
    }
  });

  const onCancelClick = () => {
    departmentInputValue = '';
    closePopover();
  };

  const dispatch = createEventDispatcher();
  const closePopover = () => {
    dispatch('close-popover');
  };

  const onSave = () => {
    if (departmentInputValue.length) {
      if (isEdit) {
        $departmentsCache[departmentIndex].label = departmentInputValue;
        openToast('Department successfully updated');
        closePopover();
      } else {
        departmentsCache.update((state) => [
          ...state,
          {
            label: departmentInputValue,
            value: departmentInputValue.replace(/\\s+/g, '').toLowerCase()
          }
        ]);
        openToast('Department successfully added');
        closePopover();
        departmentInputValue = '';
      }
    }
  };
</script>

<forge-toolbar no-border>
  <h1 slot="start" class="forge-typography--heading2">
    {#if isEdit}
      Edit department
    {/if}
    {#if !isEdit}
      Add department
    {/if}
  </h1>
</forge-toolbar>
<form class="container" on:submit={onSave}>
  <forge-stack>
    <forge-text-field required>
      <label for={inputId}>Department name</label>
      <input type="text" id={inputId} bind:value={departmentInputValue} />
    </forge-text-field>
  </forge-stack>
</form>
<forge-toolbar inverted no-border>
  <forge-stack inline alignment="center" slot="end">
    <forge-button on:click={onCancelClick}> Cancel </forge-button>
    <forge-button variant="filled" on:click={onSave} disabled={!departmentInputValue.length}> Save </forge-button>
  </forge-stack>
</forge-toolbar>

<style lang="scss">
  .container {
    padding: 16px;
    min-width: 360px;
  }
</style>
