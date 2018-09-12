import { DesignerWidgetMixin } from 'widget-core-designer/DesignerWidgetMixin';
import { TabControllerWidgetBase } from 'widgets-web/tab-controller/index';
import { DNode, WNode } from '@dojo/framework/widget-core/interfaces';
import { w, v } from '@dojo/framework/widget-core/d';
import { TabControllerProperties } from '@dojo/widgets/tab-controller';
import Tab from './Tab';
import { Dimensions } from '@dojo/framework/widget-core/meta/Dimensions';
import { Resize } from '@dojo/framework/widget-core/meta/Resize';

export default class TabController extends DesignerWidgetMixin(TabControllerWidgetBase) {
	protected isContainer() {
		return true;
	}

	private get tabs(): WNode<Tab>[] {
		return this.children.filter((child) => child !== null) as WNode<Tab>[];
	}

	private _onRequestTabChange(index: number, key: string) {
		const { onFocus } = this.properties;
		const activeWidgetId = this.tabs[index].properties.widget.id;
		const dimensions = this.meta(Dimensions).get(key);
		this.meta(Resize).get(String(key), {});
		onFocus && onFocus({ activeWidgetDimensions: dimensions, activeWidgetId: activeWidgetId });
	}

	render(): DNode {
		return v(
			'div',
			{
				key: this.getKey()
			},
			[
				w(
					TabControllerWidgetBase,
					{
						...(this.properties as TabControllerProperties),
						onRequestTabChange: this._onRequestTabChange
					},
					this.children
				)
			]
		);
	}
}
