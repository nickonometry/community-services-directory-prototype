<div class="banner">
  <div class="banner__heading">
    <forge-stack gap="8px">
      <h2 class="forge-typography--display7 heading" id="title">City of Portland Services</h2>
    </forge-stack>
  </div>
</div>

<style lang="scss">
  .banner {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100%;
    width: 100%;
    position: relative;
    padding: 5vh 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 300ms ease-out;
    background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.7)), url('/portland-banner.avif');
  }

  .banner__heading {
    display: grid;
    gap: 24px;
    text-align: center;
    color: white;
    max-width: 1024px;
    margin-block-end: 64px;
    padding: 24px;
  }

  h2,
  p {
    margin: 0;
    padding: 0;
  }

  @media screen and (max-width: 768px) {
    .heading {
      font-size: 48px;
      line-height: normal;
    }
  }

  @media screen and (max-width: 400px) {
    .heading {
      font-size: 40px;
      line-height: normal;
    }
  }
</style>
