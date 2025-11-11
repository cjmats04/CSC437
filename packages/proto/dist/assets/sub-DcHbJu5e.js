import"./modulepreload-polyfill-B5Qt9EMX.js";import{i as v,E as f,x as n,a as p,n as u,r as g,O as y,d as $,b}from"./state-_awXqHhp.js";var _=Object.defineProperty,c=(a,e,r,s)=>{for(var t=void 0,i=a.length-1,h;i>=0;i--)(h=a[i])&&(t=h(e,r,t)||t);return t&&_(e,r,t),t};const d=class d extends v{render(){return n`
      <dt id=${this.id??f} class="entity-term venue-item">
        ${this.imgSrc?n`<img class="venue-image" src=${this.imgSrc} alt=${this.imgAlt??""} />`:null}
        <slot></slot>
      </dt>
      <dd class="entity-desc">
        Concerts:
        ${this.href?n`<a href=${this.href}><slot name="event-title"></slot></a>`:n`<slot name="event-title"></slot>`}
      </dd>
    `}};d.styles=p`
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
  `;let o=d;c([u({attribute:"img-src"})],o.prototype,"imgSrc");c([u({attribute:"img-alt"})],o.prototype,"imgAlt");c([u()],o.prototype,"href");var x=Object.defineProperty,m=(a,e,r,s)=>{for(var t=void 0,i=a.length-1,h;i>=0;i--)(h=a[i])&&(t=h(e,r,t)||t);return t&&x(e,r,t),t};class l extends v{constructor(){super(...arguments),this.venues=[],this._authObserver=new y(this,"cf:auth")}get authorization(){if(this._user?.authenticated)return console.log("Providing auth header with token"),{Authorization:`Bearer ${this._user.token}`};console.log("No authenticated user; no auth header")}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{this._user=e.user}),this.src&&this.hydrate(this.src)}async hydrate(e){try{const r=await fetch(e,{headers:this.authorization});if(!r.ok){console.error("Failed to fetch",e,r.status);return}const s=await r.json();Array.isArray(s)?this.venues=s:s&&Array.isArray(s.venues)?this.venues=s.venues:console.warn("Unexpected JSON structure for",e)}catch(r){console.error("Error hydrating venues from",e,r)}}renderVenue(e){return n`
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
    `}}m([u()],l.prototype,"src");m([g()],l.prototype,"venues");$({"concert-venue":o,"concert-venues":l,"mu-auth":b.Provider});
