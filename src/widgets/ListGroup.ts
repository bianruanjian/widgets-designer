import EditableWidgetBase from 'widget-core-designer/EditableWidgetBase';
import { VNode } from '@dojo/widget-core/interfaces';
import { v, w } from '@dojo/widget-core/d';
import { Icon as icon } from 'widgets-web/icon';
import * as baseCss from './styles/base.m.css';

export default class Icon extends EditableWidgetBase {
	protected render(): VNode {
		const { widget, activeWidgetId, onFocus } = this.properties;

        this.tryFocus(widget, activeWidgetId, onFocus);
        
        const hasChildren = this.children.length > 0;

		return v('span',{
            key:this.rootKey,
            classes: hasChildren ? [] : [baseCss.emptyContainer],
            onmouseup: this.onMouseUp
        },[
            w(icon, widget.properties, this.children)
        ]);
	}
}
