import DesignerWidgetMixin from 'widget-core-designer/DesignerWidgetMixin';
import WebSelect from 'widgets-web/select';
export default class Select extends DesignerWidgetMixin(WebSelect) {
	protected needOverlay(){
        return true;
    }
}