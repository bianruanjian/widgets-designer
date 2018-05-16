import { v, w } from '@dojo/widget-core/d';

import EditableWidgetBase from 'widget-core-designer/EditableWidgetBase';
import { VNode } from '@dojo/widget-core/interfaces';
import { Badge as badge } from 'widgets-web/Badge/index';
import * as baseCss from './styles/base.m.css';

export default class Badge extends EditableWidgetBase {
    protected render() : VNode {
        const { widget, activeWidgetId, onFocus } = this.properties;

		this.tryFocus(widget, activeWidgetId, onFocus);

        const hasChildren = this.children.length > 0;

        return v('span',{
            key:this.rootKey,
            classes: hasChildren ? [] : [baseCss.emptyContainer],
            onmouseup: this.onMouseUp
        },[
            w(badge, widget.properties, this.children)
        ]);
    }
}