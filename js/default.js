(function(){
	'use strict';
	
	/**
	 массив данных
	*/
	var data = [
		{
			text: 'Text 1',
			list: [
				{
					text: 'Text 1.1',
					list: [
						{
							text: 'Text 1.1.1',
							href: 'http://www.google.com'					
						},
						{
							text: 'Text 1.1.2',
							href: 'http://www.google.com'					
						},
						{
							text: 'Text 1.1.3',
							href: 'http://www.google.com'					
						}
					]			
				},
				{
					text: 'Text 1.2',
					list: [
						{
							text: 'Text 1.2.1',
							href: 'http://www.google.com'					
						},
						{
							text: 'Text 1.2.2',
							href: 'http://www.google.com'					
						},
						{
							text: 'Text 1.2.3',
							href: 'http://www.google.com'					
						}
					]					
				},
				{
					text: 'Text 1.3',
					list: [
						{
							text: 'Text 1.3.1',
							href: 'http://www.google.com'					
						},
						{
							text: 'Text 1.3.2',
							href: 'http://www.google.com'					
						},
						{
							text: 'Text 1.3.3',
							href: 'http://www.google.com'					
						}
					]							
				}
			]
		},
		{
			text: 'Text 2',
			list: [
				{
					text: 'Text 2.1',
					list: [
						{
							text: 'Text 2.1.1',
							href: 'http://www.google.com'					
						},
						{
							text: 'Text 2.1.2',
							href: 'http://www.google.com'					
						},
						{
							text: 'Text 2.1.3',
							href: 'http://www.google.com'					
						}
					]							
				},
				{
					text: 'Text 2.2',
					list: [
						{
							text: 'Text 2.2.1',
							href: 'http://www.google.com'					
						},
						{
							text: 'Text 2.2.2',
							href: 'http://www.google.com'					
						},
						{
							text: 'Text 2.2.3',
							href: 'http://www.google.com'					
						}
					]							
				},
				{
					text: 'Text 2.3',
					list: [
						{
							text: 'Text 2.3.1',
							href: 'http://www.google.com'					
						},
						{
							text: 'Text 2.3.2',
							href: 'http://www.google.com'					
						},
						{
							text: 'Text 2.3.3',
							href: 'http://www.google.com'					
						}
					]							
				}
			]
		},
		{
			text: 'Text 3',
			list: [
				{
					text: 'Text 3.1',
					list: [
						{
							text: 'Text 3.1.1',
							href: 'http://www.google.com'					
						},
						{
							text: 'Text 3.1.2',
							href: 'http://www.google.com'					
						},
						{
							text: 'Text 3.1.3',
							href: 'http://www.google.com'					
						}
					]							
				},
				{
					text: 'Text 3.2',
					list: [
						{
							text: 'Text 3.2.1',
							href: 'http://www.google.com'					
						},
						{
							text: 'Text 3.2.2',
							href: 'http://www.google.com'					
						},
						{
							text: 'Text 3.2.3',
							href: 'http://www.google.com'					
						}
					]							
				},
				{
					text: 'Text 3.3',
					list: [
						{
							text: 'Text 3.3.1',
							href: 'http://www.google.com'					
						},
						{
							text: 'Text 3.3.2',
							href: 'http://www.google.com'					
						},
						{
							text: 'Text 3.3.3',
							href: 'http://www.google.com'					
						}
					]							
				}	
			]
		}
	];
	
	/**
	* создать HTML  меню
	* arr - получает ассоциативный массив с данными
	* возвращает HTML, соответствующий этому массиву
	*/
	var initMenu = function(arr){
	
		var html='';
		
		//открываем UL для всего подменю
		html += '<ul class="sub-menu">';
		for(var i=0; i<arr.length; i++){
			
			//создаем каждый пункт подменю: <li...>... </li>
			html += '<li class="sub-menu-li">';			
			
			//если есть вложенное подменю, то вызываем рекурсивно initMenu
			if(arr[i].list){
				
				//<div>название подменю</div> 
				html += '<div class="text">' + arr[i].text + '</div>';
				
				//вызвать рекурсивно следующий уровень 
				html += initMenu(arr[i].list);
			}
			//если не создержит более подменю, то просто печатаем ссылку
			else{
				//напечатать ссылку
				html += '<a href="' + arr[i].href + '">' + arr[i].text + '</a>';
			}
			html += '</li>';
		}
		
		//закрываем UL (подменю)
		html += '</ul>';
		
		return html;	
	};
	
	/**
	* определить события в меню
	*/
	var initEvents = function(){
	
		//добавить обработчик события click для всех элементов с классом text
		$('.text').on('click', function(){ 
			
			var $subMenu = $(this).next('ul'), //указатель на подменю
				isVisible = $subMenu.is(':visible'); //видно ли подменю?
			
			//закрыть все подменю
			$('.sub-menu .sub-menu').hide();
			
			//удалить класс active
			$('.text').removeClass('active');
			
			//показать также всю его ветку
			$subMenu.parents('.sub-menu').show();
			
			//показать подменю если оно было спрятано ранее
			if(!isVisible){
			
				//показать само подменю
				$subMenu.show();
				
				//добавить активный класс, который используется для изменения стрелочки в CSS
				$(this).addClass('active');	
			}
		});
	};
	
	//точка входа
	$(document).ready(function(){
	
		var html='',
			$menuVertical = $('#menu-vertical'),
			$menuHorizontal = $('#menu-horizontal');
		
		//1. передача рекурсивной функции общего массива данных (ассоциативный массив с любым уровнем вложенности)
		html = initMenu(data);
		
		//2. вызваем функцию jQuery html() которая является аналогом innerHTML и печатает данный HTML в указанном элементе jQuery
		$menuVertical.html(html);
		$menuHorizontal.html(html);
		
		//3. определить события в меню
		initEvents();
	});
	
})();