import { v } from '@dojo/framework/widget-core/d';
import DesignerWidgetMixin from 'widget-core-designer/DesignerWidgetMixin';
import * as css from './styles/Button.m.css';
import { VNode, DNode } from '@dojo/framework/widget-core/interfaces';
import { ButtonBase, sizeMap } from 'widgets-web/button/index';

export default class Button extends DesignerWidgetMixin(ButtonBase) {
	protected getDefaultValue() {
		return '__';
	}

	protected render(): VNode {
		const { appearance, size, disabled, fluid, active, type, isListItem } = this.properties;

		const children: DNode[] = this.renderChildren();

		// 需要添加遮盖层的部件是明确的，因此这里不需要传入是否显示遮盖层的参数。
		return v(
			// 这里没有使用 button，因为
			// 1. 如果使用 button 按钮，则需要在上面添加遮盖层，以屏蔽默认事件，但这样就无法选中子节点了
			// 2. 绑定在 button 子节点（如 icon) 上的事件在 chrome 中可以触发，但是在 firefox 中无法触发
			// button -> div
			// 而使用 div 则可以解决上述两个问题，并且也可以看到相同的按钮样式。
			'div',
			{
				key: 'button',
				classes: isListItem
					? [
							css.root,
							'list-group-item',
							'list-group-item-action',
							appearance && appearance !== 'default' ? `list-group-item-${appearance}` : undefined,
							active === true || active === 'true' ? 'active' : undefined
						]
					: [
							'btn',
							css.root,
							appearance ? `btn-${appearance}` : undefined,
							size ? sizeMap[size as string] : undefined,
							fluid === true || fluid === 'true' ? 'btn-block' : undefined,
							active === true || active === 'true' ? 'active' : undefined
						],
				disabled: disabled === true || disabled === 'true',
				type
			},
			children
		);
	}
}
