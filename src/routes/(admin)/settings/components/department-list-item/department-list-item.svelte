<script>
  import { fetchDepartments, openToast, supabase } from '../../../../../lib/utils/utils';
  import AddEditDepartmentPopup from '../add-edit-department-popup/add-edit-department-popup.svelte';
  import { departmentsCache } from './../../../../../globalStore.js';
  export let department;
  export let index;
  let editDepartmentPopover;

  const onDelete = async () => {
    const { data, error } = await supabase.from('departments').delete().eq('id', department.id).select();
    if (error) {
      openToast('There was an error when trying to delete this department');
    }
    if (data) {
      openToast('Department successfully deleted');
    }
    fetchDepartments();
  };

  const setFocusToDepartmentInput = (e) => {
    // requestAnimationFrame(() => {
    //   requestAnimationFrame(() => {
    //     let el = editDepartmentPopover.querySelector('#department-name-edit');
    //     if (el) {
    //       el.focus();
    //       el.select();
    //     }
    //   });
    // });
  };

  const onPopoverClose = () => {
    editDepartmentPopover.open = false;
  };
</script>

<forge-list-item propagate-click="false">
  {department.name}
  <forge-stack inline slot="trailing" gap="0">
    <forge-icon-button on:click={setFocusToDepartmentInput} id={`edit-department-${index}`}>
      <forge-icon name="edit" external></forge-icon>
    </forge-icon-button>
    <forge-icon-button on:click={onDelete}>
      <forge-icon name="delete" external></forge-icon>
    </forge-icon-button>
  </forge-stack>
</forge-list-item>
<!-- TODO - use a dialog on mobile -->
<!-- TODO - get edit departments to work -->
<!-- <forge-popover
  shift
  placement="bottom-end"
  arrow
  aria-labelledby="edit-department"
  role="region"
  persistent
  bind:this={editDepartmentPopover}
  anchor={`edit-department-${index}`}>
  <AddEditDepartmentPopup on:close-popover={onPopoverClose} isEdit="true" departmentIndex={index} inputId="department-name-edit" {department} />
</forge-popover> -->
