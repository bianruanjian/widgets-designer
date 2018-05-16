import EditableWidgetBase from 'widget-core-designer/EditableWidgetBase';
import { VNode } from '@dojo/widget-core/interfaces';
import { v, w } from '@dojo/widget-core/d';
import { InputGroup as inputGroup } from 'widgets-web/input-group';
import * as baseCss from './styles/base.m.css';

export default class Icon extends EditableWidgetBase {
	protected render(): VNode {
		const { widget, activeWidgetId, onFocus } = this.properties;

        this.tryFocus(widget, activeWidgetId, onFocus);
        
        const hasChildren = this.children.length > 0;

		return v('div',{
            key:this.rootKey,
            classes: hasChildren ? [] : [baseCss.emptyContainer],
            onmouseup: this.onMouseUp
        },[
            w(inputGroup, widget.properties, this.children)
        ]);
	}
}
