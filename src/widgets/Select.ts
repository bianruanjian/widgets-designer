import { v, w } from '@dojo/widget-core/d';
import EditableWidgetBase from 'widget-core-designer/EditableWidgetBase';
import { VNode, DNode } from '@dojo/widget-core/interfaces';
import { formSizeMap, getFlexItemClasses, getSpacingClasses, getDisplayClass, getFloatClass, renderMessageNode } from './util';
import { FlexItemProperties, SpacingProperties, DisplayProperties, FloatProperties } from './interfaces';
import { Label } from 'widgets-web/label/index';
import { MessageProperties } from 'widgets-web/common/interfaces';

export class Select extends EditableWidgetBase {
	protected renderSelect(): VNode {
		const properties = this.properties.widget.properties;
		const {
			widgetId,
			name,
			value,
			disabled,
			required,
			readOnly,
			options,
			labelField,
			valueField,
			dataPath,
			size,
			display,
			label,
			labelPosition
		} = properties;

		const cssClasses: string[] = [];

		if (disabled === true || disabled === 'true') {
			cssClasses.push('disabled');
		}

		if (size) {
			cssClasses.push(formSizeMap[size as string]);
		}

		cssClasses.push('form-control');

		let children: DNode[] = [];

		if (options) {
			// 不使用 JSON.parse() 将 json 转为数组的原因是 JSON.parse() 不支持单引号,且不支持转义符
			let optionJson: any[] = eval(options as string);
			children = optionJson.map((option, index) => {
				return v(
					'option',
					{
						value: option[valueField],
						selected: value && value === option[valueField]
					},
					[option[labelField]]
				);
			});
		}

		if (dataPath) {
			//TODO: 发送请求，获取数据，暂时不处理
		}

		let flexItemClasses: string[] = [];

		if (display && (display === 'flex' || display === 'inlineFlex')) {
			flexItemClasses = getFlexItemClasses(properties as FlexItemProperties);
		}

		if (label && labelPosition && labelPosition === 'left') {
			return v(
				'select',
				{
					id: widgetId,
					key: 'select',
					name,
					disabled: disabled === true || disabled === 'true',
					required: required === true || required === 'true',
					readOnly: readOnly === true || readOnly === 'true',
					classes: [
						...cssClasses,
						...getSpacingClasses(properties as SpacingProperties),
						display ? getDisplayClass(properties as DisplayProperties) : undefined,
						...flexItemClasses,
						...getFloatClass(properties as FloatProperties)
					]
				},
				children
			);
		}

		return v(
			'select',
			{
				id: widgetId,
				key: this.rootKey,
				name,
				disabled: disabled === true || disabled === 'true',
				required: required === true || required === 'true',
				readOnly: readOnly === true || readOnly === 'true',
				classes: [
					...cssClasses,
					...getSpacingClasses(properties as SpacingProperties),
					display ? getDisplayClass(properties as DisplayProperties) : undefined,
					...flexItemClasses,
					...getFloatClass(properties as FloatProperties)
				],
				onmouseup: this.onMouseUp
			},
			children
		);
	}

	protected renderSelectWrapper(): DNode[] {
		const { widgetId, label } = this.properties.widget.properties;

		return [
			label
				? w(
						Label,
						{
							value: label,
							forId: widgetId,
							classes: ['col-form-label', 'mr-3']
						}
				  )
				: null,
			this.renderSelect(),
			renderMessageNode(this.properties.widget.properties as MessageProperties)
		];
	}

	protected render(): VNode | DNode[] {
		const { label, labelPosition } = this.properties.widget.properties;

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
				this.renderSelectWrapper()
			);
		}

		return this.renderSelectWrapper();
	}
}

export default Select;
