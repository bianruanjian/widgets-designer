import EditableWidgetBase from 'widget-core-designer/EditableWidgetBase';
import { v, w } from '@dojo/widget-core/d';
import { VNode } from '@dojo/widget-core/interfaces';
import { Text as text } from 'widgets-web/text';
import * as baseCss from './styles/base.m.css';

export class Text extends EditableWidgetBase {
	protected render() : VNode {
		const { widget, activeWidgetId, onFocus } = this.properties;
		this.tryFocus(widget, activeWidgetId, onFocus);
        const hasChildren = this.children.length > 0;

		return v('span',{
            key:this.rootKey,
            classes: hasChildren ? [] : [baseCss.emptyContainer],
            onmouseup: this.onMouseUp
        },[
            w(text, widget.properties, this.children)
        ]);
	}
}

export default Text;
