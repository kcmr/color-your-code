import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {highlightMixin} from '../cyc-mixins/cyc-highlight-mixin.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '../cyc-icons/cyc-icons.js';

/**
 * Contains the editor tabs.
 * @polymer
 * @customElement
 * @extends {highlightMixin}
 * @extends {PolymerElement}
 */
class CycEditorTabs extends highlightMixin(PolymerElement) {
  static get template() {
    return html`
    <link rel="stylesheet" href="../cyc-styles/cyc-shared-styles.css" inline>
    <link rel="stylesheet" href="cyc-editor-tabs.css" inline>

    <template is="dom-repeat" items="[[tabs]]">
      <div
        class$="tab [[_computeValue(item.active, 'active')]]"
        data-prop$="[[_computeValue(item.active, 'tab.activeBackground', 'tab.inactiveBackground')]]"
        on-mouseenter="_onSectionMouseenter">
        <span
          class="tab__foreground"
          data-prop$="[[_computeValue(item.active, 'tab.activeForeground', 'tab.inactiveForeground')]]"
          on-mouseenter="_onSectionMouseenter">[[item.name]]</span>
        <iron-icon icon="cyc:close" class="icon"></iron-icon>
        <span
          class="tab__border-bottom"
          data-prop="tab.activeBorder"
          on-mouseenter="_onSectionMouseenter"></span>
      </div>
    </template>
    `;
  }

  static get properties() {
    return {
      /**
       * List of tabs with the file name and the active state.
       * @type {Array}
       */
      tabs: {
        type: Array,
      },
    };
  }
}

window.customElements.define('cyc-editor-tabs', CycEditorTabs);
