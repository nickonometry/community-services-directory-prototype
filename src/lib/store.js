// store.js
import { writable } from 'svelte/store';

export const customServiceLinkForm = writable({
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
});
