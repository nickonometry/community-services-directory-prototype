import { writable, derived } from 'svelte/store';
export const servicesCache = writable([]);

// Watches for changes on the servicesCache store and sorts it
export let sortedServices = derived(servicesCache, ($servicesCache) => {
  return $servicesCache.sort((a, b) =>
    a.serviceTitle.toLowerCase() > b.serviceTitle.toLowerCase() ? 1 : b.serviceTitle.toLowerCase() > a.serviceTitle.toLowerCase() ? -1 : 0
  );
});
