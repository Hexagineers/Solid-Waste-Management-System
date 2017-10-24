/********************************************************************************************/
/********************************************************************************************/
/*******************************         WINDOWS METRO         ******************************/
/********************************************************************************************/
/********************************************************************************************/


/************************************* DEVICE SETTINGS *************************************/

var _library = 'metro';
var _path = '/metro/';

prx.library_scales = prx.library_scales || {};
prx.library_scales.metro = 1;

prx.comps.metroColorsLight = [{value: '00A0B1',displayValue: 'Teal'},{value: '2E8DEF',displayValue: 'Blue'},{value: 'A700AE',displayValue: 'Purple'},{value: '643EBF',displayValue: 'Dark Purple'},{value: 'BF1E4B',displayValue: 'Red'},{value: 'DC572E',displayValue: 'Orange'},{value: '00A600',displayValue: 'Green'},{value: '0A5BC4',displayValue: 'Sky Blue'},{value: '000000',displayValue: 'Black'},{value: 'FFFFFF',displayValue: 'White'}];

//TYPE: BUTTON
prx.types.metro_button = {
	name: "metro_button"
	,onDisplay: function(item,containerid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		var _dims = prx.componentsHelper.getRealDims(item, symbol);

		var _props = (typeof(prx.richtext)=='undefined') ? prx.componentsHelper.getProp(item.textProperties,'props-text') : '';

		var cR = "";

		cR += '<div id="' + _id + '" ' + prx.items.getComponentBaseAttributes(item, containerid, symbol)  + ' class="' + prx.items.getComponentBaseClasses(item, containerid, symbol) + ' box pos type-metro-button">';
		cR += '<style>';
		cR += prx.items.getComponentBaseStyle(item, containerid, symbol);
		cR += '#'+_id+' .metro-button { background: '+prx.componentsHelper.getProp(item.backgroundColor,'color-background')+'; text-align: '+prx.componentsHelper.getProp(item.textAlign,'align')+'; li!ne-height: '+(_dims.height-prx.componentsHelper.getProp(item.borderWidth,'num-border-width')*2)+'px; '+prx.componentsHelper.getProp(item.textFont,'font-family')+' '+_props+' color: '+prx.componentsHelper.getProp(item.textColor,'color-text')+'; font-size: '+prx.componentsHelper.getProp(item.textSize,'num-text-size')+'px; border: '+prx.componentsHelper.getProp(item.borderWidth,'num-border-width')+'px solid '+prx.componentsHelper.getProp(item.borderColor,'color-border')+'; }'
		cR += '</style>';
		cR += prx.items.getComponentPrependDivs(item, containerid, symbol);

		cR += '<div class="metro-button-table">'
		cR += '<div class="metro-button liveUpdate-backgroundColor liveUpdate-textColor liveUpdate-borderColor changeProperty-text changeProperty-backgroundColor changeProperty-textAlign changeProperty-textFont changeProperty-textColor changeProperty-textSize changeProperty-borderWidth changeProperty-borderColor">'
		cR += '<span data-editableproperty="text">' + prx.componentsHelper.getProp(item.text,'text-textarea') + '</span>';
		cR += '</div>';
		cR += '</div>';
		cR += prx.items.getComponentAppendDivs(item, containerid, symbol);
		cR = cR + '</div>';
		return cR;
	}

	,editableProperties:[
		prx.commonproperties.text
	]
	,interactions: [ prx.commonproperties.actions ]
	,propertyGroups: [
		{
			caption: 'Style',
			properties: [
				[
					prx.commonproperties.metroBackgroundColor
					,prx.commonproperties.borderWidth
	      			,prx.commonproperties.metroBorderColor
				]
			]
		},{
			caption: 'Text',
			properties: [
				[
					prx.commonproperties.textFontRichText('font-family','text')
					,prx.commonproperties.textSizeRichText('font-size','text')
					,prx.commonproperties.metroTextColorRichText('color','text')
				],
				[
					prx.commonproperties.textPropertiesRichText(['font-weight','font-style','text-decoration'],'text')
					,prx.commonproperties.textAlignRichText('text-align','text')
				]
			]
		}
	]

};

//TYPE: ICON
prx.types.metro_icon = {
	name: "metro_icon"
	,onDisplay: function(item,containerid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		var cR = "";

		cR += '<div id="' + _id + '" ' + prx.items.getComponentBaseAttributes(item, containerid, symbol)  + ' class="' + prx.items.getComponentBaseClasses(item, containerid, symbol) + ' box pos type-metro-icon">';

		cR += '<style>';
		cR += prx.items.getComponentBaseStyle(item, containerid, symbol);
		cR += '#'+_id+' .metro-icon { background-color: '+prx.componentsHelper.getProp(item.backgroundColor,'color-background')+'; border: '+prx.componentsHelper.getProp(item.borderWidth,'num-border-width')+'px solid '+prx.componentsHelper.getProp(item.borderColor,'color-border')+'; background-image: url(' +prx.componentsHelper.getProp(item.imgSrc,'asset')+'); }'
		cR += '</style>';
		cR += prx.items.getComponentPrependDivs(item, containerid, symbol);

		cR = cR + '<div class="metro-icon liveUpdate-backgroundColor liveUpdate-borderColor changeProperty-backgroundColor changeProperty-borderWidth changeProperty-borderColor"></div>';
		cR += prx.items.getComponentAppendDivs(item, containerid, symbol);
		cR = cR + '</div>';
		return cR;
	}
	,interactions:	[ prx.commonproperties.actions ]
	,propertyGroups: [
		{
			caption: 'Style',
			properties: [
				[
					prx.commonproperties.metroBackgroundColor
					,prx.commonproperties.borderWidth
	      			,prx.commonproperties.metroBorderColor
				]
			]
		},
		{
			caption: 'Icon',
			properties: [
				[
					{
						caption: false
						,name: 'imgSrc'
						,type: 'combo-asset'
						,displayValue: function(item,name) {
							if(item.imgSrc.fileId == '') {
								return 'No asset selected.';
							}
							return item.imgSrc.name;
						}
						,value: function(item,name) {
							return JSON.stringify({
								allow: 'image',
								asset: item.imgSrc
							});
						}
						,changeProperty: {
							caption: 'Icon',
							rerender: true
						}
					}
				]
			]
		}
	]

};

//TYPE: BADGE
prx.types.metro_badge = {
	name: "metro_badge"
	,onDisplay: function(item,containerid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		var _dims = prx.componentsHelper.getRealDims(item, symbol);

		var cR = "";

		cR += '<div id="' + _id + '" ' + prx.items.getComponentBaseAttributes(item, containerid, symbol)  + ' class="' + prx.items.getComponentBaseClasses(item, containerid, symbol) + ' box pos type-metro-badge">';

		cR += '<style>';
		cR += prx.items.getComponentBaseStyle(item, containerid, symbol);
		cR += '#'+_id+' .metro-badge-inner { background-color: '+prx.componentsHelper.getProp(item.backgroundColor,'color-background')+'; '+prx.componentsHelper.getProp(item.textFont,'font-family')+' color: '+prx.componentsHelper.getProp(item.textColor,'color-text')+'; font-size: '+prx.componentsHelper.getProp(item.textSize,'num-text-size')+'px; }'
		if(prx.componentsHelper.getProp(item.badgeType,'other') == 'glyph') {
			cR += '#'+_id+' .metro-badge-inner { background-image: url(' +prx.componentsHelper.getProp(item.badgeGlyph,'asset')+'); }'
		}
		cR += '</style>';
		cR += prx.items.getComponentPrependDivs(item, containerid, symbol);

		cR += '<div class="metro-badge-inner liveUpdate-backgroundColor liveUpdate-textColor chagneProperty-backgroundColor changeProperty-textFont changeProperty-textColor changeProperty-textSize">'
		if(prx.componentsHelper.getProp(item.badgeType,'other') == 'number') {
			cR += '<div class="metro-badge">'
			cR += '<span data-editableproperty="badgeNumber">'+prx.componentsHelper.getProp(item.badgeNumber,'text-textarea')+'</span>';
			cR += '</div>';
		}
		cR += '</div>';
		cR += prx.items.getComponentAppendDivs(item, containerid, symbol);
		cR += '</div>';
		return cR;
	}
	,interactions:	[ prx.commonproperties.actions ]
	,editableProperties: [
		{
			caption: 'Badge'
			,name: 'badgeNumber'
			,type: 'input'
			,value: function(item,name) {
				return item.badgeNumber
			}
			,hiddenByDefault: function(item,name) {
				return (item.badgeType != 'number')
			}
			,changeProperty: {
				caption: 'Badge',
				property: 'text',
				selector: '.metro-badge',
				transitionable: false
			}
		}
	]
	,propertyGroups: [
		{
			caption: 'Style',
			properties: [
				[
	      			prx.commonproperties.metroBackgroundColor
				]
			]
		}
		,
		{
			caption: 'Badge',
			properties: [
				[
					{
						caption: 'Type'
						,name: 'badgeType'
						,type: 'select'
						,value: function(item,name) {
							return item.badgeType
						}
						,values: [{ displayValue: 'Glyph', value: 'glyph'}, { displayValue: 'Number', value: 'number'}]
						,onChange: function(item,name) {
							if(item.badgeType == 'number') {
								$('#property-textSize, #property-textFont, #property-textColor').show()
							} else {
								$('#property-textSize, #property-textFont, #property-textColor').hide()
							}

							switch(item.badgeType) {
								case "glyph":
									$('#property-badgeNumber').hide()
									$('#property-badgeGlyph').show()
								break;
								case "number":
									$('#property-badgeGlyph').hide()
									$('#property-badgeNumber').show()
								break;
								default:
									$('#property-badgeGlyph, #property-badgeNumber').show()
								break;
							}
						}
						,changeProperty: {
							caption: 'Badge style',
							rerender: true
						}
					}
				],[
	      			{
	      				caption: 'Badge glyph'
						,name: 'badgeGlyph'
						,type: 'asset'
						,displayValue: function(item,name) {
							if(item.badgeGlyph.fileId == '') {
								return 'No asset selected.';
							}
							return item.badgeGlyph.name;
						}
						,value: function(item,name) {
							return JSON.stringify({
								allow: 'image',
								asset: item.badgeGlyph
							});
						}
						,hiddenByDefault: function(item,name) {
							return (item.badgeType != 'glyph')
						}
						,changeProperty: {
							caption: 'Badge glyph',
							rerender: true
						}
					}
				]
			,
			[
					{
	      				caption: 'Text',
	      				name: 'textFont',
	      				proptype: 'font-family',
	      				type: 'select',
						relatedEditableProperties: 'badgeNumber',
						relatedCSSProperties: 'font-family',
	      				value: function(item,name) { return item.textFont; },
	      				values: function(){ return prx.comps.fonts },
	      				hiddenByDefault: function(item,name) {
							return !(item.badgeType == 'number')
						}
						,changeProperty: {
							caption: 'Text font',
							property: 'font-family',
							selector: '.changeProperty-textFont',
							transitionable: false
						}
	      			}
	      			,{
	      				caption: false,
	      				name: 'textSize',
	      				proptype: 'font-size',
	      				type: 'combo-select',
						relatedEditableProperties: 'badgeNumber',
						relatedCSSProperties: 'font-size',
	      				value: function(item,name) { return item.textSize; },
	      				values: prx.comps.textsize,
	      				hiddenByDefault: function(item,name) {
							return !(item.badgeType == 'number')
						}
						,changeProperty: {
							caption: 'Text size',
							property: 'font-size',
							selector: '.changeProperty-textSize',
							transitionable: true
						}
	      			}
	      			,{
	      				caption: false,
	      				name: 'textColor',
	      				proptype: 'font-color',
	      				type: 'combo-colorpicker',
						relatedEditableProperties: 'badgeNumber',
						relatedCSSProperties: 'color',
	      				value: function(item,name) { return item.textColor; },
	      				values: prx.comps.metroColorsLight,
	      				hiddenByDefault: function(item,name) {
							return !(item.badgeType == 'number')
						}
						,liveUpdate: 'color'
						,changeProperty: {
							caption: 'Text color',
							property: 'color',
							selector: '.changeProperty-textColor',
							transitionable: true
						}
	      			}
				]
			]
		}
	]

};

//TYPE: USER TILE
prx.types.metro_tile_user = {
	name: "metro_tile_user"
	,onDisplay: function(item,containerid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		var _dims = prx.componentsHelper.getRealDims(item, symbol);

		var cR = "";

		cR += '<div id="' + _id + '" ' + prx.items.getComponentBaseAttributes(item, containerid, symbol)  + ' class="' + prx.items.getComponentBaseClasses(item, containerid, symbol) + ' box pos type-metro-tile type-metro-tile-user">';

		cR += '<style>';
		cR += prx.items.getComponentBaseStyle(item, containerid, symbol);
		cR += '#'+_id+' .metro-tile-user-inner { color: '+prx.componentsHelper.getProp(item.textColor,'color-text')+';  }';
		cR += '</style>';
		cR += prx.items.getComponentPrependDivs(item, containerid, symbol);

		cR += '<div class="metro-tile-user-inner liveUpdate-textColor">';
		if(prx.componentsHelper.getProp(item.imgSrc.fileId,'other') != '') {
			cR += '<img src="'+prx.componentsHelper.getProp(item.imgSrc,'asset')+'" class="metro-tile-user-image">'
		}
		cR += '<div class="metro-tile-user-title"><span data-editableproperty="username">'+prx.componentsHelper.getProp(item.username,'text-textarea')+'</span></div>'
		cR += '<div class="metro-tile-user-text"><span data-editableproperty="surname">'+prx.componentsHelper.getProp(item.surname,'text-textarea')+'</span></div>'
		cR += '</div>';
		cR += prx.items.getComponentAppendDivs(item, containerid, symbol);
		cR += '</div>';
		return cR;
	}
	,editableProperties: [
		{
			caption: 'Name'
			,name: 'username'
			,type: 'input'
			,value: function(item,name) {
				return item.username
			}
			,changeProperty: {
				caption: 'Name',
				property: 'text',
				selector: '.metro-tile-user-title',
				transitionable: false
			}
		},
		{
			caption: 'Surname'
			,name: 'surname'
			,type: 'input'
			,value: function(item,name) {
				return item.surname
			}
			,changeProperty: {
				caption: 'Surname',
				property: 'text',
				selector: '.metro-tile-user-text',
				transitionable: false
			}
		}

	]
	,interactions:	[ prx.commonproperties.actions ]
	,propertyGroups: [
		{
			caption: 'Text',
			properties: [
				[
	      			{
	      				caption: 'Color',
	      				name: 'textColor',
	      				proptype: 'font-color',
	      				type: 'combo-colorpicker',
						relatedEditableProperties: ['username','surname'],
						relatedCSSProperties: 'color',
	      				value: function(item,name) { return item.textColor; },
	      				values: prx.comps.metroColorsLight
	      				,liveUpdate: 'color'
	      				,changeProperty: {
							caption: 'Text color',
							property: 'color',
							selector: '.metro-tile-user-inner',
							transitionable: true
						}
	      			}
				]
			]
		},
		{
			caption: 'Avatar',
			properties: [
				[
	      			{
						caption: false
						,name: 'imgSrc'
						,type: 'combo-asset'
						,displayValue: function(item,name) {
							if(item.imgSrc.fileId == '') {
								return 'No asset selected.';
							}
							return item.imgSrc.name;
						}
						,value: function(item,name) {
							return JSON.stringify({
								allow: 'image',
								asset: item.imgSrc
							});
						}
						,changeProperty: {
							caption: 'Avatar',
							rerender: true
						}
					}
				]
			]
		}
	]

};

//TYPE: SYSTEM INFO TILE
prx.types.metro_tile_systeminfo = {
	name: "metro_tile_systeminfo"
	,onDisplay: function(item,containerid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		var _dims = prx.componentsHelper.getRealDims(item, symbol);

		var cR = "";

		var now = new Date();
		var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
		var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

		cR += '<div id="' + _id + '" ' + prx.items.getComponentBaseAttributes(item, containerid, symbol)  + ' class="' + prx.items.getComponentBaseClasses(item, containerid, symbol) + ' box pos type-metro-tile type-metro-tile-systeminfo">';
		cR += '<style>';
		cR += prx.items.getComponentBaseStyle(item, containerid, symbol);
		cR += '</style>';
		cR += prx.items.getComponentPrependDivs(item, containerid, symbol);

		cR += '<div class="tile-systeminfo-inner">'
		cR += '<div class="tile-systeminfo-icons"><div class="tile-systeminfo-icon-one"></div><div class="tile-systeminfo-icon-two"></div></div>'
		cR += '<div class="tile-systeminfo-time">'+now.getHours()+':'+('0' + now.getMinutes()).slice(-2)+'</div>';
		cR += '<div class="tile-systeminfo-day">'+days[now.getDay()]+'</div>';
		cR += '<div class="tile-systeminfo-date">'+months[now.getMonth()]+' '+now.getDate()+'</div>';
		cR += '</div>';
		cR += prx.items.getComponentAppendDivs(item, containerid, symbol);
		cR += '</div>';
		return cR;
	}
	,propertyGroups: []

};


//TYPE: APPBAR
prx.types.metro_appbar = {
	name: "metro_appbar"
	,onDisplay: function(item,containerid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		var _dims = prx.componentsHelper.getRealDims(item, symbol);

		var _props = (typeof(prx.richtext)=='undefined') ? prx.componentsHelper.getProp(item.textProperties,'props-text') : '';

		var cR = "";

		cR += '<div id="' + _id + '" ' + prx.items.getComponentBaseAttributes(item, containerid, symbol)  + ' class="' + prx.items.getComponentBaseClasses(item, containerid, symbol) + ' box pos type-metro-appbar ">';

		cR += '<style>';
		cR += prx.items.getComponentBaseStyle(item, containerid, symbol);
		cR += '#'+_id+' .metro-appbar-inner { background-color: '+prx.componentsHelper.getProp(item.backgroundColor,'color-background')+'; '+prx.componentsHelper.getProp(item.textFont,'font-family')+' '+_props+' color: '+prx.componentsHelper.getProp(item.textColor,'color-text')+'; font-size: '+prx.componentsHelper.getProp(item.textSize,'num-text-size')+'px; }';
		cR += '#'+_id+' .metro-appbar-button-icon { border: '+prx.componentsHelper.getProp(item.borderWidth,'num-border-width')+'px solid '+prx.componentsHelper.getProp(item.borderColor,'color-border')+'; }';
		cR += '#'+_id+' .metro-appbar-separator { background-color: '+prx.componentsHelper.getProp(item.borderColor,'color-background')+'; }';
		cR += '</style>';
		cR += prx.items.getComponentPrependDivs(item, containerid, symbol);

		cR += '<div class="metro-appbar-inner liveUpdate-backgroundColor changeProperty-backgroundColor liveUpdate-textColor changeProperty-textColor changeProperty-textSize changeProperty-textFont">'
		$.each(item.buttons, function(i,elm){
			if(prx.componentsHelper.getProp(elm.type,'other') == "separator") {
				cR += '<div class="metro-appbar-separator liveUpdate-borderColor-background-color dynamic-property" data-dynamic-property-index="'+i+'"></div>'
			} else {
				cR += '<div class="metro-appbar-button dynamic-property" data-dynamic-property-index="'+i+'" style="float: '+prx.componentsHelper.getProp(elm.type,'other')+';" id="'+_id+'-buttons-'+i+'">';
				cR += '<div class="metro-appbar-button-icon liveUpdate-borderColor-border-color" style="background-image: url(' +prx.componentsHelper.getProp(elm.icon,'asset')+');"></div>';
				cR += '<span data-editableproperty="text" data-dynamic-property-index="'+i+'">'+prx.componentsHelper.getProp(elm.text,'text-textarea')+'</span>'
				cR += '</div>'
			}
		});
		cR = cR + '</div>';
		cR += prx.items.getComponentAppendDivs(item, containerid, symbol);
		cR = cR + '</div>';
		return cR;
	}
	,propertyGroups: [
		{
			caption: 'Style',
			properties: [
				[
					prx.commonproperties.metroBackgroundColor
				,
					prx.commonproperties.borderWidth
	      			,{
	      				caption: false,
	      				name: 'borderColor',
	      				proptype: 'border-color',
	      				type: 'combo-colorpicker',
	      				value: function(item,name) { return item.borderColor; },
	      				values: prx.comps.metroColorsLight,
	      				liveUpdate: 'border-color,background-color'
	      				,changeProperty: {
							caption: 'Border color',
							rerender: true
						}
	      			}
				]
			]
		},
		{
			caption: 'Text',
			properties: [
				[
					prx.commonproperties.textFontRichText('font-family','buttons.text')
					,prx.commonproperties.textSizeRichText('font-size','buttons.text')
					,prx.commonproperties.metroTextColorRichText('color','buttons.text')
				],
				[
					prx.commonproperties.textPropertiesRichText(['font-weight','font-style','text-decoration'],'buttons.text')
				]
			]
		}
	]

    ,dynamicProperties: {
 		data: 'buttons'
 		,propertyCaption: 'Commands'
 		,propertyName: 'Command'
 		,addCaption: 'Add command'
 		,deleteCaption: 'Delete'
 		,blankItem: {
			type: 'left',
 			text: 'Label',
 			icon: {"fileId":"22ff61efd1378c27eee3595e05bcf90d.png","assetType":"gallery","bucketsource":"static","name":" 028-star@2x.png","url":"f1304072873692/7f4301fa16336a8be7eb2323accc0d54.png"},
 			actions: []
 		}
 		,captionProperty: 'text'
 		,editableProperties: [
 			{
				caption: 'Text'
				,name: 'text'
				,type: 'input'
				,value: function(item,name,index) {
					return item.buttons[index].text;
				}
				,hiddenByDefault: function(item,name,index) {
					return item.buttons[index].type == 'separator'
				}
				,changeProperty: {
					caption: 'Label',
					property: 'text',
					selector: '[data-editableproperty="text"]',
					transitionable: false
				}
			}
 		]
		,interactions:	[ prx.commonproperties.actions_buttons_hiddenByDefault(function(item,name,index) { return item.buttons[index].type == 'separator'; }) ]
		,propertyGroups: [
			{
				caption: 'Type',
				properties: [
					[
						{
							caption: false
							,name: 'type'
							,type: 'select'
							,value: function(item,name,index) {
								return item.buttons[index].type;
							}
							,values: [{ displayValue: 'Left-aligned button', value: 'left' },{ displayValue: 'Right-aligned button', value: 'right' },{ displayValue: 'Separator', value: 'separator' }]
							,onChange: function(item, index) {
								switch(item.type) {
								case 'separator':
									$('.dynamic-property:eq(' + index + ')')
										.find('#property-text, #property-icon, #property-actions').hide();
									break;
								default:
									$('.dynamic-property:eq(' + index + ')')
										.find('#property-text, #property-icon, #property-actions').show();
									break;
								}
								return false;
							}
							,changeProperty: {
								caption: 'Type',
								rerender: true
							}
						}
					]
				]
			},
			{
				caption: 'Icon',
				properties: [
					[
						{
							caption: false
							,name: 'icon'
							,type: 'combo-asset'
							,displayValue: function(item,name,index) {
								if(item.buttons[index].icon.fileId == '') {
									return 'No icon selected';
								}
								return item.buttons[index].icon.name;
							}
							,value: function(item,name,index) {
								return JSON.stringify({
									allow: 'image',
									asset: item.buttons[index].icon
								});
							}
							,hiddenByDefault: function(item,name,index) {
								return item.buttons[index].type == 'separator'
							}
							,changeProperty: {
								caption: 'Icon',
								rerender: true
							}
						}
					]
				]
			}
		]

	}
};


//TYPE: MINI APPBAR
prx.types.metro_appbar_mini = {
	name: "metro_appbar_mini"
	,onDisplay: function(item,containerid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		var _dims = prx.componentsHelper.getRealDims(item, symbol);

		var cR = "";

		cR += '<div id="' + _id + '" ' + prx.items.getComponentBaseAttributes(item, containerid, symbol)  + ' class="' + prx.items.getComponentBaseClasses(item, containerid, symbol) + ' box pos type-metro-appbar-mini">';

		cR += '<style>';
		cR += prx.items.getComponentBaseStyle(item, containerid, symbol);
		cR += '#'+_id+' .metro-appbar-mini-inner { background-color: '+prx.componentsHelper.getProp(item.backgroundColor,'color-background')+'; }';
		cR += '#'+_id+' .metro-appbar-button { width: '+(_dims.height - (20*prx.componentsHelper.getScale(item.lib))) +'px; }';
		cR += '#'+_id+' .metro-appbar-button-icon { border: '+prx.componentsHelper.getProp(item.borderWidth,'num-border-width')+'px solid '+prx.componentsHelper.getProp(item.borderColor,'color-border')+'; }';
		cR += '</style>';
		cR += prx.items.getComponentPrependDivs(item, containerid, symbol);

		cR += '<div class="metro-appbar-mini-inner liveUpdate-backgroundColor changeProperty-backgroundColor">'
		$.each(item.buttons, function(i,elm){
			cR += '<div class="metro-appbar-button dynamic-property" data-dynamic-property-index="'+i+'" id="'+_id+'-buttons-'+i+'">';
			cR += '<div class="metro-appbar-button-icon liveUpdate-borderColor changeProperty-borderWidth changeProperty-borderColor" style="background-image: url(' +prx.componentsHelper.getProp(elm.icon,'asset')+');"></div>';
			cR += '</div>'
		});
		cR += '</div>';
		cR += prx.items.getComponentAppendDivs(item, containerid, symbol);
		cR += '</div>';
		return cR;
	}
	,onResize: function(item,containerid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		var _dims = prx.componentsHelper.getRealDims(item, symbol);

		$('#'+_id+' .metro-appbar-button').width(_dims.height-(20*prx.componentsHelper.getScale(item.lib)));
	}
	,propertyGroups: [
		{
			caption: 'Style',
			properties: [
				[
					prx.commonproperties.metroBackgroundColor
				,
					prx.commonproperties.borderWidth
	      			,prx.commonproperties.metroBorderColor
				]
			]
		}
	]
    ,dynamicProperties: {
 		data: 'buttons'
 		,propertyCaption: 'Commands'
 		,propertyName: 'Command'
 		,addCaption: 'Add command'
 		,deleteCaption: 'Delete'
 		,blankItem: {
 			icon: {"fileId":"22ff61efd1378c27eee3595e05bcf90d.png","assetType":"gallery","bucketsource":"static","name":" 028-star@2x.png", "url":"f1304072873692/7f4301fa16336a8be7eb2323accc0d54.png"},
 			actions: []
 		}
 		,captionProperty: false

		,interactions:	[ prx.commonproperties.actions_buttons_hiddenByDefault(function(item,name,index) { return item.buttons[index].type == 'separator' }) ]
		,propertyGroups: [
			{
				caption: 'Icon',
				properties: [
					[
						{
							caption: false
							,name: 'icon'
							,type: 'combo-asset'
							,displayValue: function(item,name,index) {
								if(item.buttons[index].icon.fileId == '') {
									return 'No icon selected';
								}
								return item.buttons[index].icon.name;
							}
							,value: function(item,name,index) {
								return JSON.stringify({
									allow: 'image',
									asset: item.buttons[index].icon
								});
							}
							,hiddenByDefault: function(item,name,index) {
								return item.buttons[index].type == 'separator'
							}
							,changeProperty: {
								caption: 'Icon',
								rerender: true
							}
						}
					]
				]
			}
		]

	}
};

