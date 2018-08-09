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

    <cyc-editor-titlebar
      class="title-bar"
      theme-name="[[themeName]]"
      data-prop="titleBar.activeBackground"
      on-mouseenter="_onSectionMouseenter"></cyc-editor-titlebar>

    <div class="body">
      <cyc-editor-activitybar
        class="activity-bar"
        data-prop="activityBar.background"
        on-mouseenter="_onSectionMouseenter"></cyc-editor-activitybar>
      <cyc-editor-sidebar
        class="sidebar"
        data-prop="sideBar.background"
        files="[[projectFiles]]"
        on-mouseenter="_onSectionMouseenter"
        on-selected-file="_onEditorSidebarSelectedFile"></cyc-editor-sidebar>
      <cyc-editor-content
        class="editor"
        data-prop="editor.background"
        file-type="[[_fileType]]"
        file-name="[[_activeFileName]]"
        on-mouseenter="_onSectionMouseenter"></cyc-editor-content>
    </div>

    <cyc-editor-statusbar
      class="status-bar"
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
       * List of project files.
       */
      projectFiles: {
        type: Array,
        value: () => [{
          name: 'some-file.js',
          type: 'js',
          modified: true,
        }, {
          name: 'some-file.html',
          type: 'html',
        }, {
          name: 'some-file.css',
          type: 'css',
        }, {
          name: 'README.md',
          type: 'md',
          untracked: true,
        }],
      },

      _activeFileName: {
        type: String,
      },

      /**
       * Selected file type.
       */
      _fileType: {
        type: String,
        value: 'js',
      },
    };
  }

  _onEditorSidebarSelectedFile(event) {
    const {type, name} = event.detail;
    this._fileType = type;
    this._activeFileName = name;
  }
}

window.customElements.define('cyc-editor-window', CycEditorWindow);
