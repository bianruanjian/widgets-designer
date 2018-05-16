const { describe, it } = intern.getInterface('bdd');

import { w, v } from '@dojo/widget-core/d';
import harness from '@dojo/test-extras/harness';
import Textarea from './../widgets/Textarea';
import { EditableWidgetProperties } from 'widget-core-designer/interfaces';

describe('Textarea', () => {
    it('should construct Textarea', () => {
        const prop : EditableWidgetProperties = {widget:{id:'1',widgetId:1,widgetName:'1',parentId:'root',properties:{widgetId:'1',value:'a', id: '1'}}, onFocus:function(){}, activeWidgetId:'1'};
		const h = harness(() => w(Textarea, prop));
		h.expect(() =>
			[
				null,
				v(
					'input',
					{
						id: '1',
						key: 'root',
						name: undefined,
						type: '',
						value: 'a',
						placeholder: undefined,
						disabled: false,
						required: false,
						readOnly: false,
						maxlength: null,
						minlength: null,
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