//TYPE: CHARMS
prx.types.metro_charms = {
	name: "metro_charms"
	,onDisplay: function(item,containerid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		var _dims = prx.componentsHelper.getRealDims(item, symbol);

		var _props = (typeof(prx.richtext)=='undefined') ? prx.componentsHelper.getProp(item.textProperties,'props-text') : '';

		var cR = "";

		cR += '<div id="' + _id + '" ' + prx.items.getComponentBaseAttributes(item, containerid, symbol)  + ' class="' + prx.items.getComponentBaseClasses(item, containerid, symbol) + ' box pos type-metro-charms">';

		cR += '<style>';
		cR += prx.items.getComponentBaseStyle(item, containerid, symbol);
		cR += '#'+_id+' .metro-charms-outer { background-color: '+prx.componentsHelper.getProp(item.backgroundColor,'color-background')+'; '+prx.componentsHelper.getProp(item.textFont,'font-family')+' '+_props+' color: '+prx.componentsHelper.getProp(item.textColor,'color-text')+'; font-size: '+prx.componentsHelper.getProp(item.textSize,'num-text-size')+'px; }';
		cR += '</style>';
		cR += prx.items.getComponentPrependDivs(item, containerid, symbol);

		cR += '<div class="metro-charms-outer liveUpdate-backgroundColor liveUpdate-textColor changeProperty-backgroundColor changeProperty-textColor changeProperty-textSize changeProperty-textFont">'
		cR += '<div class="metro-charms-inner">'
		$.each(item.buttons, function(i,elm){
				cR += '<div class="metro-charms-button dynamic-property" data-dynamic-property-index="'+i+'" id="'+_id+'-buttons-'+i+'">';
				cR += '<div class="metro-charms-button-icon" style="background-image: url(' +prx.componentsHelper.getProp(elm.icon,'asset')+');"></div>';
				cR += '<span data-editableproperty="text" data-dynamic-property-index="'+i+'">'+prx.componentsHelper.getProp(elm.text,'text-textarea')+'</span>'
				cR += '</div>'
		});
		cR += '</div>';
		cR += '</div>';
		cR += prx.items.getComponentAppendDivs(item, containerid, symbol);
		cR += '</div>';
		return cR;
	}
	,propertyGroups: [
		{
			caption: 'Style',
			properties: [
				[
					prx.commonproperties.metroBackgroundColor
				]
			]
		}
		,{
			caption: 'Text',
			properties: [
				[
					prx.commonproperties.textFontRichText('font-family','buttons.text')
					,prx.commonproperties.textSizeRichText('font-size','buttons.text')
					,prx.commonproperties.metroTextColorRichText('color','buttons.text')
				],
				[
					prx.commonproperties.textPropertiesRichText(['font-weight','font-style','text-decoration'],'buttons.text')
				]
			]
		}
	]

    ,dynamicProperties: {
 		data: 'buttons'
 		,propertyCaption: 'Charms'
 		,propertyName: 'Charm'
 		,addCaption: 'Add charm'
 		,deleteCaption: 'Delete'
 		,blankItem: {
			type: 'left',
 			text: 'Label',
 			icon: {"fileId":"22ff61efd1378c27eee3595e05bcf90d.png","assetType":"gallery","bucketsource":"static","name":" 028-star@2x.png","url":"f1304072873692/7f4301fa16336a8be7eb2323accc0d54.png"},
 			actions: []
 		}
 		,captionProperty: 'text'
		,interactions:	[ prx.commonproperties.actions_buttons ]
		,editableProperties: [
			{
				caption: 'Text'
				,name: 'text'
				,type: 'input'
				,value: function(item,name,index) {
					return item.buttons[index].text;
				}
				,changeProperty: {
					caption: 'Label',
					property: 'text',
					selector: '[data-editableproperty=text]',
					transitionable: false
				}
			}
		]
		,propertyGroups: [
			{
				caption: 'Icon',
				properties: [
					[
						{
							caption: 'Icon'
							,name: 'icon'
							,type: 'combo-asset'
							,displayValue: function(item,name,index) {
								if(item.buttons[index].icon.fileId == '') {
									return 'No icon selected';
								}
								return item.buttons[index].icon.name;
							}
							,value: function(item,name,index) {
								return JSON.stringify({
									allow: 'image',
									asset: item.buttons[index].icon
								});
							}
							,changeProperty: {
								caption: 'Icon',
								rerender: true
							}
						}
					]
				]
			}
		]

	}
};

//TYPE: FILTERS
prx.types.metro_filters = {
	name: "metro_filters"
	,onDisplay: function(item,containerid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		var _dims = prx.componentsHelper.getRealDims(item, symbol);

		var _props = (typeof(prx.richtext)=='undefined') ? prx.componentsHelper.getProp(item.textProperties,'props-text') : '';

		var _activeprops = prx.componentsHelper.getProp(item.activeTextProperties,'props-text');

		if(typeof(item.changeActive) == "undefined") { item.changeActive = true; }

		var cR = "";

		cR += '<div id="' + _id + '" ' + prx.items.getComponentBaseAttributes(item, containerid, symbol)  + ' class="' + prx.items.getComponentBaseClasses(item, containerid, symbol) + ' box pos type-metro-filters liveUpdate-textColor changeProperty-textColor changeProperty-textFont changeProperty-textSize">';

		cR += '<style>';
		cR += prx.items.getComponentBaseStyle(item, containerid, symbol);
		cR += '#'+_id+' { '+prx.componentsHelper.getProp(item.textFont,'font-family')+' '+_props+' color: '+prx.componentsHelper.getProp(item.textColor,'color-text')+'; font-size: '+prx.componentsHelper.getProp(item.textSize,'num-text-size')+'px; }';
		cR += '#'+_id+' .metro-filter { margin-right: '+prx.componentsHelper.getProp(item.textSize,'num-other')+'px; }'
		cR += '#'+_id+' input:checked + label {'+_activeprops+' color: '+prx.componentsHelper.getProp(item.activeTextColor,'color-text')+'; }';
		cR += '</style>';
		cR += prx.items.getComponentPrependDivs(item, containerid, symbol);

		$.each(item.buttons, function(i,elm){
			cR += '<div class="metro-filter dynamic-property" data-dynamic-property-index="'+i+'" id="'+_id+'-buttons-'+i+'">';
			cR += '<input type="radio" name="'+_id+'-radio" id="'+_id+'-radio-'+i+'" '+((i == prx.componentsHelper.getProp(item.selected,'num-other')) ? 'checked' : '')+' data-role="none" '+((!prx.componentsHelper.getProp(item.changeActive,'boolean')) ? 'disabled' : '')+'>'
			cR += '<label class="textColor '+((prx.componentsHelper.getProp(item.selected,'num-other') == i) ? 'liveUpdate-activeTextColor' : '')+'" for="'+_id+'-radio-'+i+'"><span  data-editableproperty="text" data-dynamic-property-index="'+i+'">'+prx.componentsHelper.getProp(elm.text,'text-textarea')+'</span></label>'

			cR += '</div>'
		});
		//cR += '</div>'
		//cR += '</div>';
		cR += prx.items.getComponentAppendDivs(item, containerid, symbol);
		cR += '</div>';
		return cR;
	}
	,propertyGroups: [
		{
			caption: 'Text',
			properties: [
				[
					prx.commonproperties.textFontRichText('font-family','buttons.text')
					,prx.commonproperties.textSizeRichText('font-size','buttons.text')
					,prx.commonproperties.metroTextColorRichText('color','buttons.text')
				],[
					prx.commonproperties.textPropertiesRichText(['font-weight','font-style','text-decoration'],'buttons.text'),
					{
						caption: 'Active',
						name: 'activeTextColor',
						proptype: 'font-color-2-active',
						type: 'combo-colorpicker',
						value: function(item,name) { return item.activeTextColor; },
						values: prx.comps.metroColorsLight,liveUpdate:'color'
						,changeProperty: {
							caption: 'Active text color',
							property: 'color',
							selector: 'input:checked + label',
							transitionable: true
						}
					}
	              	,{
	              		caption: false,
	              		name: 'activeTextProperties',
	              		proptype: 'text-properties-2-active',
	              		type: 'checkbox',
	              		value: function(item,name) { return item.activeTextProperties; },
						values: [
							{ value: 'bold', displayValue: '', icon: 'text-bold'},
							{ value: 'italic', displayValue: '', icon: 'text-italic'},
							{ value: 'underline', displayValue: '', icon: 'text-underline'}
						]
	              		,changeProperty: {
							caption: 'Active text properties',
							rerender: true,
							changeable: false
						}
	              	}
				]
			]
		},{
			caption: 'Advanced',
			properties: [
				[
	              	{
		      			caption: 'Active'
		      			,name: 'selected'
		      			,type: 'select'
		      			,value: function(item,name) {
	              			return item.selected;
	              		}
	              		,values: function(item,name) {
	              			var _rA = [{value: '999',displayValue: 'None'}];
	              			for (var n = 0; n < item.buttons.length; n++) {
	              				_rA.push({value: n,displayValue: item.buttons[n].text});
	              			}
	              			return _rA;
	              		}
	              		,changeProperty: {
							caption: 'Active filter',
							rerender: true
						}
	      			}
				],
				[
		   			{
		  	  			caption: 'Change active state on click'
		  	  			,name: 'changeActive'
		  	  			,type: 'onoff'
		  	  			,value: function(item,name) {
		  	      			return item.changeActive;
		  	      		}
		      			,changeProperty: {
							caption: 'Change active state on click',
							rerender: true
						}
					}
		   		]
			]
		}
	]

    ,dynamicProperties: {
 		data: 'buttons'
 		,propertyCaption: 'Filters'
 		,propertyName: 'Filter'
 		,addCaption: 'Add filter'
 		,deleteCaption: 'Delete'
 		,blankItem: {
 			text: 'Label',
 			actions: []
 		}
 		,captionProperty: 'text'

		,editableProperties: [
   			{
				caption: 'Text'
				,name: 'text'
				,type: 'input'
				,value: function(item,name,index) {
					return item.buttons[index].text;
				}
   				,liveUpdate:'color'
   				,changeProperty: {
					caption: 'Label',
					property: 'text',
					selector: 'label',
					transitionable: true
				}
			}
   		]
		,interactions:	[ prx.commonproperties.actions_buttons ]
		,propertyGroups: [
			{
				caption: '',
				properties: [
					[

					]
				]
			}
		]

	}
};


//TYPE: CONTEXT MENU
prx.types.metro_contextmenu = {
	name: "metro_contextmenu"
	,onDisplay: function(item,containerid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		var _props = (typeof(prx.richtext)=='undefined') ? prx.componentsHelper.getProp(item.textProperties,'props-text') : '';

		var cR = "";

		cR += '<div id="' + _id + '" ' + prx.items.getComponentBaseAttributes(item, containerid, symbol)  + ' class="' + prx.items.getComponentBaseClasses(item, containerid, symbol) + ' box pos type-metro-contextmenu liveUpdate-textColor liveUpdate-backgroundColor liveUpdate-borderColor changeProperty-backgroundColor changeProperty-textColor changeProperty-textFont changeProperty-textSize changeProperty-textAlign changeProperty-borderWidth changeProperty-borderColor">';

		cR += '<style>';
		cR += prx.items.getComponentBaseStyle(item, containerid, symbol);
		cR += '#'+_id+' { border: '+prx.componentsHelper.getProp(item.borderWidth,'num-border-width')+'px solid '+prx.componentsHelper.getProp(item.borderColor,'color-border')+'; background: '+prx.componentsHelper.getProp(item.backgroundColor,'color-background')+'; '+prx.componentsHelper.getProp(item.textFont,'font-family')+' '+_props+' color: '+prx.componentsHelper.getProp(item.textColor,'color-text')+'; font-size: '+prx.componentsHelper.getProp(item.textSize,'num-text-size')+'px; text-align: '+prx.componentsHelper.getProp(item.textAlign,'align')+'; }';
		cR += '</style>';
		cR += prx.items.getComponentPrependDivs(item, containerid, symbol);

		$.each(item.buttons, function(i,elm){
			cR += '<div class="metro-contextmenu-item dynamic-property" data-dynamic-property-index="'+i+'" id="'+_id+'-buttons-'+i+'">';
//			cR += elm.text
			cR = cR + '<span data-editableproperty="text" data-dynamic-property-index="'+i+'">'+ prx.componentsHelper.getProp(elm.text,'text-textarea') + '</span>';
			cR += '</div>'
		});
		cR += prx.items.getComponentAppendDivs(item, containerid, symbol);
		cR += '</div>';
		return cR;
	}
	,propertyGroups: [
		{
			caption: 'Style',
			properties: [
				[
					prx.commonproperties.metroBackgroundColor
				,
					prx.commonproperties.borderWidth
	      			,prx.commonproperties.metroBorderColor
				]
			]
		},{
			caption: 'Text',
			properties: [
				[
					prx.commonproperties.textFontRichText('font-family','buttons.text')
					,prx.commonproperties.textSizeRichText('font-size','buttons.text')
					,prx.commonproperties.metroTextColorRichText('color','buttons.text')
				],[
					prx.commonproperties.textPropertiesRichText(['font-weight','font-style','text-decoration'],'buttons.text')
	      			,prx.commonproperties.textAlignRichText('text-align','buttons.text')
				]
			]
		}
	]

    ,dynamicProperties: {
 		data: 'buttons'
 		,propertyCaption: 'Menu items'
 		,propertyName: 'Menu item'
 		,addCaption: 'Add menu item'
 		,deleteCaption: 'Delete'
 		,blankItem: {
 			text: 'Label',
 			actions: []
 		}
 		,captionProperty: 'text'

		,editableProperties: [
              {
				caption: 'Text'
				,name: 'text'
				,type: 'input'
				,value: function(item,name,index) {
					return item.buttons[index].text;
				}
				,changeProperty: {
					caption: 'Label',
					property: 'text',
					selector: '[data-editableproperty="text"]',
					transitionable: true
				}
          	}	
		]
 		,interactions:	[ prx.commonproperties.actions_buttons ]


	}
};

//TYPE: DROPDOWN WITH SELECTION
prx.types.metro_dropdown_withselection = {
	name: "metro_dropdown_withselection"
	,onDisplay: function(item,containerid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		var _props = (typeof(prx.richtext)=='undefined') ? prx.componentsHelper.getProp(item.textProperties,'props-text') : '';
		var _dropdownprops = (typeof(prx.richtext)=='undefined') ? prx.componentsHelper.getProp(item.dropdownTextProperties,'props-text') : '';

		if(item.withSelection) {
			var _activeprops = (typeof(prx.richtext)=='undefined') ? prx.componentsHelper.getProp(item.activeTextProperties,'props-text') : '';
		}

		var cR = "";
		var _checked = '';

		cR += '<div id="' + _id + '" ' + prx.items.getComponentBaseAttributes(item, containerid, symbol)  + ' class="' + prx.items.getComponentBaseClasses(item, containerid, symbol) + ' box pos type-metro-dropdown">';

		cR += '<style>';
		cR += prx.items.getComponentBaseStyle(item, containerid, symbol);
		cR += '#'+_id+' .dropdown-trigger { '+prx.componentsHelper.getProp(item.textFont,'font-family')+' '+_props+' color: '+prx.componentsHelper.getProp(item.textColor,'color-text')+'; font-size: '+prx.componentsHelper.getProp(item.textSize,'num-text-size')+'px; background-image: url('+prx.componentsHelper.getProp(item.buttonicon,'asset')+'); }';
		cR += '#'+_id+' .metro-dropdown-contextmenu { border: '+prx.componentsHelper.getProp(item.borderWidth,'num-border-width')+'px solid '+prx.componentsHelper.getProp(item.borderColor,'color-border')+'; background: '+prx.componentsHelper.getProp(item.backgroundColor,'color-background')+'; '+prx.componentsHelper.getProp(item.dropdownTextFont,'font-family')+' '+_dropdownprops+' color: '+prx.componentsHelper.getProp(item.dropdownTextColor,'color-text')+'; font-size: '+prx.componentsHelper.getProp(item.dropdownTextSize,'num-text-size')+'px; text-align: '+prx.componentsHelper.getProp(item.dropdownTextAlign,'align')+'; }';
		if(prx.componentsHelper.getProp(item.withSelection,'boolean')) {
			cR += '#'+_id+' .metro-dropdown-item.active, #'+_id+' .metro-dropdown-active-value { color: '+prx.componentsHelper.getProp(item.activeTextColor,'color-text')+'; '+_activeprops+' }'
		}
		cR += '</style>';
		cR += prx.items.getComponentPrependDivs(item, containerid, symbol);

		cR += '<div class="dropdown-trigger liveUpdate-textColor">'
		cR += '<span data-editableproperty="text">'+prx.componentsHelper.getProp(item.text,'text-textarea')+'</span>';
		if(prx.componentsHelper.getProp(item.withSelection,'boolean')) {
			cR += '<span class="metro-dropdown-active-value liveUpdate-activeTextColor">';
			cR += (typeof(item.buttons[item.selected]) != "undefined") ? prx.utils.escapeHTML(item.buttons[item.selected].text) : ((typeof(item.buttons[0]) != "undefined") ? prx.utils.escapeHTML(item.buttons[0].text) : '');
			cR += '</span>';
		}
		cR += '</div>'
		cR += '<div class="metro-dropdown-contextmenu liveUpdate-borderColor liveUpdate-backgroundColor liveUpdate-dropdownTextColor">'
		$.each(item.buttons, function(i,elm){
			_checked = '';
			if(prx.componentsHelper.getProp(item.withSelection,'boolean') && i == prx.componentsHelper.getProp(item.selected,'num-other')) {
				_checked = ' active'
			}
			cR += '<div class="metro-dropdown-item dynamic-property '+_checked+'  '+((i == prx.componentsHelper.getProp(item.selected,'boolean')) ? 'liveUpdate-activeTextColor' : '' )+'  " id="'+_id+'-buttons-'+i+'" data-dynamic-property-index="'+i+'">';
			cR = cR + '<span data-editableproperty="text" data-dynamic-property-index="'+i+'">'+ prx.componentsHelper.getProp(elm.text,'text-textarea') + '</span>';
			cR += '</div>'
		});
		cR += '</div>';
		cR += prx.items.getComponentAppendDivs(item, containerid, symbol);
		cR += '</div>';
		return cR;
	}
	,afterDisplay: function(item,containerid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		if(!prx.editor) {
			$('#'+_id+' .dropdown-trigger').hammer({ domEvents: false }).on('tap', function(e){
				$('#'+_id+' .metro-dropdown-contextmenu').toggle();
			});

			$('#'+_id+' .metro-dropdown-item').hammer().on('tap', function(e){
				$('#'+_id+' .metro-dropdown-contextmenu').hide();
				if(item.withSelection) {
					$('#'+_id+' .metro-dropdown-item').removeClass('active');
					$(this).addClass('active');
					$('#'+_id+' .metro-dropdown-active-value').text($(this).text());
				}
			})

			prx.actions.disableFlashActionOnItemTap('#' + _id + ' .dropdown-trigger', '.flashactiontap-afterdisplay');
			prx.actions.disableFlashActionOnItemTap('#' + _id + ' .metro-dropdown-item', '.flashactiontap-afterdisplay');
		}
	}
	,editableProperties: [
		{
			caption: 'Caption',
			name: 'text',
			type: 'input',
			value: function(item,name) { return item.text; }
			,changeProperty: {
				caption: 'Caption',
				rerender: true
			}
		}
	]
	,propertyGroups: [
		{
			caption: 'Caption Text',
			properties: [
				[
					{
						caption: false,
						name: 'textFont',
						proptype: 'font-family',
						type: 'select',
						relatedEditableProperties: 'text',
						relatedCSSProperties: 'font-family',
						value: function(item,name) { return item.textFont; },
						values: function(){ return prx.comps.fonts }
						,changeProperty: {
							caption: 'Caption text font',
							property: 'font-family',
							selector: '.dropdown-trigger',
							transitionable: false
						}
					}
	      			,{
	      				caption: false,
	      				name: 'textSize',
	      				proptype: 'font-size',
	      				type: 'combo-select',
						relatedEditableProperties: 'text',
						relatedCSSProperties: 'font-size',
	      				value: function(item,name) { return item.textSize; },
	      				values: prx.comps.textsize
	      				,changeProperty: {
							caption: 'Caption text size',
							property: 'font-size',
							selector: '.dropdown-trigger',
							transitionable: true
						}
	      			}
	    			,{
	    				caption: false,
	    				name: 'textColor',
	    				proptype: 'font-color',
	    				type: 'combo-colorpicker',
						relatedEditableProperties: 'text',
						relatedCSSProperties: 'color',
	    				value: function(item,name) { return item.textColor; },
	    				values: prx.comps.metroColorsLight,liveUpdate: 'color'
	    				,changeProperty: {
							caption: 'Caption text color',
							property: 'color',
							selector: '.dropdown-trigger',
							transitionable: true
						}
	    			}
				],[
					{
						caption: false,
						name: 'textProperties',
						proptype: 'text-properties',
						type: 'checkbox',
						relatedEditableProperties: 'text',
						relatedCSSProperties: ['font-weight','font-style','text-decoration'],
						value: function(item,name) { if(typeof(item.textProperties) == "undefined") {item.textProperties = [];} return item.textProperties; },
						values: [
							{ value: 'bold', displayValue: '', icon: 'text-bold'},
							{ value: 'italic', displayValue: '', icon: 'text-italic'},
							{ value: 'underline', displayValue: '', icon: 'text-underline'}
						]
						,changeProperty: {
							caption: 'Caption text properties',
							rerender:true
						}
					}

				]
			]
		},{
			caption: 'Dropdown Text',
			properties: [
				[
					{
						caption: false,
						name: 'dropdownTextFont',
						proptype: 'font-family-2-dropdown',
						type: 'select',
						relatedEditableProperties: 'buttons.text',
						relatedCSSProperties: 'font-family',
						value: function(item,name) { return item.dropdownTextFont; },
						values: function(){ return prx.comps.fonts }
						,changeProperty: {
							caption: 'Dropdown text font',
							property: 'font-family',
							selector: '.metro-dropdown-contextmenu',
							transitionable: false
						}
					}
	      			,{
	      				caption: false,
	      				name: 'dropdownTextSize',
						proptype: 'font-size-2-dropdown',
	      				type: 'combo-select',
						relatedEditableProperties: 'buttons.text',
						relatedCSSProperties: 'font-size',
	      				value: function(item,name) { return item.dropdownTextSize; },
	      				values: prx.comps.textsize
	      				,changeProperty: {
							caption: 'Dropdown text size',
							property: 'font-size',
							selector: '.metro-dropdown-contextmenu',
							transitionable: true
						}
	      			}
	    			,{
	    				caption: false,
	    				name: 'dropdownTextColor',
						proptype: 'font-color-3-dropdown',
	    				type: 'combo-colorpicker',
						relatedEditableProperties: 'buttons.text',
						relatedCSSProperties: 'color',
	    				value: function(item,name) { return item.dropdownTextColor; },
	    				values: prx.comps.metroColorsLight,liveUpdate: 'color'
	    				,changeProperty: {
							caption: 'Dropdown text color',
							property: 'color',
							selector: '.metro-dropdown-contextmenu',
							transitionable: true
						}
	    			}
				],[
					{
						caption: false,
						name: 'dropdownTextProperties',
						proptype: 'text-properties-2-dropdown',
						type: 'checkbox',
						relatedEditableProperties: 'buttons.text',
						relatedCSSProperties: ['font-weight','font-style','text-decoration'],
						value: function(item,name) { if(typeof(item.dropdownTextProperties) == "undefined") {item.dropdownTextProperties = [];} return item.dropdownTextProperties; },
						values: [
							{ value: 'bold', displayValue: '', icon: 'text-bold'},
							{ value: 'italic', displayValue: '', icon: 'text-italic'},
							{ value: 'underline', displayValue: '', icon: 'text-underline'}
						]
						,changeProperty: {
							caption: 'Dropdown text properties',
							rerender: true
						}
					}
	      			,{
	      				caption: false,
	      				name: 'dropdownTextAlign',
						proptype: 'text-align',
	      				type: 'radio',
						relatedEditableProperties: 'buttons.text',
						relatedCSSProperties: 'text-align',
	      				values: [
							{ value: 'left', displayValue: '', icon: 'align-left'},
							{ value: 'center', displayValue: '', icon: 'align-center'},
							{ value: 'right', displayValue: '', icon: 'align-right'}
						]
	      				,changeProperty: {
							caption: 'Dropdown text align',
							property: 'text-align',
							selector: '.metro-dropdown-contextmenu',
							transitionable: false
						}
	      			}
				]
			]
		}
		,{
			caption: 'Dropdown Style',
			properties: [
				[
					{
						caption: 'Background',
						name: 'backgroundColor',
						proptype: 'background-color',
						type: 'combo-colorpicker',
						value: function(item,name) { return item.backgroundColor; },
						values: prx.comps.metroColorsLight,liveUpdate: 'background-color'
						,changeProperty: {
							caption: 'Dropdown background color',
							property: 'background-color',
							selector: '.metro-dropdown-contextmenu',
							transitionable: true
						}
					}

					,{
						caption: 'Border (px)',
						name: 'borderWidth',
						proptype: 'border-width',
						type: 'combo-select',
						value: function(item,name) { return item.borderWidth; },
						values: { min: 0, max: 20, step: 1 }
						,changeProperty: {
							caption: 'Dropdown border width',
							property: 'border-width',
							selector: '.metro-dropdown-contextmenu',
							transitionable: true
						}
					}
					,{
						caption: false,
						name: 'borderColor',
						proptype: 'border-color',
						type: 'combo-colorpicker',
						value: function(item,name) { return item.borderColor; },
						values: prx.comps.metroColorsLight,liveUpdate: 'border-color'
						,changeProperty: {
							caption: 'Dropdown border color',
							property: 'border-color',
							selector: '.metro-dropdown-contextmenu',
							transitionable: true
						}
					}
				],
				[
					{
	      				caption: 'Dropdown Icon'
	      				,name: 'buttonicon'
	      				,type: 'combo-asset'
	      				,displayValue: function(item,name) {
	      					if(item.buttonicon.fileId == '') {
      							return 'No icon selected';
      						}
      						return item.buttonicon.name;
	      				}
	      				,value: function(item,name) {
	      					return JSON.stringify({
	      						allow: 'image',
	      						asset: item.buttonicon
	      					});
	      				}
	      				,changeProperty: {
							caption: 'Dropdown icon',
							rerender: true
						}
	      			}
				]
			]
		},{
			caption: 'Active State',
			properties: [
				[
					{
						caption: 'Text',
						name: 'activeTextColor',
						proptype: 'font-color-2-active',
						type: 'combo-colorpicker',
						value: function(item,name) { return item.activeTextColor; },
						values: prx.comps.metroColorsLight,
						liveUpdate: 'color'
						,changeProperty: {
							caption: 'Active item text color',
							property: 'color',
							selector: '.metro-dropdown-item.active',
							transitionable: true
						}
					}
	      			,{
	      				caption: false,
	      				name: 'activeTextProperties',
	      				proptype: 'text-properties-2-active',
	      				type: 'checkbox',
	      				value: function(item,name) { if(typeof(item.activeTextProperties) == "undefined") {item.activeTextProperties = [];} return item.activeTextProperties; },
                        values: [
                            { value: 'bold', displayValue: '', icon: 'text-bold'},
                            { value: 'italic', displayValue: '', icon: 'text-italic'},
                            { value: 'underline', displayValue: '', icon: 'text-underline'}
                        ]
	      				,changeProperty: {
							caption: 'Active item text properties',
							rerender: true
						}
	      			}
				],
				[
					{
		      			caption: 'Active option'
		      			,name: 'selected'
		      			,type: 'select'
		      			,value: function(item,name) {
	              			return item.selected;
	              		}
	              		,values: function(item,name) {
	              			var _rA = [];
	              			for (var n = 0; n < item.buttons.length; n++) {
	              				_rA.push({value: n,displayValue: prx.utils.escapeHTML(item.buttons[n].text)});
	              			}
	              			return _rA;
	              		}
	              		,changeProperty: {
							caption: 'Active item',
							rerender: true
						}
	      			}
				]
			]
		}
	]

    ,dynamicProperties: {
 		data: 'buttons'
 		,propertyCaption: 'Menu items'
 		,propertyName: 'Menu item'
 		,addCaption: 'Add menu item'
 		,deleteCaption: 'Delete'
 		,blankItem: {
 			text: 'Label',
 			actions: []
 		}
 		,captionProperty: 'text'

 			,editableProperties: [
		               	{
		       				caption: 'Text'
		       				,name: 'text'
		       				,type: 'input'
		       				,value: function(item,name,index) {
		       					return item.buttons[index].text;
		       				}
		       				,onChange: function(item, index, val){
								if(item.selected == index) {
									$('#' + item.id).find('.metro-dropdown-active-value').text(val);
								}
							}
							,changeProperty: {
								caption: 'Label',
								property: 'text',
								selector: '.metro-dropdown-item',
								transitionable: false
							}
		          	}
 			 ]
 			,interactions:	[ prx.commonproperties.actions_buttons ]
			,propertyGroups: [
				{
					caption: '',
					properties: []
				}
			]

	}
};


