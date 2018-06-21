import DesignerWidgetMixin from 'widget-core-designer/DesignerWidgetMixin';
import { BadgeBase } from 'widgets-web/badge';
import { DNode } from '@dojo/widget-core/interfaces';
import { v } from '@dojo/widget-core/d';
import { getSpacingClasses } from 'widgets-web/common/util';

export default class Badge extends DesignerWidgetMixin(BadgeBase) {
	// 这里设置 href 后没有使用 a 标签，因为
	// 如果使用 a 按钮，则需要在上面添加遮盖层，以屏蔽默认事件，但这样就无法选中子节点了
	// a -> span
	protected render(): DNode | DNode[] {
		const { value, valuePosition, appearance, pill } = this.properties;

		const cssClasses: string[] = [];

		if (appearance && appearance !== 'default') {
			cssClasses.push(`badge-${appearance}`);
		}

		if (pill === true || pill === 'true') {
			cssClasses.push('badge-pill');
		}

		let children: DNode[];

		if (value && valuePosition && valuePosition === 'left') {
			children = [value, ...this.children];
		} else {
			children = [...this.children, value];
		}

		return v(
			'span',
			{
				key: 'badge',
				classes: ['badge', ...cssClasses, ...getSpacingClasses(this.properties)]
			},
			children
		);
	}
}
