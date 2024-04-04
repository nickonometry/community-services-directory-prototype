<script>
  import AddEditDepartmentPopup from '../add-edit-department-popup/add-edit-department-popup.svelte';
  import { departmentsCache } from './../../../../../globalStore.js';
  export let department;
  export let index;
  let editDepartmentPopover;

  const onDelete = () => {
    let departments = $departmentsCache;
    let findIndexToDelete = departments.findIndex((d) => d.value === department.value);
    departments.splice(findIndexToDelete, 1);
    departmentsCache.set([...departments]);
  };

  const setFocusToDepartmentInput = (e) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        let el = editDepartmentPopover.querySelector('#department-name-edit');
        if (el) {
          el.focus();
          el.select();
        }
      });
    });
  };

  const onPopoverClose = () => {
    editDepartmentPopover.open = false;
  };
</script>

<forge-list-item propagate-click="false">
  {department.label}
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
<forge-popover
  shift
  placement="bottom-end"
  arrow
  aria-labelledby="edit-department"
  role="region"
  persistent
  bind:this={editDepartmentPopover}
  anchor={`edit-department-${index}`}>
  <AddEditDepartmentPopup on:close-popover={onPopoverClose} isEdit="true" departmentIndex={index} inputId="department-name-edit" />
</forge-popover>
