import DesignerWidgetMixin from 'widget-core-designer/DesignerWidgetMixin';
import { ViewBase } from 'widgets-web/view';
export default class View extends DesignerWidgetMixin(ViewBase) {
	protected isContainer() {
		return true;
	}
}
