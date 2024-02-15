<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { servicesCache } from '../globalStore';
  import previewDialog from '../lib/preview-dialog/preview-dialog.svelte';
  import { randomBrightColorPicker } from '../lib/utils/color-picker';

  let table;
  let services = $servicesCache.data.data.sort((a, b) =>
    a.serviceTitle.toLowerCase() > b.serviceTitle.toLowerCase() ? 1 : b.serviceTitle.toLowerCase() > a.serviceTitle.toLowerCase() ? -1 : 0
  );

  const createIcon = (iconName) => {
    let icon = document.createElement('forge-icon');
    icon.name = iconName;
    icon.setAttribute('external', 'true');
    return icon;
  };

  const createServiceAvatarIcon = (index, div, data) => {
    let avatar = document.createElement('forge-avatar');
    avatar.style.setProperty('--forge-avatar-background', randomBrightColorPicker());
    let icon = createIcon(data.iconName);
    icon.style.color = 'white';
    avatar.appendChild(icon);
    return avatar;
  };

  const createFeaturedIcon = (index, div, data) => {
    if (!data.isFeatured) {
      return;
    }
    let icon = createIcon('check_circle');
    icon.style.color = 'var(--forge-theme-tertiary)';
    return icon;
  };

  const createPartnerAccessIcon = (index, div, data) => {
    if (!data.allowPartnerAccess) {
      return;
    }
    let icon = createIcon('groups');
    icon.style.color = 'var(--forge-theme-on-secondary-container)';
    return icon;
  };

  const createActionIconButton = () => {
    let iconButton = document.createElement('forge-icon-button');
    iconButton.ariaLabel = 'Edit this service';
    let icon = createIcon('chevron_right');
    icon.style.color = 'var(--forge-theme-text-medium)';
    iconButton.appendChild(icon);
    return iconButton;
  };

  const createStatusBadge = (index, div, data) => {
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

  let columnConfigurations = [
    {
      property: 'iconName',
      template: (i, div, data) => createServiceAvatarIcon(i, div, data),
      width: '96px'
    },
    {
      property: 'serviceTitle',
      header: 'Service Name',
      sortable: true,
      initialSort: true,
      filter: true,
      width: '50ch'
    },
    {
      property: 'serviceDescription',
      header: 'Service Description',
      sortable: true,
      initialSort: true,
      filter: true
    },
    {
      property: 'lastAccessDate',
      header: 'Last Accessed',
      sortable: true,
      filter: true,
      width: '150px'
    },
    {
      property: 'department',
      header: 'Department',
      sortable: true,
      filter: true
    },
    {
      property: 'status',
      header: 'Status',
      sortable: true,
      filter: true,
      template: (i, div, data) => createStatusBadge(i, div, data)
    },
    {
      property: 'isFeatured',
      header: 'Featured',
      sortable: true,
      filter: true,
      template: (i, div, data) => createFeaturedIcon(i, div, data),
      align: 'center'
    },
    {
      property: 'allowPartnerAccess',
      header: 'Allow partner access',
      sortable: true,
      filter: true,
      template: (i, div, data) => createPartnerAccessIcon(i, div, data),
      align: 'center'
    },
    {
      property: 'actions',
      header: '',
      sortable: true,
      filter: true,
      template: (i, div, data) => createActionIconButton(i, div, data)
    }
  ];

  onMount(() => {
    table = document.querySelector('forge-table');
    table.data = services;
    table.columnConfigurations = columnConfigurations;
  });

  const openFullPreview = () => {
    if (browser) {
      const dialog = document.createElement('forge-dialog');
      document.body.append(dialog);
      dialog.open = true;
      let pd = new previewDialog({
        target: dialog,
        props: { dialogRef: dialog }
      });
    }
  };
</script>

<div class="page-container">
  <forge-card class="table-card">
    <forge-toolbar>
      <h2 slot="start" class="forge-typography--heading3">Services</h2>
      <forge-stack slot="end" inline>
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div>
          <forge-button on:click={openFullPreview}>
            <forge-icon name="preview" external></forge-icon>
            <span>Resident preview</span>
          </forge-button>
          <forge-tooltip>Preview what the public service directory looks like on your city website</forge-tooltip>
        </div>
        <forge-button href="/create-service-link" variant="outlined">
          <forge-icon name="add" external></forge-icon>
          <span>Add a service</span>
        </forge-button>
      </forge-stack>
    </forge-toolbar>
    {#if services.length}
      <forge-table data={services} {columnConfigurations} roomy></forge-table>
    {/if}
  </forge-card>
</div>

<style>
  .page-container {
    padding: 16px;
  }

  .table-card {
    --forge-card-padding: 0;
  }
</style>
