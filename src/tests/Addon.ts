const { describe, it } = intern.getInterface('bdd');

import { w, v } from '@dojo/widget-core/d';
import harness from '@dojo/test-extras/harness';
import Addon from './../widgets/Addon';
import { Addon as addon, AddonProperties } from 'widgets-web/addon/index';
import { EditableWidgetProperties } from 'widget-core-designer/interfaces';

describe('Addon', () => {
    it('should construct Addon', () => {
        const prop : EditableWidgetProperties = {widget:{id:'1',widgetId:1,widgetName:'1',parentId:'root',properties:{value:'a', id: '1'}}, onFocus:function(){}, activeWidgetId:'1'};
		const h = harness(() => w(Addon, prop));
		h.expect(() =>
			v(
				'div',
				{
					key: 'root',
					classes: [],
					onmouseup: () => {}
				},
					[w(addon , {
						id: '1',
						value:'a'
					} as AddonProperties )
				]
			)
		);
	});
});