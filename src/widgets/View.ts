import { v } from '@dojo/widget-core/d';
import EditableWidgetBase from 'brj-widget-core/EditableWidgetBase';

import * as baseCss from './styles/base.m.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { VNode } from '@dojo/widget-core/interfaces';
import { BorderProperties, SpacingProperties, TextProperties } from './interfaces';
import { getSpacingClasses, getBorderClasses, getTextClasses, getTextStyles } from './util';

export class View extends EditableWidgetBase {

	private _getMaxWidthStyles() {
		let{
			widget: {
				properties: {
					maxWidth
				}
			}
		} = this.properties;

		let maxWidthStyles: any = {};
		
		if(maxWidth){
			if(typeof maxWidth == "number"){
				maxWidthStyles.maxWidth = `${maxWidth}px`;
			}else{
				maxWidthStyles.maxWidth = `${maxWidth}`;
			}
		}

		return maxWidthStyles;
	}

	protected render() :VNode {
		const { widget, activeWidgetId, onFocus } = this.properties;

		this.tryFocus(widget, activeWidgetId, onFocus);

		const { properties } = widget;

		const borderClasses = getBorderClasses(properties as BorderProperties);
		const spacingclasses = getSpacingClasses(properties as SpacingProperties);
		const textclasses = getTextClasses(properties as TextProperties);
		const textstyles = getTextStyles(properties as TextProperties);

		const hasChildren = this.children.length > 0;
		return v(
			'div',
			{
				key: this.rootKey,
				classes: [...borderClasses, ...spacingclasses, ...textclasses, hasChildren ? null : baseCss.emptyContainer],
				styles: { ...textstyles, ...this._getMaxWidthStyles() },
				onmouseup: this.onMouseUp
			},
			this.children
		);
	}
}

export default View;