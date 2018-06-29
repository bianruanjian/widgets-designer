import DesignerWidgetMixin from 'widget-core-designer/DesignerWidgetMixin';
import { ImageBase } from 'widgets-web/image';
import { DNode } from '@dojo/widget-core/interfaces';
import { v } from '@dojo/widget-core/d';
import { getBorderClasses, getSpacingClasses } from 'widgets-web/common/util';
import * as css from './styles/Image.m.css';

export default class Image extends DesignerWidgetMixin(ImageBase) {
	protected render(): DNode | DNode[] {
		let { src } = this.properties;

		if (!src || src === '') {
			return this._renderDefaultImage();
		}

		return super.render();
	}

	private _renderDefaultImage() {
		return v(
			'div',
			{
				key: this.getKey(),
				classes: [
					...this.getImgClasses(),
					...getBorderClasses(this.properties),
					...getSpacingClasses(this.properties),
					'd-flex',
					'justify-content-center',
					css.svgContainer
				],
				styles: {
					...this.getImgStyles()
				}
			},
			[
				v(
					'svg',
					{
						classes: [css.defaultSvg, 'align-self-center']
					},
					[
						v('use', {
							href: '#fas-image'
						})
					]
				)
			]
		);
	}
}
