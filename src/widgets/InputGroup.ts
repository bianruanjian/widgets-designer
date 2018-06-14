import DesignerWidgetMixin from 'widget-core-designer/DesignerWidgetMixin';
import { InputGroupBase } from 'widgets-web/input-group';
import { VNode } from '@dojo/widget-core/interfaces';
export default class InputGroup extends DesignerWidgetMixin(InputGroupBase) {
	protected isContainer() {
		return true;
	}

	protected reOrder() {
		// 属性 position 需要结合子部件的位置来实现效果，故在此由程序根据 position 的值来自动调整子部件的位置
		// 设计器版因为先渲染父部件，子部件此时还是 WNode 形态，故需要复写此方法
		const prependChildren: VNode[] = [];
		const otherChildren: VNode[] = [];
		const appendChildren: VNode[] = [];
		this.children.forEach((child, index) => {
			if (child) {
				const childName = (child as VNode).properties.widget.widgetName;
				const position = (child as VNode).properties.widget.properties.position;

				if (childName === 'Addon') {
					if (position && position === 'append') {
						appendChildren.push(child as VNode);
					} else {
						prependChildren.push(child as VNode);
					}
				} else {
					otherChildren.push(child as VNode);
				}
			}
		});
		return [...prependChildren, ...otherChildren, ...appendChildren];
	}
}
