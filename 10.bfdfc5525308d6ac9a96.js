(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{"3C9V":function(e,t,o){"use strict";o.r(t),o.d(t,"PlaygroundAuthFeatureModule",function(){return b});var n=o("ofXK"),r=o("3Pt+"),l=o("tyNb"),s=o("xHha"),i=o("nDrI"),a=o("fXoL"),u=o("KG2P"),p=o("Gqot");let d=(()=>{class e{constructor(){this.model={email:"",password:"","ui-language":"en","other-languages":["en"]},this.form=new r.g({}),this.fields=[{key:"email",type:"input",templateOptions:{type:"email",label:"Email",required:!1}},{key:"password",type:"password",templateOptions:{label:"Password",required:!1}},{key:"bio",type:"textarea",templateOptions:{label:"You biography",required:!1,rows:5}},{key:"ui-language",type:"select",templateOptions:{label:"Language for the UI",required:!1,options:[{value:"en",label:"English"},{value:"es",label:"Spanish"}]}},{key:"other-languages",type:"select",templateOptions:{label:"Other languages",required:!1,multiple:!0,options:[{value:"en",label:"English"},{value:"es",label:"Spanish"}]}}]}submit(e){console.log(e)}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=a.Eb({type:e,selectors:[["playground-auth"]],decls:11,vars:7,consts:[[1,"bg-white","p-6","rounded","shadow","m-6"],[3,"form","fields","model"],[1,"flex","justify-between"],["routerLink","/register","type","button",1,"mt-6","inline-flex","items-center","px-4","py-2","border","border-transparent","text-sm","font-medium","rounded-md","shadow-sm","text-purple-600","border-purple-600","hover:bg-purple-200","focus:outline-none","focus:ring-2","focus:ring-offset-2","focus:ring-purple-500"],["type","button",1,"mt-6","inline-flex","items-center","px-4","py-2","border","border-transparent","text-sm","font-medium","rounded-md","shadow-sm","text-white","bg-purple-600","hover:bg-purple-700","focus:outline-none","focus:ring-2","focus:ring-offset-2","focus:ring-purple-500",3,"disabled","click"]],template:function(e,t){1&e&&(a.Qb(0,"playground-page"),a.Qb(1,"div",0),a.Lb(2,"playground-form",1),a.Qb(3,"div",2),a.Qb(4,"a",3),a.uc(5," Register "),a.Pb(),a.Qb(6,"button",4),a.Xb("click",function(){return t.submit(t.form.value)}),a.uc(7," Login "),a.Pb(),a.Pb(),a.Qb(8,"pre"),a.uc(9),a.bc(10,"json"),a.Pb(),a.Pb(),a.Pb()),2&e&&(a.zb(2),a.gc("form",t.form)("fields",t.fields)("model",t.model),a.zb(4),a.gc("disabled",!t.form.valid),a.zb(3),a.vc(a.cc(10,5,t.model)))},directives:[u.a,p.a,l.d],pipes:[n.f],styles:["[_nghost-%COMP%] {\n        display: block;\n      }"],changeDetection:0}),e})(),b=(()=>{class e{}return e.\u0275mod=a.Ib({type:e}),e.\u0275inj=a.Hb({factory:function(t){return new(t||e)},imports:[[n.c,r.m,l.e.forChild([{path:"",component:d}]),i.a,s.b]]}),e})()}}]);