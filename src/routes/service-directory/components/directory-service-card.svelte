<script>
  import { onMount } from 'svelte';
  import { departmentsCache, getDepartmentById } from '../../../globalStore';
  export let service;
  let departmentName = '';

  onMount(() => {
    departmentName = getDepartmentById($departmentsCache, service.departmentId);
  });
</script>

<li>
  <a href={service.url} target="_blank">
    <forge-card>
      <div class="card-inner">
        <div class="icon-container">
          <forge-icon name={service.iconName} external></forge-icon>
        </div>
        <div class="service-details">
          <forge-stack gap="16">
            <p class="forge-typography--heading2" id="button-area-heading">{service.title}</p>
            <p class="forge-typography--body1">{service.description}</p>
            <forge-badge theme="info" class="department-badge" aria-label={`Department: ${departmentName}`}>{departmentName}</forge-badge>
          </forge-stack>
        </div>
      </div>
    </forge-card>
  </a>
</li>

<style lang="scss">
  a {
    text-decoration: none;
    color: inherit;

    &:visited {
      color: inherit;
    }
  }

  li {
    list-style: none;
    padding: 0;
    margin: 0;

    forge-card {
      --forge-card-padding: 0;
    }

    &:hover,
    &:focus-visible {
      border-right: 2px solid var(--forge-theme-secondary);
      border-radius: 4px;
    }
  }

  .card-inner {
    display: grid;
    grid-template-columns: 100px auto;
    transition: border-right 100ms ease-out;
    height: 100%;
  }

  .department-badge {
    --forge-badge-shape: 2px;

    &::part(root) {
      text-wrap: wrap;
      height: auto;
      display: block;
    }
  }

  .icon-container {
    // background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
    // background: var(--branding-primary-color); /* fallback for old browsers */
    // background: -webkit-linear-gradient(var(--branding-primary-color), var(--branding-secondary-color)); /* Chrome 10-25, Safari 5.1-6 */
    // background: linear-gradient(
    //   var(--branding-primary-color),
    //   var(--branding-secondary-color)
    // ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    background-color: var(--branding-primary-color);

    display: grid;
    height: 100%;
    width: 100%;
    place-content: center;
    overflow: hidden;

    forge-icon {
      font-size: 64px;
      color: white;
    }
  }

  .service-details {
    padding: 16px;
  }
</style>
