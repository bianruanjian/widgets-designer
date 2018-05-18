import DesignerWidgetMixin from 'widget-core-designer/DesignerWidgetMixin';
import { InputGroupBase } from 'widgets-web/input-group';
export default class InputGroup extends DesignerWidgetMixin(InputGroupBase) {
	protected isContainer() {
		return true;
	}
}
