"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[409],{49409:function(e,a,l){l.r(a);var s=l(29439),i=l(72791),n=l(56355),r=l(23853),t=l(57689),o=l(87087),d=(l(19713),l(59434)),c=l(53389),x=l(80184);a.default=function(){var e=(0,t.s0)(),a=(0,d.v9)((function(e){return e.handleMasterData})),l=(0,i.useState)(""),u=(0,s.Z)(l,2),h=u[0],m=u[1],g=(0,i.useState)(1),p=(0,s.Z)(g,2),b=p[0],f=p[1],k=(0,i.useState)(0),v=(0,s.Z)(k,2),j=v[0],y=v[1];(0,i.useLayoutEffect)((function(){null!=a.doctors&&(m(a.doctors),y(Math.ceil(a.doctors.length/10)))}),[a]);var w=(0,d.v9)((function(e){return e.handleUserBasicData})),N=function(e){f(e)};return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)("div",{className:"container px-8 mx-auto xl:px-5 max-w-screen-lg py-5 lg:py-8",children:(0,x.jsx)("div",{className:"container my-24 mx-auto md:px-6",children:(0,x.jsx)("section",{className:"mb-32 text-center",children:(0,x.jsx)("div",{className:"grid gap-x-6 gap-y-5 md:gap-y-12 md:grid-cols-3 lg:gap-x-12",children:h.length>0?function(){var e=10*(b-1),a=e+10;return h.slice(e,a)}().filter((function(e){return 1!==w.userType||w.uid===e._id})).map((function(a,l){return(0,x.jsx)("div",{className:"mb-6 lg:mb-0",onClick:function(){return e("/post-by/".concat(a._id))},children:(0,x.jsxs)("div",{className:"block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700",children:[(0,x.jsx)("div",{className:"relative overflow-hidden bg-cover bg-no-repeat",style:{paddingBottom:"100%"},children:(0,x.jsx)(o.LazyLoadImage,{src:c._p+a.dp,effect:"blur",className:"absolute  object-cover rounded-lg",width:"100%",height:"50%"})}),(0,x.jsxs)("div",{className:"p-4",children:[(0,x.jsx)("h3",{className:"mb-2 text-xl font-semibold",children:a.name}),(0,x.jsx)("p",{className:"text-sm text-gray-600 dark:text-gray-300",children:a.designantion}),(0,x.jsx)("div",{className:"flex justify-center mt-4 space-x-4",children:null!=a.socialMedia?(0,x.jsxs)("div",{className:"flex justify-end pt-5 gap-4 socials",style:{display:null!=a.socialMedia?"flex":"none"},children:[(0,x.jsx)("div",{className:"relative overflow-hidden block footer-div cursor-pointer",style:{display:null!=a.socialMedia.linkden?"block":"none"},children:(0,x.jsx)("span",{className:"block",children:(0,x.jsx)("a",{target:"_blank",href:null!=a.socialMedia.linkden?a.socialMedia.linkden:"",children:(0,x.jsx)(n.BUd,{className:"social-links text-white bg-[#7963a7] rounded-full leading-4 p-2 h-8 w-8"})})})}),(0,x.jsx)("div",{className:"relative overflow-hidden block footer-div cursor-pointer",style:{display:null!=a.socialMedia.mail?"block":"none"},children:(0,x.jsx)("span",{className:"block",children:(0,x.jsx)("a",{target:"_blank",href:null!=a.socialMedia.mail?"mailto:".concat(a.socialMedia.mail):"",children:(0,x.jsx)("i",{className:"social-links fa-solid fa-envelope text-white bg-[#7963a7] rounded-full leading-4 p-2 h-8 w-8"})})})}),(0,x.jsx)("div",{className:"relative overflow-hidden block footer-div cursor-pointer",style:{display:null!=a.socialMedia.facebook?"block":"none"},children:(0,x.jsx)("span",{className:"block",children:(0,x.jsx)("a",{target:"_blank",href:null!=a.socialMedia.facebook?a.socialMedia.facebook:"",children:(0,x.jsx)("i",{className:" social-links fa-brands fa-facebook text-white bg-[#7963a7] rounded-full leading-4 p-2 h-8 w-8"})})})}),(0,x.jsx)("div",{className:"relative overflow-hidden block footer-div cursor-pointer",style:{display:null!=a.socialMedia.twiter?"block":"none"},children:(0,x.jsx)("span",{className:"block",children:(0,x.jsx)("a",{target:"_blank",href:null!=a.socialMedia.twiter?a.socialMedia.twiter:"",children:(0,x.jsx)(r.Ccr,{className:"social-links text-white bg-[#7963a7] rounded-full leading-4 p-2 h-8 w-8"})})})})]}):null})]})]})},l)})):null})})})}),(0,x.jsx)("div",{className:"mt-3 flex items-center justify-center",children:(0,x.jsxs)("nav",{className:"isolate inline-flex -space-x-px rounded-md shadow-sm","aria-label":"Pagination",children:[(0,x.jsxs)("button",{className:"relative inline-flex items-center gap-1 rounded-l-md border border-gray-300 bg-white px-3 py-2 pr-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300",onClick:function(){N(b-1)},disabled:1==b,children:[(0,x.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor","aria-hidden":"true",className:"h-3 w-3",children:(0,x.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15.75 19.5L8.25 12l7.5-7.5"})}),(0,x.jsx)("span",{children:"Previous"})]}),(0,x.jsx)("div",{children:Array.from({length:j},(function(e,a){return(0,x.jsx)("button",{onClick:function(){return N(a+1)},className:"mx-1 px-3 py-2 rounded ".concat(b===a+1?"bg-gray-200 text-black":"bg-white text-gray-200"),children:a+1},a)}))}),(0,x.jsxs)("button",{disabled:j==b,onClick:function(){N(b+1)},className:"relative inline-flex items-center gap-1 rounded-r-md border border-gray-300 bg-white px-3 py-2 pl-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300",children:[(0,x.jsx)("span",{children:"Next"}),(0,x.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor","aria-hidden":"true",className:"h-3 w-3",children:(0,x.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M8.25 4.5l7.5 7.5-7.5 7.5"})})]})]})})]})}}}]);
//# sourceMappingURL=409.4536064a.chunk.js.map