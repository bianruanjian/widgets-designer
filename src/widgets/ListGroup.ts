import DesignerWidgetMixin from 'widget-core-designer/DesignerWidgetMixin';
import { ListGroupBase } from 'widgets-web/list-group';
import { VNode, DNode } from '@dojo/widget-core/interfaces';
export default class ListGroup extends DesignerWidgetMixin(ListGroupBase) {
	protected isContainer() {
		return true;
	}

	protected renderChildren(): DNode[] {
		const orientation = this.properties.orientation;
		this.children.forEach((child, index) => {
			if (child) {
				const childNode = child as VNode;
				const childWidgetName = childNode.properties.widget.widgetName;

				if (childWidgetName === 'ListItem') {
					childNode.properties.widget.properties.orientation = orientation;
				}
			}
		});
		return this.children;
	}

	protected getTagNameByChildNode(): string {
		let tag: string = 'ul';
		let existListItem: boolean = false;
		let existButtonOrLink: boolean = false;
		this.children.forEach((child, index) => {
			if (child) {
				const childNode = child as VNode;
				const childName = childNode.properties.widget.widgetName;

				if (childName === 'Link' || childName === 'Button') {
					tag = 'div';
					existButtonOrLink = true;
					childNode.properties.widget.properties.isListItem = true;
				}
				if (childName === 'ListItem') {
					existListItem = true;
				}
			}
		});

		if (existButtonOrLink && existListItem) {
			console.error('ListItem and Button/Link can not be allowed at the same time in the ListGroup widget');
		}

		return tag;
	}
}
