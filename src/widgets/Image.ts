import EditableWidgetBase from 'brj-widget-core/EditableWidgetBase';
import { v } from '@dojo/widget-core/d';
import 'bootstrap/dist/css/bootstrap.min.css';
import { VNode } from '@dojo/widget-core/interfaces';

import { SpacingProperties, BorderProperties } from './interfaces';
import { getSpacingClasses, getBorderClasses } from './util';

export class Image extends EditableWidgetBase {

	private _getImgClasses(): string[]{
		let{
			widget:{
				properties:{
					fluid,
					thumbnail,
					alignment
				}
			}
		} = this.properties;
		const cssClasses: string[] = [];
		if(fluid){
			cssClasses.push('img-fluid');
		}

		if(thumbnail){
			cssClasses.push('img-thumbnail');
		}

		if(alignment && alignment !== "default"){
			if(alignment === "center"){
				cssClasses.push('mx-auto');
				cssClasses.push('d-block');
			} else {
				cssClasses.push(`float-${alignment}`);
			}	
		}

		return cssClasses;
	}

	private _getImgStyles() {
		let{
			widget:{
				properties:{
					width,
					height,
				}
			 }
		} = this.properties;

		let cssStyles: any = {width: "100%",height:"100%"};

		if(width && width !== "auto"){
			if(typeof width === "number" || (width as string).indexOf("%") === -1){
				cssStyles.width = `${width}px`;
			} else {
				cssStyles.width = `${width}`;
			}
		}

		if(height && height !== "auto"){
			if(typeof height === "number" || (height as string).indexOf("%") === -1 ){
				cssStyles.height = `${height}px`;
			} else {
				cssStyles.height = `${height}`;
			}
		}

		return cssStyles;
	}

	protected render(): VNode {
		const { widget, activeWidgetId, onFocus } = this.properties;
		this.tryFocus(widget, activeWidgetId, onFocus);

		let{
			widgetId,
			src,
			alt
		} = widget.properties;

		if(!src) {
			src = "https://getbootstrap.com/assets/brand/bootstrap-solid.svg";
		}

		return v(
			'img',
			{
				key: this.rootKey,
				id: widgetId,
				src,
				alt,
				classes: [
					...this._getImgClasses(),
					...getBorderClasses(widget.properties as BorderProperties),
					...getSpacingClasses(widget.properties as SpacingProperties)
				],
				styles: {
					...this._getImgStyles()
				},
				onmouseup: this.onMouseUp
			},
			this.children
		);
	}
}

export default Image;
