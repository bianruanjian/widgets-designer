import { v, w } from '@dojo/widget-core/d';

import EditableWidgetBase from 'widget-core-designer/EditableWidgetBase';
import { VNode } from '@dojo/widget-core/interfaces';
import { Badge as badge } from 'widgets-web/Badge/index';
import * as baseCss from './styles/base.m.css';
import { getFlexItemClasses, getDisplayClass, getSpacingClasses } from 'widgets-web/common/util';
import { FlexItemProperties, DisplayProperties, SpacingProperties } from 'widgets-web/common/interfaces';

export default class Badge extends EditableWidgetBase {
    protected render() : VNode {
        const { widget, activeWidgetId, onFocus } = this.properties;

		this.tryFocus(widget, activeWidgetId, onFocus);

        const hasChildren = this.children.length > 0;

        const { display } = widget.properties;

		let flexItemClasses: string[] = [];

		if (display && (display === 'flex' || display === 'inlineFlex')) {
			flexItemClasses = getFlexItemClasses(widget.properties as FlexItemProperties);
		}

        return v('span',{
            key:this.rootKey,
            classes: hasChildren ? [
				display ? getDisplayClass(widget.properties as DisplayProperties) : undefined,
				...flexItemClasses
			]
			: [
                ...getSpacingClasses(widget.properties as SpacingProperties),
                display ? getDisplayClass(widget.properties as DisplayProperties) : undefined,
				...flexItemClasses,
                baseCss.emptyContainer
            ],
            onmouseup: this.onMouseUp
        },[
            w(badge, widget.properties, this.children)
        ]);
    }
}