import { v } from '@dojo/widget-core/d';
import { VNode } from '@dojo/widget-core/interfaces';
import EditableWidgetBase from 'widget-core-designer/EditableWidgetBase';
import { FlexContainerProperties } from 'widgets-web/common/interfaces';
import { getFlexContainerClasses, getDisplayClass, getTextClasses, getTextDecorationClass, getColorsClasses, getTextStyles } from './util';
import { DisplayProperties, TextProperties, ColorsProperties } from './interfaces';
import * as baseCss from './styles/base.m.css';

export class ListItem extends EditableWidgetBase {
	protected render(): VNode {
		const { widget, activeWidgetId, onFocus } = this.properties;
		this.tryFocus(widget, activeWidgetId, onFocus);

		const { widgetId, active, disabled, appearance, display } = widget.properties;

		const hasChildren = this.children.length > 0;

		let flexContainerClasses: string[] = [];

		if (display && (display === 'flex' || display === 'inlineFlex')) {
			flexContainerClasses = getFlexContainerClasses(widget.properties as FlexContainerProperties);
		}

		return v(
			'li',
			{
				id: widgetId,
				key: this.rootKey,
				disabled: disabled === true || disabled === 'true',
				classes: [
					'list-group-item',
					appearance && appearance !== 'default' ? `list-group-item-${appearance}` : undefined,
					disabled === true || disabled === 'true' ? 'disabled' : undefined,
					active === true || active === 'true' ? 'active' : undefined,
					display ? getDisplayClass(widget.properties as DisplayProperties) : undefined,
					...flexContainerClasses,
					...getTextClasses(widget.properties as TextProperties),
					...getTextDecorationClass(widget.properties as TextProperties),
					...getColorsClasses(widget.properties as ColorsProperties),
					hasChildren ? null : baseCss.emptyContainer
				],
				styles: getTextStyles(widget.properties as TextProperties),
				onmouseup: this.onMouseUp
			},
			this.children
		);
	}
}

export default ListItem;
