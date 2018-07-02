import DesignerWidgetMixin from 'widget-core-designer/DesignerWidgetMixin';
import { AddonBase } from 'widgets-web/addon';
import { v } from '@dojo/widget-core/d';
import { getColorsClasses } from 'widgets-web/common/util';
import { find } from '@dojo/shim/array';
import { DNode, VNode } from '@dojo/widget-core/interfaces';
export default class Addon extends DesignerWidgetMixin(AddonBase) {
	protected getDefaultValue() {
		return '__';
	}

	protected renderChildren() {
		const { value } = this.properties;

		let children: any[] = [];
		if (value) {
			children.push(
				v(
					'span',
					{
						classes: ['input-group-text', ...getColorsClasses(this.properties)]
					},
					[value]
				)
			);
		} else {
			let existCheckboxOrRadio: boolean = false;
			find(this.children, (child: DNode) => {
				if (child) {
					const childName = (child as VNode).properties.widget.widgetName;
					if (childName === 'Checkbox' || childName === 'Radio') {
						existCheckboxOrRadio = true;
					}
				}
				return existCheckboxOrRadio;
			});
			if (existCheckboxOrRadio) {
				children.push(
					v('div', { classes: ['input-group-text', ...getColorsClasses(this.properties)] }, this.children)
				);
			} else {
				children = this.children;
			}
		}

		return children;
	}
}
