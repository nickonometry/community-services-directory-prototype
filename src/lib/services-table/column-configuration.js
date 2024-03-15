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
    // header: 'icon',
    // headerTemplate: () => 'Test',
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
    header: 'Service Description'
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
    sortable: true
  },
  {
    property: 'isFeatured',
    header: 'Featured',
    template: (i, div, data) => createFeaturedToggle(i, div, data),
    sortable: true
  },
  {
    property: 'actions',
    header: '',
    template: (i, div, data) => createActionIconButton(i, div, data)
  }
];
