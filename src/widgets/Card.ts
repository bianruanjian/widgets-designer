import DesignerWidgetMixin from 'widget-core-designer/DesignerWidgetMixin';
import WebCard from 'widgets-web/card';
export default class Card extends DesignerWidgetMixin(WebCard) {
    protected isContainer(){
        return true;
     }
}