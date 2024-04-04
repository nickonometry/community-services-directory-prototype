import { browser } from '$app/environment';
import { createClient } from '@supabase/supabase-js';
import confirmationDialog from '../confirmation-dialog/confirmation-dialog.svelte';

// Create a single supabase client for interacting with your database
const supabase = createClient(
  'https://qvzkrcareiwjjtdahkcs.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2emtyY2FyZWl3amp0ZGFoa2NzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIyMzkzODUsImV4cCI6MjAyNzgxNTM4NX0.LlfLGH8Ux7H_y0LoUDBr05V1Pgor_zs2vr3ufJ80I6M'
);

export const openConfirmationDialog = (message) => {
  if (browser) {
    const dialog = document.createElement('forge-dialog');
    document.body.append(dialog);
    dialog.open = true;
    let pd = new confirmationDialog({
      target: dialog,
      props: { dialogRef: dialog, message: message }
    });
  }
};

export const openToast = (message) => {
  if (browser) {
    const toast = document.createElement('forge-toast');
    toast.message = message;
    document.body.appendChild(toast);
  }
};

export const popoverA11y = (e, showExpanded) => {
  e.target.setAttribute('aria-expanded', showExpanded);
};

export const updateServices = async (services) => {
  const { data, error } = await supabase.storage.from('services').upload('services_update.json', JSON.stringify(services), {
    cacheControl: '0',
    upsert: true,
    contentType: 'application/json'
  });

  if (error) {
    console.log(error);
  }
};
