import DesignerWidgetMixin from 'widget-core-designer/DesignerWidgetMixin';
import WebTextInput from 'widgets-web/text-input';
export default class TextInput extends DesignerWidgetMixin(WebTextInput) {
	protected needOverlay(){
        return true;
    }
}