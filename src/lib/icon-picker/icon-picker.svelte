<script>
  import iconJson from '@tylertech/tyler-icons/tyler-icons-metadata-svg.json';
  import { createEventDispatcher, onMount } from 'svelte';
  import { customServiceLinkForm } from '../custom-form-store';
  export let value;
  let standardIcons = iconJson[1].icons;
  let icons = standardIcons;
  let autocomplete;
  let iconArraySize = 100;
  let iconSelected = '';
  const dispatch = createEventDispatcher();

  onMount(() => {
    icons = standardIcons.map((icon) => {
      return {
        label: icon.name,
        value: icon.name,
        svg: icon.data
      };
    });

    // icons.splice(0, 0, { label: '', value: '', svg: '' });

    const filter = (filterText, value) => {
      return icons.filter((icon) => icon.label.toLowerCase().includes(filterText.toLowerCase()));
    };
    autocomplete.filter = filter;
    autocomplete.optionBuilder = optionBuilder;

    if ($customServiceLinkForm.iconName) {
      onIconSelected($customServiceLinkForm.iconName);
      autocomplete.value = $customServiceLinkForm.iconName;
    }
  });

  const dispatchSelectedValue = (iconName) => {
    dispatch('icon-selected', iconName);
  };

  const onScrollToBottom = () => {
    iconArraySize = iconArraySize + 100;
    let options = getNext100Icons();
    autocomplete.appendOptions(options);
  };

  const onIconSelected = (iconName) => {
    dispatchSelectedValue(iconName);
    if (!iconName) {
      iconSelected = '';
      return;
    }
    iconSelected = iconName;
  };

  const getNext100Icons = () => {
    return standardIcons.slice(iconArraySize, iconArraySize + 100).map((icon) => {
      return {
        label: icon.name,
        value: icon.name,
        svg: icon.data
      };
    });
  };

  const highlightText = (option, filterText) => {
    const text = option.label.toLowerCase();
    const startIndex = text.indexOf(filterText.toLowerCase());
    const endIndex = startIndex + filterText.length;
    const span = document.createElement('span');
    span.innerHTML =
      option.label.substring(0, startIndex) + '<b>' + option.label.substring(startIndex, endIndex) + '</b>' + option.label.substring(endIndex);
    return span;
  };

  const optionBuilder = (option, filterText) => {
    const item = document.createElement('div');
    item.style.display = 'flex';
    item.style.alignItems = 'center';
    item.style.gap = '24px';

    const icon = document.createElement('forge-icon');
    icon.name = option.value;
    icon.external = true;
    icon.style.fontSize = '36px';
    icon.style.color = 'var(--forge-theme-text-medium)';
    item.appendChild(icon);

    const label = document.createElement('div');
    label.style.flex = '1';
    label.appendChild(highlightText(option, filterText));
    item.appendChild(label);

    return item;
  };
</script>

<div class="icon-picker-container">
  {#if iconSelected.length}
    <forge-icon name={iconSelected} external class="preview-icon"></forge-icon>
  {/if}
  {#if !iconSelected.length}
    <div class="preview-icon-empty">
      <span class="forge-typography--label">Preview</span>
    </div>
  {/if}
  <forge-autocomplete
    bind:this={autocomplete}
    option-limit="100"
    observe-scroll="true"
    on:forge-autocomplete-scrolled-bottom={onScrollToBottom}
    on:forge-autocomplete-change={(e) => onIconSelected(e.detail)}>
    <forge-text-field>
      <input type="text" id="icon" />
      <label for="icon">Select an icon</label>
      <forge-icon-button data-forge-autocomplete-clear slot="trailing">
        <forge-icon name="close" external></forge-icon>
      </forge-icon-button>
      <forge-icon slot="trailing" name="arrow_drop_down" external data-forge-dropdown-icon></forge-icon>
    </forge-text-field>
  </forge-autocomplete>
</div>

<style lang="scss">
  forge-text-field::part(root) {
    background: white;
  }
  .icon-picker-container {
    display: grid;
    grid-template-columns: auto 9fr;
    gap: 56px;
    align-items: center;
    padding: 40px;
    background-color: rgb(250, 250, 250);
    border-radius: 4px;
    border: 1px solid var(--forge-theme-text-lowest);
  }

  .preview-icon {
    font-size: 72px;
    color: var(--forge-theme-text-medium);
  }

  .preview-icon-empty {
    border: 2px dashed var(--forge-theme-text-lowest);
    padding: 16px;
    height: 72px;
    width: 72px;
    box-sizing: border-box;
    display: grid;
    place-content: center;
  }
</style>
