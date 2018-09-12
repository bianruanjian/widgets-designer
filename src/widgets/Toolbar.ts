import { DesignerWidgetMixin } from 'widget-core-designer/DesignerWidgetMixin';
import { ToolbarBase } from '@dojo/widgets/toolbar';

export default class Toolbar extends DesignerWidgetMixin(ToolbarBase) {
	protected isContainer() {
		return true;
	}
}
