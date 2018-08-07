import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@kuscamara/code-sample/code-sample.js';
import {kustomDark} from '../../node_modules/@kuscamara/code-sample/themes/kustom-dark.js';

/**
 * @polymer
 * @customElement
 * @extends {PolymerElement}
 */
class CycEditorContent extends PolymerElement {
  static get template() {
    return html`
    <link rel="stylesheet" href="cyc-editor-content.css" inline>

    <div class="line-numbers">
      <template is="dom-repeat" items="[[_lineNumbers]]">
        <div class="line-number">[[_computeLineNumber(index)]]</div>
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
      codeSampleTheme: {
        type: Object,
        value: kustomDark,
      },

      lines: {
        type: Number,
        value: 31,
      },

      _lineNumbers: {
        type: Array,
        computed: '_computeLineNumbers(lines)',
      },
    };
  }

  _computeLineNumbers(lines) {
    return [...Array(lines)];
  }

  _computeLineNumber(number) {
    return number + 1;
  }
}

window.customElements.define('cyc-editor-content', CycEditorContent);
