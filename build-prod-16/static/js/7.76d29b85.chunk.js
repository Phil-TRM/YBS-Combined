"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[7,137],{38682:function(e,t,n){n.r(t),n.d(t,{default:function(){return v}});var a=n(74165),s=n(15861),r=n(29439),l=n(72791),o=(n.p,n(11087)),i=n(50242),c=n(24459),u=n(24054),d=n(54945),m=n(53389),p=n(59434),h=n(25153),f=n(57689),x=n(34221),b=n(51299),g=(n(6342),n(23137)),y=n(80184),v=function(){var e=(0,l.useState)(""),t=(0,r.Z)(e,2),n=t[0],v=t[1],j=(0,l.useState)(""),S=(0,r.Z)(j,2),N=S[0],w=S[1],k=(0,l.useState)(""),C=(0,r.Z)(k,2),Z=C[0],A=C[1],F=(0,l.useState)(""),P=(0,r.Z)(F,2),E=P[0],D=P[1],O=(0,l.useState)(""),I=(0,r.Z)(O,2),M=I[0],T=I[1],q=(0,l.useState)(""),z=(0,r.Z)(q,2),B=z[0],J=z[1],U=(0,l.useState)(""),R=(0,r.Z)(U,2),_=R[0],$=R[1],L=(0,l.useState)(""),V=(0,r.Z)(L,2),W=V[0],Y=V[1],H=(0,l.useState)(""),Q=(0,r.Z)(H,2),G=Q[0],K=Q[1],X=(0,l.useState)(""),ee=(0,r.Z)(X,2),te=ee[0],ne=ee[1],ae=(0,l.useState)(""),se=(0,r.Z)(ae,2),re=se[0],le=se[1],oe=(0,l.useState)("We Are Team"),ie=(0,r.Z)(oe,2),ce=ie[0],ue=ie[1],de=(0,l.useState)(""),me=(0,r.Z)(de,2),pe=(me[0],me[1]),he=(0,l.useState)(new Array),fe=(0,r.Z)(he,2),xe=(fe[0],fe[1]),be=(0,l.useState)(!1),ge=(0,r.Z)(be,2),ye=ge[0],ve=ge[1],je=(0,p.I0)(),Se=(0,f.s0)();console.log("Loading");var Ne=(0,l.useState)(""),we=(0,r.Z)(Ne,2),ke=we[0],Ce=we[1],Ze=(0,p.v9)((function(e){return e.handleMasterData})),Ae=((0,p.v9)((function(e){return e.handleUserBasicData})),(0,l.useState)(!1)),Fe=(0,r.Z)(Ae,2),Pe=Fe[0],Ee=Fe[1],De=(0,l.useState)(!1),Oe=(0,r.Z)(De,2),Ie=Oe[0],Me=Oe[1],Te=(0,l.useState)(!1),qe=(0,r.Z)(Te,2),ze=(qe[0],qe[1],(0,l.useState)(!1)),Be=(0,r.Z)(ze,2),Je=Be[0],Ue=Be[1],Re=(0,l.useState)(null),_e=(0,r.Z)(Re,2),$e=(_e[0],_e[1]),Le=(0,l.useState)(null),Ve=(0,r.Z)(Le,2),We=Ve[0],Ye=Ve[1],He=null,Qe={"client-id":m.Cx,vault:"true",intent:"subscription"},Ge=(0,l.useState)(!1),Ke=(0,r.Z)(Ge,2),Xe=Ke[0],et=Ke[1],tt=function(){et(!1)};(0,l.useLayoutEffect)((function(){null!=Ze.signupData&&Ce(m._p+Ze.signupData.pro),null!=Ze.prices?xe(Ze.prices):xe(new Array)}),[Ze]);var nt=function(){var e=(0,s.Z)((0,a.Z)().mark((function e(t){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),Je){e.next=4;break}return x.fn.warning("Account already exists please login"),e.abrupt("return");case 4:if(ye){e.next=7;break}return x.fn.warning("Please accept terms and condtions"),e.abrupt("return");case 7:Ee(!0);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();(0,l.useEffect)((function(){Ie&&(x.fn.success("Payment successful!!"),at())}),[Ie]),(0,l.useEffect)((function(){var e={email:N};try{fetch(m.hJ,{method:"POST",headers:m.oF,body:JSON.stringify(e)}).then((function(e){if(!e.ok)throw Ue(!0),new Error("Something went wrong");x.fn.warning("Account already exists please login"),Ue(!1)})).catch((function(e){}))}catch(t){}}),[N]),(0,l.useEffect)((function(){var e={mobileNumber:Z};if(Z.length>=10)try{fetch(m.hJ,{method:"POST",headers:m.oF,body:JSON.stringify(e)}).then((function(e){e.ok?(x.fn.warning("Account already exists please login"),Ue(!1)):Ue(!0)}))}catch(t){}}),[Z]);var at=function(){if(Ie){var e={name:n,email:N,mobileNumber:Z,password:E,address:{city:W,state:_,contry:B,zipCode:G,streetAddress:re},designantion:M,certificate:te,userType:1,status:0,isEmailVerified:!1,howfind:ce};fetch(m.Vp,{method:"POST",headers:m.oF,body:JSON.stringify(e)}).then((function(e){e.ok&&e.json().then((function(e){var t=e.data;x.fn.success("Welcome "+t.name),v(""),w(""),A(""),D(""),T(""),J(""),$(""),Y(""),K(""),ne(""),pe(""),xe(""),le(""),ue(""),je((0,h.M)(t)),je((0,h.PN)({uid:t._id,userType:1,isLogin:!0})),localStorage.setItem("user",JSON.stringify(t)),He=2600==We.amount?"651cc5d78791c4e23da79f27":"651cc5d78791c4e23da79f29";var n={transId:We.subscriptionID,email:N,pid:He};fetch(m.$o,{method:"PUT",headers:m.oF,body:JSON.stringify(n)}).then((function(e){e.ok&&Se("/")})).catch((function(e){console.error("Error while making fetch request to Historyhandlers",e)})),Se("/")}))})),tt()}};return(0,y.jsx)(b.Vv,{options:Qe,children:(0,y.jsx)("div",{className:"w-full mx-auto",children:(0,y.jsx)("div",{className:"flex justify-center my-12",children:(0,y.jsxs)("div",{className:"w-full xl:w-3/4 lg:w-11/12 flex",children:[(0,y.jsx)("div",{className:"w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg",style:{backgroundImage:"url(".concat(ke,")")}}),(0,y.jsx)("div",{className:"w-full xl:w-1/2 p-8",children:(0,y.jsxs)("form",{method:"post",action:"#",onSubmit:nt,children:[(0,y.jsx)("h3",{className:"my-4 text-2xl font-semibold text-[#452a72]",children:"Sign Up as a Doctor"}),(0,y.jsxs)("div",{children:[(0,y.jsxs)("span",{className:"text-gray-600 text-sm",children:["Already have an account? "," "]}),(0,y.jsx)(o.rU,{to:"/login",className:"text-gray-700 text-sm font-semibold",children:"Sign in"})]}),(0,y.jsxs)("div",{className:"grid gap-4 gap-y-3 text-sm grid-cols-1 md:grid-cols-5 mb-4 mt-6",children:[(0,y.jsxs)("div",{className:"md:col-span-5",children:[(0,y.jsx)("label",{className:"block text-gray-700 text-sm font-semibold mb-2",htmlFor:"Name",children:"Name"}),(0,y.jsx)("input",{className:"text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-50 leading-tight focus:outline-none focus:shadow-outline h-10 border border-gray-200",id:"Name",type:"text",placeholder:"Your Name",value:n,onChange:function(e){return v(e.target.value)}})]}),(0,y.jsxs)("div",{className:"md:col-span-5",children:[(0,y.jsx)("label",{className:"block text-gray-700 text-sm font-semibold mb-2",htmlFor:"email",children:"Email"}),(0,y.jsx)("input",{className:"text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-50 leading-tight focus:outline-none focus:shadow-outline h-10 border border-gray-200",id:"email",type:"email",placeholder:"Your Email",value:N,onChange:function(e){return w(e.target.value)}})]}),(0,y.jsxs)("div",{className:"md:col-span-5",children:[(0,y.jsx)("label",{className:"block text-gray-700 text-sm font-semibold mb-2",htmlFor:"mobile",children:"Mobile No"}),(0,y.jsx)("input",{className:"[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-all flex items-center  focus:outline-none h-10  mt-1  px-4 w-full bg-gray-50 border border-gray-200",id:"mobile",type:"number",placeholder:"Mobile No",value:Z,onChange:function(e){return A(e.target.value)}})]}),(0,y.jsxs)("div",{className:"md:col-span-5 ",children:[(0,y.jsx)("label",{className:"block text-gray-700 text-sm font-semibold mb-2",htmlFor:"password",children:"Password"}),(0,y.jsx)("input",{className:"text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-50  leading-tight focus:outline-none focus:shadow-outline h-10 border border-gray-200",id:"mobile",type:"password",placeholder:"Password",value:E,onChange:function(e){return D(e.target.value)}})]}),(0,y.jsxs)("div",{className:"md:col-span-5 ",children:[(0,y.jsx)("label",{className:"block text-gray-700 text-sm font-semibold mb-2",htmlFor:"Designantion",children:"Designation"}),(0,y.jsx)("input",{className:"text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-50  leading-tight focus:outline-none focus:shadow-outline h-10 border border-gray-200",id:"Designantion",type:"text",placeholder:"Designantion",value:M,onChange:function(e){return T(e.target.value)}})]}),(0,y.jsxs)("div",{className:"md:col-span-5",children:[(0,y.jsx)("label",{htmlFor:"country",className:"block text-gray-700 text-sm font-semibold mb-2",children:"Country"}),(0,y.jsxs)("select",{className:"h-10 bg-gray-50 px-2 text-gray-700 flex border w-full border-gray-200 rounded items-center mt-1 focus:outline-none",required:!0,value:B,onChange:function(e){return J(e.target.value)},children:[(0,y.jsx)("option",{value:"",children:"Country"}),i.Z.getAllCountries().map((function(e,t){return(0,y.jsx)("option",{value:e.isoCode,children:e.name},t)}))]})]}),B&&(0,y.jsxs)("div",{className:"md:col-span-5",children:[(0,y.jsx)("label",{htmlFor:"state",className:"block text-gray-700 text-sm font-semibold mb-2",children:"State / province"}),(0,y.jsxs)("select",{className:"h-10 bg-gray-50 px-2 text-gray-700 flex border w-full border-gray-200 rounded items-center mt-1 focus:outline-none",required:!0,value:_,onChange:function(e){return $(e.target.value)},children:[(0,y.jsx)("option",{value:"",children:"State"}),c.ZP.getStatesOfCountry(B).map((function(e,t){return(0,y.jsx)("option",{value:e.isoCode,children:e.name},t)}))]})]}),_&&(0,y.jsxs)("div",{className:"md:col-span-5",children:[(0,y.jsx)("label",{htmlFor:"state",className:"block text-gray-700 text-sm font-semibold mb-2",children:"City"}),(0,y.jsxs)("select",{className:"h-10 px-2 bg-gray-50 text-gray-700 flex border w-full border-gray-200 rounded items-center mt-1 focus:outline-none",required:!0,value:W,onChange:function(e){return Y(e.target.value)},children:[(0,y.jsx)("option",{value:"",children:"City"}),u.Z.getCitiesOfState(B,_).map((function(e,t){return(0,y.jsx)("option",{value:e.isoCode,children:e.name},t)}))]})]}),(0,y.jsxs)("div",{className:"md:col-span-5",children:[(0,y.jsx)("label",{htmlFor:"zipcode",className:"block text-gray-700 text-sm font-semibold mb-2",children:"Zipcode"}),(0,y.jsx)("input",{placeholder:"Zip Code",type:"number",name:"zinCode",required:!0,id:"zipcode",className:" focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50",value:G,onChange:function(e){return K(e.target.value)}})]}),(0,y.jsxs)("div",{className:"md:col-span-5",children:[(0,y.jsx)("label",{htmlFor:"zipcode",className:"block text-gray-700 text-sm font-semibold mb-2",children:"Street address"}),(0,y.jsx)("input",{placeholder:"Street Address",name:"zinCode",required:!0,id:"zipcode",className:" focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50",value:re,onChange:function(e){return le(e.target.value)}})]}),(0,y.jsxs)("div",{className:"md:col-span-5",children:[(0,y.jsx)("label",{htmlFor:"state",className:"block text-gray-700 text-sm font-semibold mb-2",children:"Board Certification"}),(0,y.jsxs)("select",{className:"h-10 px-2 bg-gray-50 text-gray-700 flex border w-full border-gray-200 rounded items-center mt-1 focus:outline-none",required:!0,value:te,onChange:function(e){return ne(e.target.value)},children:[(0,y.jsx)("option",{value:"Certificate",children:"Certificate"}),(0,y.jsx)("option",{value:"ABPS",children:"ABPS"}),(0,y.jsx)("option",{value:"ASPS",children:"ABFPRS"}),(0,y.jsx)("option",{value:"AAFPRS",children:"AAFPRS"}),(0,y.jsx)("option",{value:"ASOPRS",children:"ASOPRS"})]})]}),(0,y.jsx)("div",{className:"md:col-span-5",children:(0,y.jsxs)("div",{className:"form-check flex justify-center items-center mx-auto",children:[(0,y.jsx)("input",{style:{width:"15px",height:"15px"},className:"form-check-input me-2 ",type:"checkbox",value:ye,onChange:function(e){return ve(e.target.checked)},id:"form2Example3cg"}),(0,y.jsx)("label",{className:"form-check-label",htmlFor:"form2Example3g",children:(0,y.jsxs)("a",{href:"Surgeon Contributor Agreement.pdf",target:"_blank",children:["I agree to all statements in the ",(0,y.jsx)("u",{children:"Contributor Participation Agreement"})]})})]})})]}),(0,y.jsxs)("div",{className:"flex w-full mt-8 justify-center",children:[(0,y.jsx)("button",{style:{display:Pe?"none":"flex"},className:"justify-center w-full bg-[#452a72] hover:bg-transparent text-white hover:text-[#452a72] hover:border hover:border-[#452a72] text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10",type:"submit",onClick:function(){et(!0)},children:"Subscribe"}),(0,y.jsx)(d.Z,{open:Xe,onClose:tt,className:"flex justify-center items-center",children:(0,y.jsx)("div",{className:"bg-white rounded-lg shadow-md p-8 w-1/3 h-1/2 overflow-scroll no-scrollbar",children:(0,y.jsx)("div",{className:"modal-content",children:(0,y.jsx)(g.default,{handleSubscription:function(e){Me(!0),$e(e),Ye(e)},closeModal:tt})})})})]})]})})]})})})})}},23137:function(e,t,n){n.r(t),n.d(t,{default:function(){return u}});var a=n(29439),s=n(72791),r=n(51299),l=n(53389),o=n(34221),i=n(80184),c=function(e){var t=e.planId,n=e.handleSubscription,l=e.closeModal,c=(0,s.useState)(!1),u=(0,a.Z)(c,2),d=(u[0],u[1]);return(0,i.jsx)(r.ch,{style:{shape:"pill",color:"gold",layout:"vertical",label:"subscribe"},createSubscription:function(e,n){return n.subscription.create({plan_id:t,userAction:"SUBSCRIBE_NOW"})},onApprove:function(e){e.subscriptionID,e.payerID,e.payerName,e.payerEmail,e.amount,e.createTime,e.updateTime,e.links;d(!0),l(),n&&n(e)},onError:function(e){o.fn.error("Subscription failed: "+e.message)}})};var u=function(e){var t=e.handleSubscription,n=e.closeModal,r=(0,s.useState)(!1),o=(0,a.Z)(r,2),u=o[0],d=o[1];return(0,s.useEffect)((function(){if(window.paypal)d(!0);else{var e=document.createElement("script");e.src="https://www.paypal.com/sdk/js?client-id=".concat(l.Cx),e.async=!0,e.onload=function(){d(!0)},document.body.appendChild(e)}return function(){}}),[]),(0,i.jsxs)("div",{children:[(0,i.jsx)("h2",{style:{textAlign:"center"},children:"Choose a Subscription:"}),(0,i.jsx)("p",{}),u?(0,i.jsxs)("div",{className:"subscription-option",style:{textAlign:"center"},children:[(0,i.jsx)("h3",{children:"Monthly Subscription"}),(0,i.jsx)("p",{children:"$225 USD per month"}),(0,i.jsx)(c,{planId:l.$Z,handleSubscription:t,closeModal:n})]}):null,u?(0,i.jsxs)("div",{className:"subscription-option",style:{textAlign:"center"},children:[(0,i.jsx)("h3",{children:"Annual Subscription"}),(0,i.jsx)("p",{children:"$2600 USD per year"}),(0,i.jsx)(c,{planId:l.Qt,handleSubscription:t,closeModal:n})]}):null]})}}}]);
//# sourceMappingURL=7.76d29b85.chunk.js.map