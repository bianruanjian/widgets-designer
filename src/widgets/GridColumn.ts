import DesignerWidgetMixin from 'widget-core-designer/DesignerWidgetMixin';
import WebGridColumn from 'widgets-web/grid-column';
export default class GridColumn extends DesignerWidgetMixin(WebGridColumn) {
    protected isContainer(){
        return true;
     }
}