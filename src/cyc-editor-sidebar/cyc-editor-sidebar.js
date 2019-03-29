import {html} from 'lit-element';
import {HighlightMixin} from '../cyc-mixins/cyc-highlight-mixin.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';

/**
 * `<cyc-editor-sidebar>` displays the editor sidebar.
 * @customElement
 * @extends {HighlightMixin}
 */
class CycEditorSidebar extends HighlightMixin {
  render() {
    return html`
    <link rel="stylesheet" href="../cyc-styles/cyc-shared-styles.css" inline>
    <link rel="stylesheet" href="cyc-editor-sidebar.css" inline>

    <div class="heading panel-heading"
      data-prop="sideBarTitle.foreground"
      @mouseenter="${this._onSectionMouseenter}">Explorer</div>

    <div class="sidebar-panel">
      <div class="heading sidebar-heading"
        data-prop="sideBarSectionHeader.background"
        @mouseenter="${this._onSectionMouseenter}">
        <span class="sidebar-heading__foreground"
          data-prop="sideBarSectionHeader.foreground"
          @mouseenter="${this._onSectionMouseenter}">Some project</span>
      </div>

      <ul class="files">
      ${this.files.map((item) => html`
        <li class="file ${this._computeClass(item)}"
          data-prop="${this._computeFileBackgroundDataProp(item)}"
          @mouseenter="${this._onSectionMouseenter}">
          <span class="file__foreground"
            data-prop="${this._computeFileForegroundDataProp(item)}"
            @mouseenter="${this._onSectionMouseenter}">${item.name}</span>
        </li>
      `)}
      </ul>
    </div>
    `;
  }

  static get properties() {
    return {
      /**
       * List of files.
       */
      files: {
        type: Array,
      },
    };
  }

  _computeClass(item) {
    const {modified, untracked, selected} = item;

    return this._classString({
      'modified': modified,
      'untracked': untracked,
      'selected': selected,
    });
  }

  _computeFileBackgroundDataProp(item) {
    return (item.selected)
      ? 'list.inactiveSelectionBackground'
      : 'list.hoverBackground';
  }

  _computeFileForegroundDataProp(item) {
    const {modified, untracked, selected} = item;

    return this._classString({
      'gitDecoration.modifiedResourceForeground': modified,
      'gitDecoration.untrackedResourceForeground': untracked,
      'list.activeSelectionForeground': selected,
      'foreground': (!modified && !untracked && !selected),
    });
  }
}

window.customElements.define('cyc-editor-sidebar', CycEditorSidebar);