/* TYPE = DROPDOWN */
prx.types.metro_dropdown = prx.componentsHelper.cloneobject(prx.types.metro_dropdown_withselection);
prx.types.metro_dropdown.name = 'metro_dropdown';
prx.componentsHelper.removeProperties(prx.types.metro_dropdown.propertyGroups, ['activeTextColor', 'activeTextProperties', 'selected']);


//TYPE: FLYOUT / DIALOG
prx.types.metro_dialog = {
	name: "metro_dialog"
	,onDisplay: function(item,containerid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		var _props = (typeof(prx.richtext)=='undefined') ? prx.componentsHelper.getProp(item.textProperties,'props-text') : '';

		var cR = "";
		var cText = "";
		var cButtons = ""

		cR += '<div id="' + _id + '" ' + prx.items.getComponentBaseAttributes(item, containerid, symbol)  + ' class="' + prx.items.getComponentBaseClasses(item, containerid, symbol) + ' box pos liveUpdate-backgroundColor liveUpdate-textColor type-metro-dialog type-metro-dialog-'+prx.componentsHelper.getProp(item.alertType,'other')+' changeProperty-backgroundColor changeProperty-textFont changeProperty-textColor changeProperty-textSize changeProperty-textAlign">';

		cR += '<style>';
		cR += prx.items.getComponentBaseStyle(item, containerid, symbol);
		cR += '#'+_id+' { background: '+prx.componentsHelper.getProp(item.backgroundColor,'color-background')+';  '+prx.componentsHelper.getProp(item.textFont,'font-family')+' '+_props+' color: '+prx.componentsHelper.getProp(item.textColor,'color-text')+'; font-size: '+prx.componentsHelper.getProp(item.textSize,'num-text-size')+'px; text-align: '+prx.componentsHelper.getProp(item.textAlign,'align')+'; }';
		cR += '#'+_id+' .type-metro-dialog-inner { border: '+prx.componentsHelper.getProp(item.buttonBorderWidth,'num-border-width')+'px solid '+prx.componentsHelper.getProp(item.buttonBorderColor,'color-border')+'; }'
		cR += '#'+_id+' .metro-dialog-button { border: '+prx.componentsHelper.getProp(item.buttonBorderWidth,'num-border-width')+'px solid '+prx.componentsHelper.getProp(item.buttonBorderColor,'color-border')+'; background: '+prx.componentsHelper.getProp(item.buttonBackgroundColor,'color-background')+'; color: '+prx.componentsHelper.getProp(item.buttonTextColor,'color-text')+'; }';
		cR += '</style>';
		cR += prx.items.getComponentPrependDivs(item, containerid, symbol);

		cR += '<div class="type-metro-dialog-inner liveUpdate-buttonBorderColor">';

		//cText += '<div class="dialog-title"><span data-editableproperty="title">'+item.title+'</span></div>';
		cText += '<div class="dialog-title" data-editableproperty="title">'+prx.componentsHelper.getProp(item.title,'text-textarea')+'</span></div>';
		cText += '<div class="dialog-text"><span data-editableproperty="text">'+prx.componentsHelper.getProp(item.text,'text-textarea')+'</span></div>';

		cButtons += '<div class="metro-dialog-buttons">'
		$.each(item.buttons, function(i,elm){
			cButtons += '<div class="metro-dialog-button dynamic-property liveUpdate-buttonBackgroundColor liveUpdate-buttonBorderColor liveUpdate-buttonTextColor" id="'+_id+'-buttons-'+i+'" data-dynamic-property-index="'+i+'">';
			cButtons += '<span data-editableproperty="text" data-dynamic-property-index="'+i+'">'+ prx.componentsHelper.getProp(elm.text,'text-textarea') + '</span>'
			cButtons += '</div>'
		});
		cButtons += '</div>';

		if(item.alertType == "warningbar") {
			cR += cButtons + cText;
		} else {
			cR += cText + cButtons;
		}

		cR += '</div>';
		cR += prx.items.getComponentAppendDivs(item, containerid, symbol);
		cR += '</div>';
		return cR;
	}
	,editableProperties: [
	     {
	     	caption: 'Title',
	     	name: 'title',
	     	type: 'input',
	     	value: function(item,name) { return item.title; }
	     	,changeProperty: {
				caption: 'Title',
				property: 'text',
				selector: '.dialog-title',
				transitionable: false
			}
	     }
	     ,{
	     	caption: 'Text',
	     	name: 'text',
	     	type: 'textarea',
	     	value: function(item,name) { return item.text; }
	     	,changeProperty: {
				caption: 'Text',
				property: 'text',
				selector: '.dialog-text',
				transitionable: false
			}
	     }
	
     ]
	,propertyGroups: [
		{
			caption: 'Dialog Style',
			properties: [
				[
					prx.commonproperties.metroBackgroundColor
				]
			]
		}
		,{
			caption: 'Button Style',
			properties: [
				[
					{
						caption: 'Background',
						name: 'buttonBackgroundColor',
						proptype: 'background-color-2-button',
						type: 'combo-colorpicker',
						value: function(item,name) { return item.buttonBackgroundColor; },
						values: prx.comps.metroColorsLight,
						liveUpdate:'background-color'
						,changeProperty: {
							caption: 'Button background color',
							property: 'background-color',
							selector: '.metro-dialog-button',
							transitionable: true
						}
					}
					,{
						caption: 'Border',
						name: 'buttonBorderWidth',
						proptype: 'border-width',
						type: 'combo-select',
						value: function(item,name) { return item.buttonBorderWidth; },
						values: { min: 0, max: 20, step: 1 }
						,changeProperty: {
							caption: 'Button border width',
							property: 'border-width',
							selector: '.metro-dialog-button',
							transitionable: true
						}
					}
					,{
						caption: false,
						name: 'buttonBorderColor',
						proptype: 'border-color',
						type: 'combo-colorpicker',
						value: function(item,name) { return item.buttonBorderColor; },
						values: prx.comps.metroColorsLight ,
						liveUpdate:'border-color'
						,changeProperty: {
							caption: 'Button border color',
							property: 'border-color',
							selector: '.metro-dialog-button',
							transitionable: true
						}
					}
				]
			]
		}
		,{
			caption: 'Text',
			properties: [
				[
					prx.commonproperties.textFontRichText('font-family',['text','title','buttons.text'])
					,prx.commonproperties.textSizeRichText('font-size',['text','title','buttons.text'])
					,prx.commonproperties.metroTextColorRichText('color',['text','title','buttons.text'])
				],
				[
					prx.commonproperties.textPropertiesRichText(['font-weight','font-style','text-decoration'],['text','title','buttons.text'])
					,prx.commonproperties.textAlignRichText('text-align',['text','title','buttons.text'])
	      			,{
	      				caption: 'Buttons',
	      				name: 'buttonTextColor',
	      				proptype: 'font-color-2-button',
	      				type: 'combo-colorpicker',
	      				value: function(item,name) { return item.buttonTextColor; },
	      				values: prx.comps.metroColorsLight,liveUpdate:'color'
	      				,changeProperty: {
							caption: 'Button text color',
							property: 'color',
							selector: '.metro-dialog-button',
							transitionable: true
						}
	      			}
				]
			]
		}
	]

    ,dynamicProperties: {
 		data: 'buttons'
 		,propertyCaption: 'Menu items'
 		,propertyName: 'Menu item'
 		,addCaption: 'Add menu item'
 		,deleteCaption: 'Delete'
 		,blankItem: {
 			text: 'Label',
 			actions: []
 		}
 		,captionProperty: 'text'

 			,editableProperties: [
						{
							caption: 'Text'
							,name: 'text'
							,type: 'input'
							,value: function(item,name,index) {
								return item.buttons[index].text;
							}
							,changeProperty: {
								caption: 'Label',
								property: 'text',
								selector: '.metro-dialog-button',
								transitionable: false
							}
						}
	           		]

 			,interactions:	[ prx.commonproperties.actions_buttons ]
			,propertyGroups: []

	}
};



/* TYPE = WARNING BAR */
prx.types.metro_warningbar = prx.componentsHelper.cloneobject(prx.types.metro_dialog);
prx.types.metro_warningbar.name = 'metro_warningbar';
prx.componentsHelper.removeProperties(prx.types.metro_warningbar.editableProperties, ['title']);
prx.componentsHelper.removeProperties(prx.types.metro_warningbar.propertyGroups, ['textAlign']);


//TYPE: MINI TOAST
prx.types.metro_toast_mini = {
	name: "metro_toast_mini"
	,onDisplay: function(item,containerid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		var _dims = prx.componentsHelper.getRealDims(item, symbol);

		var cR = "";

		cR += '<div id="' + _id + '" ' + prx.items.getComponentBaseAttributes(item, containerid, symbol)  + ' class="' + prx.items.getComponentBaseClasses(item, containerid, symbol) + ' box pos type-metro-toast-mini">';

		cR += '<style>';
		cR += prx.items.getComponentBaseStyle(item, containerid, symbol);
		cR += '#'+_id+' .metro-toast-mini-inner { line-height: '+_dims.height+'px; background: '+prx.componentsHelper.getProp(item.backgroundColor,'color-background')+';  '+prx.componentsHelper.getProp(item.textFont,'font-family')+' color: '+prx.componentsHelper.getProp(item.textColor,'color-text')+'; font-size: '+prx.componentsHelper.getProp(item.textSize,'num-text-size')+'px;  }';
		cR += '</style>';
		cR += prx.items.getComponentPrependDivs(item, containerid, symbol);

		cR += '<div class="metro-toast-mini-inner liveUpdate-backgroundColor liveUpdate-textColor changeProperty-backgroundColor changeProperty-textColor changeProperty-textFont changeProperty-textSize">'
		if(prx.componentsHelper.getProp(item.imgSrc.fileId,'other') != '') {
			cR += '<img src="'+prx.componentsHelper.getProp(item.imgSrc,'asset')+'" class="toast-icon">'
		}
		cR += '<span class="toast-title"> <span data-editableproperty="title">'+prx.componentsHelper.getProp(item.title,'text-textarea')+'</span></span>';
		cR += '<span class="toast-text"> <span data-editableproperty="text">'+prx.componentsHelper.getProp(item.text,'text-textarea')+'</span></span>';
		cR += '</div>';
		cR += prx.items.getComponentAppendDivs(item, containerid, symbol);
		cR += '</div>';
		return cR;
	}
	,onResize: function(item,containerid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		var _dims = prx.componentsHelper.getRealDims(item, symbol);

		$('#'+_id+' .metro-toast-mini-inner').css('line-height', _dims.height+'px');
	}
	,editableProperties: [
  			{
  				caption: 'Title',
  				name: 'title',
  				type: 'input',
  				value: function(item,name) { return item.title; } ,
  				liveUpdate:'color'
  				,changeProperty: {
					caption: 'Title',
					property: 'text',
					selector: '.toast-title',
					transitionable: false
				}
  			},
  			{
  				caption: 'Text',
  				name: 'text',
  				type: 'input',
  				value: function(item,name) { return item.text; } ,
  				liveUpdate:'color'
  				,changeProperty: {
					caption: 'Text',
					property: 'text',
					selector: '.toast-text',
					transitionable: false
				}
  			}

  	]
	,interactions:	[ prx.commonproperties.actions ]
	,propertyGroups: [
		{
			caption: 'Style',
			properties: [
				[
					prx.commonproperties.metroBackgroundColor
				]
			]
		},{
			caption: 'Text',
			properties: [
				[
					prx.commonproperties.textFontRichText('font-family',['text', 'title'])
					,prx.commonproperties.textSizeRichText('font-size',['text', 'title'])
					,prx.commonproperties.metroTextColorRichText('color',['text', 'title'])
				]
			]
		},{
			caption: 'Icon',
			properties: [
				[
					{
						caption: false
						,name: 'imgSrc'
						,type: 'combo-asset'
						,displayValue: function(item,name) {
							if(item.imgSrc.fileId == '') {
								return 'No asset selected.';
							}
							return item.imgSrc.name;
						}
						,value: function(item,name) {
							return JSON.stringify({
								allow: 'image',
								asset: item.imgSrc
							});
						}
						,changeProperty: {
							caption: 'Icon',
							rerender: true
						}
					}
				]
			]
		}
	]

};

//TYPE: TOAST
prx.types.metro_toast = {
	name: "metro_toast"
	,onDisplay: function(item,containerid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		var _dims = prx.componentsHelper.getRealDims(item, symbol);

		var cR = "";

		cR += '<div id="' + _id + '" ' + prx.items.getComponentBaseAttributes(item, containerid, symbol)  + ' class="' + prx.items.getComponentBaseClasses(item, containerid, symbol) + ' box pos type-metro-toast">';

		cR += '<style>';
		cR += prx.items.getComponentBaseStyle(item, containerid, symbol);
		cR += '#'+_id+' .metro-toast-inner { background: '+prx.componentsHelper.getProp(item.backgroundColor,'color-background')+';  '+prx.componentsHelper.getProp(item.textFont,'font-family')+' color: '+prx.componentsHelper.getProp(item.textColor,'color-text')+'; font-size: '+prx.componentsHelper.getProp(item.textSize,'num-text-size')+'px;  }';
		if(prx.componentsHelper.getProp(item.imgSrc.fileId,'other') != '') {
			cR += '#'+_id+' .toast-icon { background-image:  url('+prx.componentsHelper.getProp(item.imgSrc,'asset')+'); }'
		}
		cR += '</style>';
		cR += prx.items.getComponentPrependDivs(item, containerid, symbol);

		if(prx.componentsHelper.getProp(item.thumb.fileId,'other') != '') {
			cR += '<div class="toast-thumb">'
			cR += '<img src="'+prx.componentsHelper.getProp(item.thumb,'asset')+'">'
			cR += '</div>'
		}
		cR += '<div class="metro-toast-inner liveUpdate-backgroundColor liveUpdate-textColor changeProperty-backgroundColor changeProperty-textColor changeProperty-textFont changeProperty-textSize">'
		if(prx.componentsHelper.getProp(item.imgSrc.fileId,'other') != '') {
			cR += '<div class="toast-icon">'
			//cR += '<img src="'+prx.componentsHelper.getAssetUrl(item.imgSrc)+'">'
			cR += '</div>'
		}
		cR += '<div class="toast-title" data-editableproperty="title">'+prx.componentsHelper.getProp(item.title,'text-textarea')+'</div>';
		cR += '<div class="toast-text"><span data-editableproperty="text">'+prx.componentsHelper.getProp(item.text,'text-textarea')+'</span></div>';
		cR += '</div>';
		cR += prx.items.getComponentAppendDivs(item, containerid, symbol);
		cR += '</div>';
		return cR;
	}

	,onResize: function(item,containerid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		// patenta because webkit does not reposition the text next to the floated image when the image is resized - xl?
		// from http://stackoverflow.com/questions/3485365/how-can-i-force-webkit-to-redraw-repaint-to-propagate-style-changes
		var sel = $('#'+_id +' .toast-thumb').get(0);
		sel.style.display='none';
		sel.offsetHeight; // no need to store this anywhere, the reference is enough
		sel.style.display='block';

	}
	,editableProperties: [
		{
			caption: 'Title',
			name: 'title',
			type: 'input',
			value: function(item,name) { return item.title; },
			liveUpdate:'color'
			,changeProperty: {
				caption: 'Title',
				property: 'text',
				selector: '.toast-title',
				transitionable: false
			}
		}
		,{
			caption: 'Text',
			name: 'text',
			type: 'input',
			value: function(item,name) { return item.text; },
			liveUpdate:'color'
			,changeProperty: {
				caption: 'Text',
				property: 'text',
				selector: '.toast-text',
				transitionable: false
			}
		}

  	]
	,interactions:	[ prx.commonproperties.actions ]
	,propertyGroups: [
		{
			caption: 'Style',
			properties: [
				[
					prx.commonproperties.metroBackgroundColor
				]
			]
		},
		{
			caption: 'Text',
			properties: [
				[
					prx.commonproperties.textFontRichText('font-family',['text', 'title'])
					,prx.commonproperties.textSizeRichText('font-size',['text', 'title'])
					,prx.commonproperties.metroTextColorRichText('color',['text', 'title'])
				]
			]
		},{
			caption: 'Thumbnail',
			properties: [
				[
					{
						caption: false
						,name: 'thumb'
						,type: 'combo-asset'
						,displayValue: function(item,name) {
							if(item.thumb.fileId == '') {
								return 'No asset selected.';
							}
							return item.thumb.name;
						}
						,value: function(item,name) {
							return JSON.stringify({
								allow: 'image',
								asset: item.thumb
							});
						}
						,changeProperty: {
							caption: 'Thumbnail',
							rerender: true
						}
					}
				]
			]
		},
		{
			caption: 'Icon',
			properties: [
				[
					{
						caption: false
						,name: 'imgSrc'
						,type: 'combo-asset'
						,displayValue: function(item,name) {
							if(item.imgSrc.fileId == '') {
								return 'No asset selected.';
							}
							return item.imgSrc.name;
						}
						,value: function(item,name) {
							return JSON.stringify({
								allow: 'image',
								asset: item.imgSrc
							});
						}
						,changeProperty: {
							caption: 'Icon',
							rerender: true
						}
					}
				]
			]
		}
	]

};


/******************** TILES ********************/
// TYPE: PLAIN TILE
//TYPE: ICON TILE
prx.types.metro_tile_plain = {
	name: "metro_tile_plain"
	,onDisplay: function(item,containerid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		var _dims = prx.componentsHelper.getRealDims(item, symbol);

		var cR = "";

		cR += '<div id="' + _id + '" ' + prx.items.getComponentBaseAttributes(item, containerid, symbol)  + ' class="' + prx.items.getComponentBaseClasses(item, containerid, symbol) + ' box pos type-metro-tile type-metro-tile-plain liveUpdate-backgroundColor changeProperty-backgroundColor">';

		cR += '<style>';
		cR += prx.items.getComponentBaseStyle(item, containerid, symbol);
		cR += '#'+_id+' { background-color: '+prx.componentsHelper.getProp(item.backgroundColor,'color-background')+'; }';
		cR += '</style>';
		cR += prx.items.getComponentPrependDivs(item, containerid, symbol);
		cR += prx.items.getComponentAppendDivs(item, containerid, symbol);
		cR += '</div>';
		return cR;
	}
	,interactions:	[ prx.commonproperties.actions ]
	,propertyGroups: [
		{
			caption: 'Style',
			properties: [
				[
				 prx.commonproperties.metroBackgroundColor
				]
			]
		}
	]

};

//TYPE: ICON TILE
prx.types.metro_tile_icon = {
	name: "metro_tile_icon"
	,onDisplay: function(item,containerid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		var _dims = prx.componentsHelper.getRealDims(item, symbol);

		var cR = "";

		cR += '<div id="' + _id + '" ' + prx.items.getComponentBaseAttributes(item, containerid, symbol)  + ' class="' + prx.items.getComponentBaseClasses(item, containerid, symbol) + ' box pos type-metro-tile type-metro-tile-icon">';

		cR += '<style>';
		cR += prx.items.getComponentBaseStyle(item, containerid, symbol);
		cR += '#'+_id+' .metro-tile-icon-inner { background-color: '+prx.componentsHelper.getProp(item.backgroundColor,'color-background')+';  '+prx.componentsHelper.getProp(item.textFont,'font-family')+' color: '+prx.componentsHelper.getProp(item.textColor,'color-text')+'; font-size: '+prx.componentsHelper.getProp(item.textSize,'num-text-size')+'px;  }';
		if(prx.componentsHelper.getProp(item.imgSrc.fileId,'other') != '') {
			cR += '#'+_id+' .metro-tile-icon-inner { background-image:  url('+prx.componentsHelper.getProp(item.imgSrc,'asset')+'); }'
		}
		if(prx.componentsHelper.getProp(item.brandingType,'other') == 'icon') {
			cR += '#'+_id+' .metro-tile-branding { background-image:  url('+prx.componentsHelper.getProp(item.brandingIcon,'asset')+'); }'
		}
		if(prx.componentsHelper.getProp(item.badgeType,'other') == 'glyph') {
			cR += '#'+_id+' .metro-tile-badge { background-image:  url('+prx.componentsHelper.getProp(item.badgeGlyph,'asset')+'); }'
		}
		cR += '</style>';
		cR += prx.items.getComponentPrependDivs(item, containerid, symbol);

		cR += '<div class="metro-tile-icon-inner liveUpdate-backgroundColor liveUpdate-textColor">';
		cR += '<div class="metro-tile-branding metro-tile-branding-'+prx.componentsHelper.getProp(item.brandingType,'other')+'">'
		if(prx.componentsHelper.getProp(item.brandingType,'other') == 'text') {
			cR += '<span data-editableproperty="brandingText">'+prx.componentsHelper.getProp(item.brandingText,'text-textarea')+'</span>';
		}
		cR += '</div>';
		cR += '<div class="metro-tile-badge metro-tile-badge-'+prx.componentsHelper.getProp(item.badgeType,'other')+'">'
		if(prx.componentsHelper.getProp(item.badgeType,'other') == 'number') {
			cR += '<span data-editableproperty="badgeNumber">'+prx.componentsHelper.getProp(item.badgeNumber,'text-textarea')+'</span>';
		}
		cR += '</div>';
		cR += '</div>';
		cR += prx.items.getComponentAppendDivs(item, containerid, symbol);
		cR += '</div>';
		return cR;
	}
	,interactions:	[ prx.commonproperties.actions ]
	,editableProperties: [
		{
			caption: 'Branding'
			,name: 'brandingText'
			,type: 'input'
			,value: function(item,name) {
				return item.brandingText
			}
			,hiddenByDefault: function(item,name) {
				return (item.brandingType != 'text')
			}
			,changeProperty: {
					caption: 'Branding text',
					property: 'text',
					selector: '.metro-tile-branding-text',
					transitionable: false
				}

		},
		{
			caption: 'Badge'
			,name: 'badgeNumber'
			,type: 'input'
			,value: function(item,name) {
				return item.badgeNumber
			}
			,hiddenByDefault: function(item,name) {
				return (item.badgeType != 'number')
			}
			,changeProperty: {
				caption: 'Badge number',
				property: 'text',
				selector: '.metro-tile-badge-number',
				transitionable: false
			}
		}
	]
	,propertyGroups: [
		{
			caption: 'Style',
			properties: [
				[
					prx.commonproperties.metroBackgroundColor
				]
			]
		}
		,{
			caption: 'Text',
			properties: [
				[
					{
	      				caption: false,
	      				name: 'textFont',
	      				proptype: 'font-family',
	      				type: 'select',
						relatedEditableProperties: ['badgeNumber','brandingText'],
						relatedCSSProperties: 'font-family',
	      				value: function(item,name) { return item.textFont; },
	      				values: function(){ return prx.comps.fonts },
	      				hiddenByDefault: function(item,name) {
							return !(item.badgeType == 'number' || item.brandingType == 'text')
						}
						,changeProperty: {
							caption: 'Text font',
							property: 'font-family',
							selector: '.metro-tile-icon-inner',
							transitionable: false
						}

	      			}
	      			,
	      			{
	      				caption:false,
	      				name: 'textSize',
	      				proptype: 'font-size',
	      				type: 'combo-select',
						relatedEditableProperties: ['badgeNumber','brandingText'],
						relatedCSSProperties: 'font-size',
	      				value: function(item,name) { return item.textSize; },
	      				values: prx.comps.textsize,
	      				hiddenByDefault: function(item,name) {
							return !(item.badgeType == 'number' || item.brandingType == 'text')
						}
						,changeProperty: {
							caption: 'Text size',
							property: 'font-size',
							selector: '.metro-tile-icon-inner',
							transitionable: true
						}
	      			}
	      			,{
	      				caption: false,
	      				name: 'textColor',
	      				proptype: 'font-color',
	      				type: 'combo-colorpicker',
						relatedEditableProperties: ['badgeNumber','brandingText'],
						relatedCSSProperties: 'color',
	      				value: function(item,name) { return item.textColor; },
	      				values: prx.comps.metroColorsLight,
	      				hiddenByDefault: function(item,name) {
							return !(item.badgeType == 'number' || item.brandingType == 'text')
						}
						,liveUpdate: 'color'
						,changeProperty: {
							caption: 'Text color',
							property: 'color',
							selector: '.metro-tile-icon-inner',
							transitionable: true
						}
					}
				]
			]
		}
		,{
			caption: 'Icon',
			properties: [
				[
					{
						caption: false
						,name: 'imgSrc'
						,type: 'combo-asset'
						,displayValue: function(item,name) {
							if(item.imgSrc.fileId == '') {
								return 'No asset selected.';
							}
							return item.imgSrc.name;
						}
						,value: function(item,name) {
							return JSON.stringify({
								allow: 'image',
								asset: item.imgSrc
							});
						}
						,changeProperty: {
							caption: 'Icon',
							rerender: true
						}
					}
				]

			]
		},{
			caption: 'Branding',
			properties: [
				[
					{
						caption: false //'Branding type'
						,name: 'brandingType'
						,type: 'select'
						,value: function(item,name) {
							return item.brandingType
						}
						,values: [{ displayValue: 'None', value: ''}, { displayValue: 'Icon', value: 'icon'}, { displayValue: 'Text', value: 'text'}]
						,onChange: function(item,name) {
							if(item.brandingType == 'text' || item.badgeType == 'number') {
								$('#property-textSize, #property-textFont, #property-textColor').show()
							} else {
								$('#property-textSize, #property-textFont, #property-textColor').hide()
							}

							switch(item.brandingType) {
								case "icon":
									$('#property-brandingText').hide()
									$('#property-brandingIcon').show()
								break;
								case "text":
									$('#property-brandingText').show()
									$('#property-brandingIcon').hide()
								break;
								default:
									$('#property-brandingText, #property-brandingIcon').hide()
								break;
							}
						}
						,changeProperty: {
							caption: 'Branding type',
							rerender: true
						}
					}

				],[
					{
	      				caption: false // 'Branding icon'
						,name: 'brandingIcon'
						,type: 'combo-asset'
						,displayValue: function(item,name) {
							if(item.brandingIcon.fileId == '') {
								return 'No asset selected.';
							}
							return item.brandingIcon.name;
						}
						,value: function(item,name) {
							return JSON.stringify({
								allow: 'image',
								asset: item.brandingIcon
							});
						}
						,hiddenByDefault: function(item,name) {
							return (item.brandingType != 'icon')
						}
						,changeProperty: {
							caption: 'Branding icon',
							rerender: true
						}
					}
				]
			]
		},{
			caption: 'Badge',
			properties: [
				[
					{
						caption: false //'Badge type'
						,name: 'badgeType'
						,type: 'select'
						,value: function(item,name) {
							return item.badgeType
						}
						,values: [{ displayValue: 'None', value: ''}, { displayValue: 'Glyph', value: 'glyph'}, { displayValue: 'Number', value: 'number'}]
						,onChange: function(item,name) {
							if(item.brandingType == 'text' || item.badgeType == 'number') {
								$('#property-textSize, #property-textFont, #property-textColor').show()
							} else {
								$('#property-textSize, #property-textFont, #property-textColor').hide()
							}

							switch(item.badgeType) {
								case "glyph":
									$('#property-badgeNumber').hide()
									$('#property-badgeGlyph').show()
								break;
								case "number":
									$('#property-badgeGlyph').hide()
									$('#property-badgeNumber').show()
								break;
								default:
									$('#property-badgeGlyph, #property-badgeNumber').hide()
								break;
							}
						}
						,changeProperty: {
							caption: 'Badge type',
							rerender: true
						}
					}
				],[
	      			{
	      				caption: false //'Badge glyph'
						,name: 'badgeGlyph'
						,type: 'asset'
						,displayValue: function(item,name) {
							if(item.badgeGlyph.fileId == '') {
								return 'No asset selected.';
							}
							return item.badgeGlyph.name;
						}
						,value: function(item,name) {
							return JSON.stringify({
								allow: 'image',
								asset: item.badgeGlyph
							});
						}
						,hiddenByDefault: function(item,name) {
							return (item.badgeType != 'glyph')
						}
						,changeProperty: {
							caption: 'Badge glyph',
							rerender: true
						}
					}
				]
			]
		}
	]

};

