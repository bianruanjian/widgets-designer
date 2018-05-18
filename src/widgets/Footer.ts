import DesignerWidgetMixin from 'widget-core-designer/DesignerWidgetMixin';
import WebFooter from 'widgets-web/footer';
export default class Footer extends DesignerWidgetMixin(WebFooter) {
    protected isContainer(){
        return true;
     }
}