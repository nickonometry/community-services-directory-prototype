import { randomBrightColorPicker } from '../utils/color-picker';
import { customServiceLinkForm } from '../custom-service-link-form/custom-service-link-form-store';
import publishToggle from '../publish-toggle/publish-toggle.svelte';
import featuredToggle from '../featured-toggle/featured-toggle.svelte';
import { avatarCache, departmentsCache } from '../../globalStore';

export const createIcon = (iconName) => {
  let icon = document.createElement('forge-icon');
  icon.name = iconName;
  icon.setAttribute('external', 'true');
  return icon;
};

const checkIfAvatarExists = (propertyName) => {
  let avatar$;
  avatarCache.subscribe((val) => {
    avatar$ = val;
  });

  for (let i = 0; i < avatar$.length; i++) {
    const obj = avatar$[i];
    if (propertyName in obj) {
      return obj;
    }
  }
  return null;
};

export const createServiceAvatarIcon = (index, div, data) => {
  let avatarAlreadyCreated = checkIfAvatarExists(data.iconName);
  if (avatarAlreadyCreated) {
    return avatarAlreadyCreated[data.iconName];
  }

  let avatar = document.createElement('forge-avatar');
  avatar.style.setProperty('--forge-avatar-background', randomBrightColorPicker());
  let icon = createIcon(data.iconName);
  icon.style.color = 'white';
  avatar.appendChild(icon);
  avatarCache.update((a) => {
    a.push({
      [data.iconName]: avatar
    });
    return a;
  });
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

export const createDepartmentElement = (index, div, data) => {
  let $departmentsCache;
  departmentsCache.subscribe((val) => {
    $departmentsCache = val;
  });
  let departmentName;
  if (data.departmentId) {
    return (departmentName = $departmentsCache.find((dc) => dc.id === data.departmentId).name);
  } else {
    return 'No department defined';
  }
};

export const createActionIconButton = (index, div, data) => {
  let iconButton = document.createElement('forge-icon-button');
  iconButton.href = `/edit-service?id=${data.id}`;
  iconButton.ariaLabel = 'Edit this service';
  let icon = createIcon('chevron_right');
  icon.style.color = 'var(--forge-theme-text-medium)';
  iconButton.appendChild(icon);
  iconButton.addEventListener('click', (e) => {
    e.preventDefault();
    // customServiceLinkForm.set(data);
  });
  return iconButton;
};

export const createStatusBadge = (index, div, data) => {
  let badge = document.createElement('forge-badge');
  badge.innerText = data.status;
  // badge.style.setProperty('--forge-badge-shape', '4px');
  if (data.status.toLowerCase() === 'published') {
    badge.theme = 'success';
    badge.setAttribute('strong', 'false');
  } else {
    badge.theme = 'info-secondary';
  }
  return badge;
};

export const createStatusToggle = (index, div, data) => {
  div.id = `status-toggle-${index}`;
  let st = new publishToggle({
    props: {
      index: index,
      service: data
    },
    target: div
  });
  div.setAttribute('data-cell-template-stop-propagation', '');
  div.setAttribute('data-cell-template', '');
};

export const createFeaturedToggle = (index, div, data) => {
  div.id = `featured-toggle-${index}`;
  let ft = new featuredToggle({
    props: {
      index: index,
      service: data,
      status: data.isFeatured
    },
    target: div
  });
  div.setAttribute('data-cell-template-stop-propagation', '');
  div.setAttribute('data-cell-template', '');
};
