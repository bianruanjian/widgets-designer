import DesignerWidgetMixin from 'widget-core-designer/DesignerWidgetMixin';
import WebGridRow from 'widgets-web/grid-row';
export default class GridRow extends DesignerWidgetMixin(WebGridRow) {
    protected isContainer(){
        return true;
     }
}