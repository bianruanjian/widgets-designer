import DesignerWidgetMixin from 'widget-core-designer/DesignerWidgetMixin';
import { LinkBase } from 'widgets-web/link';
import { VNode } from '@dojo/widget-core/interfaces';
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
import { targetMap } from 'widgets-web/button';
import { v } from '@dojo/widget-core/d';
export default class Link extends DesignerWidgetMixin(LinkBase) {
	private _onClick(event: MouseEvent) {
		event.preventDefault();
		return false;
	}

	protected render(): VNode {
		const { widget } = this.properties;

		let { widgetId, href, target, value, isListItem = false, appearance, display } = widget.properties;

		if (target) {
			target = targetMap[target as string] || target;
		}

		let flexItemClasses: string[] = [];

		if (display && (display === 'flex' || display === 'inlineFlex')) {
			flexItemClasses = getFlexItemClasses(widget.properties as FlexItemProperties);
		}

		// 这里复写 Link 部件，因为默认超链接跳转会导致无法选中部件，
		// 解决此问题，这里采用复写超链接的 onclick 事件，使其不进行跳转
		return v(
			'a',
			{
				id: widgetId,
				key: 'link',
				href,
				target,
				classes: isListItem
					? [
							'list-group-item',
							'list-group-item-action',
							...getSpacingClasses(widget.properties as SpacingProperties),
							display ? getDisplayClass(widget.properties as DisplayProperties) : undefined,
							...flexItemClasses,
							...getTextClasses(widget.properties as TextProperties),
							appearance && appearance !== 'default' ? `list-group-item-${appearance}` : undefined,
							...getTextDecorationClass(widget.properties as TextProperties)
						]
					: [
							...getSpacingClasses(widget.properties as SpacingProperties),
							display ? getDisplayClass(widget.properties as DisplayProperties) : undefined,
							...flexItemClasses,
							...getTextClasses(widget.properties as TextProperties),
							...getColorsClasses(widget.properties as ColorsProperties),
							...getTextDecorationClass(widget.properties as TextProperties)
						],
				styles: getTextStyles(widget.properties as TextProperties),
				onclick: this._onClick
			},
			value ? [value, ...this.children] : this.children
		);
	}
}
