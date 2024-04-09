// store.js
import { writable } from 'svelte/store';

// Custom service link form
const customServiceLinkDefaults = {
  title: '',
  description: '',
  departmentId: '',
  functions: [],
  isFeatured: false,
  isPublished: false,
  iconName: '',
  keywords: [],
  url: ''
};

export const customServiceLinkForm = writable(customServiceLinkDefaults);
export const clearForm = () => {
  customServiceLinkForm.set(customServiceLinkDefaults);
};
