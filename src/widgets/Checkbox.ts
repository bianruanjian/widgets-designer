import DesignerWidgetMixin from 'widget-core-designer/DesignerWidgetMixin';
import { CheckboxBase } from 'widgets-web/checkbox';
export default class Checkbox extends DesignerWidgetMixin(CheckboxBase) {
	protected needOverlay() {
		return true;
	}
}
