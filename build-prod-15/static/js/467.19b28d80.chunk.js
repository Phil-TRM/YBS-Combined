"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[467],{73467:function(e,a,r){r.r(a);var t=r(29439),s=r(72791),n=r(59434),l=r(53389),d=r(34221),o=r(80184);a.default=function(){var e=(0,n.v9)((function(e){return e.handleMasterData})),a=(0,s.useState)(""),r=(0,t.Z)(a,2),i=r[0],c=r[1],h=(0,s.useState)(""),x=(0,t.Z)(h,2),m=x[0],u=x[1],g=(0,s.useState)(""),p=(0,t.Z)(g,2),f=p[0],k=p[1],y=(0,s.useState)(""),b=(0,t.Z)(y,2),j=b[0],v=b[1];(0,s.useLayoutEffect)((function(){null!=e.contactData&&c(e.contactData)}),[e]);return(0,o.jsx)(o.Fragment,{children:(0,o.jsxs)("div",{className:"container px-8 mx-auto xl:px-5 max-w-screen-lg py-5 lg:py-8",children:[(0,o.jsx)("h1",{className:"mt-2 mb-3 text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl dark:text-white",children:"Contact"}),(0,o.jsx)("div",{className:"text-center",children:(0,o.jsx)("p",{className:"text-lg",children:"We are here to help."})}),(0,o.jsxs)("div",{className:"grid my-10 md:grid-cols-2",children:[(0,o.jsxs)("div",{className:"my-10",children:[(0,o.jsx)("h2",{className:"text-2xl font-semibold dark:text-white",children:i.heading}),(0,o.jsx)("p",{className:"max-w-sm mt-5",children:i.para}),(0,o.jsxs)("div",{className:"mt-5",children:[(0,o.jsxs)("div",{className:"flex items-center mt-2 space-x-2 text-dark-600 dark:text-gray-400",children:[(0,o.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor","aria-hidden":"true",className:"w-4 h-4",children:[(0,o.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"}),(0,o.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"})]}),(0,o.jsx)("span",{children:i.address})]}),(0,o.jsxs)("div",{className:"flex items-center mt-2 space-x-2 text-dark-600 dark:text-gray-400",children:[(0,o.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor","aria-hidden":"true",className:"w-4 h-4",children:(0,o.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"})}),(0,o.jsx)("a",{href:"mailto:".concat(i.email),children:i.email})]}),(0,o.jsxs)("div",{className:"flex items-center mt-2 space-x-2 text-dark-600 dark:text-gray-400",children:[(0,o.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor","aria-hidden":"true",className:"w-4 h-4",children:(0,o.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"})}),(0,o.jsx)("a",{href:"tel:".concat(i.contact),children:i.contact})]})]})]}),(0,o.jsx)("div",{children:(0,o.jsxs)("form",{className:"my-10",onSubmit:function(e){e.preventDefault();var a={name:m,email:f,text:j};fetch(l.XW,{method:"PUT",headers:l.oF,body:JSON.stringify(a)}).then((function(e){e.ok&&(d.fn.success("Email Send Successfuly."),k(""),u(""),v(""))}))},children:[(0,o.jsx)("input",{type:"checkbox",id:"",className:"hidden",name:"botcheck",style:{display:"none"}}),(0,o.jsx)("div",{className:"mb-5",children:(0,o.jsx)("input",{onChange:function(e){u(e.target.value)},value:m,type:"text",placeholder:"Full Name",autoComplete:"off",className:"w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white rounded-md outline-none dark:placeholder:text-gray-200 dark:bg-gray-900 focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0",name:"name"})}),(0,o.jsxs)("div",{className:"mb-5",children:[(0,o.jsx)("label",{htmlFor:"email_address",className:"sr-only",children:"Email Address"}),(0,o.jsx)("input",{onChange:function(e){k(e.target.value)},value:f,id:"email_address",type:"email",placeholder:"Email Address",name:"email",autoComplete:"off",className:"w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white rounded-md outline-none dark:placeholder:text-gray-200 dark:bg-gray-900 focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0"})]}),(0,o.jsx)("div",{className:"mb-3",children:(0,o.jsx)("textarea",{onChange:function(e){v(e.target.value)},value:j,name:"message",placeholder:"Your Message",className:"w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white dark:placeholder:text-gray-200 dark:bg-gray-900 rounded-md outline-none h-36 focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0"})}),(0,o.jsx)("button",{type:"submit",className:"w-full py-4 font-semibold text-white transition-colors bg-gray-900 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-offset-2 focus:ring focus:ring-gray-200 px-7 dark:bg-white dark:text-black",children:"Send Message"})]})})]})]})})}}}]);
//# sourceMappingURL=467.19b28d80.chunk.js.map