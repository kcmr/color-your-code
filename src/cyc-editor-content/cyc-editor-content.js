import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {highlightMixin} from '../cyc-mixins/cyc-highlight-mixin.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@kuscamara/code-sample/code-sample.js';
import {kustomDark} from '../../node_modules/@kuscamara/code-sample/themes/kustom-dark.js';

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

    <div class="line-numbers" data-target-prop="editorLineNumber.foreground" on-mouseenter="_onSectionMouseenter">
      <template is="dom-repeat" items="[[_numberToArray(lines)]]">
        <div class="line-number" data-prop="editorLineNumber.foreground">[[_computeLineNumber(index)]]</div>
      </template>
    </div>

    <code-sample type="js">
      <template preserve-content>
      class MyElement extends PolymerElement {
        static get template() {
          return html\`
            <style>
              :host {
                display: block;
              }
            </style>

            <p>Hello world!</p>
          \`;
        }

        static get properties() {
          return {
            // Sets whether the element has super powers.
            hasPowers: {
              type: Boolean,
              observer: '_hasPowersChanged',
            },
          };
        }

        _hasPowersChanged(hasPowers) {
          if (hasPowers) {
            this._doAmazingThings();
          }
        }
      }
      </template>
    </code-sample>
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
       * Number of lines of the active file in the editor content.
       */
      lines: {
        type: Number,
        value: 30,
      },
    };
  }

  _computeLineNumber(number) {
    return number + 1;
  }
}

window.customElements.define('cyc-editor-content', CycEditorContent);
