import DesignerWidgetMixin from 'widget-core-designer/DesignerWidgetMixin';
import WebInputGroup from 'widgets-web/input-group';
export default class InputGroup extends DesignerWidgetMixin(WebInputGroup) {
    protected isContainer(){
        return true;
     }
}