<script>
  import { onMount } from 'svelte';
  let map;
  let splitViewPanel;
  let currentCoordinateX;
  let currentCoordinateY;
  let zoom = 20;

  const setMapView = (x, y) => {
    currentCoordinateX = x;
    currentCoordinateY = y;
    map = L.map('map').setView([x, y], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: zoom
    }).addTo(map);
  };

  onMount(() => {
    setMapView(10, -10);
  });

  const setToOob = () => {
    console.log('clicked');
    map.off();
    map.remove();
    setMapView(43.5178, -70.3773);
  };

  const adjustZoom = () => {
    // map.off();
    // map.remove();

    let m = L.map('map');
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 50
    });
  };
</script>

<forge-split-view>
  <forge-split-view-panel>
    <div class="form-container">
      <forge-card style="--forge-card-padding: 0">
        <forge-toolbar no-border>
          <h3 slot="start" class="forge-typography--heading3">Search for partner services</h3>
        </forge-toolbar>
        <forge-stack style="padding: 16px;">
          <button on:click={adjustZoom}>Adjust zoom</button>
          <forge-slider></forge-slider>
          <forge-text-field>
            <input type="text" id="input-text-01" />
            <label for="input-text-01" slot="label">Text field</label>
          </forge-text-field>
          <forge-text-field>
            <input type="text" id="input-text-01" />
            <label for="input-text-01" slot="label">Text field</label>
          </forge-text-field>
          <forge-text-field>
            <input type="text" id="input-text-01" />
            <label for="input-text-01" slot="label">Text field</label>
          </forge-text-field>
        </forge-stack>
      </forge-card>
    </div>
  </forge-split-view-panel>
  <forge-split-view-panel size="50%" bind:this={splitViewPanel}>
    <div id="map"></div>
  </forge-split-view-panel>
</forge-split-view>

<div class="container"></div>

<style>
  #map {
    height: calc(100dvh - 56px);
    width: 100%;
  }

  .form-container {
    padding: 16px;
  }
</style>
