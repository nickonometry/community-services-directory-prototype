import { randomBrightColorPicker } from '../utils/color-picker';
import { customServiceLinkForm } from '../custom-form-store';

export const createIcon = (iconName) => {
  let icon = document.createElement('forge-icon');
  icon.name = iconName;
  icon.setAttribute('external', 'true');
  return icon;
};

export const createServiceAvatarIcon = (index, div, data) => {
  let avatar = document.createElement('forge-avatar');
  avatar.style.setProperty('--forge-avatar-background', randomBrightColorPicker());
  let icon = createIcon(data.iconName);
  icon.style.color = 'white';
  avatar.appendChild(icon);
  return avatar;
};

export const createFeaturedIcon = (index, div, data) => {
  if (!data.isFeatured) {
    return;
  }
  let icon = createIcon('check_circle');
  icon.style.color = 'var(--forge-theme-tertiary)';
  return icon;
};

export const createPartnerAccessIcon = (index, div, data) => {
  if (!data.allowPartnerAccess) {
    return;
  }
  let icon = createIcon('groups');
  icon.style.color = 'var(--forge-theme-on-secondary-container)';
  return icon;
};

export const createActionIconButton = (index, div, data) => {
  let iconButton = document.createElement('forge-icon-button');
  iconButton.href = `/edit-service?name=${data.id}`;
  iconButton.ariaLabel = 'Edit this service';
  let icon = createIcon('chevron_right');
  icon.style.color = 'var(--forge-theme-text-medium)';
  iconButton.appendChild(icon);
  iconButton.addEventListener('click', () => {
    customServiceLinkForm.set(data);
  });
  return iconButton;
};

export const createStatusBadge = (index, div, data) => {
  let badge = document.createElement('forge-badge');
  // badge.innerText = data.status;
  // badge.style.setProperty('--forge-badge-shape', '4px');
  if (data.status.toLowerCase() === 'active') {
    badge.theme = 'success';
    badge.setAttribute('strong', 'false');
    badge.innerText = 'Published';
  } else {
    badge.theme = 'info-secondary';
    badge.innerText = 'Unpublished';
  }
  return badge;
};
