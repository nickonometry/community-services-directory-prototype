<script>
  import { sortedDepartments } from './../../../globalStore.js';
  import AddEditDepartmentPopup from './components/add-edit-department-popup/add-edit-department-popup.svelte';
  import DepartmentListItem from './components/department-list-item/department-list-item.svelte';
  import { onMount } from 'svelte';

  let addDepartmentPopover;

  export const popoverA11y = (e, showExpanded) => {
    e.target.setAttribute('aria-expanded', showExpanded);
  };

  const setFocusToDepartmentInput = () => {
    requestAnimationFrame(() => {
      let el = document.getElementById('department-name');
      if (el) {
        el.focus();
      }
    });
  };

  const onPopoverClose = () => {
    addDepartmentPopover.open = false;
  };
</script>

<forge-card class="page-container" id="main">
  <forge-scaffold>
    <forge-toolbar style="--forge-toolbar-padding: 0;" slot="header">
      <div slot="start" class="flex-center--row flex-gap-0">
        <forge-icon-button href="/">
          <forge-icon name="arrow_back" external></forge-icon>
        </forge-icon-button>
        <h2 class="forge-typography--heading3">Settings</h2>
      </div>
    </forge-toolbar>

    <div slot="body" style="padding: 24px;">
      <forge-stack gap="8">
        <div class="departments-header">
          <h3 class="forge-typography--subheading2">Departments</h3>
          <forge-button
            id="add-department-popover"
            aria-expanded="false"
            on:click={setFocusToDepartmentInput}
            on:blur={(e) => popoverA11y(e, false)}
            on:mouseleave={(e) => popoverA11y(e, false)}
            on:focus={(e) => popoverA11y(e, true)}
            on:mouseenter={(e) => popoverA11y(e, true)}>
            <forge-icon name="add" external></forge-icon>
            Add department
          </forge-button>

          <!-- TODO - use a dialog on mobile -->
          <forge-popover
            arrow
            aria-labelledby="add-department-popover"
            role="region"
            persistent
            placement="bottom-end"
            anchor-element="#add-department-popover"
            bind:this={addDepartmentPopover}>
            <AddEditDepartmentPopup on:close-popover={onPopoverClose} />
          </forge-popover>
        </div>
        <div class="departments-container">
          <forge-card>
            <div class="department-list">
              <forge-list>
                {#each $sortedDepartments as dept, index}
                  <DepartmentListItem department={dept} {index} />
                {/each}
              </forge-list>
            </div>
          </forge-card>
        </div>
      </forge-stack>
    </div>
  </forge-scaffold>
</forge-card>

<style lang="scss">
  @import '../../../mixins.scss';

  h2,
  h3 {
    margin: 0;
    padding: 0;
  }

  .page-container {
    @include add-edit-service-page-layout();
  }

  .departments-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .department-list {
    max-height: 300px;
    overflow-y: auto;
  }

  @media screen and (max-width: 768px) {
    .page-container {
      margin: 0 auto;
    }
  }
</style>
