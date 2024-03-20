<script>
  export let service;
  console.log(service);
</script>

<a href="http://www.google.com" target="_blank" forge-ignore>
  <li>
    <forge-card>
      <div class="card-inner">
        <div class="icon-container">
          <forge-icon name={service.iconName} external></forge-icon>
        </div>
        <div class="service-details">
          <forge-stack gap="16">
            <p class="forge-typography--heading2">{service.serviceTitle}</p>
            <p class="forge-typography--body1">{service.serviceDescription}</p>
            <forge-badge theme="info" class="department-badge">{service.department.label}</forge-badge>
          </forge-stack>
        </div>
      </div>
    </forge-card>
  </li>
</a>

<style lang="scss">
  a {
    text-decoration: none;
    color: inherit;

    &:hover,
    &:focus-visible {
      cursor: pointer;
      outline-offset: 4px;
      .card-inner {
        background-color: var(--forge-theme-surface-dim);
        border-right: 4px solid var(--forge-theme-secondary);
      }
    }
  }

  li {
    list-style: none;
    padding: 0;
    margin: 0;

    forge-card {
      --forge-card-padding: 0;
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
    background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);

    display: grid;
    height: 100%;
    width: 100%;
    place-content: center;
    overflow: hidden;

    forge-icon {
      font-size: 64px;
    }
  }

  .service-details {
    padding: 16px;
  }
</style>
