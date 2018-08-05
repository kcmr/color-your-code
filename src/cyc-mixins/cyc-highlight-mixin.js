import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';
import {utilsMixin} from '../cyc-mixins/cyc-utils-mixin.js';

/**
 * Mixin to highlight elements with the current `highlight` property as `data-prop` attribute value.
 * @polymer
 * @mixinFunction
 * @extends {utilsMixin}
 */
export const highlightMixin = dedupingMixin((superClass) => {
  return class extends utilsMixin(superClass) {
    _onSectionMouseenter(event) {
      const dataset = event.currentTarget.dataset;
      const editorSection = dataset.prop || dataset.targetProp;
      this._emit('editor-section-hover', editorSection);
    }
  };
});
