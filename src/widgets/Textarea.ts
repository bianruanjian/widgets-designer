import DesignerWidgetMixin from 'widget-core-designer/DesignerWidgetMixin';
import { TextareaBase } from 'widgets-web/textarea';
export default class Textarea extends DesignerWidgetMixin(TextareaBase) {
	protected needOverlay() {
		return true;
	}
}
