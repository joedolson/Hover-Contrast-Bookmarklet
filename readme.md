# Hover Contrast Bookmarklet

A bookmarklet to trigger hover states and check the color contrast of hovered focusable elements.

## What does this do?

The bookmarklet attaches a mouseover event to each focusable object on the page, then triggers a simulated event. During the simulated hover event, the bookmarklet checks the calculated foreground and background colors for the element and marks failing elements.

[![License](https://img.shields.io/badge/license-GPL--2.0%2B-green.svg)](https://www.gnu.org/license/gpl-2.0.html)

Donate link: https://www.joedolson.com/donate/

## Bookmarklet

Add the bookmarklet below to your bookmarks bar.

```javascript
javascript:void%20function(){var%20a=Math.pow;function%20b(a){var%20b=new%20MouseEvent(%22mouseover%22,{view:window,bubbles:!0,cancelable:!0}),d=!a.dispatchEvent(b);if(d)console.log(a);else{var%20f=c(a,%22background%22),g=c(a,%22foreground%22),h=e(f,g).toPrecision(3),i=getComputedStyle(a).fontSize;i=parseInt(i.replace(%22px%22,%22%22));var%20j=parseInt(getComputedStyle(a).fontWeight),k=!!(600%3Cj%26%2618.75%3Ci||600%3Ej%26%2624%3Ci),l=k%3F3:4.5;if(h%3Cl){hasRatio=a.querySelector(%22.contrast-ratio-test%22),hasRatio%26%26hasRatio.remove(),b.target.style.outline=%222px%20solid%20%23c00%22,b.target.style.outlineOffset=%222px%22;var%20m=document.createElement(%22span%22);m.classList.add(%22contrast-ratio-test%22),m.innerText=h,m.style.display=%22block%22,m.style.border=%221px%20solid%22,m.style.color=%22black%22,m.style.backgroundColor=%22%23f3f3f3%22,m.style.padding=%223px%22,m.style.borderRadius=%223px%22,m.style.borderWidth=%222px%22,m.style.marginLeft=%223px%22,m.style.position=%22relative%22,m.style.zIndex=%2210%22,m.style.minWidth=%22fit-content%22,a.insertAdjacentElement(%22beforeend%22,m)}}}function%20c(a,b){for(;a;){const%20c=%22background%22===b%3Fwindow.getComputedStyle(a).backgroundColor:window.getComputedStyle(a).color;if(%22rgba(0,%200,%200,%200)%22===c){a=a.parentNode;continue}const%20e=c.match(/\d+/g);return%203===e.length%3Fd(e.map(a=%3EparseInt(a,10))):null}return%20null}function%20d(a){return%22%23%22+a.map(a=%3Ea.toString(16).padStart(2,%220%22)).join(%22%22)}function%20e(a,b){const%20c=f(a),d=f(b),e=Math.max(c,d),g=Math.min(c,d);return(e+.05)/(g+.05)}function%20f(c){const%20d=h(c),[e,f,g]=d.map(b=%3E(b/=255,.03928%3E=b%3Fb/12.92:a((b+.055)/1.055,2.4)));return%20.2126*e+.7152*f+.0722*g}function%20h(a){a=a.replace(/^%23%3F([a-f\d])([a-f\d])([a-f\d])$/i,(a,c,d,e)=%3Ec+c+d+d+e+e);const%20b=/^%23%3F([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);return%20b%3F[parseInt(b[1],16),parseInt(b[2],16),parseInt(b[3],16)]:null}(function(){const%20a=document.querySelectorAll(%22a[href],%20button,%20input,%20textarea,%20select,%20details,%20[tabindex]%22);a.forEach(a=%3E{a.addEventListener(%22mouseover%22,function(){}),setTimeout(b,300,a)})})()}();
```

### Sources

This bookmarklet owes a lot to the model code for simulating a mouseover in [rwone's jsfiddle](https://jsfiddle.net/rwone/n5bredu2/) and the color testing scripting in [the WordPress.org Tour plugin](https://github.com/Automattic/tour/blob/trunk/assets/js/tour.js#L157). 

Bookmarklet compression by [Chris Zarate's Bookmarkleter](https://chriszarate.github.io/bookmarkleter/).

## Contribute

Bugs or feature development contributions should be made through the [GitHub repository](https://github.com/joedolson/Hover-Contrast-Bookmarklet/issues)

## Authors

* [Joe Dolson](https://www.joedolson.com)