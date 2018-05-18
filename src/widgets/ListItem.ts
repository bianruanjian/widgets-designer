import DesignerWidgetMixin from 'widget-core-designer/DesignerWidgetMixin';
import { ListItemBase } from 'widgets-web/list-item';
export default class Listitem extends DesignerWidgetMixin(ListItemBase) {
	protected isContainer() {
		return true;
	}
}
