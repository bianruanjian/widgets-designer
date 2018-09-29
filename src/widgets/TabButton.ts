import { TabButtonBase } from '@dojo/widgets/tab-controller/TabButton';
import commonBundle from '@dojo/widgets/common/nls/common';
import Focus from '@dojo/framework/widget-core/meta/Focus';
import { Keys } from '@dojo/widgets/common/util';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import { v } from '@dojo/framework/widget-core/d';
import * as css from '@dojo/widgets/theme/tab-controller.m.css';

export default class TabButton extends TabButtonBase {
	// 覆写方法，以支持设置为 disabled 的 TabButton 也能被选中
	protected onClick(event: MouseEvent) {
		event.stopPropagation();
		const { index, onClick } = this.properties;

		onClick && onClick(index);
	}

	// 覆写该方法，支持键盘操作也能应用到被设置为 disabled 的 TabButton 上
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
