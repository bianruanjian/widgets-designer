import { DesignerWidgetMixin } from 'widget-core-designer/DesignerWidgetMixin';
import { WNode, DNode } from '@dojo/framework/widget-core/interfaces';
import Tab from './Tab';
import { Dimensions } from '@dojo/framework/widget-core/meta/Dimensions';
import { Resize } from '@dojo/framework/widget-core/meta/Resize';
import { v, w } from '@dojo/framework/widget-core/d';
import {
	TabControllerBase as DojoTabControllerBase,
	TabControllerProperties as DojoTabControllerProperties,
	Align
} from '@dojo/widgets/tab-controller/index';
import * as css from '@dojo/widgets/theme/tab-controller.m.css';
import { formatAriaProperties } from '@dojo/widgets/common/util';
import { TabProperties } from '@dojo/widgets/tab';
import uuid from '@dojo/framework/core/uuid';
import { assign } from '@dojo/framework/shim/object';
import TabButton from './TabButton';
import { endsWith } from '@dojo/framework/shim/string';

export interface TabControllerProperties extends DojoTabControllerProperties {
	// 暴露出 TabButton 的 onclick 事件
	onRequestTabClick?(index: number, key: string): void;
}

export class TabControllerBase extends DojoTabControllerBase<TabControllerProperties> {
	private id = uuid();
	private callTabFocus = false;

	protected get tabs(): WNode<Tab>[] {
		return this.children.filter(
			(child) => child !== null && (child.properties as any).widget.widgetName === 'Tab'
		) as WNode<Tab>[];
	}

	// 覆写该方法，删除 TabButton 设置为 disabled, 自动切换到下一个有效的 Tab 的逻辑
	protected validateIndex(currentIndex: number, backwards?: boolean) {
		const tabs = this.tabs;
		if (tabs.every((result) => Boolean(result.properties.disabled))) {
			return null;
		}
		let i = !tabs[currentIndex] ? tabs.length - 1 : currentIndex;
		return i;
	}

	// 覆写该方法，以支持选择 Tab 时触发点击事件
	protected selectIndex(index: number, backwards?: boolean) {
		const { onRequestTabClick } = this.properties;
		this.callTabFocus = true;
		const key = this.tabs[index].properties.key;
		onRequestTabClick && onRequestTabClick(index, key);
	}

	protected closeIndex(index: number) {
		const { onRequestTabClose } = this.properties;
		const key = this.tabs[index].properties.key;
		this.callTabFocus = true;

		onRequestTabClose && onRequestTabClose(index, key);
	}

	protected onDownArrowPress() {
		const { alignButtons } = this.properties;

		if (alignButtons === Align.left || alignButtons === Align.right) {
			this.selectNextIndex();
		}
	}

	protected onLeftArrowPress() {
		this.selectPreviousIndex();
	}

	protected onRightArrowPress() {
		this.selectNextIndex();
	}

	protected onUpArrowPress() {
		const { alignButtons } = this.properties;

		if (alignButtons === Align.left || alignButtons === Align.right) {
			this.selectPreviousIndex();
		}
	}

	protected renderTabButtons(): DNode[] {
		return this.tabs.map((tab, i) => {
			const { closeable, disabled, key, label, theme } = <TabProperties>tab.properties;

			return w(
				TabButton,
				{
					callFocus: this.callTabFocus && i === this.properties.activeIndex,
					active: i === this.properties.activeIndex,
					closeable,
					controls: `${this.id}-tab-${i}`,
					disabled,
					id: `${this.id}-tabbutton-${i}`,
					index: i,
					key: `${key}-tabbutton`,
					onClick: this.selectIndex,
					onCloseClick: this.closeIndex,
					onDownArrowPress: this.onDownArrowPress,
					onEndPress: this.selectLastIndex,
					onFocusCalled: () => {
						this.callTabFocus = false;
					},
					onHomePress: this.selectFirstIndex,
					onLeftArrowPress: this.onLeftArrowPress,
					onRightArrowPress: this.onRightArrowPress,
					onUpArrowPress: this.onUpArrowPress,
					theme
				},
				this.renderButtonContent(label)
			);
		});
	}

	protected renderTabs(): DNode[] {
		const { activeIndex } = this.properties;

		return this.tabs.map((tab, i) => {
			assign(tab.properties, {
				widgetId: `${this.id}-tab-${i}`,
				labelledBy: `${this.id}-tabbutton-${i}`,
				show: i === activeIndex
			});
			return tab;
		});
	}

