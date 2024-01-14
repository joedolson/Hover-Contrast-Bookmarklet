# Hover Contrast Bookmarklet

A bookmarklet to trigger hover states and check the color contrast of hovered focusable elements.

## What does this do?

The bookmarklet attaches a mouseover event to each focusable object on the page, then triggers a simulated event. During the simulated hover event, the bookmarklet checks the calculated foreground and background colors for the element and marks failing elements.

[![License](https://img.shields.io/badge/license-GPL--2.0%2B-green.svg)](https://www.gnu.org/license/gpl-2.0.html)

Donate link: https://www.joedolson.com/donate/

## Bookmarklet

Add the bookmarklet below to your bookmarks bar.

```javascript
javascript:(function(){function simulateMouseover(t){var e=new MouseEvent("mouseover",{view:window,bubbles:true,cancelable:true});var o=!t.dispatchEvent(e);if(o){console.log(t)}else{var n=getComputedColor(t,"background");var r=getComputedColor(t,"foreground");var a=getContrastRatio(n,r).toPrecision(3);if(a<4.5){hasRatio=t.querySelector(".contrast-ratio-test");if(hasRatio){hasRatio.remove()}e.target.style.outline="2px solid #c00";e.target.style.outlineOffset="2px";var s=document.createElement("span");s.classList.add("contrast-ratio-test");s.innerText=a;s.style.display="block";s.style.border="1px solid";s.style.color="black";s.style.backgroundColor="#f3f3f3";s.style.padding="3px";s.style.borderRadius="3px";s.style.borderWidth="2px";s.style.marginLeft="3px";s.style.position="relative";s.style.zIndex="10";s.style.minWidth="fit-content";t.insertAdjacentElement("beforeend",s)}}}function mouseOverBehaviour(){const t=document.querySelectorAll("a[href], button, input, textarea, select, details, [tabindex]");t.forEach((t=>{t.addEventListener("mouseover",(function(t){}));setTimeout(simulateMouseover,300,t)}))}mouseOverBehaviour();function getComputedColor(t,e){while(t){const o="background"===e?window.getComputedStyle(t).backgroundColor:window.getComputedStyle(t).color;if("rgba(0, 0, 0, 0)"===o){t=t.parentNode;continue}const n=o.match(/\d+/g);if(n.length===3){return rgbToHex(n.map((t=>parseInt(t,10))))}return null}return null}function rgbToHex(t){return"#"+t.map((t=>t.toString(16).padStart(2,"0"))).join("")}function getContrastRatio(t,e){const o=calculateLuminance(t);const n=calculateLuminance(e);const r=Math.max(o,n);const a=Math.min(o,n);return(r+.05)/(a+.05)}function calculateLuminance(t){const e=hexToRgb(t);const[o,n,r]=e.map((t=>{t/=255;return t<=.03928?t/12.92:Math.pow((t+.055)/1.055,2.4)}));return.2126*o+.7152*n+.0722*r}function hexToRgb(t){const e=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;t=t.replace(e,((t,e,o,n)=>e+e+o+o+n+n));const o=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return o?[parseInt(o[1],16),parseInt(o[2],16),parseInt(o[3],16)]:null}function rgbToHsl(t,e,o){t/=255;e/=255;o/=255;const n=Math.max(t,e,o),r=Math.min(t,e,o);let a,s;const i=(n+r)/2;if(n===r){a=s=0}else{const u=n-r;s=i>.5?u/(2-n-r):u/(n+r);switch(n){case t:a=(e-o)/u+(e<o?6:0);break;case e:a=(o-t)/u+2;break;case o:a=(t-e)/u+4;break}a/=6}return[a,s,i]}function hslToRgb(t,e,o){let n,r,a;if(e===0){n=r=a=o}else{const s=(t,e,o)=>{if(o<0)o+=1;if(o>1)o-=1;if(o<1/6)return t+(e-t)*6*o;if(o<1/2)return e;if(o<2/3)return t+(e-t)*(2/3-o)*6;return t};const i=o<.5?o*(1+e):o+e-o*e;const u=2*o-i;n=s(u,i,t+1/3);r=s(u,i,t);a=s(u,i,t-1/3)}return[Math.round(n*255),Math.round(r*255),Math.round(a*255)]}})();
```

### Sources

This bookmarklet owes a lot to the model code for simulating a mouseover in [rwone's jsfiddle](https://jsfiddle.net/rwone/n5bredu2/) and the color testing scripting in [the WordPress.org Tour plugin](https://github.com/Automattic/tour/blob/trunk/assets/js/tour.js#L157). 

## Contribute

Bugs or feature development contributions should be made through the [GitHub repository](https://github.com/joedolson/Hover-Contrast-Bookmarklet/issues)

## Authors

* [Joe Dolson](https://www.joedolson.com)