//TYPE: IMAGE TILE
prx.types.metro_tile_image = {
	name: "metro_tile_image"
	,onDisplay: function(item,containerid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		var _dims = prx.componentsHelper.getRealDims(item, symbol);

		var cR = "";

		cR += '<div id="' + _id + '" ' + prx.items.getComponentBaseAttributes(item, containerid, symbol)  + ' class="' + prx.items.getComponentBaseClasses(item, containerid, symbol) + ' box pos type-metro-tile type-metro-tile-image'+(prx.componentsHelper.getProp(item.withCaption,'boolean') ? ' type-metro-tile-image-withcaption' : '') +'">';

		cR += '<style>';
		cR += prx.items.getComponentBaseStyle(item, containerid, symbol);

		cR += '#'+_id+' .metro-tile-image-inner { '+prx.componentsHelper.getProp(item.textFont,'font-family')+' color: '+prx.componentsHelper.getProp(item.textColor,'color-text')+'; font-size: '+prx.componentsHelper.getProp(item.textSize,'num-text-size')+'px;  }';
		cR += '#'+_id+' .metro-tile-badge, #'+_id+' .metro-tile-caption { background-color: '+prx.componentsHelper.getProp(item.badgeBackgroundColor,'color-background')+'; }';
		if(prx.componentsHelper.getProp(item.imgSrc.fileId,'other') != '') {
			cR += '#'+_id+' .metro-tile-image-inner { background-image:  url('+prx.componentsHelper.getProp(item.imgSrc,'asset')+'); }'
		}
		if(prx.componentsHelper.getProp(item.brandingType,'other') == 'icon') {
			cR += '#'+_id+' .metro-tile-branding { background-image:  url('+prx.componentsHelper.getProp(item.brandingIcon,'asset')+'); }'
		}
		if(prx.componentsHelper.getProp(item.badgeType,'other') == 'glyph') {
			cR += '#'+_id+' .metro-tile-badge { background-image:  url('+prx.componentsHelper.getProp(item.badgeGlyph,'asset')+'); }'
		}
		cR += '</style>';
		cR += prx.items.getComponentPrependDivs(item, containerid, symbol);

		cR += '<div class="metro-tile-image-inner">';
		if(prx.componentsHelper.getProp(item.withCaption,'boolean')) {
			cR += '<div class="metro-tile-caption liveUpdate-badgeBackgroundColor changeProperty-badgeBackgroundColor">';
		}
		cR += '<div class="metro-tile-branding liveUpdate-textColor metro-tile-branding-'+prx.componentsHelper.getProp(item.brandingType,'other')+'">'
		if(prx.componentsHelper.getProp(item.brandingType,'other') == 'text') {
			//cR += item.brandingText;
			cR += '<span data-editableproperty="brandingText">'+prx.componentsHelper.getProp(item.brandingText,'text-textarea')+'</span>';
		}
		cR += '</div>';
		cR += '<div class="metro-tile-badge liveUpdate-textColor liveUpdate-badgeBackgroundColor changeProperty-badgeBackgroundColor metro-tile-badge-'+prx.componentsHelper.getProp(item.badgeType,'other')+'">'
		if(prx.componentsHelper.getProp(item.badgeType,'other') == 'number') {
			//cR += item.badgeNumber;
			cR += '<span data-editableproperty="badgeNumber">'+prx.componentsHelper.getProp(item.badgeNumber,'text-textarea')+'</span>';
		}
		cR += '</div>';
		if(prx.componentsHelper.getProp(item.withCaption,'boolean')) {
			cR += '<div class="metro-tile-caption-text liveUpdate-textColor">'
			cR += '<span data-editableproperty="text">'+prx.componentsHelper.getProp(item.text,'text-textarea')+'</span>'

			cR += '</div>'
			cR += '</div>'
		}
		cR += '</div>';
		cR += prx.items.getComponentAppendDivs(item, containerid, symbol);
		cR += '</div>';
		return cR;
	}
	,editableProperties: [
		{
			caption: 'Caption',
			name: 'text',
			type: 'input',
			value: function(item,name) {
				return item.text;
			}
			,hiddenByDefault: function(item,name) {
				return (!item.withCaption)
			}
			,changeProperty: {
				caption: 'Caption',
				property: 'text',
				selector: '.metro-tile-caption-text',
				transitionable: false
			}
		},
		{
			caption: 'Branding'
			,name: 'brandingText'
			,type: 'input'
			,value: function(item,name) {
				return item.brandingText
			}
			,hiddenByDefault: function(item,name) {
				return (item.brandingType != 'text')
			}
			,changeProperty: {
				caption: 'Branding text',
				property: 'text',
				selector: '.metro-tile-branding-text',
				transitionable: false
			}
		}

		,{
			caption: 'Badge'
			,name: 'badgeNumber'
			,type: 'input'
			,value: function(item,name) {
				return item.badgeNumber
			}
			,hiddenByDefault: function(item,name) {
				return (item.badgeType != 'number')
			}
			,changeProperty: {
				caption: 'Badge number',
				property: 'text',
				selector: '.metro-tile-badge-number',
				transitionable: false
			}
		}
	]
	,interactions:	[ prx.commonproperties.actions ]
	,propertyGroups: [
		{
			caption: 'Style',
			properties: [
				[
					{
						caption: 'Background',
						name: 'badgeBackgroundColor',
						proptype: 'background-color',
						type: 'combo-colorpicker',
						value: function(item,name) {
							return item.badgeBackgroundColor;
						},
						values: prx.comps.metroColorsLight
						,hiddenByDefault: function(item,name) {
							return (item.badgeType == '')
						}
						,liveUpdate:'background-color'
						,changeProperty: {
							caption: 'Background color',
							property: 'background-color',
							selector: '.changeProperty-badgeBackgroundColor',
							transitionable: true
						}
					}
				]
			]
		}
		,
		{
			caption: 'Text',
			properties: [
				[
					{
	      				caption: false,
	      				name: 'textFont',
	      				proptype: 'font-family',
	      				type: 'select',
						relatedEditableProperties: ['text','badgeNumber'],
						relatedCSSProperties: 'font-family',
	      				value: function(item,name) { return item.textFont; },
	      				values: function(){ return prx.comps.fonts },
	      				hiddenByDefault: function(item,name) {
	      					if(item.withCaption) { return false; }
							return !(item.badgeType == 'number' || item.brandingType == 'text')
						}
						,changeProperty: {
							caption: 'Text font',
							property: 'font-family',
							selector: '.metro-tile-image-inner',
							transitionable: false
						}
	      			},{
	      				caption: false,
	      				name: 'textSize',
	      				proptype: 'font-size',
	      				type: 'combo-select',
						relatedEditableProperties: ['text','badgeNumber'],
						relatedCSSProperties: 'font-size',
	      				value: function(item,name) { return item.textSize; },
	      				values: prx.comps.textsize,
	      				hiddenByDefault: function(item,name) {
	      					if(item.withCaption) { return false; }
							return !(item.badgeType == 'number' || item.brandingType == 'text')
						}
						,changeProperty: {
							caption: 'Text size',
							property: 'font-size',
							selector: '.metro-tile-image-inner',
							transitionable: true
						}
	      			},{
	      				caption: false,
	      				name: 'textColor',
	      				proptype: 'font-color',
	      				type: 'combo-colorpicker',
						relatedEditableProperties: ['text','badgeNumber'],
						relatedCSSProperties: 'color',
	      				value: function(item,name) { return item.textColor; },
	      				values: prx.comps.metroColorsLight,
	      				hiddenByDefault: function(item,name) {
	      					if(item.withCaption) { return false; }
							return !(item.badgeType == 'number' || item.brandingType == 'text')
						}
	      				,liveUpdate:'color'
						,changeProperty: {
							caption: 'Text color',
							property: 'color',
							selector: '.metro-tile-image-inner',
							transitionable: true
						}

	      			}
				]
			]
		}
		,{
			caption: 'Image',
			properties: [
				[
					{
						caption: false
						,name: 'imgSrc'
						,type: 'asset'
						,displayValue: function(item,name) {
							if(item.imgSrc.fileId == '') {
								return 'No asset selected.';
							}
							return item.imgSrc.name;
						}
						,value: function(item,name) {
							return JSON.stringify({
								allow: 'image',
								asset: item.imgSrc
							});
						}
						,changeProperty: {
							caption: 'Image',
							rerender: true
						}

					}
				]
			]
		},{
			caption: 'Branding',
			properties: [
				[
					{
						caption: false //'Type'
						,name: 'brandingType'
						,type: 'select'
						,value: function(item,name) {
							return item.brandingType
						}
						,values: [{ displayValue: 'None', value: ''}, { displayValue: 'Icon', value: 'icon'}, { displayValue: 'Text', value: 'text'}]
						,onChange: function(item,name) {
							if(!item.withCaption) {
								if(item.brandingType == 'text' || item.badgeType == 'number') {
									$('#property-textSize, #property-textFont, #property-textColor').show()
								} else {
									$('#property-textSize, #property-textFont, #property-textColor').hide()
								}
							}

							switch(item.brandingType) {
								case "icon":
									$('#property-brandingText').hide()
									$('#property-brandingIcon').show()
								break;
								case "text":
									$('#property-brandingText').show()
									$('#property-brandingIcon').hide()
								break;
								default:
									$('#property-brandingText, #property-brandingIcon').hide()
								break;
							}
						}
						,changeProperty: {
							caption: 'Branding type',
							rerender: true
						}
					}
				],[
					{
	      				caption: false //'Icon'
						,name: 'brandingIcon'
						,type: 'combo-asset'
						,displayValue: function(item,name) {
							if(item.brandingIcon.fileId == '') {
								return 'No asset selected.';
							}
							return item.brandingIcon.name;
						}
						,value: function(item,name) {
							return JSON.stringify({
								allow: 'image',
								asset: item.brandingIcon
							});
						}
						,hiddenByDefault: function(item,name) {
							return (item.brandingType != 'icon')
						}
						,changeProperty: {
							caption: 'Branding icon',
							rerender: true
						}

					}
				]
			]
		},{
			caption: 'Badge',
			properties: [
				[
					{
						caption: false //'Type'
						,name: 'badgeType'
						,type: 'select'
						,value: function(item,name) {
							return item.badgeType
						}
						,values: [{ displayValue: 'None', value: ''}, { displayValue: 'Glyph', value: 'glyph'}, { displayValue: 'Number', value: 'number'}]
						,onChange: function(item,name) {
							if(!item.withCaption) {
								if(item.brandingType == 'text' || item.badgeType == 'number') {
									$('#property-textSize, #property-textFont, #property-textColor').show()
								} else {
									$('#property-textSize, #property-textFont, #property-textColor').hide()
								}
							}

							switch(item.badgeType) {
								case "glyph":
									$('#property-badgeNumber').hide()
									$('#property-badgeGlyph, #property-badgeBackgroundColor').show()
								break;
								case "number":
									$('#property-badgeGlyph').hide()
									$('#property-badgeNumber, #property-badgeBackgroundColor').show()
								break;
								default:
									$('#property-badgeGlyph, #property-badgeNumber, #property-badgeBackgroundColor').hide()
								break;
							}
						}
						,changeProperty: {
							caption: 'Badge icon',
							rerender: true
						}
					}
				],[
					{
	      				caption: false //'Glyph'
						,name: 'badgeGlyph'
						,type: 'asset'
						,displayValue: function(item,name) {
							if(item.badgeGlyph.fileId == '') {
								return 'No asset selected.';
							}
							return item.badgeGlyph.name;
						}
						,value: function(item,name) {
							return JSON.stringify({
								allow: 'image',
								asset: item.badgeGlyph
							});
						}
						,hiddenByDefault: function(item,name) {
							return (item.badgeType != 'glyph')
						}
						,changeProperty: {
							caption: 'Badge glyph',
							rerender: true
						}
					}
				]
			]

		}
	]

};

/* TYPE = IMAGE TILE WITH CAPTION */
prx.types.metro_tile_image_withcaption = prx.componentsHelper.cloneobject(prx.types.metro_tile_image);
prx.types.metro_tile_image_withcaption.name = 'metro_tile_image_withcaption';
prx.types.metro_tile_image_withcaption.propertyGroups = prx.componentsHelper.editProperty(prx.types.metro_tile_image_withcaption.propertyGroups, 'brandingType', 'values', [{ displayValue: 'None', value: ''}, { displayValue: 'Icon', value: 'icon'}]);
prx.types.metro_tile_image_withcaption.propertyGroups = prx.componentsHelper.editProperty(prx.types.metro_tile_image_withcaption.propertyGroups, 'badgeBackgroundColor', 'caption', 'Background Color');

//TYPE: TEXT TILE
prx.types.metro_tile_text = {
	name: "metro_tile_text"
	,onDisplay: function(item,containerid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		var _dims = prx.componentsHelper.getRealDims(item, symbol);

		var cR = "";

		cR += '<div id="' + _id + '" ' + prx.items.getComponentBaseAttributes(item, containerid, symbol)  + ' class="' + prx.items.getComponentBaseClasses(item, containerid, symbol) + ' box pos type-metro-tile type-metro-tile-text">';

		cR += '<style>';
		cR += prx.items.getComponentBaseStyle(item, containerid, symbol);
		cR += '#'+_id+' .metro-tile-text-inner { background-color: '+prx.componentsHelper.getProp(item.backgroundColor,'color-background')+';  '+prx.componentsHelper.getFontCssFromFontFamily(item.textFont)+' color: '+prx.componentsHelper.getProp(item.textColor,'color-text')+'; font-size: '+item.textSize+'px;  }';
		if(prx.componentsHelper.getProp(item.imgSrc.fileId,'other') != '') {
			cR += '#'+_id+' .metro-tile-text-image { background-image:  url('+prx.componentsHelper.getProp(item.imgSrc,'asset')+'); }'
		}
		if(prx.componentsHelper.getProp(item.brandingType,'other') == 'icon') {
			cR += '#'+_id+' .metro-tile-branding { background-image:  url('+prx.componentsHelper.getProp(item.brandingIcon,'asset')+'); }'
		}
		if(prx.componentsHelper.getProp(item.badgeType,'other') == 'glyph') {
			cR += '#'+_id+' .metro-tile-badge { background-image:  url('+prx.componentsHelper.getProp(item.badgeGlyph,'asset')+'); }'
		}
		cR += '</style>';
		cR += prx.items.getComponentPrependDivs(item, containerid, symbol);

		cR += '<div class="metro-tile-text-inner liveUpdate-backgroundColor liveUpdate-textColor">';
		if(prx.componentsHelper.getProp(item.imgSrc.fileId,'other') != '') {
			cR += '<div class="metro-tile-text-image"></div>'
		}
		cR += '<div class="metro-tile-text-title"><span data-editableproperty="title">'+prx.componentsHelper.getProp(item.title,'text-textarea')+'</span></div>'
		cR += '<div class="metro-tile-text-text"><span data-editableproperty="text">'+prx.componentsHelper.getProp(item.text,'text-textarea')+'</span></div>'
		cR += '<div class="metro-tile-branding metro-tile-branding-'+prx.componentsHelper.getProp(item.brandingType,'other')+'">'
		if(prx.componentsHelper.getProp(item.brandingType,'other') == 'text') {
			cR += '<span data-editableproperty="brandingText">'+prx.componentsHelper.getProp(item.brandingText,'text-textarea')+'</span>';
		}
		cR += '</div>';
		cR += '<div class="metro-tile-badge liveUpdate-textColor metro-tile-badge-'+prx.componentsHelper.getProp(item.badgeType,'other')+'">'
		if(prx.componentsHelper.getProp(item.badgeType,'other') == 'number') {
			cR += '<span data-editableProperty="badgeNumber">'+prx.componentsHelper.getProp(item.badgeNumber,'text-textarea')+'</span>';
		}
		cR += '</div>';
		cR += '</div>';
		cR += prx.items.getComponentAppendDivs(item, containerid, symbol);
		cR += '</div>';
		return cR;
	}
	,editableProperties: [
		{
			caption: 'Title'
			,name: 'title'
			,type: 'input'
			,value: function(item,name) {
				return item.title
			}
			,liveUpdate:'color'
			,changeProperty: {
				caption: 'Title',
				property: 'text',
				selector: '.metro-tile-text-title',
				transitionable: false
			}
		},
		{
			caption: 'Text'
			,name: 'text'
			,type: 'textarea'
			,value: function(item,name) {
				return item.text
			}
			,changeProperty: {
				caption: 'Text',
				property: 'text',
				selector: '.metro-tile-text-text',
				transitionable: false
			}
		},
		{
			caption: 'Branding'
			,name: 'brandingText'
			,type: 'input'
			,value: function(item,name) {
				return item.brandingText
			}
			,hiddenByDefault: function(item,name) {
				return (item.brandingType != 'text')
			}
			,changeProperty: {
				caption: 'Branding text',
				property: 'text',
				selector: '.metro-tile-branding-text',
				transitionable: false
			}

		},
		{
			caption: 'Badge'
			,name: 'badgeNumber'
			,type: 'input'
			,value: function(item,name) {
				return item.badgeNumber
			}
			,hiddenByDefault: function(item,name) {
				return (item.badgeType != 'number')
			}
			,changeProperty: {
				caption: 'Badge number',
				property: 'text',
				selector: '.metro-tile-badge-number',
				transitionable: false
			}
		}
	]
	,interactions:	[ prx.commonproperties.actions ]
	,propertyGroups: [
		{
			caption: 'Style',
			properties: [
				[
					prx.commonproperties.metroBackgroundColor
				]
			]
		},{
			caption: 'Text',
			properties: [
				[
					{
	      				caption: false,
	      				name: 'textFont',
	      				proptype: 'font-family',
	      				type: 'select',
						relatedEditableProperties: ['text','title','badgeNumber','brandingText'],
						relatedCSSProperties: 'font-family',
	      				value: function(item,name) { return item.textFont; },
	      				values: function(){ return prx.comps.fonts }
						,changeProperty: {
							caption: 'Text font',
							property: 'font-family',
							selector: '.metro-tile-text-inner',
							transitionable: false
						}
	      			},
					{
	      				caption: false,
	      				name: 'textSize',
	      				proptype: 'font-size',
	      				type: 'combo-select',
						relatedEditableProperties: ['text','title','badgeNumber','brandingText'],
						relatedCSSProperties: 'font-size',
	      				value: function(item,name) { return item.textSize; },
	      				values: prx.comps.textsize
	      				,changeProperty: {
							caption: 'Text size',
							property: 'font-size',
							selector: '.metro-tile-text-inner',
							transitionable: true
						}
	      			}
	      			,{
	      				caption: false,
	      				name: 'textColor',
	      				proptype: 'font-color',
	      				type: 'combo-colorpicker',
						relatedEditableProperties: ['text','title','badgeNumber','brandingText'],
						relatedCSSProperties: 'color',
	      				value: function(item,name) { return item.textColor; },
	      				values: prx.comps.metroColorsLight
	      				,liveUpdate:'color'
	      				,changeProperty: {
							caption: 'Text color',
							property: 'color',
							selector: '.metro-tile-text-inner',
							transitionable: true
						}
	      			}
				]
			]
		},
		{
			caption: 'Image',
			properties: [
				[
					{
						caption: false
						,name: 'imgSrc'
						,type: 'combo-asset'
						,displayValue: function(item,name) {
							if(item.imgSrc.fileId == '') {
								return 'No asset selected.';
							}
							return item.imgSrc.name;
						}
						,value: function(item,name) {
							return JSON.stringify({
								allow: 'image',
								asset: item.imgSrc
							});
						}
						,changeProperty: {
							caption: 'Image',
							rerender: true
						}
					}
				]
			]
		},{
			caption: 'Branding',
			properties: [
				[
					{
						caption: false//'Type'
						,name: 'brandingType'
						,type: 'select'
						,value: function(item,name) {
							return item.brandingType
						}
						,values: [{ displayValue: 'None', value: ''}, { displayValue: 'Icon', value: 'icon'}, { displayValue: 'Text', value: 'text'}]
						,onChange: function(item,name) {
							switch(item.brandingType) {
								case "icon":
									$('#property-brandingText').hide()
									$('#property-brandingIcon').show()
								break;
								case "text":
									$('#property-brandingText').show()
									$('#property-brandingIcon').hide()
								break;
								default:
									$('#property-brandingText, #property-brandingIcon').hide()
								break;
							}
						}
						,changeProperty: {
							caption: 'Branding type',
							rerender: true
						}
					}
				],[
					{
	      				caption: false //'Icon'
						,name: 'brandingIcon'
						,type: 'combo-asset'
						,displayValue: function(item,name) {
							if(item.brandingIcon.fileId == '') {
								return 'No asset selected.';
							}
							return item.brandingIcon.name;
						}
						,value: function(item,name) {
							return JSON.stringify({
								allow: 'image',
								asset: item.brandingIcon
							});
						}
						,hiddenByDefault: function(item,name) {
							return (item.brandingType != 'icon')
						}
						,changeProperty: {
							caption: 'Branding icon',
							rerender: true
						}
					}
				]
			]
		},{
			caption: 'Badge',
			properties: [
				[
					{
						caption: false//'Type'
						,name: 'badgeType'
						,type: 'select'
						,value: function(item,name) {
							return item.badgeType
						}
						,values: [{ displayValue: 'None', value: ''}, { displayValue: 'Glyph', value: 'glyph'}, { displayValue: 'Number', value: 'number'}]
						,onChange: function(item,name) {
							switch(item.badgeType) {
								case "glyph":
									$('#property-badgeNumber').hide()
									$('#property-badgeGlyph').show()
								break;
								case "number":
									$('#property-badgeGlyph').hide()
									$('#property-badgeNumber').show()
								break;
								default:
									$('#property-badgeGlyph, #property-badgeNumber').hide()
								break;
							}
						}
						,changeProperty: {
							caption: 'Badge type',
							rerender: true
						}
					}
				],[
	      			{
	      				caption: false//'Glyph'
						,name: 'badgeGlyph'
						,type: 'asset'
						,displayValue: function(item,name) {
							if(item.badgeGlyph.fileId == '') {
								return 'No asset selected.';
							}
							return item.badgeGlyph.name;
						}
						,value: function(item,name) {
							return JSON.stringify({
								allow: 'image',
								asset: item.badgeGlyph
							});
						}
						,hiddenByDefault: function(item,name) {
							return (item.badgeType != 'glyph')
						}
						,changeProperty: {
							caption: 'Badge glyph',
							rerender: true
						}
					}
				]
			]
		}
	]

};

