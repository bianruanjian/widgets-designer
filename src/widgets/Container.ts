import DesignerWidgetMixin from 'widget-core-designer/DesignerWidgetMixin';
import { ContainerBase } from 'widgets-web/container';
export default class Container extends DesignerWidgetMixin(ContainerBase) {
	protected isContainer() {
		return true;
	}
}
