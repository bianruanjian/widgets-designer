import { v, w } from '@dojo/widget-core/d';

import EditableWidgetBase from 'widget-core-designer/EditableWidgetBase';
import { VNode } from '@dojo/widget-core/interfaces';
import { Card as card } from 'widgets-web/card/index';
import * as baseCss from './styles/base.m.css';
import { endsWith } from '@dojo/shim/string';
import { getBorderClasses, getSpacingClasses } from 'widgets-web/common/util';
import { BorderProperties, SpacingProperties } from 'widgets-web/common/interfaces';

export default class Card extends EditableWidgetBase {
    private _getStyles() {
		const { width, height } = this.properties.widget.properties;

		const cssStyles: any = {};

		if (width) {
			if (typeof width === 'number') {
				cssStyles.width = `${width}px`;
			} else if (endsWith(width as string, '%') || width === 'auto') {
				cssStyles.width = width;
			} else {
				cssStyles.width = `${width}px`;
			}
		}

		if (height) {
			if (typeof height === 'number') {
				cssStyles.height = `${height}px`;
			} else if (endsWith(height as string, '%') || height === 'auto') {
				cssStyles.height = height;
			} else {
				cssStyles.height = `${height}px`;
			}
        }
        
        delete this.properties.widget.properties.width;
        delete this.properties.widget.properties.height;

		return cssStyles;
    }
    
    protected render() : VNode {
        const { widget, activeWidgetId, onFocus } = this.properties;

        this.tryFocus(widget, activeWidgetId, onFocus);
        
        const hasChildren = this.children.length > 0;

        return v('div',{
            key:this.rootKey,
            classes: hasChildren ? [] : [
                ...getBorderClasses(widget.properties as BorderProperties),
                ...getSpacingClasses(widget.properties as SpacingProperties),
                baseCss.emptyContainer
            ],
            styles: this._getStyles(),
            onmouseup: this.onMouseUp
        },[
            w(card, widget.properties, this.children)
        ]);
    }
}