import DesignerWidgetMixin from 'widget-core-designer/DesignerWidgetMixin';
import WebView from 'widgets-web/view';
export default class View extends DesignerWidgetMixin(WebView) {
    protected isContainer(){
        return true;
     }
}