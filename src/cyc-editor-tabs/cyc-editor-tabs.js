import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '../cyc-icons/cyc-icons.js';

/**
 * Contains the editor tabs.
 * @polymer
 * @customElement
 * @extends {PolymerElement}
 */
class CycEditorTabs extends PolymerElement {
  static get template() {
    return html`
    <link rel="stylesheet" href="cyc-editor-tabs.css" inline>

    <template is="dom-repeat" items="[[tabs]]">
      <div class$="tab [[_computeClass(item.active)]]">
        <span class="tab__foreground">[[item.name]]</span>
        <iron-icon icon="cyc:close" class="icon"></iron-icon>
        <span class="tab__border-bottom"></span>
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

  _computeClass(active) {
    return active ? 'active' : '';
  }
}

window.customElements.define('cyc-editor-tabs', CycEditorTabs);
