// store.js
import { writable } from 'svelte/store';

// Custom service link form
const customServiceLinkDefaults = {
  tylerService: false,
  serviceType: '',
  serviceTitle: '',
  serviceDescription: '',
  department: {
    label: '',
    value: ''
  },
  isFeatured: false,
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
