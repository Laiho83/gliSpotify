(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{QVNP:function(t,i,s){"use strict";s.r(i),s.d(i,"ArtistModule",(function(){return v}));var a=s("ofXK"),e=s("tyNb"),r=s("ocLS"),c=s("fXoL"),b=s("AcyG");const n=function(t){return[t]};function o(t,i){if(1&t&&(c.Jb(0),c.Lb(1,"div",2),c.Lb(2,"div",3),c.Lb(3,"div",4),c.Hb(4,"img",5),c.Kb(),c.Lb(5,"div",6),c.Lb(6,"p",7),c.gc(7),c.Kb(),c.Lb(8,"a",8),c.gc(9," Check it out "),c.Kb(),c.Kb(),c.Kb(),c.Kb(),c.Ib()),2&t){const t=i.$implicit,s=c.Vb();c.wb(4),c.Yb("src",t.image,c.dc)("alt",t.name),c.wb(3),c.hc(t.name),c.wb(1),c.Yb("href",c.ac(5,n,"/artist/album/"+s.artistId+":"+t.id),c.dc)("routerLink",c.ac(7,n,"/artist/album/"+s.artistId+":"+t.id))}}let l=(()=>{class t{constructor(t,i,s,a){this.router=t,this.route=i,this.store=s,this.cd=a,this.route.paramMap.subscribe(t=>{this.artistId=t.params.id.toString(),this.store.dispatch(new r.a({id:this.artistId}))})}ngOnInit(){this.albums$=this.store.select(t=>t.spotify),this.albums$.subscribe(t=>{t.activeAlbumList&&(this.albumList=t.activeAlbumList,this.cd.markForCheck())})}}return t.\u0275fac=function(i){return new(i||t)(c.Gb(e.c),c.Gb(e.a),c.Gb(b.f),c.Gb(c.i))},t.\u0275cmp=c.Ab({type:t,selectors:[["app-artist"]],decls:2,vars:1,consts:[[1,"artists","card-wrapper","row"],[4,"ngFor","ngForOf"],[1,"card"],[1,"card-inner"],[1,"media-wrapper"],[3,"src","alt"],[1,"content"],[1,"card-title"],[1,"btn",3,"href","routerLink"]],template:function(t,i){1&t&&(c.Lb(0,"div",0),c.fc(1,o,10,9,"ng-container",1),c.Kb()),2&t&&(c.wb(1),c.Yb("ngForOf",i.albumList))},directives:[a.i,e.e],styles:[""],changeDetection:0}),t})();var u=s("jhN1");function m(t,i){if(1&t&&(c.Lb(0,"div",4),c.Hb(1,"img",5),c.Lb(2,"div",6),c.Lb(3,"h2",7),c.gc(4),c.Kb(),c.Lb(5,"p",8),c.gc(6),c.Kb(),c.Lb(7,"p",9),c.gc(8),c.Wb(9,"date"),c.Kb(),c.Kb(),c.Kb()),2&t){const t=c.Vb();c.wb(1),c.Yb("src",t.activeAlbum.image,c.dc)("alt",t.activeAlbum.name),c.wb(3),c.hc(t.activeAlbum.artist),c.wb(2),c.hc(t.activeAlbum.name),c.wb(2),c.hc(c.Xb(9,5,t.setDate(t.activeAlbum.release),t.format))}}function d(t,i){if(1&t&&c.Hb(0,"iframe",13),2&t){const t=c.Vb().$implicit,i=c.Vb();c.Yb("src",i.transform(t.id),c.cc)}}function h(t,i){if(1&t&&(c.Lb(0,"div",10),c.Lb(1,"p",11),c.gc(2),c.Kb(),c.fc(3,d,1,1,"iframe",12),c.Kb()),2&t){const t=i.$implicit;c.wb(2),c.hc(t.name),c.wb(1),c.Yb("ngIf",t.id)}}const p=[{path:":id",pathMatch:"full",component:l},{path:"album/:album",pathMatch:"full",component:(()=>{class t{constructor(t,i,s){this.route=t,this.store=i,this.sanitizer=s,this.route.paramMap.subscribe(t=>{this.albumId=t.params.album.split(":"),this.store.dispatch(new r.b({id:this.albumId[1],artistId:this.albumId[0]}))})}ngOnInit(){this.album$=this.store.select(t=>t.spotify),this.album$.subscribe(t=>{t.activeAlbumList&&t.activeTracks&&(this.songLists=t.activeTracks,this.activeAlbum=t.activeAlbumList.find(i=>i.id===t.activeAlbum),console.log(this.activeAlbum))})}transform(t){return this.sanitizer.bypassSecurityTrustResourceUrl(t)}setDate(t){return new Date(t.replace(/-/g,"/"))}}return t.\u0275fac=function(i){return new(i||t)(c.Gb(e.a),c.Gb(b.f),c.Gb(u.b))},t.\u0275cmp=c.Ab({type:t,selectors:[["app-album"]],decls:4,vars:2,consts:[[1,"artist-stacks"],["class","album-details row",4,"ngIf"],[1,"track-list"],["class","row",4,"ngFor","ngForOf"],[1,"album-details","row"],[1,"album-image",3,"src","alt"],[1,"album-content"],[1,"art-name"],[1,"alb-name"],[1,"date"],[1,"row"],[1,"album-title"],["width","300","height","80","frameborder","0","allowtransparency","true","allow","encrypted-media",3,"src",4,"ngIf"],["width","300","height","80","frameborder","0","allowtransparency","true","allow","encrypted-media",3,"src"]],template:function(t,i){1&t&&(c.Lb(0,"div",0),c.fc(1,m,10,8,"div",1),c.Lb(2,"div",2),c.fc(3,h,4,2,"div",3),c.Kb(),c.Kb()),2&t&&(c.wb(1),c.Yb("ngIf",i.activeAlbum),c.wb(2),c.Yb("ngForOf",i.songLists))},directives:[a.j,a.i],pipes:[a.d],styles:[""]}),t})()}];let f=(()=>{class t{}return t.\u0275mod=c.Eb({type:t}),t.\u0275inj=c.Db({factory:function(i){return new(i||t)},imports:[[e.f.forChild(p)],e.f]}),t})();var w=s("H+bZ");let v=(()=>{class t{}return t.\u0275mod=c.Eb({type:t}),t.\u0275inj=c.Db({factory:function(i){return new(i||t)},providers:[w.a],imports:[[a.b,f]]}),t})()}}]);