<script>
  import ServiceCard from '../service-card/service-card.svelte';
  import Banner from './banner/banner.svelte';
  import { servicesCache } from '../../globalStore';
  import BrandedHeader from '../branded-header/branded-header.svelte';
  let popularServices = [];

  // This is just simulating a list of popular services. This would ideally be based on usage analytics
  $servicesCache.forEach((s) => {
    if (s.isPublished && !s.isFeatured) {
      popularServices.push(s);
    }
  });
</script>

<div class="container">
  <forge-scaffold>
    <div slot="header">
      <BrandedHeader />
    </div>
    <div slot="body">
      <div class="page-grid">
        <div class="banner-container">
          <Banner />
        </div>
        <div class="search-container">
          <forge-text-field id="text-field" variant="filled">
            <forge-icon slot="trailing" name="search" external></forge-icon>
            <input type="text" id="text-field-input" placeholder="How can we help you?" />
          </forge-text-field>
        </div>
        <div class="services-card-container">
          <forge-card class="card" raised>
            <forge-toolbar no-border>
              <h3 class="forge-typography--heading3 span-full" slot="start">Featured Services</h3>
              <!-- <forge-button href="/service-directory" slot="end">
                <span>View all services</span>
                <forge-icon name="chevron_right" external></forge-icon>
              </forge-button> -->
            </forge-toolbar>
            <forge-stack gap="32">
              <div class="services-grid">
                {#each $servicesCache as service}
                  {#if service.isFeatured && service.isPublished}
                    <ServiceCard icon={service.iconName} title={service.title} description={service.description} url={service.url} />
                  {/if}
                {/each}
                <div class="view-all-inner span-full">
                  <forge-button href="/service-directory" slot="end" style="--forge-button-height: 96px;">
                    <div class="illo-container">
                      <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 92 92"
                        ><script xmlns=""></script><defs
                          ><style>
                            .cls-1,
                            .cls-11 {
                              fill: none;
                            }
                            .cls-2 {
                              fill: #d0dbf4;
                              fill-rule: evenodd;
                            }
                            .cls-3,
                            .cls-7 {
                              fill: #fff;
                            }
                            .cls-10,
                            .cls-11,
                            .cls-3,
                            .cls-5,
                            .cls-8,
                            .cls-9 {
                              stroke: #586ab1;
                              stroke-width: 2px;
                            }
                            .cls-3,
                            .cls-9 {
                              stroke-miterlimit: 10;
                            }
                            .cls-10,
                            .cls-4 {
                              fill: #5cc5cd;
                            }
                            .cls-5 {
                              fill: #f2f2f2;
                            }
                            .cls-10,
                            .cls-11,
                            .cls-5,
                            .cls-8 {
                              stroke-linecap: round;
                              stroke-linejoin: round;
                            }
                            .cls-6,
                            .cls-9 {
                              fill: #d1d1d1;
                            }
                            .cls-7 {
                              opacity: 0.59;
                            }
                            .cls-8 {
                              fill: #fcbf12;
                            }
                          </style></defs
                        ><title>search-courses-spot</title><rect class="cls-1" x="0.09" y="0.05" width="92" height="92" /><path
                          class="cls-2"
                          d="M46.1,82a36,36,0,1,0-36-36A36,36,0,0,0,46.1,82Z" /><path
                          class="cls-3"
                          d="M72,76.68H23.59a.73.73,0,0,1-.3-.06.78.78,0,0,1-.48-.71V17.24a.73.73,0,0,1,.06-.3.8.8,0,0,1,.72-.47H60.64s12.13,13.59,12.13,14V75.91a.73.73,0,0,1-.06.3A.78.78,0,0,1,72,76.68Z" /><polygon
                          class="cls-4"
                          points="67.72 24.6 23.83 24.67 23.83 17.25 61.5 17.18 67.72 24.6" /><path
                          class="cls-5"
                          d="M60.72,29.57l11.2-.11L61.61,17.71,59.35,28a1.49,1.49,0,0,0,0,.78C59.44,29.18,59.78,29.57,60.72,29.57Z" /><circle
                          class="cls-6"
                          cx="30.63"
                          cy="35.3"
                          r="3" /><rect class="cls-6" x="36.09" y="33.11" width="30.62" height="4.37" rx="1" /><circle
                          class="cls-6"
                          cx="30.63"
                          cy="45.21"
                          r="3" /><rect class="cls-6" x="36.09" y="43.02" width="30.62" height="4.37" rx="1" /><circle
                          class="cls-6"
                          cx="30.63"
                          cy="55.13"
                          r="3" /><rect class="cls-6" x="36.09" y="52.94" width="30.62" height="4.37" rx="1" /><circle
                          class="cls-6"
                          cx="30.63"
                          cy="65.04"
                          r="3" /><rect class="cls-6" x="36.09" y="62.85" width="30.62" height="4.37" rx="1" /><circle
                          class="cls-7"
                          cx="53.29"
                          cy="57.37"
                          r="13.03" /><rect
                          class="cls-8"
                          x="64.27"
                          y="65.49"
                          width="3.77"
                          height="9.01"
                          transform="translate(-30.09 66.36) rotate(-44.45)" /><path
                          class="cls-9"
                          d="M42.53,46.3a15.55,15.55,0,1,0,22,.21A15.55,15.55,0,0,0,42.53,46.3Zm19,3.18a11.31,11.31,0,1,1-16-.15A11.32,11.32,0,0,1,61.49,49.48Z" /><path
                          class="cls-10"
                          d="M75.58,84.27,66.3,74.8,71,70.17l9.29,9.46c.21.23.36.31.54.54,1.2,1.49,1.42,3.5.07,4.82a3.61,3.61,0,0,1-4.85-.19Z" /><line
                          class="cls-11"
                          x1="69.08"
                          y1="77.15"
                          x2="73.31"
                          y2="73.03" /><script xmlns=""></script></svg>
                    </div>
                    <span>View all services</span>
                    <forge-icon name="chevron_right" external></forge-icon>
                  </forge-button>
                </div>
              </div>

              <!-- <div class="services-grid">
                <h3 class="forge-typography--heading3 span-full">Popular Services</h3>
                {#each popularServices.slice(0, 5) as service}
                  {#if service.isPublished && !service.isFeatured}
                    <ServiceCard icon={service.iconName} title={service.title} description={service.description} />
                  {/if}
                {/each}
              </div> -->
            </forge-stack>
          </forge-card>
        </div>
      </div>
    </div>
  </forge-scaffold>
</div>

<style lang="scss">
  @import '../../mixins.scss';

  .container {
    background-color: var(--forge-theme-surface-dim);
    height: 100%;
  }

  .card {
    --forge-card-padding: 0;
  }

  .mobile-nav {
    display: none;
  }

  .page-grid {
    @include card-overlay-page-grid();
  }

  .banner-container {
    grid-column: 1;
    grid-row: 1/5;
    z-index: 1;
  }

  .logo {
    // height: 100%;
    width: 250px;
  }

  .white-button {
    --forge-button-color: white;
  }

  .services-card-container {
    z-index: 2;
    max-width: 1264px;
    width: 100%;
    margin: 0 auto;
    grid-column: 1;
    grid-row: 4/12;
  }

  .search-container {
    z-index: 2;
    grid-column: 1;
    grid-row: 2;
    margin: 0 auto;
    max-width: 600px;
    width: 100%;
    padding-inline: 16px;

    forge-text-field {
      padding-block-start: 24px;
    }
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1rem;
    height: fit-content;
    padding: 16px;
  }

  .view-all-inner {
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .illo-container {
    max-width: 72px;
    height: 100%;
    svg {
      height: 100%;
      width: 100%;
    }
  }

  @media screen and (max-width: 860px) {
    .services-card-container {
      padding: 16px;
    }
    .desktop-nav {
      display: none;
    }

    .mobile-nav {
      display: block;
    }
  }
</style>
