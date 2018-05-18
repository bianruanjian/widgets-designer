import DesignerWidgetMixin from 'widget-core-designer/DesignerWidgetMixin';
import { CardBase } from 'widgets-web/card';
export default class Card extends DesignerWidgetMixin(CardBase) {
	protected isContainer() {
		return true;
	}
}
