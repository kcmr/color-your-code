import {html, css} from 'lit-element';
import {styles as sharedStyles} from '../cyc-styles/cyc-shared-styles.css.js';
import {styles} from './cyc-editor-tabs.css.js';
import {HighlightMixin} from '../cyc-mixins/cyc-highlight-mixin.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '../cyc-icons/cyc-icons.js';

/**
 * Contains the editor tabs.
 * @customElement
 * @extends {HighlightMixin}
 */
class CycEditorTabs extends HighlightMixin {
  static get styles() {
    return css`
      ${sharedStyles}
      ${styles}`;
  }

  render() {
    return html`
    ${this.tabs.map((item) => html`
      <div
        class="tab ${this._computeValue(item.active, 'active')}"
        data-prop="${this._computeValue(item.active, 'tab.activeBackground', 'tab.inactiveBackground')}"
        @mouseenter="${this._onSectionMouseenter}">
        <span
          class="tab__foreground"
          data-prop="${this._computeValue(item.active, 'tab.activeForeground', 'tab.inactiveForeground')}"
          @mouseenter="${this._onSectionMouseenter}">${item.name}</span>
        <iron-icon icon="cyc:close" class="icon"></iron-icon>
        <span
          class="tab__border-right"
          data-prop="tab.border"
          @mouseenter="${this._onSectionMouseenter}"></span>
        <span
          class="tab__border-bottom"
          data-prop="tab.activeBorder"
          mouseenter="${this._onSectionMouseenter}"></span>
      </div>
    `)}
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
