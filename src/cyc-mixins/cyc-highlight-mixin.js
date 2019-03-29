import {UtilsMixin} from '../cyc-mixins/cyc-utils-mixin.js';

/**
 * Mixin to highlight elements with the current `highlight` property as `data-prop` attribute value.
 * @polymer
 * @mixinFunction
 * @extends {UtilsMixin}
 */
export class HighlightMixin extends UtilsMixin {
  _onSectionMouseenter(event) {
    const dataset = event.currentTarget.dataset;
    const editorSection = dataset.prop || dataset.targetProp;
    this._emit('editor-section-hover', editorSection);
  }
}
