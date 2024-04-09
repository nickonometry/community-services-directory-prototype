import { writable, derived } from 'svelte/store';
export const filterText = writable('');
export const serviceFilters = writable([]);
export const functionFilters = writable([]);
export const servicesCache = writable([]);
export const avatarCache = writable([]);

// Watches for changes in filterText & chip filters then filters the servicesCache
export let filteredServices = derived(
  [filterText, servicesCache, serviceFilters, functionFilters],
  ([$filterText, $servicesCache, $serviceFilters, $functionFilters]) => {
    const hasChipFilters = !!$serviceFilters.length;
    const hasTextFilter = !!$filterText.trim().length;
    const hasFeaturedFilter = $serviceFilters.some((f) => f === 'featured');
    const hasPublishedFilter = $serviceFilters.some((f) => f === 'published');
    const hasUnpublishedFilter = $serviceFilters.some((f) => f === 'unpublished');
    const hasFunctionFilter = !!$functionFilters.length;

    if (hasFunctionFilter) {
      $functionFilters.forEach((f) => {
        $servicesCache = $servicesCache.filter((service) => {
          if (service.functions !== null) {
            return service.functions.some((func) => func === f);
          }
        });
      });
    }

    if (hasChipFilters) {
      if (hasFeaturedFilter) {
        $servicesCache = $servicesCache.filter((service) => {
          return service.isFeatured === true;
        });
      }
      if (hasPublishedFilter) {
        $servicesCache = $servicesCache.filter((service) => {
          return service.isPublished === true;
        });
      } else if (hasUnpublishedFilter) {
        $servicesCache = $servicesCache.filter((service) => {
          return service.isPublished === false;
        });
      }
    }

    if (hasTextFilter) {
      $servicesCache = $servicesCache.filter((service) => {
        return (
          service.title.toLowerCase().includes($filterText) ||
          service.description.toLowerCase().includes($filterText) ||
          service.description.toLowerCase().includes($filterText)
          // TODO filter on department name, but need to lookup the ID in dept cache
          // service.department.name.toLowerCase().includes($filterText)
        );
      });
    }

    return $servicesCache.sort((a, b) =>
      a.title.toLowerCase() > b.title.toLowerCase() ? 1 : b.title.toLowerCase() > a.title.toLowerCase() ? -1 : 0
    );
  }
);

export const functionsCache = writable([]);
export const departmentsCache = writable([]);

export const getDepartmentById = (departments, id) => {
  let departmentName = departments.find((dc) => dc.id === id);
  if (departmentName) {
    return departmentName.name;
  } else {
    return 'No Department assigned';
  }
};

export const getFunctionById = (id) => {
  return $functionsCache.find((fc) => fc === id);
};

export let sortedDepartments = derived([departmentsCache], ([$departmentsCache]) => {
  return $departmentsCache.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : b.name.toLowerCase() > a.name.toLowerCase() ? -1 : 0));
});
