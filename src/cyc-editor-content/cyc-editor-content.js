import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {highlightMixin} from '../cyc-mixins/cyc-highlight-mixin.js';
import {readmeContent} from './readme-content.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@kuscamara/code-sample/code-sample.js';
import '../cyc-editor-tabs/cyc-editor-tabs.js';

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
    <link rel="stylesheet" href="../cyc-styles/cyc-shared-styles.css" inline>
    <link rel="stylesheet" href="cyc-editor-content.css" inline>

    <cyc-editor-tabs id="tabs"
      class="tabs"
      tabs="[[_tabs]]"
      data-prop="editorGroupHeader.tabsBackground"
      on-mouseenter="_onSectionMouseenter"></cyc-editor-tabs>

    <div class="content" data-prop="editor.background" on-mouseenter="_onSectionMouseenter">
      <div class="line-numbers" data-target-prop="editorLineNumber.foreground" on-mouseenter="_onSectionMouseenter">
        <template is="dom-repeat" items="[[_numberToArray(_fileLines)]]" id="lines">
          <div class="line-number" data-prop="editorLineNumber.foreground">[[_computeLineNumber(index)]]</div>
        </template>
      </div>

      <code-sample id="code"
        type="[[fileType]]"
        inner-h-t-m-l="[[_codeSampleContent]]"
      ></code-sample>
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
        value: readmeContent,
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
        computed: '_computeTabs(fileName)',
      },
    };
  }

  _computeTabs(fileName) {
    return [{
      name: fileName,
      active: true,
    }, {
      name: 'inactive-tab',
      active: false,
    }];
  }

  _computeFileContentLines(fileContent) {
    const endOfLine = /\r?\n/g;
    return fileContent.match(endOfLine).length;
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
}

window.customElements.define('cyc-editor-content', CycEditorContent);
