(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{X7k5:function(e,t,o){"use strict";o.r(t),o.d(t,"PlaygroundTodosFeatureModule",function(){return $});var r=o("ofXK"),i=o("tyNb"),s=o("xHha"),n=o("WeE/"),c=o("OJFL"),d=o("nDrI"),a=o("3Pt+"),l=o("Kj3r"),b=o("wO+i"),u=o("VyYi"),g=o("fXoL");let f=(()=>{class e extends u.b{constructor(e){super(e,"todos",{delay:500})}toggleTodo(e){return this.update(e.id,Object.assign(Object.assign({},e),{done:!e.done}))}}return e.\u0275fac=function(t){return new(t||e)(g.Ub(u.a))},e.\u0275prov=g.Gb({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var p=o("ufcJ"),h=o("5Reb"),y=o("zp1y"),v=o("eIep"),m=o("vkgz"),k=o("5+tZ");let x=(()=>{class e extends h.a{constructor(e){super({todos:{status:"idle",data:[],error:""},saving:!1}),this.service=e,this.todos$=this.select(e=>e.todos),this.vm$=this.select(this.state$,({todos:{data:e,error:t,status:o},filter:r,saving:i})=>{var s;const n=null!==(s=null==e?void 0:e.filter(e=>!r||e.task.toLocaleLowerCase().includes(r.toLowerCase())))&&void 0!==s?s:[];return{filteredTodos:n,error:t,saving:i,filter:r,isEmpty:"success"===o&&!n.length,isLoading:"loading"===o&&!(null==e?void 0:e.length)}}),this.updateTodos=this.updater((e,t)=>{e.saving=!1,e.todos=t}),this.updateFilter=this.updater((e,t)=>{e.filter=t}),this.updateSaving=this.updater((e,t)=>{e.saving=t}),this.loadTodosEffect=this.effect(e=>e.pipe(Object(y.a)(this.todos$),Object(v.a)(([,{data:e=[]}])=>this.service.items(e).pipe(Object(p.b)(e=>{this.updateTodos(e)},console.error))))),this.addTodoEffect=this.effect(e=>e.pipe(Object(m.a)(()=>this.updateSaving(!0)),Object(k.a)(e=>this.service.create({task:e,done:!1}).pipe(Object(p.b)(()=>this.loadTodosEffect(),console.error))))),this.deleteTodoEffect=this.effect(e=>e.pipe(Object(k.a)(e=>this.service.delete(e.id).pipe(Object(p.b)(()=>this.loadTodosEffect(),console.error))))),this.toggleTodoEffect=this.effect(e=>e.pipe(Object(k.a)(e=>this.service.toggleTodo(e).pipe(Object(p.b)(()=>this.loadTodosEffect(),console.error)))))}}return e.\u0275fac=function(t){return new(t||e)(g.Ub(f))},e.\u0275prov=g.Gb({token:e,factory:e.\u0275fac}),e})();var T=o("KG2P"),w=o("Gqot"),O=o("qvdW"),P=o("Czul");function j(e,t){if(1&e){const e=g.Rb();g.Qb(0,"button",15),g.Xb("click",function(){return g.mc(e),g.ac(3).removeFilter()}),g.uc(1," Remove filter "),g.Pb()}}function Q(e,t){if(1&e&&(g.Ob(0),g.Qb(1,"div",12),g.Qb(2,"p"),g.uc(3,"There are no todos."),g.Pb(),g.Pb(),g.Qb(4,"div",13),g.sc(5,j,2,0,"button",14),g.Pb(),g.Nb()),2&e){const e=g.ac().ngIf;g.zb(5),g.gc("ngIf",e.filter)}}const E=function(e){return{"line-through":e}};function I(e,t){if(1&e){const e=g.Rb();g.Qb(0,"div",16),g.Xb("click",function(){g.mc(e);const o=t.$implicit;return g.ac(2).toggleTodo(o)}),g.Qb(1,"div"),g.Qb(2,"div",17),g.uc(3),g.Pb(),g.Pb(),g.Qb(4,"button",18),g.Xb("click",function(o){g.mc(e);const r=t.$implicit,i=g.ac(2);return o.stopPropagation(),i.deleteTodo(r)}),g.Lb(5,"playground-icon",19),g.Pb(),g.Pb()}if(2&e){const e=t.$implicit;g.zb(2),g.Bb(g.ic(3,E,e.done)),g.zb(1),g.wc(" ",e.task," ")}}function z(e,t){1&e&&(g.Qb(0,"div",20),g.uc(1," Saving... "),g.Pb())}function S(e,t){if(1&e){const e=g.Rb();g.Ob(0),g.Qb(1,"playground-page"),g.Qb(2,"div",1),g.Qb(3,"div",2),g.Qb(4,"div",3),g.Qb(5,"h3",4),g.uc(6,"Todos"),g.Pb(),g.Qb(7,"div",5),g.Lb(8,"playground-form",6),g.Lb(9,"playground-loading",7),g.sc(10,Q,6,1,"ng-container",0),g.sc(11,I,6,5,"div",8),g.sc(12,z,2,0,"div",9),g.Pb(),g.Qb(13,"input",10,11),g.Xb("keydown.enter",function(){g.mc(e);const t=g.lc(14);return g.ac().addTodo(t)}),g.Pb(),g.Pb(),g.Pb(),g.Pb(),g.Pb(),g.Nb()}if(2&e){const e=t.ngIf,o=g.ac();g.zb(8),g.gc("form",o.form)("fields",o.fields),g.zb(1),g.gc("loading",e.isLoading),g.zb(1),g.gc("ngIf",e.isEmpty),g.zb(1),g.gc("ngForOf",e.filteredTodos),g.zb(1),g.gc("ngIf",e.saving)}}let L=(()=>{class e{constructor(e){this.todosStore=e,this.form=new a.g({}),this.fields=[s.a.input("query",{placeholder:"Search Todo"})],this.query=this.form.valueChanges.pipe(Object(l.a)(250),Object(b.a)("query")),this.vm$=this.todosStore.vm$}ngOnInit(){this.todosStore.updateFilter(this.query),this.todosStore.loadTodosEffect()}addTodo(e){this.todosStore.addTodoEffect(e.value),e.value=""}deleteTodo(e){this.todosStore.deleteTodoEffect(e)}toggleTodo(e){this.todosStore.toggleTodoEffect(e)}removeFilter(){this.form.setValue({query:""})}}return e.\u0275fac=function(t){return new(t||e)(g.Kb(x))},e.\u0275cmp=g.Eb({type:e,selectors:[["playground-todos"]],features:[g.yb([x])],decls:2,vars:3,consts:[[4,"ngIf"],[1,"bg-white","dark:bg-gray-800","text-gray-900","dark:text-gray-200","shadow-lg","rounded-lg","overflow-hidden","py-4","px-6"],[1,"sm:flex","sm:items-center"],[1,"flex-grow"],[1,"font-semibold","px-2","py-3","leading-tight"],[1,"w-full"],[3,"form","fields"],[3,"loading"],["class","flex cursor-pointer mb-3 hover:bg-blue-lightest rounded flex align-center justify-between bg-gray-100 dark:bg-gray-700 px-4 py-2",3,"click",4,"ngFor","ngForOf"],["class","flex cursor-pointer px-4 py-2 mb-3 bg-gray-100 dark:bg-gray-700 hover:bg-blue-lightest animate-pulse rounded",4,"ngIf"],["type","text","required","required","placeholder","Add task and hit \u23ce",1,"w-full","text-lg","bg-gray-100","dark:bg-gray-700","text-gray-700","dark:text-gray-300","rounded","px-4","py-2","focus:outline-none",3,"keydown.enter"],["task",""],["role","alert",1,"flex","items-center","justify-center","bg-gray-100","dark:bg-gray-700","px-4","py-2","mb-3","rounded"],[1,"flex","items-center","justify-center","my-3"],["class","bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded border-purple-200 px-4 py-2",3,"click",4,"ngIf"],[1,"bg-purple-100","dark:bg-purple-900","text-purple-700","dark:text-purple-300","rounded","border-purple-200","px-4","py-2",3,"click"],[1,"flex","cursor-pointer","mb-3","hover:bg-blue-lightest","rounded","flex","align-center","justify-between","bg-gray-100","dark:bg-gray-700","px-4","py-2",3,"click"],[1,"hover:text-blue-dark"],[1,"text-gray-200","hover:text-red-600",3,"click"],["icon","trash","size","sm"],[1,"flex","cursor-pointer","px-4","py-2","mb-3","bg-gray-100","dark:bg-gray-700","hover:bg-blue-lightest","animate-pulse","rounded"]],template:function(e,t){1&e&&(g.sc(0,S,15,6,"ng-container",0),g.bc(1,"async")),2&e&&g.gc("ngIf",g.cc(1,1,t.vm$))},directives:[r.l,T.a,w.a,O.a,r.k,P.a],pipes:[r.b],styles:["[_nghost-%COMP%] {\n        display: block;\n      }"],changeDetection:0}),e})(),$=(()=>{class e{}return e.\u0275mod=g.Ib({type:e}),e.\u0275inj=g.Hb({factory:function(t){return new(t||e)},imports:[[r.c,i.e.forChild([{path:"",component:L}]),n.a,c.a,d.a,s.b]]}),e})()}}]);