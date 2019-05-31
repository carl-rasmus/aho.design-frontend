(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{143:function(t,e,r){"use strict";var n=r(146),o=r.n(n);e.a=o()({projectId:"qj5g82aw",dataset:"production",useCdn:!0})},147:function(t,e,r){"use strict";var n=[500,1e3,1500,2e3],o={data:function(){return{width:null}},props:{image:Object},computed:{srcset:function(){var t=this;return n.map(function(e){return"".concat(t.image.asset.url,"?w=").concat(e," ").concat(e,"w")}).join(", ")}}},c=r(17),component=Object(c.a)(o,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"image-container"},[e("img",{staticClass:"lazyload",attrs:{src:this.image.asset.metadata.lqip,"data-srcset":this.srcset,"data-sizes":"auto"}})])},[],!1,null,null,null);e.a=component.exports},264:function(t,e,r){"use strict";var n=r(265);function o(t){var e,r;return t.indexOf("#")>-1&&(t=t.split("#")[0]),t.indexOf("?")>-1&&-1===t.indexOf("clip_id=")&&(t=t.split("?")[0]),/https?:\/\/vimeo\.com\/[0-9]+$|https?:\/\/player\.vimeo\.com\/video\/[0-9]+$|https?:\/\/vimeo\.com\/channels|groups|album/gim.test(t)?(r=t.split("/"))&&r.length&&(e=r.pop()):/clip_id=/gim.test(t)&&(r=t.split("clip_id="))&&r.length&&(e=r[1].split("&")[0]),e}function c(t){var e=/https:\/\/vine\.co\/v\/([a-zA-Z0-9]*)\/?/.exec(t);return e&&e[1]}function l(t){var e=/youtube:\/\/|https?:\/\/youtu\.be\//g;if(e.test(t))return d(t.split(e)[1]);var r=/\/v\/|\/vi\//g;if(r.test(t))return d(t.split(r)[1]);var n=/v=|vi=/g;if(n.test(t))return t.split(n)[1].split("&")[0];var o=/\/an_webp\//g;if(o.test(t))return d(t.split(o)[1]);var c=/\/embed\//g;if(c.test(t))return d(t.split(c)[1]);if(/\/user\/(?!.*videos)/g.test(t))return d(t.split("/").pop());var l=/\/attribution_link\?.*v%3D([^%&]*)(%26|&|$)/;return l.test(t)?t.match(l)[1]:void 0}function m(t){var e;if(t.indexOf("embed")>-1)return e=/embed\/(\w{8})/,t.match(e)[1];e=/\/v\/(\w{8})/;var r=t.match(e);return r&&r.length>0?t.match(e)[1]:void 0}function d(t){return t.indexOf("?")>-1?t.split("?")[0]:t.indexOf("/")>-1?t.split("/")[0]:t}t.exports=function(t){if("string"!=typeof t)throw new TypeError("get-video-id expects a string");/<iframe/gi.test(t)&&(t=n(t)),t=(t=(t=t.trim()).replace("-nocookie","")).replace("/www.","/");var e={};if(/\/\/google/.test(t)){var r=t.match(/url=([^&]+)&/);r&&(t=decodeURIComponent(r[1]))}return/youtube|youtu\.be|i.ytimg\./.test(t)?e={id:l(t),service:"youtube"}:/vimeo/.test(t)?e={id:o(t),service:"vimeo"}:/vine/.test(t)?e={id:c(t),service:"vine"}:/videopress/.test(t)&&(e={id:m(t),service:"videopress"}),e}},265:function(t,e,r){"use strict";t.exports=function(input){if("string"!=typeof input)throw new TypeError("get-src expected a string");var t=/src="(.*?)"/gm.exec(input);if(t&&t.length>=2)return t[1]}},267:function(t,e,r){"use strict";r.r(e);r(45),r(44);var n=r(5),o=r(143),c=r(154),l=r.n(c),m=r(147),d=r(264),v=r.n(d),f={components:{BlockContent:l.a,BaseImage:m.a},asyncData:function(){var t=Object(n.a)(regeneratorRuntime.mark(function t(e){var r,n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.params,t.next=3,o.a.fetch("\n      *[_type == 'project' && slug.current == $slug]\n      {\n        name,\n        slug,\n        course->{name, year, slug},\n        task->{name, slug, duration},\n        projectDescription,\n        headerImage{..., asset->},\n        projectImages[]{..., asset->},\n        authors[]->{_id, firstName, lastName, slug},\n        website\n      }[0]\n    ",{slug:r.slug}).catch(function(t){return console.log(t)});case 3:if(!(n=t.sent)){t.next=7;break}return console.log(n),t.abrupt("return",{project:n,title:n.name,url:"https://aho.design/project/"+n.slug.current,description:n.projectDescription&&n.projectDescription[0].children[0].text||"",image:n.headerImage.asset.url});case 7:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}(),head:function(){return{title:this.title,meta:[{hid:"description",name:"description",content:this.description},{hid:"ogTitle",property:"og:title",content:this.title},{hid:"ogUrl",property:"og:url",content:this.url},{hid:"ogDescription",property:"og:description",content:this.description},{hid:"ogImage",property:"og:image",content:this.image},{hid:"twitterTitle",name:"twitter:title",content:this.title},{hid:"twitterDescription",name:"twitter:description",content:this.description},{hid:"twitterImage",name:"twitter:image",content:this.image}]}},methods:{getIframeSrc:function(object){var t=v()(object.url),e=t.id;return"youtube"===t.service?"https://www.youtube.com/embed/".concat(e):"https://player.vimeo.com/video/".concat(e,"?color=e64800&title=0&byline=0&portrait=0")}}},h=r(17),component=Object(h.a)(f,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("section",{staticClass:"container"},[r("div",{staticClass:"columns"},[r("div",{staticClass:"column is-full"},[t.project.course?r("h5",[r("nuxt-link",{attrs:{to:"/course/"+t.project.course.slug.current}},[t._v("\n          "+t._s(t.project.course.name)+", "+t._s(t.project.course.year)+"\n        ")])],1):t._e(),t._v(" "),t.project.task?r("h4",[t._v("Task:\n        "),r("nuxt-link",{attrs:{to:"/task/"+t.project.task.slug.current}},[t._v("\n          "+t._s(t.project.task.name)+"\n        ")])],1):t._e(),t._v(" "),t.project.name?r("h1",[t._v("\n        "+t._s(t.project.name)+"\n      ")]):t._e(),t._v(" "),t.project.authors?r("ul",t._l(t.project.authors,function(e){return r("li",{staticClass:"byLine"},[r("nuxt-link",{attrs:{to:"/student/"+e.slug.current}},[r("h4",[t._v(t._s(e.firstName)+" "+t._s(e.lastName))])])],1)}),0):t._e(),t._v(" "),t.project.task.duration?r("h5",[t._v("Effective work time: "),r("b",[t._v(t._s(t.project.task.duration))])]):t._e()]),t._v(" "),t.project.headerImage?r("div",{staticClass:"column is-full-mobile is-four-fifths is-offset-1"},[r("base-image",{attrs:{image:t.project.headerImage}})],1):t._e(),t._v(" "),r("div",{staticClass:"column is-full-mobile is-three-fifths is-offset-one-fifth"},[t.project.projectDescription?r("div",[r("block-content",{attrs:{blocks:t.project.projectDescription}})],1):t._e(),t._v(" "),t.project.website?r("h5",[t._v("\n        Project website: "),r("a",{attrs:{href:t.project.website,target:"_blank"}},[t._v("\n          "+t._s(t.project.website)+"\n        ")])]):t._e()]),t._v(" "),t.project.projectImages?r("div",{staticClass:"column is-full-mobile is-four-fifths is-offset-1"},[r("ul",t._l(t.project.projectImages,function(e){return r("li",["supportImage"==e._type?r("div",[r("base-image",{attrs:{image:e}})],1):"videoUpload"==e._type?r("div",[r("video",{attrs:{src:e.asset.url,controls:""}},[t._v("Your browser does not support this video format :(")])]):"videoUrl"==e._type?r("div",[r("iframe",{attrs:{src:t.getIframeSrc(e),width:"560",height:"350",frameborder:"0",allow:"autoplay; fullscreen",allowfullscreen:""}})]):t._e()])}),0)]):t._e()])])},[],!1,null,null,null);e.default=component.exports}}]);