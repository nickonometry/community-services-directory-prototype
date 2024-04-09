import {
  createActionIconButton,
  createFeaturedIcon,
  createServiceAvatarIcon,
  createStatusBadge,
  createStatusToggle,
  createDepartmentElement,
  createFeaturedToggle
} from './utils';

export const columnConfigurations = [
  {
    property: 'iconName',
    template: (i, div, data) => createServiceAvatarIcon(i, div, data),
    width: '96px'
  },
  {
    property: 'title',
    header: 'Service Name',
    sortable: true
  },
  {
    property: 'description',
    header: 'Service Description',
    width: '400px'
  },
  {
    property: 'department.name',
    header: 'Department',
    template: (i, div, data) => createDepartmentElement(i, div, data)
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
