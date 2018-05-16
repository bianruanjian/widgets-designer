import { v } from '@dojo/widget-core/d';
import EditableWidgetBase from 'widget-core-designer/EditableWidgetBase';
import * as baseCss from './styles/base.m.css';
import { VNode } from '@dojo/widget-core/interfaces';
import { BorderProperties, SpacingProperties, TextProperties, FlexContainerProperties, FlexItemProperties, DisplayProperties } from './interfaces';
import { getBorderClasses, getSpacingClasses, getTextClasses, getFlexContainerClasses, getFlexItemClasses, getTextStyles, getTextDecorationClass, getDisplayClass } from './util';


export class GridColumn extends EditableWidgetBase {

    private _getClasses(): string[] {
		let {
            widget: {
				properties: {
					offset,
					colspan
				}
			}
		} = this.properties;

		const cssClasses: string[] = [];

		if((offset && offset !== "default") || offset === 0){
			cssClasses.push(`offset-${offset}`);
		}
		if(colspan && colspan !== 'default' && colspan !== 1){
			cssClasses.push(`col-${colspan}`);
		}else{
			cssClasses.push('col');
 		}

		return cssClasses;
	}

	protected render() : VNode {
		const { widget, activeWidgetId, onFocus } = this.properties;
		this.tryFocus(widget, activeWidgetId, onFocus);

        const hasChildren = this.children.length > 0;
        let {
			widgetId,
			display
		} = widget.properties;

		let flexContainerClasses: string[] = [];
		let flexItemClasses: string[] = [];

		if(display && (display === 'flex' || display === 'inlineFlex')){
			flexContainerClasses = getFlexContainerClasses(widget.properties as FlexContainerProperties);
			flexItemClasses = getFlexItemClasses(widget.properties as FlexItemProperties);
		}
		return v(
			'div',
			{
				key: this.rootKey,
				id: widgetId,
				classes: [
					...this._getClasses(),
					...getBorderClasses(widget.properties as BorderProperties),
					...getSpacingClasses(widget.properties as SpacingProperties),
					...getTextClasses(widget.properties as TextProperties),
					display ? getDisplayClass(widget.properties as DisplayProperties) : '',
					...flexContainerClasses,
					...flexItemClasses,
                    ...getTextDecorationClass(widget.properties as TextProperties),
                    hasChildren ? null : baseCss.emptyContainer
				],
				styles: {
					...getTextStyles(widget.properties as TextProperties)
				},
				onmouseup: this.onMouseUp
			},
			this.children
		);
	}
}

export default GridColumn;