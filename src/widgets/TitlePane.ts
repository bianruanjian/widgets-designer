import { DesignerWidgetMixin } from 'widget-core-designer/DesignerWidgetMixin';
import { TitlePaneBase, TitlePaneProperties } from '@dojo/widgets/title-pane';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import { v, w } from '@dojo/framework/widget-core/d';

export default class TitlePane extends DesignerWidgetMixin(TitlePaneBase) {
	protected isContainer() {
		return true;
	}

	// 屏蔽 Title 默认事件
	protected render(): DNode {
		return v(
			'div',
			{
				key: 'title-pane'
			},
			[
				w(
					TitlePaneBase,
					{
						...(this.properties as TitlePaneProperties),
						onRequestOpen: () => {},
						onRequestClose: () => {}
					},
					this.children
				)
			]
		);
	}
}
