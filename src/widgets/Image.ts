import EditableWidgetBase from 'widget-core-designer/EditableWidgetBase';
import { VNode } from '@dojo/widget-core/interfaces';
import { v, w } from '@dojo/widget-core/d';
import { Image as image } from 'widgets-web/image';
import * as baseCss from './styles/base.m.css';

export default class Image extends EditableWidgetBase {
	protected render(): VNode {
		const { widget, activeWidgetId, onFocus } = this.properties;

        this.tryFocus(widget, activeWidgetId, onFocus);
        
        const hasChildren = this.children.length > 0;

		return v('div',{
            key:this.rootKey,
            classes: hasChildren ? [] : [baseCss.emptyContainer],
            onmouseup: this.onMouseUp
        },[
            w(image, widget.properties, this.children)
        ]);
	}
}
