import { v } from '@dojo/widget-core/d';
import EditableWidgetBase from 'brj-widget-core/EditableWidgetBase';
import * as baseCss from './styles/base.m.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { VNode } from '@dojo/widget-core/interfaces';
import { SpacingProperties, FlexContainerProperties, FlexItemProperties, DisplayProperties } from './interfaces';
import { getSpacingClasses, getFlexContainerClasses, getFlexItemClasses, getDisplayClasses } from './util';

export class GridRow extends EditableWidgetBase {

	private _getGuttersClasses() {
		let {
			widget: {
				properties: {
					gutters
				}
			}
		} = this.properties;

		const guttersClasses: string[] = [];

		if(gutters === false || gutters === "false" ){
			guttersClasses.push('no-gutters');
		}
		
		return guttersClasses;
	}

	protected render() : VNode {
		const { widget, activeWidgetId, onFocus } = this.properties;
		this.tryFocus(widget, activeWidgetId, onFocus);

		const hasChildren = this.children.length > 0;
		let {
			widgetId,
			display,
		} = widget.properties;

		let flexContainerClasses: string[] = [];

		if(display==="flex"||display==="inlineFlex"){
			flexContainerClasses = getFlexContainerClasses(widget.properties as FlexContainerProperties);
		}
		
		return v(
			'div',
			{
				key: this.rootKey,
				id: widgetId,
				classes: ['row', 
					...this._getGuttersClasses(),
					...getDisplayClasses(widget.properties as DisplayProperties),
					...getSpacingClasses(widget.properties as SpacingProperties),
					...flexContainerClasses,
					...getFlexItemClasses(widget.properties as FlexItemProperties),
					hasChildren ? null : baseCss.emptyContainer
				],
				onmouseup: this.onMouseUp
			},
			this.children
		);
	}
}

export default GridRow;