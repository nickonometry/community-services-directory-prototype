import { writable, derived } from 'svelte/store';
export const servicesCache = writable([]);

export const filterText = writable('');

// Watches for changes in filterText and filters the servicesCache
export let filteredServices = derived([filterText, servicesCache], ([$filterText, $servicesCache]) => {
  if ($filterText == '') return $servicesCache;
  return $servicesCache
    .filter(
      (service) =>
        service.serviceTitle.toLowerCase().includes($filterText) ||
        service.serviceDescription.toLowerCase().includes($filterText) ||
        service.serviceDescription.toLowerCase().includes($filterText) ||
        service.department.label.toLowerCase().includes($filterText) ||
        service.status.toLowerCase().includes($filterText)
    )
    .sort((a, b) =>
      a.serviceTitle.toLowerCase() > b.serviceTitle.toLowerCase() ? 1 : b.serviceTitle.toLowerCase() > a.serviceTitle.toLowerCase() ? -1 : 0
    );
});

// Watches for changes in the filteredServices array and sorts it automatically
export let sortedServices = derived(filteredServices, ($filteredServices) => {
  return $filteredServices.sort((a, b) =>
    a.serviceTitle.toLowerCase() > b.serviceTitle.toLowerCase() ? 1 : b.serviceTitle.toLowerCase() > a.serviceTitle.toLowerCase() ? -1 : 0
  );
});
