import { v } from '@dojo/widget-core/d';
import EditableWidgetBase from 'brj-widget-core/EditableWidgetBase';

import * as baseCss from './styles/base.m.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { VNode } from '@dojo/widget-core/interfaces';

export class Container extends EditableWidgetBase {
	protected render() :VNode {
		const { widget, activeWidgetId, onFocus } = this.properties;

		this.tryFocus(widget, activeWidgetId, onFocus);

		const { properties: { fluidWidth } } = widget;

		const isFluidWidth = fluidWidth === 'true';

		const cssClass = isFluidWidth ? 'container-fluid' : 'container';

		const hasChildren = this.children.length > 0;
		return v(
			'div',
			{
				key: this.rootKey,
				classes: [cssClass, hasChildren ? null : baseCss.emptyContainer],
				onmouseup: this.onMouseUp
			},
			this.children
		);
	}
}

export default Container;