import { writable, derived } from 'svelte/store';
export const filterText = writable('');

export const servicesCache = writable([]);
export const avatarCache = writable([]);

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

export const departmentsCache = writable([
  {
    label: 'Department of Agriculture',
    value: 'department-of-agriculture'
  },
  {
    label: 'Department of Health and Human Services',
    value: 'department-of-health-and-human-services'
  },
  {
    label: 'Department of Housing and Urban Development',
    value: 'department-of-housing-and-urban-development'
  },
  {
    label: 'Department of Labor',
    value: 'department-of-labor'
  },
  {
    label: 'Department of Labor',
    value: 'department-of-labor'
  },
  {
    label: 'Department of Motor Vehicles',
    value: 'department-of-motor-vehicles'
  },
  {
    label: 'Department of Motor Vehicles',
    value: 'department-of-motor-vehicles'
  },
  {
    label: 'Federal Aviation Administration',
    value: 'federal-aviation-administration'
  },
  {
    label: 'Internal Revenue Service',
    value: 'internal-revenue-service'
  },
  {
    label: 'National Park Service',
    value: 'national-park-service'
  },
  {
    label: 'Small Business Administration',
    value: 'small-business-administration'
  },
  {
    label: 'Social Security Administration',
    value: 'social-security-administration'
  },
  {
    label: 'U.S. Department of Education',
    value: 'u.s.-department-of-education'
  },
  {
    label: 'U.S. Department of State',
    value: 'u.s.-department-of-state'
  },
  {
    label: 'U.S. Department of State',
    value: 'u.s.-department-of-state'
  }
]);
