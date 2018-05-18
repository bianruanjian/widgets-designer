import DesignerWidgetMixin from 'widget-core-designer/DesignerWidgetMixin';
import { TextInputBase } from 'widgets-web/text-input';
export default class TextInput extends DesignerWidgetMixin(TextInputBase) {
	protected needOverlay() {
		return true;
	}
}
