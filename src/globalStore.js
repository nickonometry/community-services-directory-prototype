import { writable, derived } from 'svelte/store';
export const filterText = writable('');

// Values can be 'featured', 'published || unpublished'
export const serviceFilters = writable([]);

export const servicesCache = writable([]);
export const avatarCache = writable([]);

// Watches for changes in filterText & chip filters then filters the servicesCache
export let filteredServices = derived([filterText, servicesCache, serviceFilters], ([$filterText, $servicesCache, $serviceFilters]) => {
  const hasChipFilters = !!$serviceFilters.length;
  const hasTextFilter = !!$filterText.trim().length;
  const isFeatured = $serviceFilters.some((f) => f === 'featured');
  let isPublished = $serviceFilters.some((f) => f === 'published');
  let isUnpublished = $serviceFilters.some((f) => f === 'unpublished');

  if (hasChipFilters) {
    if (isFeatured) {
      $servicesCache = $servicesCache.filter((service) => {
        return service.isFeatured === isFeatured;
      });
    }
    if (isPublished) {
      $servicesCache = $servicesCache.filter((service) => {
        return service.isPublished === isPublished;
      });
    }
    if (isUnpublished) {
      $servicesCache = $servicesCache.filter((service) => {
        return service.isPublished === false;
      });
    }
    if (isPublished && isFeatured) {
      $servicesCache = $servicesCache.filter((service) => {
        return service.isFeatured === isFeatured && service.isPublished === isPublished;
      });
    }
    if (isUnpublished && isFeatured) {
      $servicesCache = $servicesCache.filter((service) => {
        return service.isFeatured === isFeatured && service.isPublished === false;
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
