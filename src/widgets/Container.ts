import DesignerWidgetMixin from 'widget-core-designer/DesignerWidgetMixin';
import WebContainer from 'widgets-web/container';
export default class Container extends DesignerWidgetMixin(WebContainer) {
    protected isContainer(){
        return true;
     }
}