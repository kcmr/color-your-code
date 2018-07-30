{
  const {Element} = Polymer;

  /**
   * @polymer
   * @customElement
   */
  class {{titleCase(name)}} extends Element {
    static get is() {
      return '{{name}}';
    }

    static get properties() {

    }
  }

  window.customElements.define({{titleCase(name)}}.is, {{titleCase(name)}});
}
