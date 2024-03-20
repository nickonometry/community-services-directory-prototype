<script>
  export let service;
</script>

<li>
  <forge-card>
    <forge-button-area id="button-area">
      <button slot="button" aria-labelledby="button-area-heading"></button>
      <div class="card-inner">
        <div class="icon-container">
          <forge-icon name={service.iconName} external></forge-icon>
        </div>
        <div class="service-details">
          <forge-stack gap="16">
            <p class="forge-typography--heading2" id="button-area-heading">{service.serviceTitle}</p>
            <p class="forge-typography--body1">{service.serviceDescription}</p>
            <forge-badge theme="info" class="department-badge">{service.department.label}</forge-badge>
          </forge-stack>
        </div>
      </div>
    </forge-button-area>
  </forge-card>
</li>

<style lang="scss">
  li {
    --primary: #003b4d;
    --primary-light: #01455a;

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
    // background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
    background: var(--primary); /* fallback for old browsers */
    background: -webkit-linear-gradient(var(--primary), var(--primary-light)); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(var(--primary), var(--primary-light)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

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
