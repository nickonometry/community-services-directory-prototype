<script>
  import { serviceFilters } from '../../globalStore';

  const onChipSelected = (e) => {
    if (e.detail.selected) {
      if (e.detail.value === 'published') {
        serviceFilters.update((state) => [...state.filter((s) => s !== 'unpublished')]);
      }

      if (e.detail.value === 'unpublished') {
        serviceFilters.update((state) => [...state.filter((s) => s !== 'published')]);
      }
      serviceFilters.update((state) => [...state, e.detail.value]);
    } else {
      serviceFilters.update((state) => [...state.filter((s) => s !== e.detail.value)]);
    }
  };
</script>

<forge-chip-set type="filter" on:forge-chip-select={(e) => onChipSelected(e)}>
  <forge-chip value="featured" selected={$serviceFilters.some((s) => s === 'featured')}>Featured</forge-chip>
  <forge-chip value="published" selected={$serviceFilters.some((s) => s === 'published')}>Published</forge-chip>
  <forge-chip value="unpublished" selected={$serviceFilters.some((s) => s === 'unpublished')}>Unpublished</forge-chip>
</forge-chip-set>

<style>
  .filter-container {
    padding-inline: 16px;
    padding-block-end: 16px;
  }
</style>
