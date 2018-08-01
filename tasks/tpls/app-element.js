{
  const {Element} = Polymer;

  /**
   * @polymer
   * @customElement
   * @extends {Polymer.Element}
   */
  class {{titleCase(name)}} extends Element {
    static get is() {
      return '{{name}}';
    }

    static get properties() {
      return {

      };
    }
  }

  window.customElements.define({{titleCase(name)}}.is, {{titleCase(name)}});
}
