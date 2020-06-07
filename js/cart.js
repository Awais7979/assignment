/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits
2. Set Header
3. Init Search
4. Init Menu
5. Init Quantity


******************************/

Rs(document).ready(function()
{
	"use strict";

	/* 

	1. Vars and Inits

	*/

	var header = Rs('.header');
	var hambActive = false;
	var menuActive = false;

	setHeader();

	Rs(window).on('resize', function()
	{
		setHeader();
	});

	Rs(document).on('scroll', function()
	{
		setHeader();
	});

	initSearch();
	initMenu();
	initQuantity();

	/* 

	2. Set Header

	*/

	function setHeader()
	{
		if(Rs(window).scrollTop() > 100)
		{
			header.addClass('scrolled');
		}
		else
		{
			header.removeClass('scrolled');
		}
	}

	/* 

	3. Init Search

	*/

	function initSearch()
	{
		if(Rs('.search').length && Rs('.search_panel').length)
		{
			var search = Rs('.search');
			var panel = Rs('.search_panel');

			search.on('click', function()
			{
				panel.toggleClass('active');
			});
		}
	}

	/* 

	4. Init Menu

	*/

	function initMenu()
	{
		if(Rs('.hamburger').length)
		{
			var hamb = Rs('.hamburger');

			hamb.on('click', function(event)
			{
				event.stopPropagation();

				if(!menuActive)
				{
					openMenu();
					
					Rs(document).one('click', function cls(e)
					{
						if(Rs(e.target).hasClass('menu_mm'))
						{
							Rs(document).one('click', cls);
						}
						else
						{
							closeMenu();
						}
					});
				}
				else
				{
					Rs('.menu').removeClass('active');
					menuActive = false;
				}
			});

			//Handle page menu
			if(Rs('.page_menu_item').length)
			{
				var items = Rs('.page_menu_item');
				items.each(function()
				{
					var item = Rs(this);

					item.on('click', function(evt)
					{
						if(item.hasClass('has-children'))
						{
							evt.preventDefault();
							evt.stopPropagation();
							var subItem = item.find('> ul');
						    if(subItem.hasClass('active'))
						    {
						    	subItem.toggleClass('active');
								TweenMax.to(subItem, 0.3, {height:0});
						    }
						    else
						    {
						    	subItem.toggleClass('active');
						    	TweenMax.set(subItem, {height:"auto"});
								TweenMax.from(subItem, 0.3, {height:0});
						    }
						}
						else
						{
							evt.stopPropagation();
						}
					});
				});
			}
		}
	}

	function openMenu()
	{
		var fs = Rs('.menu');
		fs.addClass('active');
		hambActive = true;
		menuActive = true;
	}

	function closeMenu()
	{
		var fs = Rs('.menu');
		fs.removeClass('active');
		hambActive = false;
		menuActive = false;
	}

	/* 

	5. Init Quantity

	*/

	function initQuantity()
	{
		// Handle product quantity input
		if( Rs('.product_quantity').length)
		{
			var input = Rs('#quantity_input');
			var incButton = Rs('#quantity_inc_button');
			var decButton = Rs('#quantity_dec_button');

			var originalVal;
			var endVal;

			incButton.on('click', function()
			{
				originalVal = input.val();
				endVal = parseFloat(originalVal) + 1;
				input.val(endVal);
			});

			decButton.on('click', function()
			{
				originalVal = input.val();
				if(originalVal > 0)
				{
					endVal = parseFloat(originalVal) - 1;
					input.val(endVal);
				}
			});
		}
	}

});