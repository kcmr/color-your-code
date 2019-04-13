import {html, css} from 'lit-element';
import {styles as sharedStyles} from '../cyc-styles/cyc-shared-styles.css.js';
import {styles} from './cyc-editor-content.css.js';
import {HighlightMixin} from '../cyc-mixins/cyc-highlight-mixin.js';
import {readmeContent} from './readme-content.js';
import '@kuscamara/code-sample/code-sample.js';
import '../cyc-editor-tabs/cyc-editor-tabs.js';

/**
 * Contains the code of the selected file.
 * @customElement
 * @extends {HighlightMixin}
 */
class CycEditorContent extends HighlightMixin {
  static get styles() {
    return css`
      ${sharedStyles}
      ${styles}`;
  }

  render() {
    return html`
    <cyc-editor-tabs id="tabs"
      class="tabs"
      .tabs="${this._tabs}"
      data-prop="editorGroupHeader.tabsBackground"
      @mouseenter="${this._onSectionMouseenter}"></cyc-editor-tabs>

    <div class="content" data-prop="editor.background" @mouseenter="${this._onSectionMouseenter}">
      <div class="line-numbers" data-target-prop="editorLineNumber.foreground" @mouseenter="${this._onSectionMouseenter}">
      ${this._numberToArray(this._fileLines).map((item, index) => html`
        <div class="line-number" data-prop="editorLineNumber.foreground">${index + 1}</div>
      `)}
      </div>

      <div class="code-wrapper">
        <code-sample id="code"
          @click="${(event) => {event.stopPropagation();}}"
          type="${this.fileType}"
          .innerHTML="${this._codeSampleContent}"
        ></code-sample>
      </div>
    </div>
    `;
  }

  static get properties() {
    return {
      /**
       * Type (extension) of the current file selected in the editor.
       */
      fileType: {
        type: String,
      },

      /**
       * Name of the current file selected in the editor.
       * Sets the name of the active tab.
       */
      fileName: {
        type: String,
      },

      _fileContent: {
        type: String,
      },
    };
  }

  constructor() {
    super();

    this._fileContent = readmeContent;
  }

  get _tabs() {
    return [{
      name: this.fileName,
      active: true,
    }, {
      name: 'inactive-tab',
      active: false,
    }];
  }

  get _fileLines() {
    const endOfLine = /\r?\n/g;
    return this._fileContent.match(endOfLine).length;
  }

  get _codeSampleContent() {
    return`
      <template preserve-content>
        ${this._fileContent}
      </template>
    `;
  }
}

window.customElements.define('cyc-editor-content', CycEditorContent);
