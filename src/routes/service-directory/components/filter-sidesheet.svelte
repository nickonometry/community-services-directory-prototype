<script>
  import FunctionsFilter from './functions-filter.svelte';

  const departmentFiltersApplied = [];

  export let dialogRef;
  const onClose = () => {
    dialogRef.open = false;
  };

  const onSave = () => {
    dialogRef.open = false;
  };

  const onDepartmentSelected = (v) => {
    console.log(v);
  };
</script>

<forge-scaffold>
  <forge-toolbar slot="header">
    <h1 slot="start" class="forge-typography--heading2">Filters</h1>
    <forge-icon-button slot="end" on:click={onClose}>
      <forge-icon name="close" external></forge-icon>
    </forge-icon-button>
  </forge-toolbar>

  <div slot="body">
    <div class="filter-container">
      <span class="forge-typography--label1">Department</span>
      <FunctionsFilter on:department-selected={(e) => onDepartmentSelected(e)} />
    </div>
  </div>

  <forge-toolbar slot="footer" inverted>
    <forge-button variant="raised" slot="end" on:click={onSave}>Apply</forge-button>
  </forge-toolbar>
</forge-scaffold>

<style>
  .filter-container {
    padding: 16px;
  }
</style>
