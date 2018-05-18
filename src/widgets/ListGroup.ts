import DesignerWidgetMixin from 'widget-core-designer/DesignerWidgetMixin';
import { ListGroupBase } from 'widgets-web/list-group';
export default class ListGroup extends DesignerWidgetMixin(ListGroupBase) {
	protected isContainer() {
		return true;
	}
}
