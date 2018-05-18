import DesignerWidgetMixin from 'widget-core-designer/DesignerWidgetMixin';
import WebListGroup from 'widgets-web/list-group';
export default class ListGroup extends DesignerWidgetMixin(WebListGroup) {
    protected isContainer(){
        return true;
     }
}