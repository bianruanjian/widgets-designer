import { v } from '@dojo/widget-core/d';
import EditableWidgetBase from 'brj-widget-core/EditableWidgetBase';
import * as baseCss from './styles/base.m.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { VNode } from '@dojo/widget-core/interfaces';
import { BorderProperties, SpacingProperties, TextProperties, FlexContainerProperties, FlexItemProperties } from './interfaces';
import { getBorderClasses, getSpacingClasses, getTextClasses, getFlexContainerClasses, getFlexItemClasses, getTextStyles, getTextDecorationClass } from './util';


export class GridColumn extends EditableWidgetBase {

    private _getSelfClasses(): string[] {
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

		if(display==="flex"||display==="inlineFlex"){
			flexContainerClasses = getFlexContainerClasses(widget.properties as FlexContainerProperties);
		}
		return v(
			'div',
			{
				key: this.rootKey,
				id: widgetId,
				classes: [
					...this._getSelfClasses(),
					...getBorderClasses(widget.properties as BorderProperties),
					...getSpacingClasses(widget.properties as SpacingProperties),
					...getTextClasses(widget.properties as TextProperties),
					...flexContainerClasses,
					...getFlexItemClasses(widget.properties as FlexItemProperties),
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