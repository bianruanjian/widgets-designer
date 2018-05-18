import DesignerWidgetMixin from 'widget-core-designer/DesignerWidgetMixin';
import { SelectBase } from 'widgets-web/select';
export default class Select extends DesignerWidgetMixin(SelectBase) {
	protected needOverlay() {
		return true;
	}
}
