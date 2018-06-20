import DesignerWidgetMixin from 'widget-core-designer/DesignerWidgetMixin';
import { LinkBase } from 'widgets-web/link';
import { VNode, DNode } from '@dojo/widget-core/interfaces';
import { targetMap } from 'widgets-web/button';
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
export default class Link extends DesignerWidgetMixin(LinkBase) {
	private _onClick(event: MouseEvent) {
		event.preventDefault();
		return false;
	}

	protected render(): VNode {
		const { widget } = this.properties;

		let { href, target, value, valuePosition, isListItem = false, appearance, display } = widget.properties;

		if (target) {
			target = targetMap[target as string] || target;
		}

		let flexItemClasses: string[] = [];

		if (display && (display === 'flex' || display === 'inlineFlex')) {
			flexItemClasses = getFlexItemClasses(widget.properties as FlexItemProperties);
		}

		let children: DNode[];

		if (value && valuePosition && valuePosition === 'left') {
			children = [value, ...this.children];
		} else {
			children = [...this.children, value];
		}

		return v(
			'a',
			{
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
			children
		);
	}
}
