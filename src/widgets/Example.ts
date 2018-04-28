// import WidgetBase from '@dojo/widget-core/WidgetBase';
import { v,w } from '@dojo/widget-core/d';
import EditableWidgetBase from 'brj-widget-core/EditableWidgetBase'; 
import { EditableWidgetProperties } from 'brj-widget-core/interfaces';
import { VNode } from '@dojo/widget-core/interfaces';

import Button from './Button';
import Container from './Container';

import View from './View';
export class Example extends EditableWidgetBase {
	protected render() :VNode|VNode[]{
		const prop : EditableWidgetProperties = {widget:{id:'1',widgetId:1,widgetName:'1',parentId:'root',properties:{id:'1',value:'a',appearance:'primary'}}, onFocus:function(){}, activeWidgetId:'1'};
		return [v('div', {}, [
			w(Button,prop)
		]),
		 v('div', {}, [
			w(Container,prop)
		]),
		v('div', {}, [
		   w(View,prop)
	   ])];

	}
}

export default Example;
