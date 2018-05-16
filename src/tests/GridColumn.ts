const { describe, it } = intern.getInterface('bdd');

import { w, v } from '@dojo/widget-core/d';
import harness from '@dojo/test-extras/harness';
import GridColumn from './../widgets/GridColumn';
import { EditableWidgetProperties } from 'widget-core-designer/interfaces';
import * as baseCss from './../widgets/styles/base.m.css';

describe('GridColumn', () => {
    it('should construct GridColumn', () => {
        const prop : EditableWidgetProperties = {widget:{id:'1',widgetId:1,widgetName:'1',parentId:'root',properties:{widgetId:'1',value:'a', id: '1'}}, onFocus:function(){}, activeWidgetId:'1'};
		const h = harness(() => w(GridColumn, prop));
		h.expect(() =>
			v(
				'div',
				{
					key: 'root',
					id: '1',
					classes: [
						'col',
						'',
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