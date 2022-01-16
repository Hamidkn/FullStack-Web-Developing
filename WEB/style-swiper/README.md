# style-swiper
Add JS pagination, arrows, and events to a pure CSS swiper

Supports IE11+ with progressive enhancement - that is IE11 only snaps to items when scrolling via Touch
Supports IE11+ with CustomEvent polyfill (in example2.html)

## HTML
```html
<!-- Required: Container -->
<div id="myStyleSwiper" class="style-swiper-container">
	<!-- Optional: This div just lets the buttons vertically center with the slides minus the pagination  -->
	<div class="style-swiper-slide-btn-wrap">

		<!-- Optional: Previous button -->
		<button class="style-swiper-btn-prev" title="scroll previous">
			<i class="fa fa-chevron-left"><!-- FontAwesome Icon--></i>
		</button>

		<!-- Required: Slides -->
		<div class="style-swiper-slides hide-scrollbar">
			<div>Slide 1</div>
			<div>Slide 2</div>
			<div>Slide 3</div>
		</div>

		<!-- Optional: Next button -->
		<button class="style-swiper-btn-next" title="scroll next">
			<i class="fa fa-chevron-right"><!-- FontAwesome Icon--></i>
		</button>

	</div>

	<!-- Optional: Pagination -->
	<div class="style-swiper-pagination-wrap">
		<ol class="style-swiper-pagination"></ol>
	</div>
</div>
```

## JS
```javascript
var styleSwiper = new StyleSwiper({
	el:document.getElementById("myStyleSwiper")
});
```

### Additional JS
More advanced if you want to know visible/active with events

```javascript
var styleSwiper = new StyleSwiper({
	el:document.getElementById("myStyleSwiper"),
	events:true
});

//If you want to grab initially visible
var initialVisible = styleSwiper.getVisible();
console.log("Initially visible:", initialVisible);

//If you want to grab initially active
var initialActive = styleSwiper.getActive();
console.log("Initially active:", initialActive);

//If you want to register events when visible or active changes
var els = styleSwiper.getSlides();
for (var i = 0; i < els.length; i++){
	var el = els[i];

	//Listen for visibility change
	el.addEventListener(styleSwiper.eventChangeVisible, function(evt){
		console.log("Visibility change", evt, evt.detail);
	});

	//Listen for active change
	el.addEventListener(styleSwiper.eventChangeActive, function(evt){
		console.log("Active change", evt, evt.detail);
	});
}
```

## CSS
Pull in css/style-swiper.css

## API Reference
Any of these can be passed into constructor to override or called on the instance
- **attributePageNum**: String | Attribute to add to page indicating page number | defaullt: *data-page-num*

- **events**: Boolean | Enable javascript events | default: *false*
- **eventChangeVisible**: String | Event name for visibility change | default: *style-swiper-event-visible*
- **eventChangeActive**: String | Event name for active change | default: *style-swiper-event-active*

- **classSlides**: String | Class to select slides | default: *style-swiper-slides*
- **classBtnPrev**: String | Class to select previous button | default: *style-swiper-btn-prev*
- **classBtnNext**: String | Class to select next button | default: *style-swiper-btn-next*
- **classPagination**: String | Class to select pagination container | default: *style-swiper-pagination*
- **classPage**: String | Class to add to generated pages | default: *style-swiper-page*
- **classVisible**: String | Class to add to visible elements | default: *style-swiper-visible*
- **classActive**: String | Class to add to active elements | default: *style-swiper-active*
- **classHidden**: String | Class to add to hidden elements | default: *style-swiper-hidden*

- **scrollDirection**: String | Direction to scroll (horizontal | vertical | both) | default: *horizontal*
- **scrollBehavior**: String | Behavior of scrollTo | default: *smooth*
- **scrollDebounce**: Number | Time in milliseconds to wait after last scroll event before eval | default: *100*

- **init**: Initialize on a container element | default: *document*
- **destroy**: Clean up instance
- **getSlides**: Get children of element classSlides
- **getVisible**: Get slides with classVisible
- **getActive**: Get slides with classActive
- **getActiveIndex**: Get index of active slide
- **updateSlides**: Re-grab elements in container and cache bounds (cache if resizer present)
- **isVisible**: Returns true if the element argument is currently visible based on element / container bounds comparison
- **evalVisibility**: Check visibility slides / buttons / pages and add classes
- **evalActive**: Find active slide and add classes
- **previous**: Scroll previous slide based on activeIndex
- **next**: Scroll next slide based on activeIndex
- **goto**: Scroll to a specific slide index