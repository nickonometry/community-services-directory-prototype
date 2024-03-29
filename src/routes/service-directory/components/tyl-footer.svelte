<div class="container">
  <footer>
    <forge-stack inline wrap justify="center">
      <a href="#">City of Portland</a>
      <span> | </span>
      <a href="#">Contact</a>
      <span> | </span>
      <a href="#">Terms of Use</a>
      <span> | </span>
      <a href="#">Privacy Policy</a>
      <span> | </span>
      <span>© City of Portland 2024</span>
    </forge-stack>
    <div class="logo">
      <img src="https://cdn.forge.tylertech.com/v1/images/branding/tyler/tyler-empowered-logo-white.svg" alt="Empowered by Tyler Technologies" />
    </div>
  </footer>
</div>

<style lang="scss">
  .container {
    container-type: inline-size;
  }

  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    height: 80px;
    background-color: #424242;
  }

  a,
  span {
    color: white !important;
  }

  @media screen and (max-width: 960) {
    .footer {
      flex-direction: column;
      gap: 24px;
      text-align: center;
    }
  }

  @container (max-width: 860px) {
    footer {
      flex-direction: column;
      gap: 24px;
      justify-content: center;
      padding-block: 24px;
      height: auto;
    }
  }
</style>
