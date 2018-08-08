const jsFileContent = `
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
`;

const cssFileContent = `
.heading {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  line-height: 1;
}

.panel-heading {
  color: var(--sideBarTitle-foreground);
  padding: 12px 20px;
}

.sidebar-heading {
  color: var(--editor-foreground);
  padding: 6px 20px;
  background-color: var(--bg-dark);
  letter-spacing: 0.05ch;
}

.open-files {
  color: var(--editor-foreground);
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 13px;
}
`;

const htmlFileContent = `
<div class="content" role="main">
  <h1>Hello Coder!</h1>

  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
  Doloremque, deleniti esse laboriosam eos vel culpa molestias eaque nesciunt totam,
  rem recusandae quidem pariatur illum facilis repellat, quia incidunt mollitia exercitationem.</p>

  <ul>
    <li>Color</li>
    <li>your</li>
    <li>code</li>
  </ul>
</div>
`;

export {
  jsFileContent,
  cssFileContent,
  htmlFileContent,
};