/********************** FORMS **************************/
//TYPE: TEXTFIELD
prx.types.metro_textfield = {
	name: 'metro_textfield'
	,onDisplay: function(item,containerid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		
		if(typeof(item.textAlign) == "undefined") { item.textAlign = 'left'; }
		
		var _props = prx.componentsHelper.getProp(item.textProperties,'props-text');
		var cR = '';

		var _dims = prx.componentsHelper.getRealDims(item,symbol);

		cR += '<div id="' + _id + '" ' + prx.items.getComponentBaseAttributes(item, containerid, symbol)  + ' class="' + prx.items.getComponentBaseClasses(item, containerid, symbol) + ' box pos type-metro-textfield type-metro-textfield-'+prx.componentsHelper.getProp(item.inputtype,'other')+'">';
		cR += '<style>';
		cR += prx.items.getComponentBaseStyle(item, containerid, symbol);
		cR += '#'+_id+' input:-moz-placeholder { color: '+prx.componentsHelper.getProp(item.placeholderColor,'color-text')+'!important; }'
		cR += '#'+_id+' input::-moz-placeholder { color: '+prx.componentsHelper.getProp(item.placeholderColor,'color-text')+'!important; }'
		cR += '#'+_id+' input::-webkit-input-placeholder { color: '+prx.componentsHelper.getProp(item.placeholderColor,'color-text')+'!important; }'
		cR += '</style>';
		cR += prx.items.getComponentPrependDivs(item, containerid, symbol);

		if(prx.editor) {
			cR += '<div class="faux-input liveUpdate-textColor liveUpdate-borderColor liveUpdate-backgroundColor" data-editableproperty="value"  style="color: '+prx.componentsHelper.getProp(item.textColor,'color-text')+'; font-size: '+prx.componentsHelper.getProp(item.textSize,'num-text-size')+'px; '+prx.componentsHelper.getProp(item.textFont,'font-family')+' border: '+prx.componentsHelper.getProp(item.borderWidth,'num-border-width')+'px solid '+prx.componentsHelper.getProp(item.borderColor,'color-border')+'; '+ _props + '; background-color: '+prx.componentsHelper.getProp(item.backgroundColor,'color-background')+'; text-align: '+prx.componentsHelper.getProp(item.textAlign,'align')+'; line-height: '+(_dims.height-parseInt(prx.componentsHelper.getProp(item.borderWidth,'num-border-width'))*2)+'px;">'+prx.componentsHelper.getProp(item.value,'text')+'</div>';
			cR += '<div class="faux-input placeholder-input liveUpdate-placeholderColor liveUpdate-borderColor liveUpdate-backgroundColor"  style="color: '+prx.componentsHelper.getProp(item.placeholderColor,'color-text')+'; font-size: '+prx.componentsHelper.getProp(item.textSize,'num-text-size')+'px; '+prx.componentsHelper.getProp(item.textFont,'font-family')+' border: '+prx.componentsHelper.getProp(item.borderWidth,'num-border-width')+'px solid '+prx.componentsHelper.getProp(item.borderColor,'color-border')+'; '+ _props + '; background-color: '+prx.componentsHelper.getProp(item.backgroundColor,'color-background')+'; text-align: '+prx.componentsHelper.getProp(item.textAlign,'align')+'; line-height: '+(_dims.height-parseInt(prx.componentsHelper.getProp(item.borderWidth,'num-border-width'))*2)+'px;">'+prx.componentsHelper.getProp(item.placeholder,'other')+'</div>'
		} else {
			cR += '<input type="'+prx.componentsHelper.getProp(item.inputtype,'other')+'" value="'+prx.componentsHelper.getProp(item.value,'other')+'" placeholder="'+prx.componentsHelper.getProp(item.placeholder,'other')+'" data-role="none" class="real-input changeProperty-backgroundColor changeProperty-textSize changeProperty-textColor changeProperty-textFont changeProperty-borderWidth changeProperty-borderColor changeProperty-textAlign" style="color: '+prx.componentsHelper.getProp(item.textColor,'color-text')+'; font-size: '+prx.componentsHelper.getProp(item.textSize,'num-text-size')+'px; '+prx.componentsHelper.getProp(item.textFont,'font-family')+' border: '+prx.componentsHelper.getProp(item.borderWidth,'num-border-width')+'px solid '+prx.componentsHelper.getProp(item.borderColor,'color-border')+'; '+ _props + '; background-color: '+prx.componentsHelper.getProp(item.backgroundColor,'color-background')+'; text-align: '+prx.componentsHelper.getProp(item.textAlign,'align')+';" />'
		}
		cR += prx.items.getComponentAppendDivs(item, containerid, symbol);
		cR += '</div>';
		return cR;
	}
	,afterDisplay: function(item,containerid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		if(!prx.editor) {
			$('#'+_id)
				.hammer()
				.find('.real-input')
				.focus(function(){
					if(typeof(prx.variables._triggerData['#'+_id]) == "undefined") { prx.variables._triggerData['#'+_id] = {}; }
			        prx.variables._triggerData['#'+_id]['inputfocus'] = { value: $(this).val() }
					$('#'+_id).trigger('inputfocus');
				})
				.blur(function(){
					if(typeof(prx.variables._triggerData['#'+_id]) == "undefined") { prx.variables._triggerData['#'+_id] = {}; }
			        prx.variables._triggerData['#'+_id]['inputblur'] = { value: $(this).val() };
			        $('#'+_id).trigger('inputblur');
				})
				.keyup(function(e){
					if(typeof(prx.variables._triggerData['#'+_id]) == "undefined") { prx.variables._triggerData['#'+_id] = {}; }
			        prx.variables._triggerData['#'+_id]['inputkeyup'] = { value: $(this).val() };
					var event = jQuery.Event("inputkeyup");
					event.which = e.which;
					$('#'+_id).trigger(event);
				});

			prx.actions.disableFlashActionOnItemTap('#' + _id, '.flashactiontap-afterdisplay');
		}
	}
	,editableProperties: [
			{
				caption: 'Value'
				,name: 'value'
				,type: 'input'
				,value: function(item,name) {
					return item.value;
				}
				,changeProperty: {
					property: 'input-value',
					selector: '.real-input',
					transitionable: false
				}
			}

	]
	,interactions:	[ prx.commonproperties.actions ]
    ,mpactions: {
    	specialEvents: ['inputfocus','inputblur','inputkeyup']
    }
	,propertyGroups: [
		{
			caption: 'Style',
			properties: [
				[
					prx.commonproperties.metroBackgroundColor
					,
					{
						caption: 'Border',
						name: 'borderWidth',
						proptype: 'border-width',
						type: 'combo-select',
						value: function(item,name) {
							return item.borderWidth;
						},
						values: { min: 0, max: 5, step: 1 }
						,changeProperty: {
							caption: 'Border width',
							rerender: true
						}
					}
					,prx.commonproperties.metroBorderColor
				]
			]
		},{
			caption: 'Text',
			properties: [
				[
					prx.commonproperties.textFont
					,prx.commonproperties.textSize
					,prx.commonproperties.metroTextColor
				],[
					prx.commonproperties.textProperties
					,prx.commonproperties.textAlign
				]
			]
		},{
			caption: 'Placeholder (If field is empty)',
			properties: [
				[
					{
						caption: 'Placeholder Text'
						,name: 'placeholder'
						,type: 'input'
						,value: function(item,name) {
							return item.placeholder;
						}
						,liveUpdate:'color'
						,changeProperty: {
							caption: 'Placeholder text',
							rerender:true
						}
					}
				],[
					{
						caption: 'Placeholder Color',
						name: 'placeholderColor',
						proptype: 'placeholder-color',
						type: 'combo-colorpicker',
						value: function(item,name) { if(typeof(item.placeholderColor)=='undefined') { return '999999'; } return item.placeholderColor; },
						values: prx.comps.metroColorsLight
						,liveUpdate:'color'
						,changeProperty: {
							rerender: true
						}

					}

				]
			]
		},
		{
			caption: 'Input type',
			properties: [
				[
					{
						caption: false,
						name: 'inputtype',
						type: 'select',
						value: function(item,name) {
							return item.inputtype;
						}
						,values: [{ value: 'text', displayValue: 'Text' }, { value: 'number', displayValue: 'Numeric' }, { value: 'email', displayValue: 'Email' }, { value: 'password', displayValue: 'Password' }, { value: 'tel', displayValue: 'Telephone' }]
						,changeProperty: {
							caption: 'Input type',
							rerender: true
						}
						,hiddenByDefault: function(item) {
							return (item.name=="metro_passwordfield")
						}
					}
				]
			]
		}
	]

};

//TYPE: TEXTAREA
prx.types.metro_textarea = {
	name: 'metro_textarea'
	,onDisplay: function(item,containerid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		var _props = prx.componentsHelper.getProp(item.textProperties,'props-text');

		var _dims = prx.componentsHelper.getRealDims(item,symbol);

		var cR = '';
		cR += '<div id="' + _id + '" ' + prx.items.getComponentBaseAttributes(item, containerid, symbol)  + ' class="' + prx.items.getComponentBaseClasses(item, containerid, symbol) + ' box pos type-metro-textarea">';
		cR += '<style>';
		cR += prx.items.getComponentBaseStyle(item, containerid, symbol);
		cR += '#'+_id+' textarea:-moz-placeholder { color: '+prx.componentsHelper.getProp(item.placeholderColor,'color-text')+'!important; }'
		cR += '#'+_id+' textarea::-moz-placeholder { color: '+prx.componentsHelper.getProp(item.placeholderColor,'color-text')+'!important; }'
		cR += '#'+_id+' textarea::-webkit-input-placeholder { color: '+prx.componentsHelper.getProp(item.placeholderColor,'color-text')+'!important; }'
		cR += '</style>';
		cR += prx.items.getComponentPrependDivs(item, containerid, symbol);
		if(prx.editor) {
			cR += '<div class="faux-input liveUpdate-textColor liveUpdate-borderColor liveUpdate-backgroundColor" data-editableproperty="value"  style="color: '+prx.componentsHelper.getProp(item.textColor,'color-text')+'; font-size: '+prx.componentsHelper.getProp(item.textSize,'num-text-size')+'px; '+prx.componentsHelper.getProp(item.textFont,'font-family')+' border: '+prx.componentsHelper.getProp(item.borderWidth,'num-border-width')+'px solid '+prx.componentsHelper.getProp(item.borderColor,'color-border')+'; '+ _props + '; background-color: '+prx.componentsHelper.getProp(item.backgroundColor,'color-background')+'; text-align: '+prx.componentsHelper.getProp(item.textAlign,'align')+';">'+prx.componentsHelper.getProp(item.value,'text-textarea')+'</div>';
			cR += '<div class="faux-input placeholder-input liveUpdate-placeholderColor liveUpdate-borderColor liveUpdate-backgroundColor"  style="color: '+prx.componentsHelper.getProp(item.placeholderColor,'color-text')+'; font-size: '+prx.componentsHelper.getProp(item.textSize,'num-text-size')+'px; '+prx.componentsHelper.getProp(item.textFont,'font-family')+' border: '+prx.componentsHelper.getProp(item.borderWidth,'num-border-width')+'px solid '+prx.componentsHelper.getProp(item.borderColor,'color-border')+'; '+ _props + '; background-color: '+prx.componentsHelper.getProp(item.backgroundColor,'color-background')+'; text-align: '+prx.componentsHelper.getProp(item.textAlign,'align')+';">'+prx.componentsHelper.getProp(item.placeholder,'other')+'</div>'
		} else {
			cR += '<textarea class="changeProperty-textColor changeProperty-textSize changeProperty-textFont changeProperty-backgroundColor changeProperty-textAlign changeProperty-borderWidth changeProperty-borderColor liveUpdate-placeholderColor liveUpdate-textColor liveUpdate-borderColor liveUpdate-backgroundColor" placeholder="'+prx.componentsHelper.getProp(item.placeholder,'other')+'" style="color: '+prx.componentsHelper.getProp(item.textColor,'color-text')+'; font-size: '+prx.componentsHelper.getProp(item.textSize,'num-text-size')+'px; '+prx.componentsHelper.getProp(item.textFont,'font-family')+' border: '+prx.componentsHelper.getProp(item.borderWidth,'num-border-width')+'px solid '+prx.componentsHelper.getProp(item.borderColor,'color-border')+'; '+ _props + '; background-color: '+prx.componentsHelper.getProp(item.backgroundColor,'color-background')+'; text-align: '+prx.componentsHelper.getProp(item.textAlign,'align')+';" data-role="none">'+prx.componentsHelper.getProp(item.value,'text-textarea').replace(/<br \/>/g, "\n")+'</textarea>';
		}
		cR += prx.items.getComponentAppendDivs(item, containerid, symbol);
		cR += '</div>';
		return cR;
	}
	,afterDisplay: function(item,containerid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		if(!prx.editor) {
			$('#'+_id)
				.hammer()
				.find('textarea')
				.focus(function(){
					if(typeof(prx.variables._triggerData['#'+_id]) == "undefined") { prx.variables._triggerData['#'+_id] = {}; }
			        prx.variables._triggerData['#'+_id]['inputfocus'] = { value: $(this).val() }
					$('#'+_id).trigger('inputfocus');
				})
				.blur(function(){
					if(typeof(prx.variables._triggerData['#'+_id]) == "undefined") { prx.variables._triggerData['#'+_id] = {}; }
			        prx.variables._triggerData['#'+_id]['inputblur'] = { value: $(this).val() };
			        $('#'+_id).trigger('inputblur');
				})
				.keyup(function(e){
					if(typeof(prx.variables._triggerData['#'+_id]) == "undefined") { prx.variables._triggerData['#'+_id] = {}; }
			        prx.variables._triggerData['#'+_id]['inputkeyup'] = { value: $(this).val() };
					var event = jQuery.Event("inputkeyup");
					event.which = e.which;
					$('#'+_id).trigger(event);
				});

			prx.actions.disableFlashActionOnItemTap('#' + _id, '.flashactiontap-afterdisplay');
		}
	}
	,interactions: [ prx.commonproperties.actions ]
    ,mpactions: {
    	specialEvents: ['inputfocus','inputblur','inputkeyup']
    }
	,editableProperties: [
				{
					caption: 'Value'
					,name: 'value'
					,type: 'textarea'
					,value: function(item,name) {
						return item.value;
					}
					,changeProperty: {
						property: 'textarea-value',
						selector: 'textarea',
						transitionable: false
					}
				}

  		]
	,propertyGroups: prx.types.metro_textfield.propertyGroups
};

//TYPE: RADIO BUTTON
prx.types.metro_radiobutton = {
	name: "metro_radiobutton"
	,onDisplay: function(item,containerid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		var cR = '';

		var _active = "";
		if(prx.componentsHelper.getProp(item.active,'boolean')) { _active = 'checked="checked"'; }
		var _type = (prx.componentsHelper.getProp(item.actAsCheckbox,'boolean')) ? 'checkbox' : 'radio';


		cR += '<div id="' + _id + '" ' + prx.items.getComponentBaseAttributes(item, containerid, symbol)  + ' class="' + prx.items.getComponentBaseClasses(item, containerid, symbol) + ' box pos type-metro-radio">';
		cR += '<style>';
		cR += prx.items.getComponentBaseStyle(item, containerid, symbol);
		cR += '#'+_id+' label { background-color: '+prx.componentsHelper.getProp(item.backgroundColor,'color-background')+'; border: '+prx.componentsHelper.getProp(item.borderWidth,'num-border-width')+'px solid '+prx.componentsHelper.getProp(item.borderColor,'color-border')+'; }'
		cR += '#'+_id+' label span { background-color: '+prx.componentsHelper.getProp(item.activeColor,'color-background')+'; }'
		cR += '</style>';
		cR += prx.items.getComponentPrependDivs(item, containerid, symbol);
		cR += '<input type="'+_type+'" '+_active+ ' id="'+_id+'-checkbox" data-role="none"  />';
		cR += '<label class="liveUpdate-backgroundColor liveUpdate-borderColor changeProperty-backgroundColor changeProperty-borderWidth changeProperty-borderColor" for="'+_id+'-checkbox" data-clickable="true"><span  class="liveUpdate-activeColor changeProperty-activeColor"></span></label>';

		cR += prx.items.getComponentAppendDivs(item, containerid, symbol);
		cR += '</div>';
		return cR;
	}
	,afterDisplay: function(item,containerid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		if(!prx.editor) {
			$('#'+_id+'-checkbox').on('change.custom-change-event', function(e){
				if(typeof(prx.variables._triggerData['input:checked[id='+_id+'-checkbox]']) == "undefined") { prx.variables._triggerData['input:checked[id='+_id+'-checkbox]'] = {}; }
		        prx.variables._triggerData['input:checked[id='+_id+'-checkbox]']['checkboxchange'] = { state: $(this).is(':checked') };
		        if(typeof(prx.variables._triggerData['input[id='+_id+'-checkbox]:not(:checked)']) == "undefined") { prx.variables._triggerData['input[id='+_id+'-checkbox]:not(:checked)'] = {}; }
		        prx.variables._triggerData['input[id='+_id+'-checkbox]:not(:checked)']['checkboxchange'] = { state: $(this).is(':checked') };
				if(typeof(prx.variables._triggerData['#' + _id]) == "undefined") { prx.variables._triggerData['#' + _id] = {}; }
				prx.variables._triggerData['#' + _id]['checkboxchange'] = { state: $(this).is(':checked') };
				$(this).trigger('checkboxchange');
			})
			$('#' + _id).hammer();
			prx.actions.disableFlashActionOnItemTap('#' + _id, '.flashactiontap-afterdisplay');
		}
	}
	, interactions: [
		{
			caption: 'Change',
			name: 'actions',
			type: 'action',
			value: function (item, name) {
				if (typeof(item.actions) == "undefined") {
					item.actions = [];
				}
				return item.actions.length;
			},
			changeProperty: {
				caption: 'Interactions on change',
				selector: '',
				property: 'action',
				transitionable: false,
				changeable: false
			}
		}, {
			caption: 'Activation',
			name: 'checkboxActionsOnActive',
			type: 'action',
			value: function (item, name) {
				if (typeof(item.checkboxActionsOnActive) == "undefined") {
					item.checkboxActionsOnActive = [];
				}
				return item.checkboxActionsOnActive.length;
			}
		}, {
			caption: 'Deactivation',
			name: 'checkboxActionsOnDeactive',
			type: 'action',
			value: function (item, name) {
				if (typeof(item.checkboxActionsOnDeactive) == "undefined") {
					item.checkboxActionsOnDeactive = [];
				}
				return item.checkboxActionsOnDeactive.length;
			}
		}
	]
	,mpactions: {
		specialEvents: ['checkboxchange']
	}
	,propertyGroups: [
		{
			caption: 'Style',
			properties: [
				[
					prx.commonproperties.metroBackgroundColor
					,prx.commonproperties.borderWidth
					,prx.commonproperties.metroBorderColor
				]
				,[
					{
						caption: 'Active',
						name: 'activeColor',
						proptype: 'background-color-2-active',
						type: 'combo-colorpicker',
						value: function(item,name) { return item.activeColor; },
						values: prx.comps.metroColorsLight
						,liveUpdate:'background-color'
						,changeProperty: {
							caption: 'Active color',
							property: 'background-color',
							selector: 'label span',
							transitionable: true
						}
					}
				]
			]
		},{
			caption: 'Advanced',
			properties: [
				[
					{
						caption: 'Active'
						,name: 'active'
						,type: 'onoff'
						,value: function(item,name) {
							return item.active;
						}
						,changeProperty: {
							caption: 'Active',
							rerender: true
						}
					}
				]
				,[
					{
						caption: 'Act as checkbox'
						,name: 'actAsCheckbox'
						,type: 'onoff'
						,value: function(item,name) {
							return item.actAsCheckbox;
						}
						,changeProperty: {
							caption: 'Act as checkbox',
							rerender: true
						}
					}
				]
			]
		}
	]

}

// TYPE: CHECKBOX
prx.types.metro_checkbox = {
	name: "metro_checkbox"
	,onDisplay: function(item,containerid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		var cR = '';

		var _active = "";
		if(prx.componentsHelper.getProp(item.active,'boolean')) { _active = 'checked="checked"'; }

		cR += '<div id="' + _id + '" ' + prx.items.getComponentBaseAttributes(item, containerid, symbol)  + ' class="' + prx.items.getComponentBaseClasses(item, containerid, symbol) + ' box pos type-metro-checkbox">';
		cR += '<style>';
		cR += prx.items.getComponentBaseStyle(item, containerid, symbol);
		cR += '#'+_id+' label { background-color: '+prx.componentsHelper.getProp(item.backgroundColor,'color-background')+'; border: '+prx.componentsHelper.getProp(item.borderWidth,'num-border-width')+'px solid '+prx.componentsHelper.getProp(item.borderColor,'color-border')+'; }'
		cR += '#'+_id+' label span { color: '+prx.componentsHelper.getProp(item.activeColor,'color-text')+'; font-size: '+(prx.componentsHelper.getProp(item.height,'num-other')-prx.componentsHelper.getProp(item.borderWidth,'num-border-width')*2)+'px; }'
		cR += '</style>';
		cR += prx.items.getComponentPrependDivs(item, containerid, symbol);
		cR += '<input type="checkbox" id="'+_id+'-checkbox" '+_active+' data-role="none"/>';
		cR += '<label for="'+_id+'-checkbox" class="liveUpdate-backgroundColor liveUpdate-borderColor changeProperty-backgroundColor changeProperty-borderWidth changeProperty-borderColor" data-clickable="true"><span class="liveUpdate-activeColor changeProperty-activeColor">&#10004;</span></label>';
		cR += prx.items.getComponentAppendDivs(item, containerid, symbol);
		cR += '</div>';
		return cR;
	}
	,afterDisplay: function(item,containerid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		if(!prx.editor) {
			$('#'+_id+'-checkbox').on('change.custom-change-event', function(e){
				if(typeof(prx.variables._triggerData['input:checked[id='+_id+'-checkbox]']) == "undefined") { prx.variables._triggerData['input:checked[id='+_id+'-checkbox]'] = {}; }
		        prx.variables._triggerData['input:checked[id='+_id+'-checkbox]']['checkboxchange'] = { state: $(this).is(':checked') };
		        if(typeof(prx.variables._triggerData['input[id='+_id+'-checkbox]:not(:checked)']) == "undefined") { prx.variables._triggerData['input[id='+_id+'-checkbox]:not(:checked)'] = {}; }
		        prx.variables._triggerData['input[id='+_id+'-checkbox]:not(:checked)']['checkboxchange'] = { state: $(this).is(':checked') };
				if(typeof(prx.variables._triggerData['#' + _id]) == "undefined") { prx.variables._triggerData['#' + _id] = {}; }
				prx.variables._triggerData['#' + _id]['checkboxchange'] = { state: $(this).is(':checked') };
				$(this).trigger('checkboxchange');
			})
			$('#' + _id).hammer();
			prx.actions.disableFlashActionOnItemTap('#' + _id, '.flashactiontap-afterdisplay');
		}
	}
	,onResize: function(item,containerid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		$('#'+ _id + ' span').css('font-size', (prx.componentsHelper.getProp(item.height,'num-other')-prx.componentsHelper.getProp(item.borderWidth,'num-border-width')*2) + 'px');
	}
	, interactions: [
		{
			caption: 'Change',
			name: 'actions',
			type: 'action',
			value: function (item, name) {
				if (typeof(item.actions) == "undefined") {
					item.actions = [];
				}
				return item.actions.length;
			},
			changeProperty: {
				caption: 'Interactions on change',
				selector: '',
				property: 'action',
				transitionable: false,
				changeable: false
			}
		}, {
			caption: 'Activation',
			name: 'checkboxActionsOnActive',
			type: 'action',
			value: function (item, name) {
				if (typeof(item.checkboxActionsOnActive) == "undefined") {
					item.checkboxActionsOnActive = [];
				}
				return item.checkboxActionsOnActive.length;
			}
		}, {
			caption: 'Deactivation',
			name: 'checkboxActionsOnDeactive',
			type: 'action',
			value: function (item, name) {
				if (typeof(item.checkboxActionsOnDeactive) == "undefined") {
					item.checkboxActionsOnDeactive = [];
				}
				return item.checkboxActionsOnDeactive.length;
			}
		}
	]
	,mpactions: {
		specialEvents: ['checkboxchange']
	}
	,propertyGroups: [
		{
			caption: 'Style',
			properties: [
				[
					prx.commonproperties.metroBackgroundColor
					,prx.commonproperties.borderWidth
					,prx.commonproperties.metroBorderColor

				],
				[
					{
						caption: 'Checkmark',
						name: 'activeColor',
						proptype: 'check-color',
						type: 'combo-colorpicker',
						value: function(item,name) { return item.activeColor; },
						values: prx.comps.metroColorsLight
						,liveUpdate:'color'
						,changeProperty: {
							caption: 'Checkmark color',
							property: 'color',
							selector: 'label span',
							transitionable: true
						}
					}
				]
			]
		},{
			caption: 'Advanced',
			properties: [
				[
					{
						caption: 'Active'
						,name: 'active'
						,type: 'onoff'
						,value: function(item,name) {
							return item.active;
						}
						,changeProperty: {
							caption: 'Active',
							rerender: true
						}
					}
				]
				]
		}
	]

}

