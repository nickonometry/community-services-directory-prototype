<script>
  import { onMount } from 'svelte';
  import HelpPopup from '../help-popup/help-popup.svelte';
  import { popoverA11y } from '../utils/utils';
  let keywordInput;
  export let keywords = [];

  onMount(() => {
    keywordInput.addEventListener('forge-chip-field-member-added', onMemberAdded);
    keywordInput.addEventListener('forge-chip-field-member-removed', onMemberRemoved);

    if (keywords.length) {
      keywords.forEach((v) => {
        let obj = {};
        obj.detail = v;
        onMemberAdded(obj);
      });
    }
  });

  const onMemberAdded = (event) => {
    const name = event.detail;
    const newChip = document.createElement('forge-chip');
    newChip.setAttribute('slot', 'member');
    newChip.setAttribute('type', 'field');
    newChip.setAttribute('dense', '');
    newChip.addEventListener('forge-chip-delete', onChipRemoveButtonClicked);
    newChip.value = name;
    newChip.textContent = name;

    keywordInput.appendChild(newChip);
  };

  const onMemberRemoved = (event) => {
    event.detail.remove();
  };

  const onChipRemoveButtonClicked = (event) => {
    event.target.remove();
  };
</script>

<forge-chip-field bind:this={keywordInput} add-on-blur>
  <div slot="trailing">
    <div class="custom-icon">
      <forge-icon-button
        dense
        id="keywords-popover"
        aria-expanded="false"
        on:blur={(e) => popoverA11y(e, false)}
        on:mouseleave={(e) => popoverA11y(e, false)}
        on:focus={(e) => popoverA11y(e, true)}
        on:mouseenter={(e) => popoverA11y(e, true)}>
        <forge-icon name="help_outline" external></forge-icon>
      </forge-icon-button>
    </div>
    <forge-popover trigger-type="hover" arrow hover-delay="500" aria-labelledby="keywords-popover" role="region">
      <div class="popup-container">
        <HelpPopup
          title="Tags"
          imageUrl="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2344&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
          <p>
            Tags help a citizen find a particular service when searching or filtering in the Service Directory. A tag is one of the default tools you
            can use to categorize your services.
          </p>
          <p>
            Each service can contain multiple tags, your residents can use them to find similar services that have that same tag. Unlike service
            departments or groups, tags are completely optional.
          </p>
        </HelpPopup>
      </div>
    </forge-popover>
  </div>
  <label slot="label" for="tag-input">Tags</label>
  <input type="text" id="tag-input" />
  <div slot="helper-text">Press enter to add a tag</div>
</forge-chip-field>

<style lang="scss">
  @import '../../mixins.scss';
  .popup-container {
    @include responsive-help-popover-container;
  }
</style>
