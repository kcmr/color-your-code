import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {highlightMixin} from '../cyc-mixins/cyc-highlight-mixin.js';
import {jsFileContent, cssFileContent, htmlFileContent, mdFileContent} from './file-contents.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@kuscamara/code-sample/code-sample.js';
import {kustomDark} from '../../node_modules/@kuscamara/code-sample/themes/kustom-dark.js';
import '../cyc-editor-tabs/cyc-editor-tabs.js';

const CONTENT_FOR_FILE_TYPE = {
  js: jsFileContent,
  html: htmlFileContent,
  css: cssFileContent,
  md: mdFileContent,
};

/**
 * Contains the code of the selected file.
 * @polymer
 * @customElement
 * @extends {highlightMixin}
 * @extends {PolymerElement}
 */
class CycEditorContent extends highlightMixin(PolymerElement) {
  static get template() {
    return html`
    <link rel="stylesheet" href="cyc-editor-content.css" inline>

    <cyc-editor-tabs class="tabs" tabs="[[_tabs]]"></cyc-editor-tabs>

    <div class="content">
      <div class="line-numbers" data-target-prop="editorLineNumber.foreground" on-mouseenter="_onSectionMouseenter">
        <template is="dom-repeat" items="[[_numberToArray(_fileLines)]]">
          <div class="line-number" data-prop="editorLineNumber.foreground">[[_computeLineNumber(index)]]</div>
        </template>
      </div>

      <code-sample
        type="[[fileType]]"
        inner-h-t-m-l="[[_codeSampleContent]]"
      ></code-sample>
    </div>
    `;
  }

  static get properties() {
    return {
      /**
       * Theme used for the code.
       */
      codeSampleTheme: {
        type: Object,
        value: kustomDark,
      },

      /**
       * Type (extension) of the current file selected in the editor.
       */
      fileType: {
        type: String,
      },

      /**
       * Name of the current file selected in the editor.
       */
      fileName: {
        type: String,
        observer: '_fileNameChanged',
      },

      _fileContent: {
        type: String,
        computed: '_computeFileContent(fileType)',
      },

      _fileLines: {
        type: Number,
        computed: '_computeFileContentLines(_fileContent)',
      },

      _codeSampleContent: {
        type: String,
        computed: '_computeCodeSampleContent(_fileContent)',
      },

      _tabs: {
        type: Array,
        value: () => [{
          name: 'some-file.js',
          active: true,
        }, {
          name: 'inactive-tab',
          active: false,
        }],
      },
    };
  }

  _computeFileContent(fileType) {
    return CONTENT_FOR_FILE_TYPE[fileType];
  }

  _computeFileContentLines(fileConent) {
    const endOfLine = /\r?\n/g;
    return (fileConent.match(endOfLine) || '').length;
  }

  _computeCodeSampleContent(fileContent) {
    return`
      <template preserve-content>
        ${fileContent}
      </template>
    `;
  }

  _computeLineNumber(number) {
    return number + 1;
  }

  _fileNameChanged(fileName) {
    this.set(['_tabs', 0, 'name'], fileName);
  }
}

window.customElements.define('cyc-editor-content', CycEditorContent);
