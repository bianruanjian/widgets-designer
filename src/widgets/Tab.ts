import { DesignerWidgetMixin } from 'widget-core-designer/DesignerWidgetMixin';
import { TabBase } from '@dojo/widgets/tab/index';

export default class Tab extends DesignerWidgetMixin(TabBase) {
	protected isContainer() {
		return true;
	}
}
