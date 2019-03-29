import {html} from 'lit-element';
import {HighlightMixin} from '../cyc-mixins/cyc-highlight-mixin.js';
import '../cyc-editor-sidebar/cyc-editor-sidebar.js';
import '../cyc-editor-titlebar/cyc-editor-titlebar.js';
import '../cyc-editor-activitybar/cyc-editor-activitybar.js';
import '../cyc-editor-statusbar/cyc-editor-statusbar.js';
import '../cyc-editor-content/cyc-editor-content.js';

/**
 * `<cyc-editor-window>` displays the editor window preview.
 * @customElement
 * @extends {HighlightMixin}
 */
class CycEditorWindow extends HighlightMixin {
  render() {
    return html`
    <link rel="stylesheet" href="../cyc-styles/cyc-shared-styles.css" inline>
    <link rel="stylesheet" href="cyc-editor-window.css" inline>

    <cyc-editor-titlebar
      class="title-bar"
      theme-name="${this.themeName}"
      data-prop="titleBar.activeBackground"
      @mouseenter="${this._onSectionMouseenter}"></cyc-editor-titlebar>

    <div class="body">
      <cyc-editor-activitybar
        class="activity-bar"
        data-prop="activityBar.background"
        @mouseenter="${this._onSectionMouseenter}"></cyc-editor-activitybar>
      <cyc-editor-sidebar
        class="sidebar"
        data-prop="sideBar.background"
        .files="${this.projectFiles}"
        @mouseenter="${this._onSectionMouseenter}"></cyc-editor-sidebar>
      <cyc-editor-content
        class="editor"
        filetype="${this._activeFile.type}"
        filename="${this._activeFile.name}"></cyc-editor-content>
    </div>

    <cyc-editor-statusbar
      class="status-bar"
      data-prop="statusBar.background"
      @mouseenter="${this._onSectionMouseenter}"></cyc-editor-statusbar>
    `;
  }

  static get properties() {
    return {
      /**
       * Name of the theme.
       */
      themeName: {
        type: String,
        attribute: 'theme-name',
      },

      /**
       * List of project files.
       * @type {Array}
       */
      projectFiles: {
        type: Array,
      },

      _activeFile: {
        type: Object,
      },
    };
  }

  constructor() {
    super();

    this.themeName = 'Your Theme Name';
    this._activeFile = {
      type: '',
      name: '',
    };
    this.projectFiles = [{
      name: 'some-file.js',
      type: 'js',
      modified: true,
    }, {
      name: 'some-file.html',
      type: 'html',
    }, {
      name: 'some-file.css',
      type: 'css',
      untracked: true,
    }, {
      name: 'README.md',
      type: 'md',
      selected: true,
    }];
  }

  updated(changedProperties) {
    if (changedProperties.has('projectFiles')) {
      this._setActiveFile();
    }
  }

  _setActiveFile() {
    this._activeFile = this.projectFiles.filter((file) => file.selected)[0];
  }
}

window.customElements.define('cyc-editor-window', CycEditorWindow);
