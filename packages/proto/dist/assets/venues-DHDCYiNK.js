import{i as v,E as f,x as n,b as p,O as g,d as y,a as $}from"./lit-element-Dzoz5mRd.js";import{A as b}from"./cf-header-B-VDbp9Z.js";import{n as c,r as _}from"./state-CASp9Hhz.js";var x=Object.defineProperty,u=(a,e,r,s)=>{for(var t=void 0,i=a.length-1,h;i>=0;i--)(h=a[i])&&(t=h(e,r,t)||t);return t&&x(e,r,t),t};const l=class l extends v{render(){return n`
      <dt id=${this.id??f} class="entity-term venue-item">
        ${this.imgSrc?n`<img class="venue-image" src=${this.imgSrc} alt=${this.imgAlt??""} />`:null}
        <slot></slot>
      </dt>
      <dd class="entity-desc">
        Concerts:
        ${this.href?n`<a href=${this.href}><slot name="event-title"></slot></a>`:n`<slot name="event-title"></slot>`}
      </dd>
    `}};l.styles=p`
    .venue-image {
      display: block;
      width: 100%;
      max-width: 560px;
      height: 220px;
      object-fit: cover;
      border-radius: calc(var(--radius) / 1.5);
      margin-bottom: calc(var(--space) * 0.5);
    }

    @media (max-width: 720px) {
      .venue-image {
        height: 160px;
        max-width: 100%;
      }
    }
  `;let o=l;u([c({attribute:"img-src"})],o.prototype,"imgSrc");u([c({attribute:"img-alt"})],o.prototype,"imgAlt");u([c()],o.prototype,"href");var A=Object.defineProperty,m=(a,e,r,s)=>{for(var t=void 0,i=a.length-1,h;i>=0;i--)(h=a[i])&&(t=h(e,r,t)||t);return t&&A(e,r,t),t};class d extends v{constructor(){super(...arguments),this.venues=[],this._authObserver=new g(this,"cf:auth")}get authorization(){if(this._user?.authenticated)return console.log("Providing auth header with token"),{Authorization:`Bearer ${this._user.token}`};console.log("No authenticated user; no auth header")}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{this._user=e.user}),this.src&&this.hydrate(this.src)}async hydrate(e){try{const r=await fetch(e,{headers:this.authorization});if(!r.ok){console.error("Failed to fetch",e,r.status);return}const s=await r.json();Array.isArray(s)?this.venues=s:s&&Array.isArray(s.venues)?this.venues=s.venues:console.warn("Unexpected JSON structure for",e)}catch(r){console.error("Error hydrating venues from",e,r)}}renderVenue(e){return n`
      <concert-venue
        id=${e.id??""}
        img-src=${e.imgSrc??""}
        img-alt=${e.imgAlt??""}
        href=${e.href??""}
      >
        ${e.name}
        <span slot="event-title">${e.eventTitle??""}</span>
      </concert-venue>
    `}render(){return n`
      <dl class="entity-list venues-list">
        ${this.venues.map(e=>this.renderVenue(e))}
      </dl>
    `}}m([c()],d.prototype,"src");m([_()],d.prototype,"venues");y({"cf-header":b,"concert-venue":o,"concert-venues":d,"mu-auth":$.Provider});
