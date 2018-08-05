import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * @polymer
 * @customElement
 * @extends {PolymerElement}
 */
class {{titleCase(name)}} extends PolymerElement {
  static get template() {
    return html`
    <link rel="stylesheet" href="{{name}}.css" inline>
    `;
  }

  static get properties() {
    return {

    };
  }
}

window.customElements.define('{{name}}', {{titleCase(name)}});
