const { describe, it } = intern.getInterface('bdd');

import { w, v } from '@dojo/widget-core/d';
import harness from '@dojo/test-extras/harness';
import ListItem from './../widgets/ListItem';
import { EditableWidgetProperties } from 'widget-core-designer/interfaces';
import * as baseCss from './../widgets/styles/base.m.css';

describe('ListItem', () => {
    it('should construct ListItem', () => {
        const prop : EditableWidgetProperties = {widget:{id:'1',widgetId:1,widgetName:'1',parentId:'root',properties:{widgetId:'1',value:'a', id: '1'}}, onFocus:function(){}, activeWidgetId:'1'};
		const h = harness(() => w(ListItem, prop));
		h.expect(() =>
			v(
				'li',
				{
					id: '1',
					key: 'root',
					disabled: false,
					classes: [
						'list-group-item',
						undefined,
						undefined,
						undefined,
						undefined,
						baseCss.emptyContainer
					],
					styles: {},
					onmouseup: () => {}
				},
				[]
			)
		);
	});
});