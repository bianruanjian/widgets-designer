import DesignerWidgetMixin from 'widget-core-designer/DesignerWidgetMixin';
import { GridColumnBase } from 'widgets-web/grid-column';
export default class GridColumn extends DesignerWidgetMixin(GridColumnBase) {
	protected isContainer() {
		return true;
	}
}
