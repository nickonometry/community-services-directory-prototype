// store.js
import { writable } from 'svelte/store';

const defaults = {
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

export const customServiceLinkForm = writable(defaults);
export const clearForm = () => {
  customServiceLinkForm.set(defaults);
};