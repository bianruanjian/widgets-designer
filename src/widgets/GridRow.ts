import DesignerWidgetMixin from 'widget-core-designer/DesignerWidgetMixin';
import { GridRowBase } from 'widgets-web/grid-row';
export default class GridRow extends DesignerWidgetMixin(GridRowBase) {
	protected isContainer() {
		return true;
	}
}
