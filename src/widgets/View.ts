import { v, w } from '@dojo/widget-core/d';
import EditableWidgetBase from 'widget-core-designer/EditableWidgetBase';
import { VNode } from '@dojo/widget-core/interfaces';
import { View as view } from 'widgets-web/view/index';
import * as baseCss from './styles/base.m.css';
import { endsWith } from '@dojo/shim/string';
import { getBorderClasses, getSpacingClasses, getFlexItemClasses, getDisplayClass } from 'widgets-web/common/util';
import { BorderProperties, SpacingProperties } from 'widgets-web/common/interfaces';
import { FlexItemProperties, DisplayProperties } from 'widgets-web/common/interfaces';

export class View extends EditableWidgetBase {
    private _getMaxWidthStyles() {
		let { maxWidth } = this.properties.widget.properties;

		let maxWidthStyles: any = {};

		if (maxWidth) {
			if (typeof maxWidth == 'number') {
				maxWidthStyles.maxWidth = `${maxWidth}px`;
			} else if (endsWith(maxWidth as string, '%')) {
				maxWidthStyles.maxWidth = maxWidth;
			} else {
				maxWidthStyles.maxWidth = `${maxWidth}px`;
			}
		}
		
		delete this.properties.widget.properties.maxWidth;

		return maxWidthStyles;
    }
    
	protected render() : VNode {
		const { widget, activeWidgetId, onFocus } = this.properties;
		this.tryFocus(widget, activeWidgetId, onFocus);

        const hasChildren = this.children.length > 0;

        const { display } = widget.properties;

		let flexItemClasses: string[] = [];

		if (display && (display === 'flex' || display === 'inlineFlex')) {
			flexItemClasses = getFlexItemClasses(widget.properties as FlexItemProperties);
		}

		return v('div',{
            key:this.rootKey,
			classes: hasChildren ? [
				display ? getDisplayClass(widget.properties as DisplayProperties) : undefined,
				...flexItemClasses
			]
			: [
                ...getBorderClasses(widget.properties as BorderProperties),
                ...getSpacingClasses(widget.properties as SpacingProperties),
                display ? getDisplayClass(widget.properties as DisplayProperties) : undefined,
				...flexItemClasses,
                baseCss.emptyContainer
            ],
            styles: this._getMaxWidthStyles(),
            onmouseup: this.onMouseUp
        },[
            w(view, widget.properties, this.children)
        ]);
	}
}

export default View;