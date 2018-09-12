import { DesignerWidgetMixin } from 'widget-core-designer/DesignerWidgetMixin';
import { TitlePaneBase } from '@dojo/widgets/title-pane';

export default class TitlePane extends DesignerWidgetMixin(TitlePaneBase) {
	protected isContainer() {
		return true;
	}
}
