import EditableWidgetBase from 'brj-widget-core/EditableWidgetBase';
import { v } from '@dojo/widget-core/d';
import 'bootstrap/dist/css/bootstrap.min.css';
import { VNode } from '@dojo/widget-core/interfaces';

import { SpacingProperties, TextProperties, ColorsProperties } from './interfaces';
import { getSpacingClasses, getTextClasses, getTextDecorationClass, getColorsClasses, getTextStyles } from './util';

export class Text extends EditableWidgetBase {
	protected render() : VNode {
		const { widget, activeWidgetId, onFocus } = this.properties;
		this.tryFocus(widget, activeWidgetId, onFocus);

		let {
			widgetId,
			value,
			type
		} = widget.properties;

		let tag: string;
		let cssClasses: string[] = [];

		if(!type){
			tag = 'span';
		}else if(type === 'text'){
			tag = 'span';
		}else if(type === 'lead'){
			tag = 'p';
			cssClasses.push('lead');
		}else{
			tag = type as string;
		}

		return v(
			tag,
			{
				key: this.rootKey,
				id: widgetId,
				classes: [
					...cssClasses,
					...getSpacingClasses(widget.properties as SpacingProperties),
					...getTextClasses(widget.properties as TextProperties),
					...getTextDecorationClass(widget.properties as TextProperties),
					...getColorsClasses(widget.properties as ColorsProperties)
				],
				styles: {
					...getTextStyles(widget.properties as TextProperties)
				},
				onmouseup: this.onMouseUp
			},
			value ? [...this.children,...[value]] : this.children
		);
	}
}

export default Text;
