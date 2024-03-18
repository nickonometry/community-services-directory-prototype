import { browser } from '$app/environment';
import confirmationDialog from '../confirmation-dialog/confirmation-dialog.svelte';

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
