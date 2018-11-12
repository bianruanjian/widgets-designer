import DesignerWidgetMixin from 'widget-core-designer/DesignerWidgetMixin';
import { ListGroupBase } from 'widgets-web/list-group';
export default class ListGroup extends DesignerWidgetMixin(ListGroupBase) {
	protected isContainer() {
		return true;
	}

	protected getTagNameByChildNode(): string {
		let tag: string = 'ul';
		let existListItem: boolean = false;
		let existButtonOrLink: boolean = false;
		this.children.forEach((child, index) => {
			if (child) {
				const childName = (child.properties as any).widget.widgetName;

				if (childName === 'Link' || childName === 'Button') {
					tag = 'div';
					existButtonOrLink = true;
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
