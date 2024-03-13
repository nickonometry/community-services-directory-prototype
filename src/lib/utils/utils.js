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
