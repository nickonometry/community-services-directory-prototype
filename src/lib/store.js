// store.js
import { writable } from 'svelte/store';

export const serviceLinkForm = writable({
  serviceType: '',
  title: '',
  description: '',
  feature: null,
  partnerAccess: null,
  icon: '',
  group: '',
  planning: '',
  url: ''
});
