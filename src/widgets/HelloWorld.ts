// import WidgetBase from '@dojo/widget-core/WidgetBase';
import { v,w } from '@dojo/widget-core/d';
import EditableWidgetBase from 'brj-widget-core/EditableWidgetBase'; 

import { EditableWidgetProperties } from 'brj-widget-core/interfaces';

// import Overlay from 'brj-widget-core/Overlay';

import * as css from './styles/helloWorld.m.css';
import { VNode } from '@dojo/widget-core/interfaces';

import Button from './Button';

const logo = require('./../img/logo.svg');

/**
 * A "Hello World" widget that renders a spinning Dojo 2 logo and the text "Hello, Dojo 2 World!".
 *
 * Refer to the creating widgets tutorial for help: https://dojo.io/tutorials/003_creating_widgets/
 */
export class HelloWorld extends EditableWidgetBase {
	protected render() :VNode{
		const prop : EditableWidgetProperties = {widget:{id:'1',widgetId:1,widgetName:'1',parentId:'root',properties:{id:'1',value:'a',appearance:'primary'}}, onFocus:function(){}, activeWidgetId:'1'};
		return v('div', { classes: css.root }, [
			v('img', { src: logo, classes: css.logo }),
			v('div', { classes: css.label }, ['Hello, Dojo 2 World!']),
			w(Button,prop)
		]);
	}
}

export default HelloWorld;
