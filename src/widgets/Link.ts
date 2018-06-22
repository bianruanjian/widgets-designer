import DesignerWidgetMixin from 'widget-core-designer/DesignerWidgetMixin';
import { LinkBase } from 'widgets-web/link';
import { VNode, DNode } from '@dojo/widget-core/interfaces';
import { v } from '@dojo/widget-core/d';
import {
	FlexItemProperties,
	SpacingProperties,
	DisplayProperties,
	TextProperties,
	ColorsProperties
} from 'widgets-web/common/interfaces';
import {
	getFlexItemClasses,
	getSpacingClasses,
	getDisplayClass,
	getTextClasses,
	getTextDecorationClass,
	getColorsClasses,
	getTextStyles
} from 'widgets-web/common/util';
import * as css from './styles/Link.m.css';

export default class Link extends DesignerWidgetMixin(LinkBase) {
	protected getDefaultValue() {
		return '__';
	}

	protected render(): VNode {
		let { value, valuePosition, isListItem = false, appearance, display } = this.properties;

		let children: DNode[];

		if (value && valuePosition && valuePosition === 'left') {
			children = [value, ...this.children];
		} else {
			children = [...this.children, value];
		}

		// 这里没有使用 a 标签，因为
		// 如果使用 a 按钮，则需要在上面添加遮盖层，以屏蔽默认事件，但这样就无法选中子节点了
		// a -> span
		return v(
			'span',
			{
				key: 'link',
				classes: isListItem
					? [
							'list-group-item',
							'list-group-item-action',
							css.root,
							...getSpacingClasses(this.properties as SpacingProperties),
							display ? getDisplayClass(this.properties as DisplayProperties) : undefined,
							...getFlexItemClasses(this.properties as FlexItemProperties),
							...getTextClasses(this.properties as TextProperties),
							appearance && appearance !== 'default' ? `list-group-item-${appearance}` : undefined,
							...getTextDecorationClass(this.properties as TextProperties)
						]
					: [
							css.root,
							...getSpacingClasses(this.properties as SpacingProperties),
							display ? getDisplayClass(this.properties as DisplayProperties) : undefined,
							...getFlexItemClasses(this.properties as FlexItemProperties),
							...getTextClasses(this.properties as TextProperties),
							...getColorsClasses(this.properties as ColorsProperties),
							...getTextDecorationClass(this.properties as TextProperties)
						],
				styles: getTextStyles(this.properties as TextProperties)
			},
			children
		);
	}
}