// TYPE: ON OFF SWITCH
prx.types.metro_onoff = {
	name: 'metro_onoff'
	,onDisplay: function(item,containerid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		var cR = '';
		var _active = '';

		if(prx.componentsHelper.getProp(item.active,'boolean')) {
			_active = 'checked="checked"';
		}

		cR += '<div id="' + _id + '" ' + prx.items.getComponentBaseAttributes(item, containerid, symbol)  + ' class="' + prx.items.getComponentBaseClasses(item, containerid, symbol) + ' box pos type-metro-onoff">';

		cR += '<style>';
		cR += prx.items.getComponentBaseStyle(item, containerid, symbol);
		cR += '#'+_id+' label { border-color: '+prx.componentsHelper.getProp(item.borderColor,'color-border')+'; }'
		cR += '#'+_id+' .activelabel { background-color: '+prx.componentsHelper.getProp(item.activeLabelColor,'color-background')+'; }'
		cR += '#'+_id+' .inactivelabel { background-color: '+prx.componentsHelper.getProp(item.inactiveLabelColor,'color-background')+'; }'
		cR += '#'+_id+' .switch { right: '+(prx.componentsHelper.getProp(item.width,'num-other')*0.8)+'px; background-color: '+prx.componentsHelper.getProp(item.switchColor,'color-background')+'; }'
		cR += '</style>';
		cR += prx.items.getComponentPrependDivs(item, containerid, symbol);

		cR += '<input type="checkbox" '+_active+ ' id="'+_id+'-flipswitch" data-role="none" />';
		cR += '<label for="'+_id+'-flipswitch" class="liveUpdate-borderColor" data-clickable="true">';
		cR += '<div class="flipswitch-inner">'
		cR += '<span class="activelabel liveUpdate-activeLabelColor"></span>';
		cR += '<span class="inactivelabel liveUpdate-inactiveLabelColor"></span>';
		cR += '</div>';
		cR += '<span class="switch liveUpdate-switchColor"></span>';
		cR += '</label>';
		cR += prx.items.getComponentAppendDivs(item, containerid, symbol);
		cR += '</div>';
		return cR;
	}
	,afterDisplay: function(item,containerid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		if(!prx.editor) {
			$('#'+_id+'-flipswitch').on('change.custom-change-event', function(e){
				if(typeof(prx.variables._triggerData['input:checked[id='+_id+'-flipswitch]']) == "undefined") { prx.variables._triggerData['input:checked[id='+_id+'-flipswitch]'] = {}; }
		        prx.variables._triggerData['input:checked[id='+_id+'-flipswitch]']['checkboxchange'] = { state: $(this).is(':checked') };
		        if(typeof(prx.variables._triggerData['input[id='+_id+'-flipswitch]:not(:checked)']) == "undefined") { prx.variables._triggerData['input[id='+_id+'-flipswitch]:not(:checked)'] = {}; }
		        prx.variables._triggerData['input[id='+_id+'-flipswitch]:not(:checked)']['checkboxchange'] = { state: $(this).is(':checked') };
				if(typeof(prx.variables._triggerData['#' + _id]) == "undefined") { prx.variables._triggerData['#' + _id] = {}; }
				prx.variables._triggerData['#' + _id]['checkboxchange'] = { state: $(this).is(':checked') };
				$(this).trigger('checkboxchange');
			})

			$('#' + _id).hammer();
			prx.actions.disableFlashActionOnItemTap('#' + _id, '.flashactiontap-afterdisplay');

		}
	}
	,onResize: function(item,containerid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		
		$('#'+_id+' .switch').css('right', (prx.componentsHelper.getProp(item.width,'num-other')*0.8)+'px')
	}
	, interactions: [
		{
			caption: 'Change',
			name: 'actions',
			type: 'action',
			value: function (item, name) {
				if (typeof(item.actions) == "undefined") {
					item.actions = [];
				}
				return item.actions.length;
			},
			changeProperty: {
				caption: 'Interactions on change',
				selector: '',
				property: 'action',
				transitionable: false,
				changeable: false
			}
		}, {
			caption: 'Activation',
			name: 'flipswitchActionsOnActive',
			type: 'action',
			value: function (item, name) {
				if (typeof(item.flipswitchActionsOnActive) == "undefined") {
					if (typeof(item.actionsOnActive) == "undefined") {
						item.flipswitchActionsOnActive = [];
					} else {
						item.flipswitchActionsOnActive = item.actionsOnActive;
					}
				}
				return item.flipswitchActionsOnActive.length;
			}
		}, {
			caption: 'Deactivation',
			name: 'flipswitchActionsOnDeactive',
			type: 'action',
			value: function (item, name) {
				if (typeof(item.flipswitchActionsOnDeactive) == "undefined") {
					if (typeof(item.actionsOnDeactive) == "undefined") {
						item.flipswitchActionsOnDeactive = [];
					} else {
						item.flipswitchActionsOnDeactive = item.actionsOnDeactive;
					}
				}
				return item.flipswitchActionsOnDeactive.length;
			}
		}
	]
	,mpactions: {
		specialEvents: ['checkboxchange'],
	}
	,propertyGroups: [
		{
			caption: 'Style',
			properties: [
				[
					{
						caption: 'Border',
						name: 'borderColor',
						proptype: 'border-color',
						type: 'combo-colorpicker',
						value: function(item,name) { return item.borderColor; },
						values: prx.comps.metroColorsLight,
						liveUpdate: 'border-color'
						,changeProperty: {
							caption: 'Border color',
							property: 'border-color',
							selector: 'label',
							transitionable: true
						}
					}
					,{
						caption: 'Switch'
						,name: 'switchColor'
						,proptype: 'background-color-3-switch'
						,type: 'combo-colorpicker'
						,value: function(item,name) {
							return item.switchColor;
						}
						,values: prx.comps.metroColorsLight
						,liveUpdate:'background-color'
						,changeProperty: {
							caption: 'Switch color',
							property: 'background-color',
							selector: '.switch',
							transitionable: true
						}
					}
				],
				[
					{
						caption: 'Active Label'
						,name: 'activeLabelColor'
						,proptype: 'background-2-active'
						,type: 'combo-colorpicker'
						,value: function(item,name) {
							return item.activeLabelColor;
						}
						,values: prx.comps.metroColorsLight
						,liveUpdate:'background-color'
						,changeProperty: {
							caption: 'Active label color',
							property: 'background-color',
							selector: '.activelabel',
							transitionable: true
						}
					},
					{
						caption: 'Inactive Label'
						,name: 'inactiveLabelColor'
						,proptype: 'background-color'
						,type: 'combo-colorpicker'
						,value: function(item,name) {
							return item.inactiveLabelColor;
						}
						,values: prx.comps.metroColorsLight
						,liveUpdate:'background-color'
						,changeProperty: {
							caption: 'Inactive color',
							property: 'background-color',
							selector: '.inactivelabel',
							transitionable: true
						}
					}
				]
			]
		},{
			caption: 'Advanced',
			properties: [
				[
					{
						caption: 'Active'
						,name: 'active'
						,type: 'onoff'
						,value: function(item,name) {
							return item.active;
						}
						,changeProperty: {
							caption: 'Active',
							rerender: true
						}
					},
				]
			]
		}
	]

}

//TYPE: SLIDER
prx.types.metro_slider = {
	name: 'metro_slider'
	,onDisplay: function(item,containerid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		var cR = '';

		var _dims = prx.componentsHelper.getRealDims(item, symbol);

		cR += '<div id="' + _id + '" ' + prx.items.getComponentBaseAttributes(item, containerid, symbol)  + ' class="' + prx.items.getComponentBaseClasses(item, containerid, symbol) + ' box pos type-metro-slider '+((prx.componentsHelper.getProp(item.vertical,'boolean')) ? 'type-slider-vertical' : '')+'">';

		cR += '<style>';
		cR += prx.items.getComponentBaseStyle(item, containerid, symbol);

		if(Number(prx.componentsHelper.getProp(item.sliderLeft,'num-percentage')) > Number(prx.componentsHelper.getProp(item.sliderRight,'num-percentage'))) {
			var _temp = prx.componentsHelper.getProp(item.sliderLeft,'num-percentage');
			item.sliderLeft = prx.componentsHelper.getProp(item.sliderRight,'num-percentage');
			item.sliderRight = _temp;
		}

		if(prx.componentsHelper.getProp(item.vertical,'boolean')) {
			cR += '#'+_id+' .slider-bar { background-color: '+prx.componentsHelper.getProp(item.barColor,'color-background')+'; }'
			cR += '#'+_id+' .slider-bar-filled { bottom: '+prx.componentsHelper.getProp(item.sliderLeft,'num-percentage')+'%; top: '+(100-prx.componentsHelper.getProp(item.sliderRight,'num-percentage'))+'%; background-color: '+prx.componentsHelper.getProp(item.fillBarColor,'color-fill')+' }'
			cR += '#'+_id+' .slider-button { background-color: '+prx.componentsHelper.getProp(item.sliderColor,'color-switch')+'; height: '+_dims.width+'px; margin-bottom: -'+(_dims.width/2)+'px; margin-top: -'+(_dims.width/2)+'px; }'
			if(prx.editor) {
				cR += '#' + _id + ' .slider-button-max { ' + ((prx.componentsHelper.getProp(item.sliderRight,'num-percentage') == 100) ? 'top: 0;' : 'bottom: ' + prx.componentsHelper.getProp(item.sliderRight,'num-percentage') + '%;') + ' }'
				cR += '#' + _id + ' .slider-button-min { ' + ((prx.componentsHelper.getProp(item.sliderLeft,'num-percentage') == 100) ? 'top: 0;' : 'bottom: ' + prx.componentsHelper.getProp(item.sliderLeft,'num-percentage') + '%;') + ' }'
			}
		} else {
			cR += '#'+_id+' .slider-bar { background-color: '+prx.componentsHelper.getProp(item.barColor,'color-background')+';  }'
			cR += '#'+_id+' .slider-bar-filled { left: '+prx.componentsHelper.getProp(item.sliderLeft,'num-percentage')+'%; right: '+(100-prx.componentsHelper.getProp(item.sliderRight,'num-percentage'))+'%; background-color: '+prx.componentsHelper.getProp(item.fillBarColor,'color-fill')+' }'
			cR += '#'+_id+' .slider-button { background-color: '+prx.componentsHelper.getProp(item.sliderColor,'color-switch')+'; width: '+_dims.height+'px; margin-left: -'+(_dims.height/2)+'px; margin-right: -'+(_dims.height/2)+'px; }'
			if(prx.editor) {
				cR += '#' + _id + ' .slider-button-max { ' + ((item.sliderRight == 100) ? 'right: 0;' : 'left: ' + prx.componentsHelper.getProp(item.sliderRight,'num-percentage') + '%;') + ' }'
				cR += '#' + _id + ' .slider-button-min { ' + ((item.sliderLeft == 100) ? 'right: 0;' : 'left: ' + prx.componentsHelper.getProp(item.sliderLeft,'num-percentage') + '%;') + ' }'
			}
		}
		cR += '</style>';
		cR += prx.items.getComponentPrependDivs(item, containerid, symbol);

		cR += '<div class="slider-bar liveUpdate-barColor" >';
			cR += '<div class="slider-bar-filled liveUpdate-fillBarColor"></div>'
		cR += '</div>';
		if(prx.componentsHelper.getProp(item.hasRange,'boolean')) {
			cR += '<span class="slider-button slider-button-min liveUpdate-sliderColor"></span>';
		}
		cR += '<span class="slider-button slider-button-max liveUpdate-sliderColor"></span>';
		cR += prx.items.getComponentAppendDivs(item, containerid, symbol);
		cR += '</div>';
		return cR;


	}
	,onResize: function(item,containerid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		var _dims = prx.componentsHelper.getRealDims(item, symbol);
		if(item.vertical) {
			$('#'+_id+' .slider-button').css({
				height: _dims.width + 'px',
				marginBottom: '-'+(_dims.width/2)+'px'
			})
		} else {
			$('#'+_id+' .slider-button').css({
				width: _dims.height + 'px',
				marginLeft: '-'+(_dims.height/2)+'px'
			})
		}
	}
	,afterDisplay: function(item,containerid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		var _dims = prx.componentsHelper.getRealDims(item,symbol);

		if(!prx.editor) {
			if(item.hasRange) {
				if(item.vertical) {

					prx.draggable._draggables['#'+_id+' .slider-button'] = Draggable.create('#'+_id+' .slider-button', {
						type: 'y',
						bounds: { top: -(_dims.width/2), height: parseInt(_dims.height) + parseInt(_dims.width), left: 0, width: 0 },
						onDragStart: function(){
							$(this.target).parents('.box').each(function() {
		            			if(typeof(prx.scrollable._scrollables[this.id + '-inner']) != "undefined") {
		            				prx.scrollable._scrollables[this.id + '-inner'].disable();
		            			}
		            		})

		            		var _left = $('#'+_id+' .slider-button-min').position().top;
							var _right = $('#'+_id+' .slider-button-max').position().top;

							if(parseInt(_left, 10) > parseInt(_right, 10)) {
								var _temp = _left;
								_left = _right;
								_right = _temp;
							}
							var w = $('#'+_id).height();
							_left = parseInt(_left);
							_right = parseInt(_right);

							_left = 100- parseInt((_left/w)*100);
							_right = 100- parseInt((_right/w)*100);

							if(typeof(prx.variables._triggerData['#'+_id]) == "undefined") { prx.variables._triggerData['#'+_id] = {}; }
					        prx.variables._triggerData['#'+_id]['rangedragstart'] = { 'min-value': _left, 'max-value': _right };
							$('#'+_id).trigger('rangedragstart');

							// hack instead of ondrag because greensock on drag only triggers if the item has actually moved
							// so if you are at 0 or 100 it only triggers once, which results in the value not always being updated
							// because of the "actionIsRunning" check
							$(document).on('mousemove.prx-sliderdrag touchmove.prx-sliderdrag', function(){
								var _left = $('#'+_id+' .slider-button-min').position().top;
								var _right = $('#'+_id+' .slider-button-max').position().top;

								if(parseInt(_left, 10) > parseInt(_right, 10)) {
									var _temp = _left;
									_left = _right;
									_right = _temp;
								}
								$('#'+_id+' .slider-bar-filled').css({
									'top': _left+ 'px',
									'bottom': ($('#'+_id).height()-_right) + 'px'
								});

								var w = $('#'+_id).height();
								_left = parseInt(_left);
								_right = parseInt(_right);

								_left = 100- parseInt((_left/w)*100);
								_right = 100- parseInt((_right/w)*100);

								if(typeof(prx.variables._triggerData['#'+_id]) == "undefined") { prx.variables._triggerData['#'+_id] = {}; }
						        prx.variables._triggerData['#'+_id]['rangedrag'] = { 'min-value': _left, 'max-value': _right };
								$('#'+_id).trigger('rangedrag');
							})
						},
						onDragEnd: function(){

							$(document).off('mousemove.prx-sliderdrag touchmove.prx-sliderdrag');

							$(this.target).parents('.box').each(function() {
		            			if(typeof(prx.scrollable._scrollables[this.id + '-inner']) != "undefined") {
		            				prx.scrollable._scrollables[this.id + '-inner'].enable();
		            			}
		            		})

		            		var _left = $('#'+_id+' .slider-button-min').position().top;
							var _right = $('#'+_id+' .slider-button-max').position().top;

							if(parseInt(_left, 10) > parseInt(_right, 10)) {
								var _temp = _left;
								_left = _right;
								_right = _temp;
							}
							var w = $('#'+_id).height();
							_left = parseInt(_left);
							_right = parseInt(_right);

							_left = 100- parseInt((_left/w)*100);
							_right = 100- parseInt((_right/w)*100);

							if(typeof(prx.variables._triggerData['#'+_id]) == "undefined") { prx.variables._triggerData['#'+_id] = {}; }
					        prx.variables._triggerData['#'+_id]['rangedragend'] = { 'min-value': _left, 'max-value': _right };
							$('#'+_id).trigger('rangedragend');
						}
					});

					TweenLite.set('#'+_id+' .slider-button-min',{y:((_dims.height)*((100-parseInt(item.sliderLeft))*0.01))});
					TweenLite.set('#'+_id+' .slider-button-max',{y:((_dims.height)*((100-parseInt(item.sliderRight))*0.01))});

				} else {
					prx.draggable._draggables['#'+_id+' .slider-button'] = Draggable.create('#'+_id+' .slider-button', {
						type: 'x',
						bounds: { left: -(_dims.height/2), width: parseInt(_dims.width) + parseInt(_dims.height), top: 0, height: 0 },
						onDragStart: function(){
							$(this.target).parents('.box').each(function() {
		            			if(typeof(prx.scrollable._scrollables[this.id + '-inner']) != "undefined") {
		            				prx.scrollable._scrollables[this.id + '-inner'].disable();
		            			}
		            		})

		            		var _left = $('#'+_id+' .slider-button-min').position().left;
							var _right = $('#'+_id+' .slider-button-max').position().left;

							if(parseInt(_left, 10) > parseInt(_right, 10)) {
								var _temp = _left;
								_left = _right;
								_right = _temp;
							}
							var w = $('#'+_id).width();
							_left = parseInt(_left);
							_right = parseInt(_right);

							_left = parseInt((_left/w)*100);
							_right = parseInt((_right/w)*100);

							if(typeof(prx.variables._triggerData['#'+_id]) == "undefined") { prx.variables._triggerData['#'+_id] = {}; }
					        prx.variables._triggerData['#'+_id]['rangedragstart'] = { 'min-value': _left, 'max-value': _right };
							$('#'+_id).trigger('rangedragstart');

							// hack instead of ondrag because greensock on drag only triggers if the item has actually moved
							// so if you are at 0 or 100 it only triggers once, which results in the value not always being updated
							// because of the "actionIsRunning" check
							$(document).on('mousemove.prx-sliderdrag touchmove.prx-sliderdrag', function(){
								var _left = $('#'+_id+' .slider-button-min').position().left;
								var _right = $('#'+_id+' .slider-button-max').position().left;

								if(parseInt(_left, 10) > parseInt(_right, 10)) {
									var _temp = _left;
									_left = _right;
									_right = _temp;
								}
								$('#'+_id+' .slider-bar-filled').css({
									'left': _left+ 'px',
									'right': ($('#'+_id).width()-_right) + 'px'
								});

								var w = $('#'+_id).width();
								_left = parseInt(_left);
								_right = parseInt(_right);

								_left = parseInt((_left/w)*100);
								_right = parseInt((_right/w)*100);

								if(typeof(prx.variables._triggerData['#'+_id]) == "undefined") { prx.variables._triggerData['#'+_id] = {}; }
						        prx.variables._triggerData['#'+_id]['rangedrag'] = { 'min-value': _left, 'max-value': _right };
								$('#'+_id).trigger('rangedrag');
							})
						},
						onDragEnd: function(){

							$(document).off('mousemove.prx-sliderdrag touchmove.prx-sliderdrag');

							$(this.target).parents('.box').each(function() {
		            			if(typeof(prx.scrollable._scrollables[this.id + '-inner']) != "undefined") {
		            				prx.scrollable._scrollables[this.id + '-inner'].enable();
		            			}
		            		})

		            		var _left = $('#'+_id+' .slider-button-min').position().left;
							var _right = $('#'+_id+' .slider-button-max').position().left;

							if(parseInt(_left, 10) > parseInt(_right, 10)) {
								var _temp = _left;
								_left = _right;
								_right = _temp;
							}
							var w = $('#'+_id).width();
							_left = parseInt(_left);
							_right = parseInt(_right);

							_left = parseInt((_left/w)*100);
							_right = parseInt((_right/w)*100);

							if(typeof(prx.variables._triggerData['#'+_id]) == "undefined") { prx.variables._triggerData['#'+_id] = {}; }
					        prx.variables._triggerData['#'+_id]['rangedragend'] = { 'min-value': _left, 'max-value': _right };
							$('#'+_id).trigger('rangedragend');
						}
					});

					TweenLite.set('#'+_id+' .slider-button-min',{x:((_dims.width)*((item.sliderLeft*0.01)))});
					TweenLite.set('#'+_id+' .slider-button-max',{x:((_dims.width)*((item.sliderRight*0.01)))});
					/*
					$('#'+_id+' .slider-button').draggable({
						axis: 'x',
						containment: $('#'+_id)
						,start: function(e, ui) {
							var _left = $(this).hasClass('slider-button-min') ? ui.position.left : $('#'+_id+' .slider-button-min').css('left');
							var _right = $(this).hasClass('slider-button-max') ? ui.position.left : $('#'+_id+' .slider-button-max').css('left');

							if(parseInt(_left, 10) > parseInt(_right, 10)) {
								var _temp = _left;
								_left = _right;
								_right = _temp;
							}
							var w = $('#'+_id).width();
							_left = parseInt(_left);
							_right = parseInt(_right);

							_left = parseInt((_left/w)*100);
							_right = parseInt((_right/w)*100);

							if(typeof(prx.variables._triggerData['#'+_id]) == "undefined") { prx.variables._triggerData['#'+_id] = {}; }
					        prx.variables._triggerData['#'+_id]['rangedragstart'] = { 'min-value': _left, 'max-value': _right };
							$('#'+_id).trigger('rangedragstart');
						}
						,drag: function(e, ui) {
							var _left = $(this).hasClass('slider-button-min') ? ui.position.left : $('#'+_id+' .slider-button-min').css('left');
							var _right = $(this).hasClass('slider-button-max') ? ui.position.left : $('#'+_id+' .slider-button-max').css('left');

							if(parseInt(_left, 10) > parseInt(_right, 10)) {
								var _temp = _left;
								_left = _right;
								_right = _temp;
							}
							$('#'+_id+' .slider-bar-filled').css({
								'left': _left+ 'px',
								'right': ($('#'+_id).width()-_right) + 'px'
							});

							var w = $('#'+_id).width();
							_left = parseInt(_left);
							_right = parseInt(_right);

							_left = parseInt((_left/w)*100);
							_right = parseInt((_right/w)*100);

							if(typeof(prx.variables._triggerData['#'+_id]) == "undefined") { prx.variables._triggerData['#'+_id] = {}; }
					        prx.variables._triggerData['#'+_id]['rangedrag'] = { 'min-value': _left, 'max-value': _right };
							$('#'+_id).trigger('rangedrag');
						}
						,stop: function(e, ui) {
							var _left = $(this).hasClass('slider-button-min') ? ui.position.left : $('#'+_id+' .slider-button-min').css('left');
							var _right = $(this).hasClass('slider-button-max') ? ui.position.left : $('#'+_id+' .slider-button-max').css('left');

							if(parseInt(_left, 10) > parseInt(_right, 10)) {
								var _temp = _left;
								_left = _right;
								_right = _temp;
							}
							var w = $('#'+_id).width();
							_left = parseInt(_left);
							_right = parseInt(_right);

							_left = parseInt((_left/w)*100);
							_right = parseInt((_right/w)*100);

							if(typeof(prx.variables._triggerData['#'+_id]) == "undefined") { prx.variables._triggerData['#'+_id] = {}; }
					        prx.variables._triggerData['#'+_id]['rangedragend'] = { 'min-value': _left, 'max-value': _right };
							$('#'+_id).trigger('rangedragend');
						}
					})
					*/
				}
			} else {
				if(item.vertical) {
					prx.draggable._draggables['#'+_id+' .slider-button'] = Draggable.create('#'+_id+' .slider-button', {
						type: 'y',
						bounds: { top: -(_dims.width/2), height: parseInt(_dims.height) + parseInt(_dims.width), left: 0, width: 0 },
						onDragStart: function(){
							$(this.target).parents('.box').each(function() {
		            			if(typeof(prx.scrollable._scrollables[this.id + '-inner']) != "undefined") {
		            				prx.scrollable._scrollables[this.id + '-inner'].disable();
		            			}
		            		})

		            		var pos = this.y - this.minY;
							var height = this.maxY - this.minY;

		            		var progress = 100 - Math.ceil((pos / height)*100)

							if(typeof(prx.variables._triggerData['#'+_id]) == "undefined") { prx.variables._triggerData['#'+_id] = {}; }
					        prx.variables._triggerData['#'+_id]['sliderdragstart'] = { value: progress };
							$('#'+_id).trigger('sliderdragstart');

							// hack instead of ondrag because greensock on drag only triggers if the item has actually moved
							// so if you are at 0 or 100 it only triggers once, which results in the value not always being updated
							// because of the "actionIsRunning" check
							$(document).on('mousemove.prx-sliderdrag touchmove.prx-sliderdrag', function(){
								var pos = $('#' + _id + ' .slider-button').position().top;
								var height = $('#' + _id).height();

								$('#'+_id+' .slider-bar-filled').css({
									'top': pos + 'px',
									'height': height - pos + 'px'
								});
								var progress = 100 - Math.ceil((pos / height)*100)

								if(typeof(prx.variables._triggerData['#'+_id]) == "undefined") { prx.variables._triggerData['#'+_id] = {}; }
						        prx.variables._triggerData['#'+_id]['sliderdrag'] = { value: progress };
								$('#'+_id).trigger('sliderdrag');
							})
						},
						onDragEnd: function(){

							$(document).off('mousemove.prx-sliderdrag touchmove.prx-sliderdrag');

							$(this.target).parents('.box').each(function() {
		            			if(typeof(prx.scrollable._scrollables[this.id + '-inner']) != "undefined") {
		            				prx.scrollable._scrollables[this.id + '-inner'].enable();
		            			}
		            		})

		            		var pos = this.y - this.minY;
							var height = this.maxY - this.minY;

							var progress = 100 - Math.ceil((pos / height)*100)

							if(typeof(prx.variables._triggerData['#'+_id]) == "undefined") { prx.variables._triggerData['#'+_id] = {}; }
					        prx.variables._triggerData['#'+_id]['sliderdragend'] = { value: progress };
							$('#'+_id).trigger('sliderdragend');
						}
					});
					
					TweenLite.set('#'+_id+' .slider-button',{y:((_dims.height)*(((100-parseInt(item.sliderRight))*0.01)))});

					$('#'+_id+' .slider-bar').hammer().on('click', function(e){
						var _pos = e.pageY - $(this).offset().top;

						var progress = 100 - Math.ceil((_pos / $('#'+_id).height())*100)

						TweenLite.to($('#'+_id+' .slider-bar-filled'), 1, {height: _dims.height - _pos, top: _dims.height - (_dims.height - _pos)});
						TweenLite.to($('#'+_id+' .slider-button'), 1, {y:_pos});

						//$(this).find('.slider-bar-filled').css({ top: _pos + 'px' });
						//$(this).siblings('.slider-button').css({ top: _pos + 'px' });
						
						prx.draggable._draggables['#'+_id+' .slider-button'][0].update();

						if(typeof(prx.variables._triggerData['#'+_id]) == "undefined") { prx.variables._triggerData['#'+_id] = {}; }

						prx.variables._triggerData['#'+_id]['sliderdragstart'] = { value: progress };
						prx.variables._triggerData['#'+_id]['sliderdrag'] = { value: progress };
						prx.variables._triggerData['#'+_id]['sliderdragend'] = { value: progress };
						$('#'+_id).trigger('sliderdragstart');
						$('#'+_id).trigger('sliderdrag');
						$('#'+_id).trigger('sliderdragend');
					});
					prx.actions.disableFlashActionOnItemTap('#' + _id + ' .slider-bar', '.flashactiontap-afterdisplay');
				} else {

					prx.draggable._draggables['#'+_id+' .slider-button'] = Draggable.create('#'+_id+' .slider-button', {
						type: 'x',
						bounds: { left: -(_dims.height/2), width: parseInt(_dims.width) + parseInt(_dims.height), top: 0, height: 0 },
						onDragStart: function(){

							$(this.target).parents('.box').each(function() {
		            			if(typeof(prx.scrollable._scrollables[this.id + '-inner']) != "undefined") {
		            				prx.scrollable._scrollables[this.id + '-inner'].disable();
		            			}
		            		})

		            		var pos = this.x - this.minX;
							var width = this.maxX - this.minX;

		            		var progress = Math.ceil((pos / width)*100)

							if(typeof(prx.variables._triggerData['#'+_id]) == "undefined") { prx.variables._triggerData['#'+_id] = {}; }
					        prx.variables._triggerData['#'+_id]['sliderdragstart'] = { value: progress };
							$('#'+_id).trigger('sliderdragstart');

							// hack instead of ondrag because greensock on drag only triggers if the item has actually moved
							// so if you are at 0 or 100 it only triggers once, which results in the value not always being updated
							// because of the "actionIsRunning" check
							$(document).on('mousemove.prx-sliderdrag touchmove.prx-sliderdrag', function(){
								var pos = $('#' + _id + ' .slider-button').position().left;
								var width = $('#' + _id).width();

								$('#'+_id+' .slider-bar-filled').width(pos);
								var progress = Math.ceil((pos / width)*100)

								if(typeof(prx.variables._triggerData['#'+_id]) == "undefined") { prx.variables._triggerData['#'+_id] = {}; }
						        prx.variables._triggerData['#'+_id]['sliderdrag'] = { value: progress };
								$('#'+_id).trigger('sliderdrag');
							})
						},
						onDragEnd: function(){

							$(document).off('mousemove.prx-sliderdrag touchmove.prx-sliderdrag');

							$(this.target).parents('.box').each(function() {
		            			if(typeof(prx.scrollable._scrollables[this.id + '-inner']) != "undefined") {
		            				prx.scrollable._scrollables[this.id + '-inner'].enable();
		            			}
		            		})

		            		var pos = this.x - this.minX;
							var width = this.maxX - this.minX;

							var progress = Math.ceil((pos / width)*100)

							if(typeof(prx.variables._triggerData['#'+_id]) == "undefined") { prx.variables._triggerData['#'+_id] = {}; }
					        prx.variables._triggerData['#'+_id]['sliderdragend'] = { value: progress };
							$('#'+_id).trigger('sliderdragend');
						}
					});

					TweenLite.set('#'+_id+' .slider-button',{x:((_dims.width)*(item.sliderRight*0.01))});

					$('#'+_id+' .slider-bar').hammer().on('mousedown touchstart', function(e){
						var _pos = e.pageX - $(this).offset().left;

						var progress = Math.ceil((_pos / $('#'+_id).width())*100)

						TweenLite.to($('#'+_id+' .slider-bar-filled'), 1, {width:_pos});
						TweenLite.to($('#'+_id+' .slider-button'), 1, {x:_pos});

						//$(this).find('.slider-bar-filled').width(_pos);
						//$(this).siblings('.slider-button').css({ left: _pos + 'px' });
						
						//prx.draggable._draggables['#'+_id+' .slider-button'][0].update();

						if(typeof(prx.variables._triggerData['#'+_id]) == "undefined") { prx.variables._triggerData['#'+_id] = {}; }

						prx.variables._triggerData['#'+_id]['sliderdragstart'] = { value: progress };
						prx.variables._triggerData['#'+_id]['sliderdrag'] = { value: progress };
						prx.variables._triggerData['#'+_id]['sliderdragend'] = { value: progress };
						$('#'+_id).trigger('sliderdragstart');
						$('#'+_id).trigger('sliderdrag');
						$('#'+_id).trigger('sliderdragend');
					});
					prx.actions.disableFlashActionOnItemTap('#' + _id + ' .slider-bar', '.flashactiontap-afterdisplay');
				}
			}
		}
	}
	,interactions: [ prx.commonproperties.actions ]
	,mpactions: {
		specialEvents: ['sliderdragstart','sliderdrag','sliderdragend']
	}
	,propertyGroups: [
		{
			caption: 'Style',
			properties: [
				[
					{
						caption: 'Background'
						,name: 'barColor'
						,proptype: 'background-color'
						,type: 'combo-colorpicker'
						,value: function(item,name) {
							return item.barColor;
						}
						,values: prx.comps.metroColorsLight
						,liveUpdate:'background-color'
						,changeProperty: {
							caption: 'Background color',
							property: 'background-color',
							selector: '.slider-bar',
							transitionable: true
						}
					},
					{
						caption: 'Fill Color'
						,name: 'fillBarColor'
						,proptype: 'background-color-2-fill'
						,type: 'combo-colorpicker'
						,value: function(item,name) {
							return item.fillBarColor;
						}
						,values: prx.comps.metroColorsLight
						,liveUpdate:'background-color'
						,changeProperty: {
							caption: 'Fill color',
							property: 'background-color',
							selector: '.slider-bar-filled',
							transitionable: true
						}
					}
				]
			]
		},
		{
			caption: 'Handle',
			properties: [
				[
					{
						caption: 'Color'
						,name: 'sliderColor'
						,proptype: 'background-color-3-slider'
						,type: 'combo-colorpicker'
						,value: function(item,name) {
							return item.sliderColor;
						}
						,values: prx.comps.metroColorsLight
						,liveUpdate:'background-color'
						,changeProperty: {
							caption: 'Handle color',
							property: 'background-color',
							selector: '.slider-button',
							transitionable: true
						}
					},
					{
						caption: 'Position (%)'
						,name: 'sliderRight'
						,type: 'combo-select'
						,value: function(item,name) {
							return item.sliderRight;
						}
						,values: { min: 0, max: 100, step: 10 }
						,changeProperty: {
							caption: 'Position',
							rerender: true
						}
					}
				],[
					{
						caption: 'Min (%)'
						,name: 'sliderLeft'
						,type: 'combo-select'
						,value: function(item,name) {
							return item.sliderLeft;
						}
						,values: { min: 0, max: 100, step: 10 }
						,hiddenByDefault: function(item) {
							return (item.type=="metro_slider");
						}
						,changeProperty: {
							caption: 'Min position',
							rerender: true
						}
					}
				]
			]
		},{
			caption: 'Advanced',
			properties: [
				[
					{
						caption: 'Vertical'
						,name: 'vertical'
						,type: 'onoff'
						,value: function(item,name) {
							if(typeof(item.vertical) == "undefined") { return false; }
							return item.vertical;
						}
						,onChange: function(item){
							var _dims = prx.componentsHelper.getRealDims(item);

							item.height = _dims.width;
							item.width = _dims.height;
							item.htype = 'fixed';
							item.wtype = 'fixed';

							return item;
						}
						,changeProperty: {
							caption: 'Vertical',
							rerender: true
						}
					}
				]
			]
		}
	]

}

