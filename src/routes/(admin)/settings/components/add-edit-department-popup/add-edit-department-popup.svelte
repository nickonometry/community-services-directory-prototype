<script>
  import { fetchDepartments, openToast, supabase } from './../../../../../lib/utils/utils.js';
  import { createEventDispatcher, onMount } from 'svelte';
  import { departmentsCache } from '../../../../../globalStore';
  export let department;
  export let isEdit = false;
  export let inputId = 'department-name';
  export let departmentIndex;
  let departmentInputValue = '';

  onMount(() => {
    if (isEdit) {
      departmentInputValue = $departmentsCache[departmentIndex].name;
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

  const onSave = async () => {
    if (departmentInputValue.length) {
      if (!isEdit) {
        const { data, error } = await supabase
          .from('departments')
          .insert([{ name: departmentInputValue }])
          .select();
        if (error) {
          openToast('There was an error with adding this department');
          closePopover();
          departmentInputValue = '';
          return;
        } else {
          openToast('Department successfully added');
          closePopover();
          departmentInputValue = '';
        }
      } else {
        const { data, error } = await supabase.from('departments').update({ name: departmentInputValue }).eq('id', department.id).select();
        if (error) {
          openToast('There was an error with adding this department');
        }
        closePopover();
        departmentInputValue = '';
      }
    }
    fetchDepartments();
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
    width: 360px;
  }
</style>
