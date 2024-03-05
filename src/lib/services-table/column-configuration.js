import { createActionIconButton, createFeaturedIcon, createPartnerAccessIcon, createServiceAvatarIcon, createStatusBadge } from './utils';

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
    header: 'Service Description'
  },
  {
    property: 'lastAccessDate',
    header: 'Last edited',
    width: '150px'
  },
  {
    property: 'department.label',
    header: 'Department'
  },
  {
    property: 'status',
    header: 'Status',
    template: (i, div, data) => createStatusBadge(i, div, data),
    sortable: true
  },
  {
    property: 'isFeatured',
    header: 'Featured',
    template: (i, div, data) => createFeaturedIcon(i, div, data),
    align: 'center'
  },
  // {
  //   property: 'allowPartnerAccess',
  //   header: 'Allow partner access',
  //   template: (i, div, data) => createPartnerAccessIcon(i, div, data),
  //   align: 'center'
  // },
  {
    property: 'actions',
    header: '',
    template: (i, div, data) => createActionIconButton(i, div, data)
  }
];
