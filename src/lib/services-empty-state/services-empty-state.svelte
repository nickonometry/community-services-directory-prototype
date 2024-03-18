<div class="empty-state-container padding-16 span-full">
  <!-- <img src="https://cdn.forge.tylertech.com/v1/images/spot-hero/no-search-results-spot-hero.svg" alt="" />
  <p class="forge-typography--body1">No services match your filter criteria. Please adjust and try again</p> -->
  <forge-page-state>
    <img src="https://cdn.forge.tylertech.com/v1/images/spot-hero/no-search-results-spot-hero.svg" slot="graphic" alt="" />
    <div slot="message">No services match your filter criteria. Please adjust and try again</div>
  </forge-page-state>
</div>

<style>
  .empty-state-container {
    max-width: 768px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    text-align: center;
  }
  img {
    width: 100%;
    max-width: 320px;
    height: auto;
  }
</style>
