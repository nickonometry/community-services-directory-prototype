<script>
  import FunctionsFilter from './functions-filter.svelte';

  const filtersApplied = [];

  export let dialogRef;
  const onClose = () => {
    dialogRef.open = false;
  };

  const onSave = () => {
    dialogRef.open = false;
  };

  const onFilterSelected = (v) => {
    // console.log(v);
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
      <FunctionsFilter on:filter-selected={(e) => onFilterSelected(e)} />
    </div>
  </div>

  <forge-toolbar slot="footer" inverted>
    <forge-button slot="end" on:click={onSave}>
      Close filters
      <forge-icon name="chevron_right" external></forge-icon>
    </forge-button>
  </forge-toolbar>
</forge-scaffold>

<style>
  .filter-container {
    padding: 16px;
  }
</style>
