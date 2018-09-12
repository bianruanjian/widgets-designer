import { DesignerWidgetMixin } from 'widget-core-designer/DesignerWidgetMixin';
import { SplitPaneWidgetBase } from 'widgets-web/split-pane/index';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import { v, w } from '@dojo/framework/widget-core/d';
import * as css from 'widgets-web/split-pane/styles/split-pane.m.css';
import { SplitPaneProperties } from '@dojo/widgets/split-pane';

export default class SplitPane extends DesignerWidgetMixin(SplitPaneWidgetBase) {
	protected isContainer() {
		return true;
	}

	protected render(): DNode {
		return v(
			'div',
			{
				key: this.getKey(),
				classes: css.root
			},
			[
				w(
					SplitPaneWidgetBase,
					{
						...(this.properties as SplitPaneProperties)
					},
					this.children
				)
			]
		);
	}
}
