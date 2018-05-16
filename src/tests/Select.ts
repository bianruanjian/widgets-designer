const { describe, it } = intern.getInterface('bdd');

import { w, v } from '@dojo/widget-core/d';
import harness from '@dojo/test-extras/harness';
import Select from './../widgets/Select';
import { EditableWidgetProperties } from 'widget-core-designer/interfaces';

describe('Select', () => {
    it('should construct Select', () => {
        const prop : EditableWidgetProperties = {widget:{id:'1',widgetId:1,widgetName:'1',parentId:'root',properties:{widgetId:'1',value:'a', id: '1'}}, onFocus:function(){}, activeWidgetId:'1'};
		const h = harness(() => w(Select, prop));
		h.expect(() =>
			[
				null,
				v(
					'select',
					{
						id: '1',
						key: 'root',
						name: undefined,
						disabled: false,
						required: false,
						readOnly: false,
						classes: [
							'form-control',
							undefined
						],
						onmouseup: () => {}
					},
					[]
				),
				null
		]
		);
	});
});