/* TYPE = RANGE */
prx.types.metro_range = prx.componentsHelper.cloneobject(prx.types.metro_slider);
prx.types.metro_range.name = 'metro_range';
prx.types.metro_range.propertyGroups[1].properties[1].push(prx.types.metro_range.propertyGroups[1].properties[0].pop()) // move sliderLeft below
prx.types.metro_range.propertyGroups = prx.componentsHelper.editProperty(prx.types.metro_range.propertyGroups, 'sliderRight', 'caption', 'Max (%)');
prx.types.metro_range.propertyGroups = prx.componentsHelper.editProperty(prx.types.metro_range.propertyGroups, 'sliderRight', 'changeProperty', {  caption: 'Max Position', rerender: true });
prx.types.metro_range.propertyGroups = prx.componentsHelper.editProperty(prx.types.metro_range.propertyGroups, 'sliderRight', 'changeProperty', {  caption: 'Max Position', rerender: true });
prx.types.metro_range.mpactions = { specialEvents: ['rangedragstart', 'rangedrag', 'rangedragend'] }


//TYPE: PROGRESS
prx.types.metro_progress = {
	name: 'metro_progress'
	,onDisplay: function(item,containerid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		var cR = '';


		cR += '<div id="' + _id + '" ' + prx.items.getComponentBaseAttributes(item, containerid, symbol)  + ' class="' + prx.items.getComponentBaseClasses(item, containerid, symbol) + ' box pos type-metro-progress liveUpdate-barColor">';
		cR += '<style>';
		cR += prx.items.getComponentBaseStyle(item, containerid, symbol);
		cR += '#'+_id+' { background-color: '+prx.componentsHelper.getProp(item.barColor,'color-background')+';  }'
		cR += '#'+_id+' .slider-bar-filled { right: '+(100-prx.componentsHelper.getProp(item.progress,'num-percentage'))+'%; background-color: '+prx.componentsHelper.getProp(item.fillBarColor,'color-fill')+' }'
		cR += '</style>';
		cR += prx.items.getComponentPrependDivs(item, containerid, symbol);
		cR += '<div class="slider-bar-filled liveUpdate-fillBarColor"></div>';
		cR += prx.items.getComponentAppendDivs(item, containerid, symbol);
		cR += '</div>';
		return cR;
	}
	,propertyGroups: [
		{
			caption: 'Style',
			properties: [
				[
					{
						caption: 'Background'
						,name: 'barColor'
						,proptype: 'background-color'
						,type: 'combo-colorpicker'
						,value: function(item,name) {
							return item.barColor;
						}
						,values: prx.comps.metroColorsLight
						,liveUpdate:'background-color'
						,changeProperty: {
							caption: 'Background',
							property: 'background-color',
							selector: '',
							transitionable: true
						}
					},
					{
						caption: 'Fill Color'
						,name: 'fillBarColor'
						,proptype: 'background-color-2-fill'
						,type: 'combo-colorpicker'
						,value: function(item,name) {
							return item.fillBarColor;
						}
						,values: prx.comps.metroColorsLight
						,liveUpdate:'background-color'
						,changeProperty: {
							caption: 'Fill color',
							property: 'background-color',
							selector: '.slider-bar-filled',
							transitionable: true
						}
					}
				],[
					{
						caption: 'Progress (%)'
						,name: 'progress'
						,type: 'combo-select'
						,value: function(item,name) {
							return item.progress;
						}
						,values: { min: 0, max: 100, step: 10 }
						,changeProperty: {
							caption: 'Progress',
							rerender: true
						}
					}
				]
			]
		}
	]

}

//TYPE: SELECT
prx.types.metro_select = {
	name: "metro_select"
	,onDisplay: function(item,containerid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		var _props = (typeof(prx.richtext)=='undefined') ? prx.componentsHelper.getProp(item.textProperties,'props-text') : '';

		var cR = "";
		var _checked = '';
		var _dims = prx.componentsHelper.getRealDims(item, symbol)

		cR += '<div id="' + _id + '" ' + prx.items.getComponentBaseAttributes(item, containerid, symbol)  + ' class="' + prx.items.getComponentBaseClasses(item, containerid, symbol) + ' box pos type-metro-select liveUpdate-textColor">';

		cR += '<style>';
		cR += prx.items.getComponentBaseStyle(item, containerid, symbol);
		cR += '#'+_id+' { '+prx.componentsHelper.getProp(item.textFont,'font-family')+' '+_props+' color: '+prx.componentsHelper.getProp(item.textColor,'color-text')+'; font-size: '+prx.componentsHelper.getProp(item.textSize,'num-text-size')+'px; }';
		cR += '#'+_id+' .dropdown-trigger { line-height: '+(_dims.height-prx.componentsHelper.getProp(item.borderWidth,'num-border-width')*2)+'px; }'
		cR += '#'+_id+' .dropdown-trigger, #'+_id+' .metro-dropdown-contextmenu { border: '+prx.componentsHelper.getProp(item.borderWidth,'num-border-width')+'px solid '+prx.componentsHelper.getProp(item.borderColor,'color-border')+'; background-color: '+prx.componentsHelper.getProp(item.backgroundColor,'color-background')+'; }';
		cR += '#'+_id+' .dropdown-trigger-icon { width: '+_dims.height+'px; background-image: url('+prx.componentsHelper.getProp(item.buttonicon,'asset')+'); line-height: '+(prx.componentsHelper.getProp(item.height,'num-other')-prx.componentsHelper.getProp(item.borderWidth,'num-border-width')*2)+'px; }';
		cR += '</style>';
		cR += prx.items.getComponentPrependDivs(item, containerid, symbol);

		cR += '<div class="dropdown-trigger liveUpdate-borderColor liveUpdate-backgroundColor changeProperty-backgroundColor changeProperty-textColor changeProperty-textSize changeProperty-textFont">'
		cR += '<span class="metro-dropdown-active-value">';
		cR += (typeof(item.buttons[item.selected]) != "undefined") ? prx.componentsHelper.getProp(item.buttons[item.selected].text,'text-textarea') : ((typeof(item.buttons[0]) != "undefined") ? prx.componentsHelper.getProp(item.buttons[0].text,'text-textarea') : '');
		cR += '</span>';
		cR += '<div class="dropdown-trigger-icon"></div>'
		cR += '</div>'
		cR += '<div class="metro-dropdown-contextmenu liveUpdate-backgroundColor liveUpdate-borderColor">'
		$.each(item.buttons, function(i,elm){
			cR += '<div class="metro-dropdown-item dynamic-property" data-dynamic-property-index="'+i+'" id="'+_id+'-buttons-'+i+'">';
			cR += '<div class="error-msg"><span data-editableproperty="text" data-dynamic-property-index="'+i+'">'+prx.componentsHelper.getProp(elm.text,'text-textarea')+'</span></div>'

			cR += '</div>';
		});
		cR += '</div>';
		cR += prx.items.getComponentAppendDivs(item, containerid, symbol);
		cR += '</div>';
		return cR;
	}
	,onResize: function(item,containerid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		
		$('#'+_id+' .dropdown-trigger').css('line-height', prx.componentsHelper.getProp(item.height,'num-other')-prx.componentsHelper.getProp(item.borderWidth,'num-border-width')*2 + 'px')
	}
	,afterDisplay: function(item,containerid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		if(!prx.editor) {
			$('#'+_id+' .dropdown-trigger').hammer({ domEvents: false }).on('tap',function(){
				$('#'+_id+' .metro-dropdown-contextmenu').toggle();
			});

			$('#'+_id+' .metro-dropdown-item').hammer().on('tap', function(){
				$('#'+_id+' .metro-dropdown-contextmenu').hide();
				$('#'+_id+' .metro-dropdown-item').removeClass('active');
				$(this).addClass('active');
				$('#'+_id+' .metro-dropdown-active-value').text($(this).text());
			})

			prx.actions.disableFlashActionOnItemTap('#' + _id + ' .dropdown-trigger', '.flashactiontap-afterdisplay');
			prx.actions.disableFlashActionOnItemTap('#' + _id + ' .metro-dropdown-item', '.flashactiontap-afterdisplay');

		}
	}

	,propertyGroups: [
			{
			caption: 'Style',
			properties: [
				[
					prx.commonproperties.metroBackgroundColor
					,prx.commonproperties.borderWidth
					,prx.commonproperties.metroBorderColor
				]
				,
				[
						{
		      				caption: 'Dropdown Icon'
		      				,name: 'buttonicon'
		      				,type: 'combo-asset'
		      				,displayValue: function(item,name) {
		      					if(item.buttonicon.fileId == '') {
		  							return 'No icon selected';
		  						}
		  						return item.buttonicon.name;
		      				}
		      				,value: function(item,name) {
		      					return JSON.stringify({
		      						allow: 'image',
		      						asset: item.buttonicon
		      					});
		      				}
		      				,changeProperty: {
								caption: 'Dropdown icon',
								rerender: true
							}
		      			}
				]
			]
		},
		{
			caption: 'Text',
			properties: [
				[
					prx.commonproperties.textFontRichText('font-family',['text', 'buttons.text'])
					,prx.commonproperties.textSizeRichText('font-size',['text', 'buttons.text'])
					,prx.commonproperties.metroTextColorRichText('color',['text', 'buttons.text'])
				],[
					prx.commonproperties.textPropertiesRichText(['font-weight','font-style','text-decoration'],['text', 'buttons.text'])
				]
			]
		},{
			caption: 'Advanced',
			properties: [
				[
					{
		      			caption: 'Active option'
		      			,name: 'selected'
		      			,type: 'select'
		      			,value: function(item,name) {
	              			return item.selected;
	              		}
	              		,values: function(item,name) {
	              			var _rA = [];
	              			for (var n = 0; n < item.buttons.length; n++) {
	              				_rA.push({value: n,displayValue: item.buttons[n].text});
	              			}
	              			return _rA;
	              		}
	              		,changeProperty: {
							caption: 'Active option',
							rerender: true
						}
	      			}
				]
			]
		}
	]

    ,dynamicProperties: {
 		data: 'buttons'
 		,propertyCaption: 'Menu items'
 		,propertyName: 'Menu item'
 		,addCaption: 'Add menu item'
 		,deleteCaption: 'Delete'
 		,blankItem: {
 			text: 'Label',
 			actions: []
 		}
 		,captionProperty: 'text'

 		,editableProperties:[
			{
				caption: 'Text'
				,name: 'text'
				,type: 'input'
				,value: function(item,name,index) {
					return item.buttons[index].text;
				}
				,liveUpdate:'color'
				,onChange: function(item, index, val){
					if(item.selected == index) {
						$('#' + item.id).find('.metro-dropdown-active-value').html(val);
					}
				}
				,changeProperty: {
					caption: 'Text',
					rerender: true
				}
			}
      	]
 		,interactions:	[ prx.commonproperties.actions_buttons ]
 		,propertyGroups: [
			{
				caption: '',
				properties: [
					[

					]
				]
			}
		]

	}
};





/************************************************************************************************/
/************************************* COMPONENTS (OBJECTS) *************************************/
/************************************************************************************************/



/****** COMMON UI ELEMENTS ******/

//TYPE: BUTTON
prx.components.metro_button = {
    name: 'metro_button'
    ,type: 'metro_button'
    ,lib: _library
    ,caption: 'Button'
    ,icon: '0 -700px'
    ,helper: prx.url.devices+ _path + 'button/helper.png'
    ,width: 180*prx.componentsHelper.getScale(_library)
    ,height: 40*prx.componentsHelper.getScale(_library)
    ,resizable : true
    ,backgroundColor: '2E8DEF'
    ,text: 'Button'
    ,textFont: 'Segoe UI, sans-serif'
    ,textSize: 18*prx.componentsHelper.getScale(_library)
    ,textColor:  'ffffff'
    ,textProperties: []
    ,textAlign: 'center'
    ,borderWidth: 0*prx.componentsHelper.getScale(_library)
    ,borderColor: '000000'
    ,actions: []
};

//TYPE: METRO ICON
prx.components.metro_icon = {
    name: 'metro_icon'
    ,type: 'metro_icon'
    ,lib: _library
    ,caption: 'Metro Icon'
    ,icon: '-100px -700px'
    ,helper: prx.url.devices+ _path + 'icon/helper.png'
    ,width: 52*prx.componentsHelper.getScale(_library)
    ,height: 52*prx.componentsHelper.getScale(_library)
    ,resizable : true
    ,imgSrc: {"fileId":"00504290a98dbf36106eeaed5981be95.svg","name":"arrow-left.svg","assetType":"icon","bucketsource":"static","url":"f1352971179296/236eefe213c7ed2f639e557cd5f21c2c.svg"}
    ,backgroundColor: 'ffffff'
    ,borderWidth: 2*prx.componentsHelper.getScale(_library)
    ,borderColor: '000000'
    ,actions: []
};

//TYPE: BADGE
prx.components.metro_badge = {
    name: 'metro_badge'
    ,type: 'metro_badge'
    ,lib: _library
    ,caption: 'Badge'
    ,icon: '-200px -700px'
    ,helper: prx.url.devices+ _path + 'badge/helper.png'
    ,width: 30*prx.componentsHelper.getScale(_library)
    ,height: 30*prx.componentsHelper.getScale(_library)
    ,resizable : true
    ,textFont: 'Segoe UI, sans-serif'
    ,textColor:  'FFFFFF'
    ,textSize: 12*prx.componentsHelper.getScale(_library)
    ,backgroundColor: '2E8DEF'
    ,badgeType: 'glyph'
    ,badgeGlyph: {"fileId":"3c594f0941cb2b444135a2ba3bb518d3.png","assetType":"gallery","bucketsource":"static","name":" badge-alert.png", "url":"f1353071109935/0df0359e1e29e56cd4a29a7dbe3dbde0.png"}
    ,badgeNumber: '3'
    ,actions: []
};

//TYPE: USER TILE
prx.components.metro_tile_user = {
    name: 'metro_tile_user'
    ,type: 'metro_tile_user'
    ,lib: _library
    ,caption: 'User Tile'
    ,icon: '-300px -700px'
    ,helper: prx.url.devices+ _path + 'tileuser/helper.png'
    ,width: 120*prx.componentsHelper.getScale(_library)
    ,height: 50*prx.componentsHelper.getScale(_library)
    ,resizable : true
    ,textColor:  'FFFFFF'
    ,username: 'John'
    ,surname: "Smith"
    ,imgSrc: {"fileId":"d895dfbae1165e530658e11f649bc02c.png","assetType":"gallery","bucketsource":"static","name":" avatar_male.png","url":"f1353077251107/fb6f0d79ca71fc442563cdb95fa60eb6.png"}
    ,actions: []
};

//TYPE: SYSTEM INFO TILE
prx.components.metro_tile_systeminfo = {
    name: 'metro_tile_systeminfo'
    ,type: 'metro_tile_systeminfo'
    ,lib: _library
    ,caption: 'System Info Tile'
    ,icon: '-400px -700px'
    ,helper: prx.url.devices+ _path + 'tilesysteminfo/helper.png'
    ,width: 390*prx.componentsHelper.getScale(_library)
    ,height: 95*prx.componentsHelper.getScale(_library)
    ,resizable : false
    ,properties: "v,l,hpos,vpos,o"
};



/****** TILES ******/

//TYPE: PLAIN TILE
prx.components.metro_tile_plain = {
    name: 'metro_tile_plain'
    ,type: 'metro_tile_plain'
    ,lib: _library
    ,caption: 'Plain Tile'
    ,icon: '-500px -700px'
    ,helper: prx.url.devices+ _path + 'tileplain/helper.png'
    ,width: 150*prx.componentsHelper.getScale(_library)
    ,height: 150*prx.componentsHelper.getScale(_library)
    ,resizable : true
    ,backgroundColor: '2E8DEF'
    ,actions: []
};

//TYPE: ICON TILE
prx.components.metro_tile_icon = {
    name: 'metro_tile_icon'
    ,type: 'metro_tile_icon'
    ,lib: _library
    ,caption: 'Icon Tile'
    ,icon: '-600px -700px'
    ,helper: prx.url.devices+ _path + 'tileicon/helper.png'
    ,width: 150*prx.componentsHelper.getScale(_library)
    ,height: 150*prx.componentsHelper.getScale(_library)
    ,resizable : true
    ,textFont: 'Segoe UI, sans-serif'
    ,textColor:  'FFFFFF'
    ,textSize: 12*prx.componentsHelper.getScale(_library)
    ,backgroundColor: '2E8DEF'
    ,brandingType: 'text'
    ,brandingIcon: {"fileId":"04b27f56e3cbdeedfafcf2b349de07f9.svg","name":"mail-2.svg","assetType":"icon","bucketsource":"static","url":"f1352971179296/1b58b288e91e6a4cb64d90433880003d.svg","targetSrc":"generated/1b58b288e91e6a4cb64d90433880003d_ffffff.svg","color":"ffffff"}
    ,brandingText: 'Mail'
    ,badgeType: 'number'
    ,badgeGlyph: {"fileId":"d311aa8526f596520241cdfd4e090ecb.png","assetType":"gallery","bucketsource":"static","name":" badge-newMessage.png","url":"f1353071109935/88deee4d28179e49e038783033ed73b0.png"}
    ,badgeNumber: '3'
    ,imgSrc: {"fileId":"04b27f56e3cbdeedfafcf2b349de07f9.svg","name":"mail-2.svg","assetType":"icon","bucketsource":"static","url":"f1352971179296/1b58b288e91e6a4cb64d90433880003d.svg","targetSrc":"generated/1b58b288e91e6a4cb64d90433880003d_ffffff.svg","color":"ffffff"}
    ,actions: []
};

//TYPE: IMAGE TILE
prx.components.metro_tile_image = {
    name: 'metro_tile_image'
    ,type: 'metro_tile_image'
    ,lib: _library
    ,caption: 'Image Tile'
    ,icon: '-700px -700px'
    ,helper: prx.url.devices+ _path + 'tileimage/helper.png'
    ,width: 150*prx.componentsHelper.getScale(_library)
    ,height: 150*prx.componentsHelper.getScale(_library)
    ,resizable : true
    ,withCaption: false
    ,textFont: 'Segoe UI, sans-serif'
    ,textColor:  'FFFFFF'
    ,textSize: 12*prx.componentsHelper.getScale(_library)
    ,badgeBackgroundColor: '2E8DEF'
    ,brandingType: 'icon'
    ,brandingIcon: {"fileId":"75fec5a7b0919fd87bcf4c194a104eab.svg","name":"frame.svg","assetType":"icon","bucketsource":"static","url":"f1352971179296/3fa204d622e47622df7e2b761bb85dca.svg","targetSrc":"generated/3fa204d622e47622df7e2b761bb85dca_ffffff.svg","color":"ffffff"}
    ,brandingText: 'Photos'
    ,badgeType: 'number'
    ,badgeGlyph: {"fileId":"3c594f0941cb2b444135a2ba3bb518d3.png","assetType":"gallery","bucketsource":"static","name":" badge-alert.png", "url":"f1353071109935/0df0359e1e29e56cd4a29a7dbe3dbde0.png"}
    ,badgeNumber: '3'
    ,imgSrc: {"fileId":"d9ea5b0ee0bb73bcff03a5a422d041ad.png","assetType":"gallery","bucketsource":"static","name":" france_small.png","url":"f1353077251107/551415c9b2e615f3c977bb9d3b86b459.png"}
    ,actions: []
    ,text: ''
};

//TYPE: IMAGE TILE WITH CAPTION
prx.components.metro_tile_image_withcaption = {
    name: 'metro_tile_image_withcaption'
    ,type: 'metro_tile_image_withcaption'
    ,lib: _library
    ,caption: 'Image Tile with Caption'
    ,icon: '-800px -700px'
    ,helper: prx.url.devices+ _path + 'tileimagecaption/helper.png'
    ,width: 300*prx.componentsHelper.getScale(_library)
    ,height: 150*prx.componentsHelper.getScale(_library)
    ,resizable : true
    ,withCaption: true
    ,textFont: 'Segoe UI, sans-serif'
    ,textColor:  'FFFFFF'
    ,textSize: 12*prx.componentsHelper.getScale(_library)
    ,badgeBackgroundColor: '2E8DEF'
    ,brandingType: 'icon'
    ,brandingIcon: {"fileId":"75fec5a7b0919fd87bcf4c194a104eab.svg","name":"frame.svg","assetType":"icon","bucketsource":"static","url":"f1352971179296/3fa204d622e47622df7e2b761bb85dca.svg","targetSrc":"generated/3fa204d622e47622df7e2b761bb85dca_ffffff.svg","color":"ffffff"}
    ,brandingText: 'Photos'
    ,badgeType: 'number'
    ,badgeGlyph: {"fileId":"9f065e5ae4665c4dd793933712f71580.png","assetType":"gallery","bucketsource":"static","name":" badge-activity.png", "url":"f1353071109935/848405975a129f2d10a7c592f6c6fac4.png"}
    ,badgeNumber: '3'
    ,imgSrc: {"fileId":"79ffd8dc05ecd6bbb5ae08a5d42ba361.png","assetType":"gallery","bucketsource":"static","name":" holland_medium.png","url":"f1353077251107/6aba11b952b9587a079206610d238ba5.png"}
    ,actions: []
    ,text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...'
};

//TYPE: TEXT TILE
prx.components.metro_tile_text = {
    name: 'metro_tile_text'
    ,type: 'metro_tile_text'
    ,lib: _library
    ,caption: 'Text Tile'
    ,icon: '-900px -700px'
    ,helper: prx.url.devices+ _path + 'tiletext/helper.png'
    ,width: 300*prx.componentsHelper.getScale(_library)
    ,height: 150*prx.componentsHelper.getScale(_library)
    ,resizable : true
    ,textFont: 'Segoe UI, sans-serif'
    ,textColor:  'FFFFFF'
    ,textSize: 14*prx.componentsHelper.getScale(_library)
    ,title: 'Lorem ipsum'
    ,text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    ,backgroundColor: '2E8DEF'
    ,brandingType: 'text'
    ,brandingIcon: {"fileId":"e55334acc02f524531f172be5348bfd2.svg","name":"mail-2.svg","assetType":"icon","bucketsource":"static","url":"f1352971179296/1b58b288e91e6a4cb64d90433880003d.svg","targetSrc":"generated/1b58b288e91e6a4cb64d90433880003d_ffffff.svg","color":"ffffff"}
    ,brandingText: 'Mail'
    ,badgeType: 'number'
    ,badgeGlyph: {"fileId":"d311aa8526f596520241cdfd4e090ecb.png","assetType":"gallery","bucketsource":"static","name":" badge-newMessage.png", "url":"f1353071109935/88deee4d28179e49e038783033ed73b0.png"}
    ,badgeNumber: '3'
    ,imgSrc: {"fileId":"d895dfbae1165e530658e11f649bc02c.png","assetType":"gallery","bucketsource":"static","name":" avatar_male.png","url":"f1353077251107/fb6f0d79ca71fc442563cdb95fa60eb6.png"}
    ,actions: []
};



/****** MENUS ******/

