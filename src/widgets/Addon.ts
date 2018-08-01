import DesignerWidgetMixin from 'widget-core-designer/DesignerWidgetMixin';
import { AddonBase } from 'widgets-web/addon';
import { VNode } from '@dojo/framework/widget-core/interfaces';
export default class Addon extends DesignerWidgetMixin(AddonBase) {
	protected getDefaultValue() {
		return '__';
	}

	protected isCheckboxOrRadio(node: VNode): boolean {
		const childName = node.properties.widget.widgetName;
		if (childName === 'Checkbox' || childName === 'Radio') {
			node.properties.widget.properties.isInAddon = true;
			return true;
		} else {
			return false;
		}
	}
}
