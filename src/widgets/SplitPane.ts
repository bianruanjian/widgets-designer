import { DesignerWidgetMixin } from 'widget-core-designer/DesignerWidgetMixin';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import { v, w } from '@dojo/framework/widget-core/d';
import * as css from 'widgets-web/split-pane/styles/split-pane.m.css';
import { SplitPaneProperties, SplitPaneBase } from '@dojo/widgets/split-pane';

export default class SplitPane extends DesignerWidgetMixin(SplitPaneBase) {
	protected isContainer() {
		return true;
	}

	protected render(): DNode {
		return v(
			'div',
			{
				key: 'split-pane',
				classes: css.root
			},
			[
				w(
					SplitPaneBase,
					{
						...(this.properties as SplitPaneProperties)
					},
					this.children
				)
			]
		);
	}
}
