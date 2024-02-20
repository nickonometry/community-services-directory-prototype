// store.js
import { writable } from 'svelte/store';

// Custom service link form
const customServiceLinkDefaults = {
  tylerService: '',
  serviceType: '',
  serviceTitle: '',
  serviceDescription: '',
  department: {
    label: '',
    value: ''
  },
  isFeatured: false,
  allowPartnerAccess: false,
  status: '',
  iconName: '',
  group: '',
  keywords: [],
  url: ''
};

export const customServiceLinkForm = writable(customServiceLinkDefaults);
export const clearForm = () => {
  customServiceLinkForm.set(customServiceLinkDefaults);
};
