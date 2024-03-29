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
          return service.functions.some((func) => func === f);
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
          service.serviceTitle.toLowerCase().includes($filterText) ||
          service.serviceDescription.toLowerCase().includes($filterText) ||
          service.serviceDescription.toLowerCase().includes($filterText) ||
          service.department.label.toLowerCase().includes($filterText)
        );
      });
    }

    return $servicesCache.sort((a, b) =>
      a.serviceTitle.toLowerCase() > b.serviceTitle.toLowerCase() ? 1 : b.serviceTitle.toLowerCase() > a.serviceTitle.toLowerCase() ? -1 : 0
    );
  }
);

export const functionsCache = writable([
  {
    label: 'Appointment',
    value: 'appointment'
  },
  {
    label: 'Bill/Invoice',
    value: 'bill-invoice'
  },
  {
    label: 'Fee',
    value: 'fee'
  },
  {
    label: 'Fine',
    value: 'fine'
  },
  {
    label: 'Form',
    value: 'form'
  },
  {
    label: 'License',
    value: 'license'
  },
  {
    label: 'Permit',
    value: 'permit'
  },
  {
    label: 'Rental',
    value: 'rental'
  },
  {
    label: 'Subscription',
    value: 'subscription'
  },
  {
    label: 'Tax',
    value: 'tax'
  }
]);

export const departmentsCache = writable([
  {
    label: 'Agriculture',
    value: 'department-of-agriculture'
  },
  {
    label: 'Health and Human Services',
    value: 'department-of-health-and-human-services'
  },
  {
    label: 'Housing and Urban Development',
    value: 'department-of-housing-and-urban-development'
  },
  {
    label: 'Department of Labor',
    value: 'department-of-labor'
  },
  {
    label: 'Motor Vehicles',
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
    label: 'Utilities',
    value: 'utilities'
  },
  {
    label: 'Department of Education',
    value: 'u.s.-department-of-education'
  },
  {
    label: 'Department of State',
    value: 'u.s.-department-of-state'
  }
]);
