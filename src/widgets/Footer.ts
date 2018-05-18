import DesignerWidgetMixin from 'widget-core-designer/DesignerWidgetMixin';
import { FooterBase } from 'widgets-web/footer';
export default class Footer extends DesignerWidgetMixin(FooterBase) {
	protected isContainer() {
		return true;
	}
}
