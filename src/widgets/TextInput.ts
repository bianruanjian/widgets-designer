import { v, w } from '@dojo/widget-core/d';
import EditableWidgetBase from 'widget-core-designer/EditableWidgetBase';
import { VNode, DNode } from '@dojo/widget-core/interfaces';
import { formSizeMap, getFlexItemClasses, getSpacingClasses, getDisplayClass, getFloatClass, renderMessageNode } from 'widgets-web/common/util';
import { FlexItemProperties, SpacingProperties, DisplayProperties, FloatProperties, MessageProperties } from 'widgets-web/common/interfaces';
import { Label } from 'widgets-web/label';

export class TextInput extends EditableWidgetBase {
	protected renderInput(): VNode {
		const properties = this.properties.widget.properties;
		let {
			widgetId,
			name,
			type,
			value,
			password,
			placeholder,
			disabled,
			required,
			readOnly,
			maxLength,
			minLength,
			size,
			plainText,
			display,
			label,
			labelPosition
		} = properties;

		const cssClasses: string[] = [];

		if (password === true || password === 'true') {
			type = 'password';
		}

		if (disabled === true || disabled === 'true') {
			cssClasses.push('disabled');
		}

		if (size) {
			cssClasses.push(formSizeMap[size as string]);
		}

		if (plainText === true || plainText === 'true') {
			cssClasses.push('form-control-plaintext');
		} else {
			cssClasses.push('form-control');
		}

		let flexItemClasses: string[] = [];

		if (display && (display === 'flex' || display === 'inlineFlex')) {
			flexItemClasses = getFlexItemClasses(properties as FlexItemProperties);
		}

		if (label && labelPosition && labelPosition === 'left') {
			return v(
				'input',
				{
					id: widgetId,
					key: 'text-input',
					name,
					type: type && type !== 'default' ? type : '',
					value,
					placeholder,
					disabled: disabled === true || disabled === 'true',
					required: required === true || required === 'true',
					readOnly: readOnly === true || readOnly === 'true',
					maxlength: maxLength ? `${maxLength}` : null,
					minlength: minLength ? `${minLength}` : null,
					classes: [
						...cssClasses,
						...getSpacingClasses(properties as SpacingProperties),
						display ? getDisplayClass(properties as DisplayProperties) : undefined,
						...flexItemClasses,
						...getFloatClass(properties as FloatProperties)
					]
				}
			);
		}

		return v(
			'input',
			{
				id: widgetId,
				key: this.rootKey,
				name,
				type: type && type !== 'default' ? type : '',
				value,
				placeholder,
				disabled: disabled === true || disabled === 'true',
				required: required === true || required === 'true',
				readOnly: readOnly === true || readOnly === 'true',
				maxlength: maxLength ? `${maxLength}` : null,
				minlength: minLength ? `${minLength}` : null,
				classes: [
					...cssClasses,
					...getSpacingClasses(properties as SpacingProperties),
					display ? getDisplayClass(properties as DisplayProperties) : undefined,
					...flexItemClasses,
					...getFloatClass(properties as FloatProperties)
				],
				onmouseup: this.onMouseUp
			}
		);
	}

	protected renderTextInput(): DNode[] {
		const { widgetId, label } = this.properties.widget.properties;

		return [
			label
				? w(
						Label,
						{
							value: label,
							forId: widgetId,
							classes: ['col-form-label', 'mr-3']
						},
						[]
				  )
				: null,
			this.renderInput(),
			renderMessageNode(this.properties.widget.properties as MessageProperties)
		];
	}

	protected renderFileInput(): DNode {
		const properties = this.properties.widget.properties;

		const { widgetId, label, disabled, name, display } = properties;

		let flexItemClasses: string[] = [];

		if (display && (display === 'flex' || display === 'inlineFlex')) {
			flexItemClasses = getFlexItemClasses(properties as FlexItemProperties);
		}

		return v(
			'div',
			{
				key: this.rootKey,
				classes: [
					'custom-file',
					...getSpacingClasses(properties as SpacingProperties),
					display ? getDisplayClass(properties as DisplayProperties) : undefined,
					...flexItemClasses,
					...getFloatClass(properties as FloatProperties)
				],
				onmouseup: this.onMouseUp
			},
			[
				v('input', {
					id: widgetId,
					key: 'text-input',
					name,
					type: 'file',
					disabled: disabled === true || disabled === 'true',
					classes: ['custom-file-input']
				}),
				label
					? w(Label, {
							value: label,
							forId: widgetId,
							classes: 'custom-file-label'
					  })
					: null,
				renderMessageNode(properties as MessageProperties)
			]
		);
	}

	protected render(): DNode | DNode[] {
		const { type, label, labelPosition } = this.properties.widget.properties;

		if (type && type === 'file') {
			return this.renderFileInput();
		}

		/**
		 * bootstrap 中有三种 inline 实现：
		 * 1. inline forms, 在 form 表单外放一个 inline form 布局管理器实现的,相当于 android 的水平 linearlayout；
		 * 2. checkbox inline，直接处理每个 form 表单和 label；
		 * 3. Form Grid 中的 Horizontal form，使用 Grid 布局，但是 Label 的宽度无法动态调整为任意值。
		 *
		 * 现在使用 第二种实现，当有更好的实现时，再完善此处代码。
		 */
		if (label && labelPosition && labelPosition === 'left') {
			return v(
				'div',
				{
					key: this.rootKey,
					classes: ['form-group', 'form-check-inline', 'w-100'],
					onmouseup: this.onMouseUp
				},
				this.renderTextInput()
			);
		}

		return this.renderTextInput();
	}
}

export default TextInput;
