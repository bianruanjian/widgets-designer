import DesignerWidgetMixin from 'widget-core-designer/DesignerWidgetMixin';
import { InputGroupBase } from 'widgets-web/input-group';
import { VNode } from '@dojo/widget-core/interfaces';
export default class InputGroup extends DesignerWidgetMixin(InputGroupBase) {
	protected isContainer() {
		return true;
	}

	protected reOrderChildren() {
		// 属性 position 需要结合子部件的位置来实现效果，故在此由程序根据 position 的值来自动调整子部件的位置
		// 设计器版因为先渲染父部件，子部件此时还是 WNode 形态，故需要复写此方法
		const prependChildren: VNode[] = [];
		const inputChildren: VNode[] = [];
		const appendChildren: VNode[] = [];
		this.children.forEach((child, index) => {
			if (child) {
				const childNode = child as VNode;
				const childName = childNode.properties.widget.widgetName;
				const position = childNode.properties.widget.properties.position;

				if (childName === 'Addon') {
					if (position && position === 'append') {
						appendChildren.push(childNode);
					} else {
						prependChildren.push(childNode);
					}
				} else {
					inputChildren.push(childNode);
				}
			}
		});
		return [...prependChildren, ...inputChildren, ...appendChildren];
	}
}
