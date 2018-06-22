import DesignerWidgetMixin from 'widget-core-designer/DesignerWidgetMixin';
import { TextBase } from 'widgets-web/text';
export default class Text extends DesignerWidgetMixin(TextBase) {
	protected getDefaultValue() {
		return '__';
	}
}