	render(): DNode {
		const { activeIndex, aria = {} } = this.properties;
		const validIndex = this.validateIndex(activeIndex);
		const tabs = this.renderTabs();

		if (validIndex !== null && validIndex !== activeIndex) {
			this.selectIndex(validIndex);
			return null;
		}

		const children = [
			v(
				'div',
				{
					key: 'buttons',
					classes: this.theme(css.tabButtons)
				},
				this.renderTabButtons()
			),
			tabs.length
				? v(
						'div',
						{
							key: 'tabs',
							classes: this.theme(css.tabs)
						},
						tabs
					)
				: null
		];

		let alignClass;
		let orientation = 'horizontal';

		switch (this.properties.alignButtons) {
			case Align.right:
				alignClass = css.alignRight;
				orientation = 'vertical';
				children.reverse();
				break;
			case Align.bottom:
				alignClass = css.alignBottom;
				children.reverse();
				break;
			case Align.left:
				alignClass = css.alignLeft;
				orientation = 'vertical';
				break;
		}

		return v(
			'div',
			{
				...formatAriaProperties(aria),
				'aria-orientation': orientation,
				classes: this.theme([alignClass ? alignClass : null, css.root]),
				role: 'tablist'
			},
			children
		);
	}
}

export default class TabController extends DesignerWidgetMixin(TabControllerBase) {
	protected isContainer() {
		return true;
	}

	// 通过 this.properties 传入的 _activeIndexFromProperties 会赋给该变量。
	// -1 表示 properties 中没有传入 activeIndex 的值
	private _activeIndexFromProperties: number = -1;

	// 通过 onRequestXXX 事件修改的值会赋给该变量；
	// render 方法中只使用该变量来重绘部件，
	// 所以如果通过 this.properties 修改了 _activeIndexFromProperties 后也要同步修改此变量。
	private _activeIndex: number = 0;

	// 通过 this.tabs 传入的 Tab key 数组会赋给该变量。
	private _tabKeysFromTabs: string[] = [];

	// 触发设计器版的 onFocus 事件
	protected _requestTabClick(index: number, key: string) {
		this._activeIndex = index;
		const { onFocus } = this.properties;
		const activeWidgetId = this.tabs[index].properties.widget.id;
		const dimensions = this.meta(Dimensions).get(key);
		this.meta(Resize).get(String(key), {});
		onFocus && onFocus({ activeWidgetDimensions: dimensions, activeWidgetId: activeWidgetId });
	}

	private _computeActiveIndex(currentTabKeys: string[]) {
		const { activeWidgetId } = this.properties;
		let newActiveIndex: number = -1;
		for (let i = 0; i < this._tabKeysFromTabs.length; i++) {
			if (this._tabKeysFromTabs[i] !== currentTabKeys[i]) {
				for (let j = i; j < currentTabKeys.length; j++) {
					if (endsWith(currentTabKeys[j], activeWidgetId as string)) {
						newActiveIndex = j;
						break;
					}
				}
				break;
			}
		}
		return newActiveIndex;
	}

	render(): DNode {
		const { activeIndex = -1 } = this.properties;

		if (this._activeIndexFromProperties !== activeIndex) {
			this._activeIndexFromProperties = activeIndex;
			this._activeIndex = activeIndex;
		}

		// 如果 TabController 中的子部件 Tab 被左移或者右移后，activeIndex 需要重新切换到 activeWidgetId 对应的 Tab 页上
		let currentTabKeys: string[] = [];
		this.tabs.forEach((tab, index) => {
			currentTabKeys.push(tab.properties.key);
		});
		if (this._tabKeysFromTabs.length !== currentTabKeys.length) {
			this._tabKeysFromTabs = currentTabKeys;
		} else {
			// 如果出现前移或后移 tab 时，需要重新计算 activeIndex
			const newActiveIndex = this._computeActiveIndex(currentTabKeys);
			if (newActiveIndex !== -1 && newActiveIndex != this._activeIndex) {
				this._activeIndex = newActiveIndex;
				this._tabKeysFromTabs = currentTabKeys;
			}
		}

		// 删除一个 tab 后，如果 activeIndex 超出了索引，则要调整 activeIndex 的值
		if (this._activeIndex && this._activeIndex >= this.tabs.length) {
			this._activeIndex = this.tabs.length - 1;
		}

		return v(
			'div',
			{
				key: 'tab-controller'
			},
			[
				w(
					TabControllerBase,
					{
						...(this.properties as TabControllerProperties),
						activeIndex: this._activeIndex,
						onRequestTabClick: this._requestTabClick
					},
					this.children
				)
			]
		);
	}
}
