(this["webpackJsonpjournal-app"]=this["webpackJsonpjournal-app"]||[]).push([[0],{214:function(e,t,n){},215:function(e,t,n){"use strict";n.r(t);var a,r=n(5),c=n(47),o=n.n(c),s=n(15),i=n(45),u=n(77),l=n(12),d="AUTH_LOGIN",j="AUTH_LOGOUT",b="AUTH_ERROR",m="AUTH_REMOVE_ERROR",p={},f=n(24),O="[NOTES] NEW_NOTE",h="[NOTES] DROP_NOTE",_="[NOTES] SET_ACTIVE",v="[NOTES] UPDATED_NOTE",x="[NOTES] DISPLAY_IN_SIDEBAR",g="[NOTES] CLEANING_WHEN_LOGOUT",y="[NOTES] CHANGE_ORDER",N=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"asc";return e>t?"asc"===n?1:-1:e<t?"asc"===n?-1:1:0},w={notes:[],order:"asc",orderby:"cronologic",active:null},E="[UI] START_LOADING",C="[UI] FINISH_LOADING",k={loading:!1},T=Object(i.b)({ui:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:k,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case E:return Object(l.a)(Object(l.a)({},e),{},{loading:!0});case C:return Object(l.a)(Object(l.a)({},e),{},{loading:!1});default:return e}},auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:p,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case d:return{uid:t.payload.uid,name:t.payload.displayName};case j:return{};case m:return Object(l.a)(Object(l.a)({},e),{},{errors:void 0});case b:return Object(l.a)(Object(l.a)({},e),{},{errors:t.payload});default:return e}},notes:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:w,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case O:return Object(l.a)(Object(l.a)({},e),{},{notes:[t.payload].concat(Object(f.a)(e.notes))});case _:return Object(l.a)(Object(l.a)({},e),{},{active:t.payload});case x:return Object(l.a)(Object(l.a)({},e),{},{notes:t.payload});case v:var n=t.payload;return Object(l.a)(Object(l.a)({},e),{},{notes:e.notes.map((function(e){return e.id===n.id?n:e}))});case h:return Object(l.a)(Object(l.a)({},e),{},{active:null,notes:e.notes.filter((function(e){return e.id!==t.payload}))});case g:return Object(l.a)({},w);case y:var a=t.payload,r=a.order,c=void 0===r?e.order:r,o=a.orderby,s=void 0===o?e.orderby:o,i=Object(f.a)(e.notes),u="cronologic"===s?"createdAt":"title";return Object(l.a)(Object(l.a)({},e),{},{orderby:s,order:c,notes:i.sort((function(e,t){return N(e[u],t[u],c)}))});default:return e}}}),I="undefined"!==typeof window&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({trace:!0,traceLimit:15})||i.c,S=Object(i.d)(T,I(Object(i.a)(u.a))),A=n(13),B=n(35),R=n(20),P=n(78),D=n.n(P),L=n(42),G=n(0),F=n.n(G),U=n(1),H=n(27),q=n.n(H),V=n(34),X=function(){var e=Object(U.a)(F.a.mark((function e(t){var n,a;return F.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"https://api.cloudinary.com/v1_1/duik09roe341/upload","uknhgwms-react-journal",(n=new FormData).append("file",t),n.append("upload_preset","uknhgwms-react-journal"),e.prev=5,e.next=8,fetch("https://api.cloudinary.com/v1_1/duik09roe341/upload",{method:"POST",body:n});case 8:if(200!==(a=e.sent).status){e.next=13;break}return e.abrupt("return",a.json());case 13:throw a.json();case 14:e.next=19;break;case 16:e.prev=16,e.t0=e.catch(5),console.error("Failed to upload the file: "+e.t0);case 19:case"end":return e.stop()}}),e,null,[[5,16]])})));return function(t){return e.apply(this,arguments)}}(),M=n(79),z=n(80),J=Object(M.a)({apiKey:"",authDomain:"",projectId:"",storageBucket:"",messagingSenderId:"",appId:""}),W=Object(z.a)(),Y=function(e){return{type:O,payload:e}},K=function(e){return{type:_,payload:e}},Q=function(){return function(){var e=Object(U.a)(F.a.mark((function e(t,n){var a,r,c,o;return F.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=n().auth.uid,r=n().notes.active,c=r.id,o=Object(L.a)(r,["id"]),e.next=5,Object(V.g)(Object(V.d)(W,"".concat(a,"/journal/notes/").concat(c)),o).then((function(){t(Z(r)),q.a.fire({title:"Guardada exitosamente",html:"<p><small>Su nota se guard\xf3 correctamente</small></p>",icon:"success",timer:1300,showConfirmButton:!0,confirmButtonText:"Aceptar",confirmButtonColor:"limegreen"})})).catch((function(e){console.log(e.code)}));case 5:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()},Z=function(e){return{type:v,payload:Object(l.a)({},e)}},$=function(){return function(){var e=Object(U.a)(F.a.mark((function e(t,n){var a,r,c;return F.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=n().auth.uid,e.next=3,Object(V.e)(Object(V.b)(W,"".concat(a,"/journal/notes")));case 3:r=e.sent,c=[],r.forEach((function(e){c.push(Object(l.a)({id:e.id},e.data()))})),t(ee(c));case 7:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()},ee=function(e){return{type:x,payload:e}},te=function(e){return{type:h,payload:e}},ne=n(6),ae=function(e){var t=e.entry,n=(t.id,t.urlImage),a=t.title,r=t.body,c=t.createdAt,o=D()(c),i=Object(s.b)();return Object(ne.jsxs)("div",{className:"journal__entry animate__animated animate__pulse",onClick:function(){i(K(Object(l.a)({},t)))},children:[n&&Object(ne.jsx)("div",{className:"journal__entry-image animate__animated animate__fadeIn animate__slow",style:{backgroundImage:"url(".concat(n,")")}}),Object(ne.jsxs)("div",{className:"journal__entry-content",children:[Object(ne.jsx)("h5",{className:"journal__entry-title",children:a}),Object(ne.jsx)("p",{className:"journal__entry-description",children:r})]}),Object(ne.jsxs)("label",{className:"journal__entry-date",children:[o.format("dddd"),Object(ne.jsx)("span",{className:"journal__entry-day",children:o.format("Do")})]})]})},re=function(){var e=Object(s.b)(),t=Object(s.c)((function(e){return e.notes.notes})),n=Object(s.c)((function(e){return e.notes.order})),a=Object(s.c)((function(e){return e.notes.orderby})),r=function(t){var n;e((n=t.target.value,{type:y,payload:{orderby:n}}))};return Object(ne.jsxs)("div",{className:"journal__list",children:[Object(ne.jsxs)("div",{className:"journal__list-order-form",children:[Object(ne.jsx)("label",{className:"journal__list-order-title",children:" Order by: "}),Object(ne.jsx)("input",{type:"radio",name:"orderBy",value:"alphabetic",onChange:r,checked:"alphabetic"===a,id:"alphabetic"}),Object(ne.jsx)("label",{htmlFor:"alphabetic",children:"Alphabetically"}),Object(ne.jsx)("input",{type:"radio",name:"orderBy",value:"cronologic",onChange:r,checked:"cronologic"===a,id:"cronologic"}),Object(ne.jsx)("label",{htmlFor:"cronologic",children:"Cronologically"}),Object(ne.jsx)("button",{className:"btn",onClick:function(){e("asc"===n?{type:y,payload:{order:"desc"}}:{type:y,payload:{order:"asc"}})},children:Object(ne.jsx)("i",{id:"btn-sort-icon",className:"fa fa-sort-amount-".concat("asc"===n?"down-alt":"up")})})]}),t.map((function(e){return Object(ne.jsx)(ae,{entry:e},e.id)}))]})},ce=n(28),oe=function(){return{type:E}},se=function(){return{type:C}},ie=function(e,t){return{type:d,payload:{uid:e,displayName:t}}},ue=function(){return{type:j}},le=function(e){return{type:b,payload:e}},de=function(){return{type:m}},je=function(){var e=Object(s.b)(),t=Object(s.c)((function(e){return e.auth}));return Object(ne.jsxs)("aside",{className:"sidebar",children:[Object(ne.jsxs)("div",{className:"sidebar__user-info",children:[Object(ne.jsx)("i",{className:"sidebar__user-icon far fa-moon"}),Object(ne.jsx)("p",{className:"sidebar__user-name",children:t.name}),Object(ne.jsx)("button",{className:"btn sidebar__user-loggout",onClick:function(){var t=function(){var e=Object(U.a)(F.a.mark((function e(t){var n;return F.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=Object(ce.c)(J),e.next=3,Object(ce.g)(n);case 3:t(ue()),t({type:g});case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();e(t)},children:"Logout"})]}),Object(ne.jsx)("div",{className:"sidebar__new-entry",children:Object(ne.jsxs)("button",{onClick:function(){var t=function(){var e=Object(U.a)(F.a.mark((function e(t,n){var a,r,c,o;return F.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=n().auth.uid,r={title:"",body:"",urlImage:"",createdAt:(new Date).getTime()},e.next=4,Object(V.a)(Object(V.b)(W,"".concat(a,"/journal/notes")),r);case 4:c=e.sent,o=Object(l.a)({id:c.id},r),t(Y(o)),t(K(o));case 8:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}();e(t)},className:"btn",children:[Object(ne.jsxs)("div",{className:"sidebar__new-entry-icon fa-5x",children:[Object(ne.jsx)("i",{className:"far fa-calendar"}),Object(ne.jsx)("i",{className:"fas fa-plus","data-fa-transform":"shrink-8 left-9 down-5"})]}),Object(ne.jsx)("span",{className:"sidebar__new-entry-txt",children:"New Entry"})]})}),Object(ne.jsx)(re,{})]})},be=function(){return Object(ne.jsxs)("div",{className:"nothing",children:[Object(ne.jsxs)("p",{className:"nothing__content-text",children:["\xa1 Selecciona un elemento.",Object(ne.jsx)("br",{}),"O crea una nueva entrada !"]}),Object(ne.jsx)("i",{className:"far fa-star fa-5x nothing__content-icon"})]})},me=function(){var e=Object(s.b)(),t=Object(r.useRef)();return Object(ne.jsxs)("div",{className:"note__appbar",children:[Object(ne.jsx)("span",{className:"note__appbar-date",children:"28 de agosto de 2020"}),Object(ne.jsx)("input",{id:"selector__file-photo",type:"file",style:{display:"none"},onChange:function(t){var n,a=t.target.files[0];e((n=a,function(){var e=Object(U.a)(F.a.mark((function e(t,a){var r,c,o;return F.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return q.a.fire({title:"Subiendo archivos...",text:"Por favor, espere un momento...",allowOutsideClick:!1,showConfirmButton:!1,willOpen:function(){q.a.showLoading()}}),r=a().notes.active,e.next=4,X(n);case 4:return c=e.sent,o=c.secure_url,t(K(Object(l.a)(Object(l.a)({},r),{},{urlImage:o}))),e.next=9,t(Q());case 9:q.a.close();case 10:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()))},ref:t}),Object(ne.jsxs)("button",{className:"btn btn-primary",onClick:function(){t.current.click()},children:[Object(ne.jsx)("span",{className:"fas fa-cloud-upload-alt fa-sm",children:" "}),"\xa0 Subir Imagen"]}),Object(ne.jsxs)("button",{className:"btn btn-primary",onClick:function(){e(Q())},children:[Object(ne.jsx)("i",{className:"fas far fa-save fa-sm"}),"\xa0 Guardar"]})]})},pe=n(4),fe=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){},n=Object(r.useState)(e),a=Object(A.a)(n,2),c=a[0],o=a[1],s=function(e){var t=e.target,n=t.name,a=t.value;o(Object(l.a)(Object(l.a)({},c),{},Object(pe.a)({},n,a)))},i=function(e){e.preventDefault(),t(e)},u=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:e;o(t)};return[c,s,i,u]},Oe=n.p+"static/media/83968430_104662571102161_9176297833785982976_n.19fe8a86.jpg",he=function(e){var t=e.contentNote,n=Object(s.b)(),a=fe(t),c=Object(A.a)(a,4),o=c[0],i=c[1],u=c[3],l=Object(r.useRef)(t.id);Object(r.useEffect)((function(){t.id!==l.current&&(u(t),l.current=t.id)}),[t]),Object(r.useEffect)((function(){n(K(o))}),[o,n]);var d=t.urlImage||Oe;return Object(ne.jsxs)("div",{className:"note",children:[Object(ne.jsx)(me,{}),Object(ne.jsxs)("form",{className:"note__form",children:[Object(ne.jsx)("input",{type:"text",name:"title",value:o.title,onChange:i,placeholder:"Type an awesome title",className:"note__input-title animate__animated animate__slideInUp animate__slow"}),Object(ne.jsx)("textarea",{name:"body",value:o.body,onChange:i,placeholder:"Empty",className:"note__textarea animate__animated animate__fadeIn animate__slow"})]}),Object(ne.jsxs)("div",{className:"note__footer",children:[Object(ne.jsx)("img",{src:d,alt:"[note-img-preview]",className:"note__image-preview animate__animated animate__fadeIn"}),Object(ne.jsxs)("button",{className:"btn note__button-delete",onClick:function(){var e;n((e=t.id,function(){var t=Object(U.a)(F.a.mark((function t(n,a){var r;return F.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=a().auth.uid,t.prev=1,t.next=4,Object(V.c)(Object(V.d)(W,"".concat(r,"/journal/notes/").concat(e)));case 4:t.sent,n(te(e)),q.a.fire({icon:"success",timer:1250,title:"Eliminado",text:"Su nota fue eliminada",confirmButtonText:"Aceptar",confirmButtonColor:"green",showCloseButton:!0}),t.next=13;break;case 9:t.prev=9,t.t0=t.catch(1),q.a.fire({icon:"error",html:"Error en la conexi\xf3n con Firestore DB",title:"Error. <small>No pudimos terminar la eliminaci\xf3n</small>",footer:"<small>For more details: ".concat(t.t0.code,"</small>"),confirmButtonText:"Entendido",confirmButtonColor:"oragered",showCloseButton:!0}),console.error(t.t0);case 13:case"end":return t.stop()}}),t,null,[[1,9]])})));return function(e,n){return t.apply(this,arguments)}}()))},children:[Object(ne.jsx)("span",{className:"fas fa-trash-alt fa-sm"})," \xa0 Eliminar Nota"]})]})]})},_e=function(){var e=Object(s.c)((function(e){return e.notes.active}));return Object(ne.jsxs)(ne.Fragment,{children:[Object(ne.jsx)(je,{}),Object(ne.jsx)("div",{className:"home__main-content",children:e?Object(ne.jsx)(he,{contentNote:e}):Object(ne.jsx)(be,{})})]})},ve=n(36),xe=n.n(ve),ge=function(e){var t=e.errors;return void 0!==t&&Object(ne.jsx)(ne.Fragment,{children:Object(ne.jsx)("label",{className:"auth__errors",children:t})})},ye=function(){var e=Object(s.b)(),t=Object(s.c)((function(e){return e.auth})).errors,n=Object(s.c)((function(e){return e.ui})).loading,a=fe({email:"",password:""},(function(){if(xe.a.isEmpty(c.email)||xe.a.isEmpty(c.password)?(e(le("Por favor, aseg\xfarese de ingresar todos los campos.")),0):xe.a.isEmail(c.email)?xe.a.isLength(c.password,{min:6})?(void 0!==t&&e(de()),1):(e(le("La contrase\xf1a es incorrecta, como m\xednimo debe tener una longitud de 6 caracteres.")),0):(e(le("Por favor aseg\xfarese que su email es correcto, el valor ingresado no es v\xe1lido.")),0)){var n=function(e){var t=e.email,n=e.password;return function(){var e=Object(U.a)(F.a.mark((function e(a){var r;return F.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a(oe()),r=Object(ce.c)(J),e.next=4,Object(ce.e)(r,t,n).then((function(e){e.user})).catch((function(e){q.a.fire({title:"Oups! <small>Algo ocurri\xf3 mientras iniciabamos tu sesi\xf3n.</small>",html:'<p><b><small>\xbfQu\xe9 acciones puedes hacer?</small></b></p>\n                        <ul style="text-align: left">\n                            <li><small>Puedes revisar por favor tu email y contrase\xf1a.</small></li>\n                            <li><small>Tambi\xe9n que te puedes conectar a Internet. En especial a los servicios de Google.</small></li>\n                        </ul>',confirmButtonText:"Entendido",icon:"warning",iconColor:"orange",showCloseButton:!0,confirmButtonColor:"orangered",footer:"<small>Reason Code: ".concat(e.code,"</small>")})})).finally((function(){a(se())}));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}(c);e(n)}})),r=Object(A.a)(a,3),c=r[0],o=r[1],i=r[2];return Object(ne.jsxs)(ne.Fragment,{children:[Object(ne.jsx)("h4",{className:"auth__title",children:"Iniciar Sesi\xf3n"}),Object(ne.jsx)(ge,{errors:t}),Object(ne.jsxs)("form",{onSubmit:i,children:[Object(ne.jsx)("input",{type:"email",name:"email",className:"auth__input",autoComplete:"off",value:c.email,onChange:o,placeholder:"Ingresa aqu\xed tu e-mail."}),Object(ne.jsx)("input",{type:"password",name:"password",className:"auth__input",value:c.password,onChange:o,placeholder:"Escribe aqu\xed tu contrase\xf1a."}),Object(ne.jsx)("button",{className:"btn btn-primary btn-block auth__button",disabled:n,type:"submit",children:"Ingresar"}),Object(ne.jsxs)("div",{className:"auth__social-networks",children:[Object(ne.jsx)("p",{children:"Iniciar sesi\xf3n con redes sociales:"}),Object(ne.jsxs)("div",{onClick:function(t){var n=function(){var e=Object(U.a)(F.a.mark((function e(t){var n;return F.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t(oe()),n=Object(ce.c)(J),e.next=4,Object(ce.f)(n,new ce.a).then((function(e){})).catch((function(e){q.a.fire({icon:"warning",html:"<small>No se pudo iniciar la sesi\xf3n. <br/> <br/> \xbfAlcanz\xf3 a ver si ocurri\xf3 algo: con el Pop-up de autenticaci\xf3n de Google?</small>",title:"Oups! Lo sentimos.",iconHtml:'<i class="fa fa-warning"></i>',footer:"<small>Reason Code: ".concat(e.code,"</small>"),showCloseButton:!0,confirmButtonText:"Aceptar"})})).finally((function(){t(se())}));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();e(n)},disabled:n,className:"auth__google-btn",children:[Object(ne.jsx)("div",{className:"auth__google-icon-wrapper",children:Object(ne.jsx)("img",{className:"auth__google-icon",src:"https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",alt:"[google logo]"})}),Object(ne.jsx)("div",{className:"auth__google-btn-text",children:Object(ne.jsx)("b",{children:"Sign in with google"})})]})]})]}),Object(ne.jsx)(B.b,{className:"link",to:"/auth/register",children:"Crear una cuenta nueva."})]})},Ne=function(){var e=Object(s.b)(),t=Object(s.c)((function(e){return e.auth})).errors;Object(r.useEffect)((function(){e(de())}),[e]);var n=fe({username:"Francisco",email:"username@example.org",password:"122345",confirmpassword:"398174"},(function(){(xe.a.isEmpty(c.username)?(e(le("Su nombre de usuario no puede ser un valor vac\xedo")),0):xe.a.isEmail(c.email)?xe.a.isLength(c.password,{min:6})&&c.password===c.confirmpassword?(void 0!==t&&e(de()),1):(e(le("Revise su contrase\xf1a. Recuerde que no puede tener menos de 6 car\xe1cteres y\n            debe coincidir con la confirmaci\xf3n de password")),0):(e(le("El email no es v\xe1lido")),0))&&e(function(e){var t=e.email,n=e.password,a=e.username;return function(){var e=Object(U.a)(F.a.mark((function e(r){var c;return F.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r(oe()),c=Object(ce.c)(J),e.next=4,Object(ce.b)(c,t,n).then(function(){var e=Object(U.a)(F.a.mark((function e(t){var n;return F.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.user,e.next=3,Object(ce.h)(n,{displayName:a});case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){q.a.fire({title:"Oups! <small>Ahora mismo no podemos registrarte.</small>",html:"<p>Por favor... <br/> <small>Regresa m\xe1s tarde y vuelve a intentarlo ;) .</small><p>",icon:"info",iconColor:"orange",confirmButtonText:"Entiendo",confirmButtonColor:"limegreen",showCloseButton:!0,footer:"<small>Reason Code: ".concat(e.code,"</small>")})})).finally((function(){r(se())}));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}(c))})),a=Object(A.a)(n,3),c=a[0],o=a[1],i=a[2];return Object(ne.jsxs)(ne.Fragment,{children:[Object(ne.jsx)("h4",{className:"auth__title",children:"Registrar"}),Object(ne.jsx)(ge,{errors:t}),Object(ne.jsxs)("form",{onSubmit:i,children:[Object(ne.jsx)("input",{type:"text",name:"username",className:"auth__input",autoComplete:"off",placeholder:"Enter your username",onChange:o,value:c.username}),Object(ne.jsx)("input",{type:"email",name:"email",className:"auth__input",autoComplete:"off",placeholder:"Enter your e-mail",onChange:o,value:c.email}),Object(ne.jsx)("input",{type:"password",name:"password",className:"auth__input",placeholder:"Type your password",onChange:o,value:c.password}),Object(ne.jsx)("input",{type:"password",name:"confirmpassword",className:"auth__input",placeholder:"Please confirm your password",onChange:o,value:c.confirmpassword}),Object(ne.jsx)("button",{className:"btn btn-primary btn-block auth__button",type:"submit",children:"Registrarme"})]}),Object(ne.jsx)(B.b,{className:"link",to:"/auth/login",children:"\xbfYa est\xe1s registrado? Inicia Sesi\xf3n."})]})},we=function(){return Object(ne.jsx)("div",{className:"auth__main",children:Object(ne.jsx)("div",{className:"auth__box-container",children:Object(ne.jsxs)(R.d,{children:[Object(ne.jsx)(R.b,{path:"/auth/login",component:ye}),Object(ne.jsx)(R.b,{path:"/auth/register",component:Ne}),Object(ne.jsx)(R.a,{to:"/auth/login"})]})})})},Ee=n(82),Ce=n(16),ke=n(83),Te=Object(Ce.css)(a||(a=Object(Ee.a)(["\n    margin: auto;\n"]))),Ie=function(){return Object(ne.jsx)("div",{className:"loading__container",children:Object(ne.jsx)(ke.BounceLoader,{size:300,css:Te})})},Se=function(e){var t=e.isAuthenticated,n=e.component,a=e.redirectPath,r=Object(L.a)(e,["isAuthenticated","component","redirectPath"]);return Object(ne.jsx)(R.b,Object(l.a)(Object(l.a)({},r),{},{component:function(e){return t?Object(ne.jsx)(n,Object(l.a)({},e)):Object(ne.jsx)(R.a,{to:a})}}))},Ae=function(e){var t=e.isAuthenticated,n=e.component,a=e.redirectPath,r=Object(L.a)(e,["isAuthenticated","component","redirectPath"]);return Object(ne.jsx)(R.b,Object(l.a)(Object(l.a)({},r),{},{component:function(e){return t?Object(ne.jsx)(R.a,{to:a}):Object(ne.jsx)(n,Object(l.a)({},e))}}))},Be=function(){var e=Object(s.b)(),t=Object(r.useRef)(!0),n=Object(r.useState)(!0),a=Object(A.a)(n,2),c=a[0],o=a[1],i=Object(r.useState)(!1),u=Object(A.a)(i,2),l=u[0],d=u[1];return Object(r.useEffect)((function(){var n=Object(ce.c)(J);Object(ce.d)(n,(function(n){t.current&&(null===n||void 0===n?void 0:n.uid)?(e(ie(n.uid,n.displayName)),d(!0),e($())):(null===n||void 0===n?void 0:n.uid)?q.a.fire({title:"Bienvenido!",text:"Inicio de sesi\xf3n \xe9xitoso",timer:1500,timerProgressBar:!0,showConfirmButton:!0,confirmButtonText:"Aceptar",icon:"success"}).then((function(t){e(ie(n.uid,n.displayName)),d(!0),e($())})):(t.current=!1,d(!1)),o(!1)}),(function(e){q.a.fire({title:"Oups! <small>Tuvimos algunos problemas para recuperar tu sesi\xf3n.<small>",text:"Nos ayudar\xedas si revisas tu conexi\xf3n a internet. E intenta recargar la p\xe1gina nuevamente, por favor.",confirmButtonText:"Aceptar",showCloseButton:!0,icon:"info",timer:1500})}))}),[e]),c?Object(ne.jsx)(Ie,{}):Object(ne.jsx)(B.a,{children:Object(ne.jsxs)(R.d,{children:[Object(ne.jsx)(Se,{exact:!0,path:"/",isAuthenticated:l,redirectPath:"/auth/login",component:_e}),Object(ne.jsx)(Ae,{path:"/auth",isAuthenticated:l,redirectPath:"/",component:we}),Object(ne.jsx)(R.a,{to:"/"})]})})},Re=function(){return Object(ne.jsx)(s.a,{store:S,children:Object(ne.jsx)(Be,{})})};n(214);o.a.render(Object(ne.jsx)(Re,{}),document.getElementById("root"))}},[[215,1,2]]]);
//# sourceMappingURL=main.0e01ad55.chunk.js.map