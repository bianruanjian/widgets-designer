import DesignerWidgetMixin from 'widget-core-designer/DesignerWidgetMixin';
import WebTextarea from 'widgets-web/textarea';
export default class Textarea extends DesignerWidgetMixin(WebTextarea) {
	protected needOverlay(){
        return true;
    }
}