//TYPE: APP BAR
prx.components.metro_appbar = {
    name: 'metro_appbar'
    ,type: 'metro_appbar'
    ,lib: _library
    ,caption: 'App bar'
    ,icon: '-1000px -700px'
    ,helper: prx.url.devices+ _path + 'appbar/helper.png'
    ,width: "full"
    ,height: 75*prx.componentsHelper.getScale(_library)
    ,resizable : true
    ,resizeHandles : "e,w"
    ,properties: "v,l,hpos,vpos,w,o,r"
    ,backgroundColor: '000000'
    ,textFont: 'Segoe UI, sans-serif'
    ,textSize: 12*prx.componentsHelper.getScale(_library)
    ,textColor:  'ffffff'
    ,textProperties: []
    ,borderWidth: 2*prx.componentsHelper.getScale(_library)
    ,borderColor: 'ffffff'
    ,buttons: [
        {
            type: 'left',
            text: 'Add',
            icon: {"fileId":"ca9dcf4b01dcc486670521a08df504e0.svg","name":"plus.svg","assetType":"icon","bucketsource":"static","url":"f1352971179296/558b9ee9b4a9123e4df38f815f297650.svg","targetSrc":"generated/558b9ee9b4a9123e4df38f815f297650_ffffff.svg","color":"ffffff"},
            actions: []
        },
        {
            type: 'left',
            text: 'Remove',
            icon: {"fileId":"d3e07ee951f464c9d25769937988b9b8.svg","name":"multiple.svg","assetType":"icon","bucketsource":"static","url":"f1352971179296/ec70725d4155e1ba3455d4d289f5095d.svg","targetSrc":"generated/ec70725d4155e1ba3455d4d289f5095d_ffffff.svg","color":"ffffff"},
            actions: []
        },
        {
            type: 'separator',
            text: 'Command',
            icon: {"fileId":"","name":"","assetType":"icon","url":""},
            actions: []
        },
        {
            type: 'left',
            text: 'Edit',
            icon: {"fileId":"8786290497c7a4da2e37e68b79c1a107.svg","name":"pencil-2.svg","assetType":"icon","bucketsource":"static","url":"f1352971179296/628ae57d0a80d8053e1b7b5a416f6e1c.svg","targetSrc":"generated/628ae57d0a80d8053e1b7b5a416f6e1c_ffffff.svg","color":"ffffff"},
            actions: []
        },
        {
            type: 'right',
            text: 'Share',
            icon: {"fileId":"a0a404a2ffed48b9280c569bbd5fa335.svg","name":"share.svg","assetType":"icon","bucketsource":"static","url":"f1352971179296/27c2c4b562453f70d3bb24b45fa2ac17.svg","targetSrc":"generated/27c2c4b562453f70d3bb24b45fa2ac17_ffffff.svg","color":"ffffff"},
            actions: []
        }


    ]
};

//TYPE: MINI APP BAR
prx.components.metro_appbar_mini = {
    name: 'metro_appbar_mini'
    ,type: 'metro_appbar_mini'
    ,lib: _library
    ,caption: 'Mini App bar'
    ,icon: '-1100px -700px'
    ,helper: prx.url.devices+ _path + 'miniappbar/helper.png'
    ,width: "full"
    ,height: 72*prx.componentsHelper.getScale(_library)
    ,resizable : true
    ,backgroundColor: '666666'
    ,borderWidth: 2*prx.componentsHelper.getScale(_library)
    ,borderColor: 'ffffff'
    ,buttons: [
        {
            icon: {"fileId":"24ba15d6600898b19f36e32c16c2728d.svg","name":"plus.svg","assetType":"icon","bucketsource":"static","url":"f1352971179296/558b9ee9b4a9123e4df38f815f297650.svg","targetSrc":"generated/558b9ee9b4a9123e4df38f815f297650_ffffff.svg","color":"ffffff"},
            actions: []
        },
        {
            icon: {"fileId":"d3e07ee951f464c9d25769937988b9b8.svg","name":"multiple.svg","assetType":"icon","bucketsource":"static","url":"f1352971179296/ec70725d4155e1ba3455d4d289f5095d.svg","targetSrc":"generated/ec70725d4155e1ba3455d4d289f5095d_ffffff.svg","color":"ffffff"},
            actions: []
        },
        {
            icon: {"fileId":"8786290497c7a4da2e37e68b79c1a107.svg","name":"pencil-2.svg","assetType":"icon","bucketsource":"static","url":"f1352971179296/628ae57d0a80d8053e1b7b5a416f6e1c.svg","targetSrc":"generated/628ae57d0a80d8053e1b7b5a416f6e1c_ffffff.svg","color":"ffffff"},
            actions: []
        }
    ]
};

//TYPE: CHARMS BAR
prx.components.metro_charms = {
    name: 'metro_charms'
    ,type: 'metro_charms'
    ,lib: _library
    ,caption: 'Charms bar'
    ,icon: '-1200px -700px'
    ,helper: prx.url.devices+ _path + 'charms/helper.png'
    ,width: 80*prx.componentsHelper.getScale(_library)
    ,height: 600*prx.componentsHelper.getScale(_library)
    ,resizable : true
    ,backgroundColor: '000000'
    ,textFont: 'Segoe UI, sans-serif'
    ,textSize: 16*prx.componentsHelper.getScale(_library)
    ,textColor:  'ffffff'
    ,textProperties: []
    ,buttons: [
        {
            text: 'Search',
            icon: {"fileId":"4bc5b9fe2b6722d8992c1c9d7cd8e2c4.svg","name":"search.svg","assetType":"icon","bucketsource":"static","url":"f1352971179296/14870b88002e540a4d1fc9c2d2a88384.svg","targetSrc":"generated/14870b88002e540a4d1fc9c2d2a88384_ffffff.svg","color":"ffffff"},
            actions: []
        },
        {
            text: 'Share',
            icon: {"fileId":"9a330ff50c728f1b170d92428807a163.svg","name":"share.svg","assetType":"icon","bucketsource":"static","url":"f1352971179296/27c2c4b562453f70d3bb24b45fa2ac17.svg","targetSrc":"generated/27c2c4b562453f70d3bb24b45fa2ac17_ffffff.svg","color":"ffffff"},
            actions: []
        },
        {
            text: 'Start',
            icon: {"fileId":"3537b2cdc35b06853710ca0564926ad1.svg","name":"windows.svg","assetType":"icon","bucketsource":"static","url":"f1352448186701/e866888848a0638bf09d9b996fffcb7b.svg","targetSrc":"generated/e866888848a0638bf09d9b996fffcb7b_44c7f4.svg","color":"44c7f4"},
            actions: []
        },
        {
            text: 'Devices',
            icon: {"fileId":"044708650ea671d90a5cd3d464705867.svg","name":"Layer_94.svg","assetType":"icon","bucketsource":"static","url":"f1352390541338/2ec8b40e9bfec30ebf4659897efee76a.svg","targetSrc":"generated/2ec8b40e9bfec30ebf4659897efee76a_ffffff.svg","color":"ffffff"},
            actions: []
        },
        {
            text: 'Settings',
            icon: {"fileId":"89f3edd886a51e40bd8bf965e94b28fc.svg","name":"kub-cog.svg","assetType":"icon","bucketsource":"static","url":"f1352449307873/41654279111e3116c43f33141fcb92da.svg","targetSrc":"generated/41654279111e3116c43f33141fcb92da_ffffff.svg","color":"ffffff"},
            actions: []
        }


    ]
};

//TYPE: FILTERS
prx.components.metro_filters = {
    name: 'metro_filters'
    ,type: 'metro_filters'
    ,lib: _library
    ,caption: 'Filters'
    ,icon: '-1300px -700px'
    ,helper: prx.url.devices+ _path + 'filters/helper.png'
    ,width: 200*prx.componentsHelper.getScale(_library)
    ,height: 25*prx.componentsHelper.getScale(_library)
    ,resizable : true
    ,textFont: 'Segoe UI, sans-serif'
    ,textSize: 16*prx.componentsHelper.getScale(_library)
    ,textColor:  '000000'
    ,textProperties: []
    ,activeTextColor:  '2E8DEF'
    ,activeTextProperties: []
    ,selected: 0
    ,buttons: [
        {
            text: 'All',
            actions: []
        },
        {
            text: 'Movies',
            actions: []
        },
        {
            text: 'TV',
            actions: []
        },
        {
            text: 'Other',
            actions: []
        }
    ]
};

//TYPE: CONTEXT MENU
prx.components.metro_contextmenu = {
    name: 'metro_contextmenu'
    ,type: 'metro_contextmenu'
    ,lib: _library
    ,caption: 'Context Menu'
    ,icon: '-1400px -700px'
    ,helper: prx.url.devices+ _path + 'contextmenu/helper.png'
    ,width: 120*prx.componentsHelper.getScale(_library)
    ,height: 85*prx.componentsHelper.getScale(_library)
    ,resizable : true
    ,backgroundColor: 'ffffff'
    ,borderWidth: 2*prx.componentsHelper.getScale(_library)
    ,borderColor: 'cccccc'
    ,textFont: 'Segoe UI, sans-serif'
    ,textSize: 16*prx.componentsHelper.getScale(_library)
    ,textColor:  '2E8DEF'
    ,textProperties: []
    ,textAlign: 'left'
    ,buttons: [
        {
            text: 'Cut',
            actions: []
        },
        {
            text: 'Copy',
            actions: []
        },
        {
            text: 'Paste',
            actions: []
        }
    ]
};

//TYPE: DROPDOWN
prx.components.metro_dropdown = {
    name: 'metro_dropdown'
    ,type: 'metro_dropdown'
    ,lib: _library
    ,caption: 'Dropdown'
    ,icon: '-1500px -700px'
    ,helper: prx.url.devices+ _path + 'dropdown/helper.png'
    ,width: 140*prx.componentsHelper.getScale(_library)
    ,height: 40*prx.componentsHelper.getScale(_library)
    ,resizable : true
    ,withSelection: false
    ,text: 'Sort'
    ,textFont: 'Segoe UI, sans-serif'
    ,textSize: 24*prx.componentsHelper.getScale(_library)
    ,textColor:  '999999'
    ,textProperties: []
    ,backgroundColor: 'ffffff'
    ,borderWidth: 2*prx.componentsHelper.getScale(_library)
    ,borderColor: 'cccccc'
    ,dropdownTextFont: 'Segoe UI, sans-serif'
    ,dropdownTextSize: 16*prx.componentsHelper.getScale(_library)
    ,dropdownTextColor:  '999999'
    ,dropdownTextProperties: []
    ,dropdownTextAlign: 'left'
    ,buttonicon: {"fileId":"88d43ebb6ca1e6b85623f383eb29dabf.svg","name":"chevron-down.svg","assetType":"icon","bucketsource":"static","url":"f1352971179296/a97800f958248dbb65c1b7a2f9257bac.svg","targetSrc":"generated/a97800f958248dbb65c1b7a2f9257bac_999999.svg","color":"999999"}
    ,buttons: [
        {
            text: 'Name',
            actions: []
        },
        {
            text: 'Date',
            actions: []
        },
        {
            text: 'File size',
            actions: []
        }
    ]
};

//TYPE: DROPDOWN WITH VALUE
prx.components.metro_dropdown_withselection = {
    name: 'metro_dropdown_withselection'
    ,type: 'metro_dropdown_withselection'
    ,lib: _library
    ,caption: 'Dropdown with value'
    ,icon: '-1600px -700px'
    ,helper: prx.url.devices+ _path + 'dropdown_withselection/helper.png'
    ,width: 200*prx.componentsHelper.getScale(_library)
    ,height: 40*prx.componentsHelper.getScale(_library)
    ,resizable : true
    ,withSelection: true
    ,text: 'Sort by:'
    ,textFont: 'Segoe UI, sans-serif'
    ,textSize: 24*prx.componentsHelper.getScale(_library)
    ,textColor:  '999999'
    ,textProperties: []
    ,backgroundColor: 'ffffff'
    ,borderWidth: 2*prx.componentsHelper.getScale(_library)
    ,borderColor: 'cccccc'
    ,dropdownTextFont: 'Segoe UI, sans-serif'
    ,dropdownTextSize: 16*prx.componentsHelper.getScale(_library)
    ,dropdownTextColor:  '999999'
    ,dropdownTextProperties: []
    ,dropdownTextAlign: 'left'
    ,activeTextColor:  '2E8DEF'
    ,activeTextProperties: []
    ,selected: 0
    ,buttonicon: {"fileId":"88d43ebb6ca1e6b85623f383eb29dabf.svg","name":"chevron-down.svg","assetType":"icon","bucketsource":"static","url":"f1352971179296/a97800f958248dbb65c1b7a2f9257bac.svg","targetSrc":"generated/a97800f958248dbb65c1b7a2f9257bac_999999.svg","color":"999999"}
    ,buttons: [
        {
            text: 'Name',
            actions: []
        },
        {
            text: 'Date',
            actions: []
        },
        {
            text: 'File size',
            actions: []
        }
    ]
};



/****** FORMS ******/

//TYPE: TEXT FIELD
prx.components.metro_textfield = {
    name: 'metro_textfield'
    ,type: 'metro_textfield'
    ,lib: _library
    ,caption: 'Text Field'
    ,icon: '-1700px -700px'
    ,helper: prx.url.devices+ _path + 'textfield/helper.png'
    ,width: 300*prx.componentsHelper.getScale(_library)
    ,height: 30*prx.componentsHelper.getScale(_library)
    ,value: ''
    ,placeholder: 'Placeholder'
    ,inputtype: 'text'
    ,textFont: 'Segoe UI, sans-serif'
    ,textSize: 14*prx.componentsHelper.getScale(_library)
    ,textColor:  '333333'
    ,placeholderColor: '999999'
    ,borderWidth: 2*prx.componentsHelper.getScale(_library)
    ,borderColor: 'CCCCCC'
    ,backgroundColor: 'FFFFFF'
    ,textAlign: 'left'
};

//TYPE: PASSWORD FIELD
prx.components.metro_passwordfield = {
    name: 'metro_passwordfield'
    ,type: 'metro_textfield'
    ,lib: _library
    ,caption: 'Password Field'
    ,icon: '-1800px -700px'
    ,helper: prx.url.devices+ _path + 'passwordfield/helper.png'
    ,width: 300*prx.componentsHelper.getScale(_library)
    ,height: 30*prx.componentsHelper.getScale(_library)
    ,value: ''
    ,placeholder: 'Placeholder'
    ,inputtype: 'password'
    ,textFont: 'Segoe UI, sans-serif'
    ,textSize: 14*prx.componentsHelper.getScale(_library)
    ,textColor:  '333333'
    ,placeholderColor: '999999'
    ,borderWidth: 2*prx.componentsHelper.getScale(_library)
    ,borderColor: 'CCCCCC'
    ,backgroundColor: 'FFFFFF'
    ,textAlign: 'left'
};

//TYPE: TEXTAREA
prx.components.metro_textarea = {
    name: 'metro_textarea'
    ,type: 'metro_textarea'
    ,lib: _library
    ,caption: 'Textarea'
    ,icon: '-1900px -700px'
    ,helper: prx.url.devices+ _path + 'textarea/helper.png'
    ,width: 300*prx.componentsHelper.getScale(_library)
    ,height: 140*prx.componentsHelper.getScale(_library)
    ,value: ''
    ,placeholder: 'Placeholder'
    ,textFont: 'Segoe UI, sans-serif'
    ,textSize: 14*prx.componentsHelper.getScale(_library)
    ,textColor:  '333333'
    ,placeholderColor: '999999'
    ,borderWidth: 2*prx.componentsHelper.getScale(_library)
    ,borderColor: 'CCCCCC'
    ,backgroundColor: 'FFFFFF'
    ,textAlign: 'left'
};

//TYPE: SELECT
prx.components.metro_select = {
    name: 'metro_select'
    ,type: 'metro_select'
    ,lib: _library
    ,caption: 'Select'
    ,icon: '0 -800px'
    ,helper: prx.url.devices+ _path + 'select/helper.png'
    ,width: 300*prx.componentsHelper.getScale(_library)
    ,height: 30*prx.componentsHelper.getScale(_library)
    ,resizable : true
    ,withSelection: true
    ,text: 'Sort by:'
    ,textFont: 'Segoe UI, sans-serif'
    ,textSize: 14*prx.componentsHelper.getScale(_library)
    ,textColor:  '999999'
    ,textProperties: []
    ,backgroundColor: 'ffffff'
    ,borderWidth: 2*prx.componentsHelper.getScale(_library)
    ,borderColor: 'cccccc'
    ,selected: 0
    ,buttonicon: {"fileId":"88d43ebb6ca1e6b85623f383eb29dabf.svg","name":"chevron-down.svg","assetType":"icon","bucketsource":"static","url":"f1352971179296/a97800f958248dbb65c1b7a2f9257bac.svg","targetSrc":"generated/a97800f958248dbb65c1b7a2f9257bac_999999.svg","color":"999999"}
    ,buttons: [
        {
            text: 'Name',
            actions: []
        },
        {
            text: 'Date',
            actions: []
        },
        {
            text: 'File size',
            actions: []
        }
    ]
};

//TYPE: RADIO
prx.components.metro_radiobutton = {
    name: 'metro_radiobutton'
    ,type: 'metro_radiobutton'
    ,lib: _library
    ,caption: 'Radio Button'
    ,icon: '-100px -800px'
    ,helper: prx.url.devices+ _path + 'radiobutton/helper.png'
    ,width: 20*prx.componentsHelper.getScale(_library)
    ,height: 20*prx.componentsHelper.getScale(_library)
    ,resizable : true
    ,backgroundColor: 'none'
    ,borderColor: '999999'
    ,borderWidth: 2*prx.componentsHelper.getScale(_library)
    ,activeColor: '000000'
    ,active: true
    ,actAsCheckbox: true
    ,checkboxActionsOnActive: []
    ,checkboxActionsOnDeactive: []
};

//TYPE: CHECKBOX
prx.components.metro_checkbox = {
    name: 'metro_checkbox'
    ,type: 'metro_checkbox'
    ,lib: _library
    ,caption: 'Checkbox'
    ,icon: '-200px -800px'
    ,helper: prx.url.devices+ _path + 'checkbox/helper.png'
    ,width: 20*prx.componentsHelper.getScale(_library)
    ,height: 20*prx.componentsHelper.getScale(_library)
    ,resizable : true
    ,backgroundColor: 'none'
    ,borderWidth: 2*prx.componentsHelper.getScale(_library)
    ,borderColor: '999999'
    ,activeColor: '000000'
    ,active: true
    ,checkboxActionsOnActive: []
    ,checkboxActionsOnDeactive: []
};

//TYPE: ON/OFF SWITCH
prx.components.metro_onoff = {
    name: 'metro_onoff'
    ,type: 'metro_onoff'
    ,lib: _library
    ,caption: 'On/Off Switch'
    ,icon: '-300px -800px'
    ,helper: prx.url.devices+_path + 'onoff/helper.png'
    ,width: 90*prx.componentsHelper.getScale(_library)
    ,height: 30*prx.componentsHelper.getScale(_library)
    ,resizable : true
    ,switchColor: '000000'
    ,activeLabelColor: '2E8DEF'
    ,inactiveLabelColor: 'CCCCCC'
    ,borderColor: '999999'
    ,active: true
    ,flipswitchActionsOnActive: []
    ,flipswitchActionsOnDeactive: []
};

//TYPE: SLIDER
prx.components.metro_slider = {
    name: 'metro_slider'
    ,type: 'metro_slider'
    ,lib: _library
    ,caption: 'Slider'
    ,icon: '-400px -800px'
    ,helper: prx.url.devices+_path + 'slider/helper.png'
    ,width: 300*prx.componentsHelper.getScale(_library)
    ,height: 10*prx.componentsHelper.getScale(_library)
    ,resizable : true
    ,hasRange: false
    ,sliderColor: 'FFFFFF'
    ,barColor: '999999'
    ,fillBarColor: '2E8DEF'
    ,sliderLeft: 0
    ,sliderRight: 70
    ,vertical: false
    ,properties: "v,l,o,hpos,vpos,w,h"
};

//TYPE: RANGE
prx.components.metro_range = {
    name: 'metro_range'
    ,type: 'metro_range'
    ,lib: _library
    ,caption: 'Range'
    ,icon: '-500px -800px'
    ,helper: prx.url.devices+_path + 'range/helper.png'
    ,width: 300*prx.componentsHelper.getScale(_library)
    ,height: 10*prx.componentsHelper.getScale(_library)
    ,resizable : true
    ,hasRange: true
    ,sliderColor: 'FFFFFF'
    ,barColor: '999999'
    ,fillBarColor: '2E8DEF'
    ,sliderLeft: 30
    ,sliderRight: 70
    ,vertical: false
    ,properties: "v,l,o,hpos,vpos,w,h"
};

//TYPE: PROGRESS
prx.components.metro_progress = {
    name: 'metro_progress'
    ,type: 'metro_progress'
    ,lib: _library
    ,caption: 'Progress'
    ,icon: '-600px -800px'
    ,helper: prx.url.devices+_path + 'progress/helper.png'
    ,width: 300*prx.componentsHelper.getScale(_library)
    ,height: 10*prx.componentsHelper.getScale(_library)
    ,resizable : true
    ,barColor: 'CCCCCC'
    ,fillBarColor: '2E8DEF'
    ,progress: 70
};



/****** NOTIFICATIONS ******/

//TYPE: MESSAGE DIALOG
prx.components.metro_dialog = {
	name: 'metro_dialog'
	,type: 'metro_dialog'
	,lib: _library
	,caption: 'Message Dialog'
    ,icon: '-700px -800px'
	,helper: prx.url.devices+ _path + 'dialog/helper.png'
	,width: "full"
	,height: 260*prx.componentsHelper.getScale(_library)
	,resizable : true
	,alertType: 'dialog'
	,title: 'Are you sure?'
	,text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
	,textFont: 'Segoe UI, sans-serif'
	,textSize: 16*prx.componentsHelper.getScale(_library)
	,textColor:  'FFFFFF'
	,textProperties: []
	,textAlign: 'left'
	,backgroundColor: '000000'
	,buttonBorderWidth: 2*prx.componentsHelper.getScale(_library)
	,buttonBorderColor: 'ffffff'
	,buttonBackgroundColor: '2E8DEF'
	,buttonTextColor:  'ffffff'
	,buttons: [
		{
	    	text: 'Cancel, go back',
	    	actions: []
	    },
		{
	    	text: 'Yes, close',
	    	actions: []
		}
    ]
};

//TYPE: FLYOUT
prx.components.metro_flyout = {
    name: 'metro_flyout'
    ,type: 'metro_dialog'
    ,lib: _library
    ,caption: 'Flyout'
    ,icon: '-800px -800px'
    ,helper: prx.url.devices+ _path + 'flyout/helper.png'
    ,width: 230*prx.componentsHelper.getScale(_library)
    ,height: 170*prx.componentsHelper.getScale(_library)
    ,resizable : true
    ,alertType: 'flyout'
    ,title: ''
    ,text: 'Are you sure you want to leave? You will lose any unsaved data.'
    ,textFont: 'Segoe UI, sans-serif'
    ,textSize: 16*prx.componentsHelper.getScale(_library)
    ,textColor:  '000000'
    ,textProperties: []
    ,textAlign: 'center'
    ,backgroundColor: 'ffffff'
    ,buttonBorderWidth: 2*prx.componentsHelper.getScale(_library)
    ,buttonBorderColor: '000000'
    ,buttonBackgroundColor: '2E8DEF'
    ,buttonTextColor:  'ffffff'
    ,buttons: [
        {
            text: 'No',
            actions: []
        },
        {
            text: 'Yes',
            actions: []
        }
    ]
};

//TYPE: WARNING BAR
prx.components.metro_warningbar = {
	name: 'metro_warningbar'
	,type: 'metro_warningbar'
	,lib: _library
	,caption: 'Warning bar'
    ,icon: '-900px -800px'
	,helper: prx.url.devices+ _path + 'warningbar/helper.png'
	,width: "full"
	,height: 80*prx.componentsHelper.getScale(_library)
	,resizable : true
	,alertType: 'warningbar'
	,title: ''
	,text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.'
	,textFont: 'Segoe UI, sans-serif'
	,textSize: 16*prx.componentsHelper.getScale(_library)
	,textColor:  'FFFFFF'
	,textProperties: []
	,textAlign: 'left'
	,backgroundColor: '2E8DEF'
	,buttonBorderWidth: 2*prx.componentsHelper.getScale(_library)
	,buttonBorderColor: 'ffffff'
	,buttonBackgroundColor: '2E8DEF'
	,buttonTextColor:  'ffffff'
	,buttons: [
		{
	    	text: 'Go',
	    	actions: []
		},
		{
	    	text: 'Close',
	    	actions: []
		}
    ]
};

//TYPE: MINI TOAST
prx.components.metro_toast_mini = {
	name: 'metro_toast_mini'
	,type: 'metro_toast_mini'
	,lib: _library
	,caption: 'Mini Toast'
    ,icon: '-1000px -800px'
	,helper: prx.url.devices+ _path + 'toastmini/helper.png'
	,width: "full"
	,height: 30*prx.componentsHelper.getScale(_library)
	,resizable : true
	,title: 'New message from John'
	,text: "What's up?"
	,textFont: 'Segoe UI, sans-serif'
	,textSize: 12*prx.componentsHelper.getScale(_library)
	,textColor:  'FFFFFF'
	,backgroundColor: '2E8DEF'
	,imgSrc: {"fileId":"04b27f56e3cbdeedfafcf2b349de07f9.svg","name":"mail-2.svg","assetType":"icon","bucketsource":"static","url":"f1352971179296/1b58b288e91e6a4cb64d90433880003d.svg","targetSrc":"generated/1b58b288e91e6a4cb64d90433880003d_ffffff.svg","color":"ffffff"}
	,actions: []
};

//TYPE: TOAST
prx.components.metro_toast = {
	name: 'metro_toast'
	,type: 'metro_toast'
	,lib: _library
	,caption: 'Toast'
    ,icon: '-1100px -800px'
	,helper: prx.url.devices+ _path + 'toast/helper.png'
	,width: 400*prx.componentsHelper.getScale(_library)
	,height: 120*prx.componentsHelper.getScale(_library)
	,resizable : true
	,title: 'Lorem ipsum dolor sit amet'
	,text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
	,textFont: 'Segoe UI, sans-serif'
	,textSize: 13*prx.componentsHelper.getScale(_library)
	,textColor:  'FFFFFF'
	,backgroundColor: '2E8DEF'
	,imgSrc: {"fileId":"04b27f56e3cbdeedfafcf2b349de07f9.svg","name":"mail-2.svg","assetType":"icon","bucketsource":"static","url":"f1352971179296/1b58b288e91e6a4cb64d90433880003d.svg","targetSrc":"generated/1b58b288e91e6a4cb64d90433880003d_ffffff.svg","color":"ffffff"}
	,thumb: {"fileId":"d895dfbae1165e530658e11f649bc02c.png","assetType":"gallery","bucketsource":"static","name":" avatar_male.png","url":"f1353077251107/fb6f0d79ca71fc442563cdb95fa60eb6.png"}
	,actions: []
};