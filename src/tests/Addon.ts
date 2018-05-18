const { describe, it } = intern.getInterface('bdd');
import Addon from './../widgets/Addon';
import harness from '@dojo/test-extras/harness';
import { EditableWidgetProperties } from 'widget-core-designer/interfaces';
import { w, v } from '@dojo/widget-core/d';

describe('Addon', () => {
    it('should construct Addon', () => {
        const prop : EditableWidgetProperties = {widget:{id:'1',widgetId:1,widgetName:'1',parentId:'root',properties:{value:'a', id: '1'}}, onFocus:function(){}, activeWidgetId:'1'};
		const h = harness(() => w(Addon, prop));
		h.expect(() =>
		[
			 v('div', {
			         classes: [
			                         undefined,
			                         'input-group-prepend'
			         ],
			         id: undefined,
			         key: 'addon',
			         onmouseup: () => {}
			 }, [
			         v('span', {
						classes: [
			                                         'input-group-text'
			                 ]
			         }, [
			                 'a'
			         ])
			 ])
			]	
		);
	});
});