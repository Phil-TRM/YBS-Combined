"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[7],{38682:function(e,t,n){n.r(t),n.d(t,{default:function(){return v}});var a=n(74165),r=n(15861),s=n(29439),o=n(72791),l=(n.p,n(11087)),i=n(50242),c=n(24459),u=n(24054),d=n(54945),m=n(53389),h=n(59434),f=n(25153),p=n(57689),x=n(34221),g=n(51299),b=n(6342),y=n(80184),v=function(){var e=(0,o.useState)(""),t=(0,s.Z)(e,2),n=t[0],v=t[1],j=(0,o.useState)(""),w=(0,s.Z)(j,2),N=w[0],S=w[1],k=(0,o.useState)(""),C=(0,s.Z)(k,2),Z=C[0],P=C[1],A=(0,o.useState)(""),F=(0,s.Z)(A,2),O=F[0],E=F[1],D=(0,o.useState)(""),T=(0,s.Z)(D,2),_=T[0],z=T[1],J=(0,o.useState)(""),q=(0,s.Z)(J,2),U=q[0],B=q[1],M=(0,o.useState)(""),I=(0,s.Z)(M,2),R=I[0],Y=I[1],V=(0,o.useState)(""),L=(0,s.Z)(V,2),W=L[0],$=L[1],G=(0,o.useState)(""),H=(0,s.Z)(G,2),K=H[0],Q=H[1],X=(0,o.useState)(""),ee=(0,s.Z)(X,2),te=ee[0],ne=ee[1],ae=(0,o.useState)(""),re=(0,s.Z)(ae,2),se=re[0],oe=re[1],le=(0,o.useState)("We Are Team"),ie=(0,s.Z)(le,2),ce=ie[0],ue=ie[1],de=(0,o.useState)(""),me=(0,s.Z)(de,2),he=me[0],fe=me[1],pe=(0,o.useState)(new Array),xe=(0,s.Z)(pe,2),ge=xe[0],be=xe[1],ye=(0,o.useState)(!1),ve=(0,s.Z)(ye,2),je=ve[0],we=ve[1],Ne=(0,h.I0)(),Se=(0,p.s0)();console.log("Loading");var ke=(0,o.useState)(""),Ce=(0,s.Z)(ke,2),Ze=Ce[0],Pe=Ce[1],Ae=(0,h.v9)((function(e){return e.handleMasterData})),Fe=((0,h.v9)((function(e){return e.handleUserBasicData})),(0,o.useState)(!1)),Oe=(0,s.Z)(Fe,2),Ee=Oe[0],De=Oe[1],Te=(0,o.useState)(!1),_e=(0,s.Z)(Te,2),ze=_e[0],Je=_e[1],qe=(0,o.useState)(!1),Ue=(0,s.Z)(qe,2),Be=Ue[0],Me=Ue[1],Ie=(0,o.useState)(!1),Re=(0,s.Z)(Ie,2),Ye=Re[0],Ve=Re[1];(0,o.useLayoutEffect)((function(){null!=Ae.signupData&&Pe(m._p+Ae.signupData.login),null!=Ae.prices?be(Ae.prices):be(new Array)}),[Ae]);var Le=function(){var e=(0,r.Z)((0,a.Z)().mark((function e(t){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),Ye){e.next=4;break}return x.fn.warning("Account already exists please login"),e.abrupt("return");case 4:if(je){e.next=7;break}return x.fn.warning("Please accept terms and condtions"),e.abrupt("return");case 7:if(null!=he){e.next=10;break}return x.fn.warning("Please choase a plan"),e.abrupt("return");case 10:De(!0);case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();(0,o.useEffect)((function(){ze&&(x.fn.success("Payment successful!!"),We())}),[ze]),(0,o.useEffect)((function(){var e={email:N};try{fetch(m.hJ,{method:"POST",headers:m.oF,body:JSON.stringify(e)}).then((function(e){if(!e.ok)throw Ve(!0),new Error("Something went wrong");x.fn.warning("Account already exists please login"),Ve(!1)})).catch((function(e){}))}catch(t){}}),[N]),(0,o.useEffect)((function(){var e={mobileNumber:Z};if(Z.length>=10)try{fetch(m.hJ,{method:"POST",headers:m.oF,body:JSON.stringify(e)}).then((function(e){if(!e.ok)throw Ve(!0),new Error("Something went wrong");x.fn.warning("Account already exists please login"),Ve(!1)}))}catch(t){}}),[Z]);var We=function(){var e={name:n,email:N,mobileNumber:Z,password:O,address:{city:W,state:R,contry:U,zipCode:K,streetAddress:se},designantion:_,certificate:te,userType:1,status:0,isEmailVerified:!1,howfind:ce};(0,b._)({name:n,email:N,password:O,userType:1,id:e._id}),fetch(m.Vp,{method:"POST",headers:m.oF,body:JSON.stringify(e)}).then((function(e){e.ok&&e.json().then((function(e){var t=e.data;x.fn.success("Welcome "+t.name),v(""),S(""),P(""),E(""),z(""),B(""),Y(""),$(""),Q(""),ne(""),fe(""),be(""),oe(""),ue(""),Ne((0,f.M)(t)),Ne((0,f.PN)({uid:t._id,userType:1,isLogin:!0})),localStorage.setItem("user",JSON.stringify(t));var n={transId:Be,email:N,pid:he};fetch(m.$o,{method:"PUT",headers:m.oF,body:JSON.stringify(n)}).then((function(e){e.ok&&Se("/")}))}))}))};return(0,y.jsx)(g.Vv,{options:{"client-id":m.Cx},children:(0,y.jsx)("div",{className:"w-full mx-auto",children:(0,y.jsx)("div",{className:"flex justify-center my-12",children:(0,y.jsxs)("div",{className:"w-full xl:w-3/4 lg:w-11/12 flex",children:[(0,y.jsx)("div",{className:"w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg",style:{backgroundImage:"url(".concat(Ze,")")}}),(0,y.jsx)("div",{className:"w-full xl:w-1/2 p-8",children:(0,y.jsxs)("form",{method:"post",action:"#",onSubmit:Le,children:[(0,y.jsx)("h3",{className:"my-4 text-2xl font-semibold text-[#452a72]",children:"Sign Up as a Doctor"}),(0,y.jsxs)("div",{children:[(0,y.jsxs)("span",{className:"text-gray-600 text-sm",children:["Already have an account? "," "]}),(0,y.jsx)(l.rU,{to:"/login",className:"text-gray-700 text-sm font-semibold",children:"Sign in"})]}),(0,y.jsxs)("div",{className:"grid gap-4 gap-y-3 text-sm grid-cols-1 md:grid-cols-5 mb-4 mt-6",children:[(0,y.jsxs)("div",{className:"md:col-span-5",children:[(0,y.jsx)("label",{className:"block text-gray-700 text-sm font-semibold mb-2",htmlFor:"Name",children:"Name"}),(0,y.jsx)("input",{className:"text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-50 leading-tight focus:outline-none focus:shadow-outline h-10 border border-gray-200",id:"Name",type:"text",placeholder:"Your Name",value:n,onChange:function(e){return v(e.target.value)}})]}),(0,y.jsxs)("div",{className:"md:col-span-5",children:[(0,y.jsx)("label",{className:"block text-gray-700 text-sm font-semibold mb-2",htmlFor:"email",children:"Email"}),(0,y.jsx)("input",{className:"text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-50 leading-tight focus:outline-none focus:shadow-outline h-10 border border-gray-200",id:"email",type:"email",placeholder:"Your Email",value:N,onChange:function(e){return S(e.target.value)}})]}),(0,y.jsxs)("div",{className:"md:col-span-5",children:[(0,y.jsx)("label",{className:"block text-gray-700 text-sm font-semibold mb-2",htmlFor:"mobile",children:"Mobile No"}),(0,y.jsx)("input",{className:"[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-all flex items-center  focus:outline-none h-10  mt-1  px-4 w-full bg-gray-50 border border-gray-200",id:"mobile",type:"number",placeholder:"Mobile No",value:Z,onChange:function(e){return P(e.target.value)}})]}),(0,y.jsxs)("div",{className:"md:col-span-5 ",children:[(0,y.jsx)("label",{className:"block text-gray-700 text-sm font-semibold mb-2",htmlFor:"password",children:"Password"}),(0,y.jsx)("input",{className:"text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-50  leading-tight focus:outline-none focus:shadow-outline h-10 border border-gray-200",id:"mobile",type:"password",placeholder:"Password",value:O,onChange:function(e){return E(e.target.value)}})]}),(0,y.jsxs)("div",{className:"md:col-span-5 ",children:[(0,y.jsx)("label",{className:"block text-gray-700 text-sm font-semibold mb-2",htmlFor:"Designantion",children:"Designation"}),(0,y.jsx)("input",{className:"text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-50  leading-tight focus:outline-none focus:shadow-outline h-10 border border-gray-200",id:"Designantion",type:"text",placeholder:"Designantion",value:_,onChange:function(e){return z(e.target.value)}})]}),(0,y.jsxs)("div",{className:"md:col-span-5",children:[(0,y.jsx)("label",{htmlFor:"country",className:"block text-gray-700 text-sm font-semibold mb-2",children:"Country"}),(0,y.jsxs)("select",{className:"h-10 bg-gray-50 px-2 text-gray-700 flex border w-full border-gray-200 rounded items-center mt-1 focus:outline-none",required:!0,value:U,onChange:function(e){return B(e.target.value)},children:[(0,y.jsx)("option",{value:"",children:"Country"}),i.Z.getAllCountries().map((function(e,t){return(0,y.jsx)("option",{value:e.isoCode,children:e.name},t)}))]})]}),U&&(0,y.jsxs)("div",{className:"md:col-span-5",children:[(0,y.jsx)("label",{htmlFor:"state",className:"block text-gray-700 text-sm font-semibold mb-2",children:"State / province"}),(0,y.jsxs)("select",{className:"h-10 bg-gray-50 px-2 text-gray-700 flex border w-full border-gray-200 rounded items-center mt-1 focus:outline-none",required:!0,value:R,onChange:function(e){return Y(e.target.value)},children:[(0,y.jsx)("option",{value:"",children:"State"}),c.ZP.getStatesOfCountry(U).map((function(e,t){return(0,y.jsx)("option",{value:e.isoCode,children:e.name},t)}))]})]}),R&&(0,y.jsxs)("div",{className:"md:col-span-5",children:[(0,y.jsx)("label",{htmlFor:"state",className:"block text-gray-700 text-sm font-semibold mb-2",children:"City"}),(0,y.jsxs)("select",{className:"h-10 px-2 bg-gray-50 text-gray-700 flex border w-full border-gray-200 rounded items-center mt-1 focus:outline-none",required:!0,value:W,onChange:function(e){return $(e.target.value)},children:[(0,y.jsx)("option",{value:"",children:"City"}),u.Z.getCitiesOfState(U,R).map((function(e,t){return(0,y.jsx)("option",{value:e.isoCode,children:e.name},t)}))]})]}),(0,y.jsxs)("div",{className:"md:col-span-5",children:[(0,y.jsx)("label",{htmlFor:"zipcode",className:"block text-gray-700 text-sm font-semibold mb-2",children:"Zipcode"}),(0,y.jsx)("input",{placeholder:"Zip Code",type:"number",name:"zinCode",required:!0,id:"zipcode",className:" focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50",value:K,onChange:function(e){return Q(e.target.value)}})]}),(0,y.jsxs)("div",{className:"md:col-span-5",children:[(0,y.jsx)("label",{htmlFor:"zipcode",className:"block text-gray-700 text-sm font-semibold mb-2",children:"Street address"}),(0,y.jsx)("input",{placeholder:"Street Address",name:"zinCode",required:!0,id:"zipcode",className:" focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50",value:se,onChange:function(e){return oe(e.target.value)}})]}),(0,y.jsxs)("div",{className:"md:col-span-5",children:[(0,y.jsx)("label",{htmlFor:"state",className:"block text-gray-700 text-sm font-semibold mb-2",children:"Board Certification"}),(0,y.jsxs)("select",{className:"h-10 px-2 bg-gray-50 text-gray-700 flex border w-full border-gray-200 rounded items-center mt-1 focus:outline-none",required:!0,value:te,onChange:function(e){return ne(e.target.value)},children:[(0,y.jsx)("option",{value:"Certificate",children:"Certificate"}),(0,y.jsx)("option",{value:"ABPS",children:"ABPS"}),(0,y.jsx)("option",{value:"ASPS",children:"ABFPRS"}),(0,y.jsx)("option",{value:"AAFPRS",children:"AAFPRS"}),(0,y.jsx)("option",{value:"ASOPRS",children:"ASOPRS"})]})]}),(0,y.jsxs)("div",{className:"md:col-span-5",children:[(0,y.jsx)("label",{htmlFor:"state",className:"block text-gray-700 text-sm font-semibold mb-2",children:"Choose Plan"}),(0,y.jsxs)("select",{className:"mb-4 h-10 px-2 bg-gray-50 text-gray-700 flex border w-full border-gray-200 rounded items-center mt-1 focus:outline-none",required:!0,value:he,onChange:function(e){return fe(e.target.value)},children:[(0,y.jsx)("option",{value:"0",children:"Choose Plan"}),ge.map((function(e,t){return(0,y.jsx)("option",{value:e._id,children:e.validity>30?"Yearly":"Monthly"},t)}))]}),(0,y.jsxs)("div",{className:"form-check flex justify-center items-center mx-auto",children:[(0,y.jsx)("input",{style:{width:"15px",height:"15px"},className:"form-check-input me-2 ",type:"checkbox",value:je,onChange:function(e){return we(e.target.checked)},id:"form2Example3cg"}),(0,y.jsxs)("label",{className:"form-check-label",htmlFor:"form2Example3g",children:["I agree all statements in"," ",(0,y.jsx)(l.rU,{to:"/privacyPolicy",className:"text-body",children:(0,y.jsx)("u",{children:"Terms of service"})})]})]})]})]}),(0,y.jsxs)("div",{className:"flex w-full mt-8 justify-center",children:[(0,y.jsx)("button",{style:{display:Ee?"none":"flex"},className:"justify-center w-full bg-[#452a72] hover:bg-transparent text-white hover:text-[#452a72] hover:border hover:border-[#452a72] text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10",type:"submit",children:"Subscribe"}),(0,y.jsx)(d.Z,{onClose:function(){De(!1)},open:Ee,className:"flex justify-center items-center",children:(0,y.jsx)("div",{className:"bg-white rounded-lg shadow-md p-8 w-1/3 h-1/2 overflow-scroll no-scrollbar",children:(0,y.jsx)(g.ch,{style:{layout:"vertical"},createOrder:function(e,t){for(var n,a,r=0;r<ge.length;r++){var s=ge[r];s._id==he&&(n=s.validity>30?"Yearly package":"Monthly package",a=s.price)}return t.order.create({purchase_units:[{description:n,amount:{currency_code:"USD",value:a}}]}).then((function(e){return Me(e),e}))},onApprove:function(e,t){return t.order.capture().then((function(e){e.payer;Je(!0)}))},onError:function(e,t){x.fn.error("An Error occured with your payment")}})})})]})]})})]})})})})}},6342:function(e,t,n){n.d(t,{_:function(){return o}});var a=n(34221),r=n(53389),s=function(e){var t=e,n=t.name,a=t.email,r=t.mobile,s=t.password,o=t.city,l=t.state,i=t.country,c=t.zipcode,u=t.message,d="Users";return 1==t.userType&&(d="Doctors",0),{account:{username:a,email:a,visibility:0,status:1,tagsField:[d],authclient:"YBS",authclient_id:t._id},profile:{firstname:n.split(" ").slice(0,-1).join(" "),lastname:n.split(" ").slice(-1).join(" "),zip:c,city:o,state:l,country:i,about:u,mobile:r},password:{newPassword:s,mustChangePassword:!1}}},o=function(e){fetch(r.VP,{method:"POST",headers:r.oF,body:JSON.stringify(s(e))}).then((function(e){e.ok&&e.json().then((function(e){return e})).catch((function(e){a.fn.error("An Error creating your account with the community site.")}))}))}}}]);
//# sourceMappingURL=7.080deff4.chunk.js.map