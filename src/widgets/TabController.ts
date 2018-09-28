import { DesignerWidgetMixin } from 'widget-core-designer/DesignerWidgetMixin';
import { WNode, DNode } from '@dojo/framework/widget-core/interfaces';
import Tab from './Tab';
import { Dimensions } from '@dojo/framework/widget-core/meta/Dimensions';
import { Resize } from '@dojo/framework/widget-core/meta/Resize';
import { v, w } from '@dojo/framework/widget-core/d';
import { TabControllerBase, TabControllerProperties, Align } from '@dojo/widgets/tab-controller/index';
import { TabButtonBase } from '@dojo/widgets/tab-controller/TabButton';
import commonBundle from '@dojo/widgets/common/nls/common';
import Focus from '@dojo/framework/widget-core/meta/Focus';
import * as css from '@dojo/widgets/theme/tab-controller.m.css';
import { Keys, formatAriaProperties } from '@dojo/widgets/common/util';
import { TabProperties } from '@dojo/widgets/tab';
import uuid from '@dojo/framework/core/uuid';
import { assign } from '@dojo/framework/shim/object';

export class TabButtonDesignerBase extends TabButtonBase {
	// 复写方法，以支持设置为 disabled 的 TabButton 也能被选中
	protected onClick(event: MouseEvent) {
		event.stopPropagation();
		const { index, onClick } = this.properties;

		onClick && onClick(index);
	}

	// 复写该方法，以支持设置为 disabled 的 TabButton 也能被切换控件时操作到
	protected onKeyDown(event: KeyboardEvent) {
		event.stopPropagation();
		const {
			closeable,
			index,
			onCloseClick,
			onDownArrowPress,
			onEndPress,
			onHomePress,
			onLeftArrowPress,
			onRightArrowPress,
			onUpArrowPress
		} = this.properties;

		// Accessibility
		switch (event.which) {
			// Escape
			case Keys.Escape:
				closeable && onCloseClick && onCloseClick(index);
				break;
			// Left arrow
			case Keys.Left:
				onLeftArrowPress && onLeftArrowPress();
				break;
			// Right arrow
			case Keys.Right:
				onRightArrowPress && onRightArrowPress();
				break;
			// Up arrow
			case Keys.Up:
				onUpArrowPress && onUpArrowPress();
				break;
			// Down arrow
			case Keys.Down:
				onDownArrowPress && onDownArrowPress();
				break;
			// Home
			case Keys.Home:
				onHomePress && onHomePress();
				break;
			// End
			case Keys.End:
				onEndPress && onEndPress();
				break;
		}
	}

	render(): DNode {
		const { active, callFocus, controls, disabled, id, onFocusCalled } = this.properties;
		const { messages } = this.localizeBundle(commonBundle);

		if (callFocus) {
			this.meta(Focus).set('tab-button');
			onFocusCalled && onFocusCalled();
		}

		return v(
			'div',
			{
				'aria-controls': controls,
				'aria-disabled': disabled ? 'true' : 'false',
				'aria-selected': active === true ? 'true' : 'false',
				classes: this.theme([css.tabButton, ...this.getModifierClasses()]),
				id,
				key: 'tab-button',
				onclick: this.onClick,
				onkeydown: this.onKeyDown,
				role: 'tab',
				tabIndex: active === true ? 0 : -1
			},
			this.getContent(messages)
		);
	}
}

export interface TabControllerDesignerProperties extends TabControllerProperties {
	// 暴露出 TabButton 的 onclick 事件
	onRequestTabClick?(index: number, key: string): void;
}

export class TabControllerDesignerBase extends TabControllerBase<TabControllerDesignerProperties> {
	private id = uuid();
	private callTabFocus = false;

	protected get tabs(): WNode<Tab>[] {
		return this.children.filter((child) => child !== null) as WNode<Tab>[];
	}

	// 复写该方法，删除 TabButton 设置为 disabled, 自动切换到下一个有效的 Tab 的逻辑
	private validateIndex(currentIndex: number, backwards?: boolean) {
		const tabs = this.tabs;
		if (tabs.every((result) => Boolean(result.properties.disabled))) {
			return null;
		}
		let i = !tabs[currentIndex] ? tabs.length - 1 : currentIndex;
		return i;
	}

	// 复写该方法，以支持选择 Tab 时触发点击事件
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
				TabButtonDesignerBase,
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

export default class TabController extends DesignerWidgetMixin(TabControllerDesignerBase) {
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

	// 触发设计器版的 onFocus 事件
	protected _requestTabClick(index: number, key: string) {
		this._activeIndex = index;
		const { onFocus } = this.properties;
		const activeWidgetId = this.tabs[index].properties.widget.id;
		const dimensions = this.meta(Dimensions).get(key);
		this.meta(Resize).get(String(key), {});
		onFocus && onFocus({ activeWidgetDimensions: dimensions, activeWidgetId: activeWidgetId });
	}

	render(): DNode {
		const { activeIndex = -1 } = this.properties;

		if (this._activeIndexFromProperties !== activeIndex) {
			this._activeIndexFromProperties = activeIndex;
			this._activeIndex = activeIndex;
		}

		return v(
			'div',
			{
				key: 'tab-controller'
			},
			[
				w(
					TabControllerDesignerBase,
					{
						...(this.properties as TabControllerDesignerProperties),
						activeIndex: this._activeIndex,
						onRequestTabClick: this._requestTabClick
					},
					this.children
				)
			]
		);
	}
}
