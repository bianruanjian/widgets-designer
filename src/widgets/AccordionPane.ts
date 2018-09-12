import { DesignerWidgetMixin } from 'widget-core-designer/DesignerWidgetMixin';
import { AccordionPaneWidgetBase } from 'widgets-web/accordion-pane/index';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import { v, w } from '@dojo/framework/widget-core/d';
import { AccordionPaneProperties } from '@dojo/widgets/accordion-pane';

export default class AccordionPane extends DesignerWidgetMixin(AccordionPaneWidgetBase) {
	protected isContainer() {
		return true;
	}

	protected render(): DNode {
		return v(
			'div',
			{
				key: this.getKey()
			},
			[
				w(
					AccordionPaneWidgetBase,
					{
						...(this.properties as AccordionPaneProperties)
					},
					this.children
				)
			]
		);
	}
}
