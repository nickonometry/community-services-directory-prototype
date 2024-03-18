import {
  createActionIconButton,
  createFeaturedIcon,
  createPartnerAccessIcon,
  createServiceAvatarIcon,
  createStatusBadge,
  createStatusToggle,
  createFeaturedToggle
} from './utils';

export const columnConfigurations = [
  {
    property: 'iconName',
    template: (i, div, data) => createServiceAvatarIcon(i, div, data),
    width: '96px'
  },
  {
    property: 'serviceTitle',
    header: 'Service Name',
    sortable: true
  },
  {
    property: 'serviceDescription',
    header: 'Service Description',
    width: '400px'
  },
  // {
  //   property: 'lastAccessDate',
  //   header: 'Last edited',
  //   width: '150px'
  // },
  {
    property: 'department.label',
    header: 'Department'
  },
  {
    property: 'isPublished',
    header: 'Published',
    template: (i, div, data) => createStatusToggle(i, div, data),
    sortable: true,
    width: '120px'
  },
  {
    property: 'isFeatured',
    header: 'Featured',
    template: (i, div, data) => createFeaturedToggle(i, div, data),
    sortable: true,
    width: '120px'
  },
  {
    property: 'actions',
    header: '',
    template: (i, div, data) => createActionIconButton(i, div, data),
    width: '64px'
  }
];
