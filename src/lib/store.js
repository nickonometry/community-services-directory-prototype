// store.js
import { writable } from 'svelte/store';

const defaults = {
  serviceType: '',
  serviceTitle: '',
  serviceDescription: '',
  isFeatured: false,
  allowPartnerAccess: false,
  status: '',
  icon: '',
  group: '',
  planning: '',
  url: ''
};

export const customServiceLinkForm = writable(defaults);
export const clearForm = () => {
  customServiceLinkForm.set(defaults);
};
