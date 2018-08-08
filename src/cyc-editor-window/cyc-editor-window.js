import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {highlightMixin} from '../cyc-mixins/cyc-highlight-mixin.js';
import '../cyc-editor-sidebar/cyc-editor-sidebar.js';
import '../cyc-editor-titlebar/cyc-editor-titlebar.js';
import '../cyc-editor-activitybar/cyc-editor-activitybar.js';
import '../cyc-editor-statusbar/cyc-editor-statusbar.js';
import '../cyc-editor-content/cyc-editor-content.js';

/**
 * `<cyc-editor-window>` displays the editor window preview.
 * @polymer
 * @customElement
 * @extends {highlightMixin}
 * @extends {PolymerElement}
 */
class CycEditorWindow extends highlightMixin(PolymerElement) {
  static get template() {
    return html`
    <link rel="stylesheet" href="../cyc-styles/cyc-shared-styles.css" inline>
    <link rel="stylesheet" href="cyc-editor-window.css" inline>

    <cyc-editor-titlebar class="titleBar"
      theme-name="[[themeName]]"
      data-prop="titleBar.activeBackground"
      on-mouseenter="_onSectionMouseenter"></cyc-editor-titlebar>

    <div class="body">
      <cyc-editor-activitybar
        class="activityBar"
        data-prop="activityBar.background"
        on-mouseenter="_onSectionMouseenter"></cyc-editor-activitybar>
      <cyc-editor-sidebar
        class="sidebar"
        data-prop="sideBar.background"
        on-mouseenter="_onSectionMouseenter"
        on-selected-file="_setFileType"></cyc-editor-sidebar>
      <cyc-editor-content
        class="editor"
        data-prop="editor.background"
        file-type="[[_fileType]]"
        on-mouseenter="_onSectionMouseenter"></cyc-editor-content>
    </div>

    <cyc-editor-statusbar
      class="statusBar"
      data-prop="statusBar.background"
      on-mouseenter="_onSectionMouseenter"></cyc-editor-statusbar>
    `;
  }

  static get properties() {
    return {
      /**
       * Name of the theme.
       */
      themeName: {
        type: String,
        value: 'Your Theme Name',
      },

      /**
       * Selected file type.
       */
      _fileType: {
        type: String,
        value: 'html',
      },
    };
  }

  _setFileType(event) {
    this._fileType = event.detail;
  }
}

window.customElements.define('cyc-editor-window', CycEditorWindow);
