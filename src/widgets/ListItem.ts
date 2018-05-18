import DesignerWidgetMixin from 'widget-core-designer/DesignerWidgetMixin';
import WebListitem from 'widgets-web/list-item';
export default class Listitem extends DesignerWidgetMixin(WebListitem) {
    protected isContainer(){
        return true;
     }
}