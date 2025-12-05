import{i as l,O as g,x as n,a as m,r as c,c as L,n as p,E as J,d as U,_ as B,s as E,h as M,b as Y}from"./state-BwQnOobu.js";const D={};function G(s,e,t){switch(s[0]){case"profile/request":return console.log("Handling profile/request"),{...e};case"profile/load":return console.log("Handling profile/load"),t.authenticated,{...e,profiles:[...e.profiles||[],s[1].profile]};default:throw new Error(`Unhandled Auth message "${s[0]}"`)}}var H=Object.defineProperty,S=(s,e,t,a)=>{for(var i=void 0,r=s.length-1,o;r>=0;r--)(o=s[r])&&(i=o(e,t,i)||i);return i&&H(e,t,i),i};const C=class C extends l{constructor(){super(...arguments),this._authObserver=new g(this,"cf:auth")}createRenderRoot(){return this}get authorization(){if(this._user?.authenticated)return console.log("Providing auth header with token"),{Authorization:`Bearer ${this._user.token}`};console.log("No authenticated user; no auth header")}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{this._user=e.user,this._user?.authenticated?fetch(`/api/profiles/${this._user.username}`,{headers:this.authorization}).then(t=>{if(t.ok)return t.json();console.error("Failed to fetch profile",t.status)}).then(t=>{t&&(this._profile=t)}).catch(t=>{console.error("Error fetching profile",t)}):this._profile=void 0})}renderLoginStatus(){return console.log("Rendering logged-in status for",this._user),this._user?.authenticated?this._profile?n`<div class="login-status">Hello, ${this._profile.name}</div>`:n`<div class="login-status">Loading user profile...</div>`:n`<button class="login-button" onclick="location.href='/login.html'">Log In</button>`}render(){return n`
      <header class="app-header">
        <h1 class="site-title">ConcertFinder</h1>

        ${this.renderLoginStatus()}
        
        <nav class="site-nav" aria-label="Main navigation">
          <div class="nav-list">
            <div class="nav-item"><a class="nav-link" href="/app/concerts">Concerts</a></div>
            <div class="nav-item"><a class="nav-link" href="/app/artists">Artists</a></div>
            <div class="nav-item"><a class="nav-link" href="/app/venues">Venues</a></div>
            <div class="nav-item"><a class="nav-link" href="/app/profile">Profile</a></div>
          </div>
        </nav>
      </header>
    `}};C.styles=m`
    :host { display: block; }

    .app-header {
      background: var(--page-surface);
      padding: calc(var(--space) * 0.6) calc(var(--space) * 1);
      border-bottom: 1px solid rgba(0,0,0,0.06);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: calc(var(--space) * 1);
    }

    .site-title {
      margin: 0 0 0.25rem 0;
      font-size: 1.125rem;
    }

    .site-nav .nav-list {
      margin: 0;
      padding: 0;
      display: flex;
      gap: calc(var(--space) * 0.5);
      align-items: center;
    }

    .site-nav .nav-list .nav-item {
      padding: 0;
      margin: 0;
      display: inline-block;
    }

    .site-nav .nav-link { padding: 0.25rem 0.5rem; display:inline-block; }

    /* Login button styling when user is not authenticated */
    .login-button {
      padding: 0.45rem 0.75rem;
      border-radius: calc(var(--radius-md, 8px) / 1.2);
      background: var(--primary);
      color: var(--primary-foreground, #fff);
      border: none;
      cursor: pointer;
      font-weight: 700;
      box-shadow: 0 2px 6px rgba(2,6,23,0.06);
      transition: transform 120ms var(--ease, ease), box-shadow 120ms var(--ease, ease);
    }
    .login-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 18px rgba(2,6,23,0.08);
    }

    .login-status {
      color: var(--muted);
      font-weight: 600;
      padding-right: calc(var(--space) * 0.5);
    }

    @media (max-width: 720px) {
      .app-header {
        flex-direction: column;
        align-items: stretch;
      }
      .site-title { margin-bottom: calc(var(--space) * 0.5); }
      .site-nav .nav-list { flex-direction: column; gap: calc(var(--space) * 0.25); align-items: stretch; }
      .site-nav .nav-list .nav-item { display:block; }
      .site-nav .nav-link { display:block; width:100%; padding: calc(var(--space) * 0.5) calc(var(--space) * 0.75); }
    }
  `;let f=C;S([c()],f.prototype,"_user");S([c()],f.prototype,"_profile");customElements.get("cf-header")||customElements.define("cf-header",f);var q=Object.defineProperty,F=(s,e,t,a)=>{for(var i=void 0,r=s.length-1,o;r>=0;r--)(o=s[r])&&(i=o(e,t,i)||i);return i&&q(e,t,i),i};const z=class z extends l{constructor(){super(...arguments),this.venues=[],this._authObserver=new g(this,"cf:auth")}get authorization(){if(this._user?.authenticated)return console.log("Providing auth header with token"),{Authorization:`Bearer ${this._user.token}`};console.log("No authenticated user; no auth header")}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{this._user=e.user}),this.src&&this.hydrate(this.src)}async hydrate(e){try{const t=await fetch(e,{headers:this.authorization});if(!t.ok){console.error("Failed to fetch",e,t.status);return}const a=await t.json();Array.isArray(a)?this.venues=a:a&&Array.isArray(a.venues)?this.venues=a.venues:console.warn("Unexpected JSON structure for",e)}catch(t){console.error("Error hydrating venues from",e,t)}}renderVenue(e){return n`
      <concert-venue
        id=${e.id??""}
        img-src=${e.imgSrc??""}
        img-alt=${e.imgAlt??""}
        href=${e.href??""}
      >
        <a href=/app/venues/${e.id??""} class="venue-link"><strong>${e.name}</strong></a>
        <span slot="event-title">${e.eventTitle??""}</span>
      </concert-venue>
      <br>
    `}render(){return n`
      <dl class="entity-list venues-list">
        ${this.venues.map(e=>this.renderVenue(e))}
      </dl>
    `}};z.styles=L`
    .venue-link {
      text-decoration: none;
      color: inherit;
    }
    .venue-link:hover {
      text-decoration: underline;
    }
  `;let k=z;F([p()],k.prototype,"src");F([c()],k.prototype,"venues");var W=Object.defineProperty,$=(s,e,t,a)=>{for(var i=void 0,r=s.length-1,o;r>=0;r--)(o=s[r])&&(i=o(e,t,i)||i);return i&&W(e,t,i),i};const P=class P extends l{render(){return n`
      <dt id=${this.id??J} class="entity-term venue-item">
        ${this.imgSrc?n`<img class="venue-image" src=${this.imgSrc} alt=${this.imgAlt??""} />`:null}
        <slot></slot>
      </dt>
      <dd class="entity-desc">
        Events:
        ${this.href?n`<a href=${this.href}><slot name="event-title"></slot></a>`:n`<slot name="event-title"></slot>`}
      </dd>
    `}};P.styles=m`
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
  `;let v=P;$([p({attribute:"img-src"})],v.prototype,"imgSrc");$([p({attribute:"img-alt"})],v.prototype,"imgAlt");$([p()],v.prototype,"href");var K=Object.defineProperty,b=(s,e,t,a)=>{for(var i=void 0,r=s.length-1,o;r>=0;r--)(o=s[r])&&(i=o(e,t,i)||i);return i&&K(e,t,i),i};const j=class j extends l{constructor(){super(...arguments),this.concert=null,this.venue=null,this.tickets=[],this._authObserver=new g(this,"cf:auth")}get src(){return this.concertid?`/api/concerts/${this.concertid}`:void 0}get authorization(){if(this._user?.authenticated)return console.log("Providing auth header with token"),{Authorization:`Bearer ${this._user.token}`};console.log("No authenticated user; no auth header")}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{this._user=e.user}),this.src&&this.hydrate(this.src)}async hydrate(e){try{const t=await fetch(e,{headers:this.authorization});if(!t.ok){console.error("Failed to fetch",e,t.status);return}const a=await t.json();if(a){this.concert=a;const i=await fetch(`/api/venues/${this.concert.venueId}`,{headers:this.authorization});if(i.ok){const r=await i.json();this.venue=r}else console.error("Failed to fetch venue",this.concert.venueId,i.status);for(const r of this.concert.tickets){const o=await fetch(`/api/tickets/${r}`,{headers:this.authorization});if(o.ok){const R=await o.json();this.tickets=[...this.tickets,R],console.log("Fetched ticket for concert:",R)}else console.error("Failed to fetch ticket",r,o.status)}}else console.warn("Unexpected JSON structure for",e)}catch(t){console.error("Error hydrating venues from",e,t)}}render(){return n`
      <dt id="concert1" class="entity-term concert-item">
        <span class="concert-title"><a href="/app/concerts/${this.concert?.id??""}" class="concert-link">${this.concert?.title??""}</a></span>
        <svg class="icon">
          <use href=${this.concert?.iconSrc??""} />
        </svg>
      </dt>
      <dd class="entity-desc">
        <strong>Date/Time:</strong> ${this.concert?.date??""}<br>
        <strong>Venue:</strong> <a href="/app/venues/${this.venue?.id??""}">${this.venue?.name??""}</a><br>
        <strong>Artist:</strong> <a href="/app/artists">${this.concert?.artist??""}</a><br>
        <strong>Genre:</strong> ${this.concert?.genre??""}<br>
        <strong>Tickets:</strong><br>
          ${this.tickets.map(e=>n`<a href="/app/tickets/${e.id}" class="ticket-link">${e.type}</a><br>`)}
      </dd>
    `}};j.styles=m`
    dl.entity-list {
      margin: 0;
      padding: 0;
    }
    dl.entity-list dt.entity-term {
      margin: 0 0 0.25rem 0;
      font-weight: 600;
      color: inherit;
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }
    dl.entity-list dd.entity-desc {
      margin: 0 0 1rem 0;
      color: var(--text);
      padding-left: 0;
    }

    /* make icons align when placed inside dt */
    svg.icon {
      display: inline;
      height: 2em;
      width: 2em;
      vertical-align: top;
      fill: currentColor;
    }

    a { text-decoration: none;}
    a:hover { text-decoration: underline; }

    .ticket-link { margin-left: 1rem; }
    .concert-link { font-size: 1.25rem; font-weight: bold; color: inherit; }
  `;let d=j;b([p({attribute:"concert-id"})],d.prototype,"concertid");b([c()],d.prototype,"concert");b([c()],d.prototype,"venue");b([c()],d.prototype,"tickets");const A=class A extends l{createRenderRoot(){return this}render(){return n`
      <main class="app-main page-venues" id="main">
        <section class="content venues-content">
          <h1 class="page-title">All Venues</h1>
          <concert-venues src="/api/venues"></concert-venues>
        </section>
      </main>
    `}};A.styles=m`

  `;let w=A;var Q=Object.defineProperty,V=(s,e,t,a)=>{for(var i=void 0,r=s.length-1,o;r>=0;r--)(o=s[r])&&(i=o(e,t,i)||i);return i&&Q(e,t,i),i};class N extends l{constructor(){super(...arguments),this.concerts=[]}get src(){return"/api/concerts"}async connectedCallback(){super.connectedCallback();try{const e=await fetch(this.src);e.ok?this.concerts=await e.json():console.error("Failed to fetch concerts",e.status)}catch(e){console.error("Error fetching concerts",e)}}createRenderRoot(){return this}render(){return n`
      <main class="app-main page-concerts" id="main">
        <section class="content concerts-content">
          <h1 class="page-title">All Concerts</h1>
          <dl class="entity-list concerts-list">
            ${this.concerts.map(e=>n`
              <concert-item concert-id="${e.id}"></concert-item>
              <br>
            `)}
          </dl>
          
        </section>
      </main>
    `}}V([c()],N.prototype,"concerts");class X extends l{createRenderRoot(){return this}render(){return n`
      <main class="app-main page-artists" id="main">
        <section class="content artists-content">
          <h1 class="page-title">All Artists</h1>
          <dl class="entity-list artists-list">
            <dt id="artist1" class="entity-term artist-item">The Rockers</dt>
            <dd class="entity-desc">
              (<a href="concerts.html#concert1">Rock Night Live</a>)<br>
              Genre: <a href="genres.html#rock">Rock</a>
            </dd>

            <dt id="artist2" class="entity-term artist-item">Smooth Jazz Ensemble</dt>
            <dd class="entity-desc">
              (<a href="concerts.html#concert2">Jazz in the Park</a>)<br>
              Genre: <a href="genres.html#jazz">Jazz</a>
            </dd>
          </dl>
        </section>
      </main>
    `}}var Z=Object.defineProperty,I=(s,e,t,a)=>{for(var i=void 0,r=s.length-1,o;r>=0;r--)(o=s[r])&&(i=o(e,t,i)||i);return i&&Z(e,t,i),i};class x extends l{constructor(){super(...arguments),this.venue=null,this._authObserver=new g(this,"cf:auth")}get src(){return this.venueid?`/api/venues/${this.venueid}`:void 0}get authorization(){if(this._user?.authenticated)return console.log("Providing auth header with token"),{Authorization:`Bearer ${this._user.token}`};console.log("No authenticated user; no auth header")}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{this._user=e.user}),this.src&&this.hydrate(this.src)}async hydrate(e){try{const t=await fetch(e,{headers:this.authorization});if(!t.ok){console.error("Failed to fetch",e,t.status);return}const a=await t.json();a?this.venue=a:console.warn("Unexpected JSON structure for",e)}catch(t){console.error("Error hydrating venues from",e,t)}}renderVenue(e){return n`
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
        ${this.venue?this.renderVenue(this.venue):n`<p>No venue data available.</p>`}
      </dl>
    `}}I([p({attribute:"venue-id"})],x.prototype,"venueid");I([c()],x.prototype,"venue");var ee=Object.defineProperty,_=(s,e,t,a)=>{for(var i=void 0,r=s.length-1,o;r>=0;r--)(o=s[r])&&(i=o(e,t,i)||i);return i&&ee(e,t,i),i};const O=class O extends l{constructor(){super(...arguments),this.ticket=null,this.concert=null,this._authObserver=new g(this,"cf:auth")}get src(){return this.ticketid?`/api/tickets/${this.ticketid}`:void 0}get authorization(){if(this._user?.authenticated)return console.log("Providing auth header with token"),{Authorization:`Bearer ${this._user.token}`};console.log("No authenticated user; no auth header")}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{this._user=e.user,this._user?.authenticated?fetch(`/api/profiles/${this._user.username}`,{headers:this.authorization}).then(t=>{if(t.ok)return t.json();console.error("Failed to fetch profile",t.status)}).then(t=>{if(t)this._profile=t;else throw`Profile not found for user ${this._user?.username}`}).catch(t=>{console.error("Error fetching profile",t)}):this._profile=void 0}),this.src&&this.hydrate(this.src)}async hydrate(e){try{const t=await fetch(e,{headers:this.authorization});if(!t.ok){console.error("Failed to fetch",e,t.status);return}const a=await t.json();if(a){this.ticket=a;const i=await fetch(`/api/concerts/${this.ticket.concertId}`,{headers:this.authorization});if(i.ok){const r=await i.json();this.concert=r,console.log("Fetched concert for ticket:",this.concert)}else console.error("Failed to fetch concert",this.ticket.concertId,i.status)}else console.warn("Unexpected JSON structure for",e)}catch(t){console.error("Error hydrating venues from",e,t)}}addTicketToProfile(){this._profile&&this.ticket&&(this._profile.tickets.includes(this.ticket.id)||(this._profile={...this._profile,tickets:[...this._profile.tickets,this.ticket.id]},fetch(`/api/profiles/${this._profile.uid}`,{method:"PUT",headers:{"Content-Type":"application/json",...this.authorization},body:JSON.stringify(this._profile)}).catch(e=>console.error("Failed to update profile",e))))}renderAddButton(){if(this._user?.authenticated){if(this._profile&&this.ticket)return console.log("Profile tickets:",this._profile.tickets),console.log("Current ticket ID:",this.ticket.id),this._profile.tickets.includes(this.ticket.id)?n`<button disabled>Added to Profile</button>`:n`<button @click=${()=>{this.addTicketToProfile()}}>Add Ticket to Profile</button>`}else return n`<button @click=${()=>{const e=window.location.pathname;window.location.href=`/login.html?redirect=${encodeURIComponent(e)}`}}>Log in to add</button>`}renderTicket(e){return n`
      <section class="ticket-details">
        <h1>Ticket Details</h1>
        ${this.concert?n`<p><strong>Concert:</strong> <a href="/app/concerts/${this.concert.id}">${this.concert.title}</a></p>`:n`<p>Loading concert details...</p>`}
        <p><strong>Type:</strong> ${e.type}</p> 
        <p><strong>Description:</strong> ${e.description}</p>
        <p><strong>Price:</strong> $${e.price.toFixed(2)}</p>
        <br>

        ${this.renderAddButton()}
      </section>
      
    `}render(){return n`
      ${this.ticket?this.renderTicket(this.ticket):n`<p>No ticket data available.</p>`}
    `}};O.styles=m`
    .ticket-details {
      border: 1px solid #ccc;
      padding: 16px;
      border-radius: 8px;
      max-width: 600px;
      margin: 0 auto;
      background-color: #f9f9f9;
    }
    .ticket-details h1 {
      text-align: center;
    }
    .ticket-details p {
      font-size: 1.1rem;
      margin: 8px 0;
    }

    a {
      text-decoration: none;
      color: var(--link);
    }

    a:hover {
      text-decoration: underline;
    }

    button {
      display: block;
      margin: 16px auto 0;
      padding: 8px 16px;
      font-size: 1rem;
      cursor: pointer;
    }
  `;let h=O;_([p({attribute:"ticket-id"})],h.prototype,"ticketid");_([c()],h.prototype,"ticket");_([c()],h.prototype,"concert");_([c()],h.prototype,"_user");_([c()],h.prototype,"_profile");var te=Object.defineProperty,y=(s,e,t,a)=>{for(var i=void 0,r=s.length-1,o;r>=0;r--)(o=s[r])&&(i=o(e,t,i)||i);return i&&te(e,t,i),i};const T=class T extends l{constructor(){super(...arguments),this._authObserver=new g(this,"cf:auth")}get authorization(){if(this._user?.authenticated)return console.log("Providing auth header with token"),{Authorization:`Bearer ${this._user.token}`};console.log("No authenticated user; no auth header")}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{this._user=e.user,this._user?.authenticated?fetch(`/api/profiles/${this._user.username}`,{headers:this.authorization}).then(t=>{if(t.ok)return t.json();console.error("Failed to fetch profile",t.status)}).then(t=>{if(t){this._profile=t;for(const a of this._profile.tickets)fetch(`/api/tickets/${a}`,{headers:this.authorization}).then(i=>{if(i.ok)return i.json();console.error("Failed to fetch ticket",i.status)}).then(i=>{i&&(this._tickets||(this._tickets=[]),this._tickets=[...this._tickets,i],fetch(`/api/concerts/${i.concertId}`,{headers:this.authorization}).then(r=>{if(r.ok)return r.json();console.error("Failed to fetch concert",r.status)}).then(r=>{r&&(this._concerts||(this._concerts=[]),this._concerts.find(o=>o.id===r.id)||(this._concerts=[...this._concerts,r]))}).catch(r=>{console.error("Error fetching concert",r)}))}).catch(i=>{console.error("Error fetching ticket",i)})}else throw`Profile not found for user ${this._user?.username}`}).catch(t=>{console.error("Error fetching profile",t)}):this._profile=void 0})}logout(){localStorage.removeItem("mu:auth:jwt"),window.location.href="/app/concerts"}deleteTicket(e){this._profile&&(this._profile={...this._profile,tickets:this._profile.tickets.filter(t=>t!==e)},this._tickets=this._tickets?.filter(t=>t.id!==e),fetch(`/api/profiles/${this._profile.uid}`,{method:"PUT",headers:{"Content-Type":"application/json",...this.authorization},body:JSON.stringify(this._profile)}).catch(t=>console.error("Failed to update profile",t)))}render(){return this._user?.authenticated&&this._profile?n`
        <div class="profile-container">
          <div class="header-profile">
            <h1>Welcome, ${this._profile.name}!</h1>
          </div>
          <div class="profile-details">
            <h2>Your Profile</h2>
            <p><strong>Username:</strong> ${this._profile.uid}</p>
            <p><strong>Email:</strong> ${this._profile.email}</p>
          </div>
          <div class="tickets-section">
            <h2>Your Tickets</h2>
            ${this._tickets&&this._tickets.length>0?n`
              <ul>
                ${this._tickets.map(e=>n`
                  <li class="ticket-item">
                    <div class="ticket-details">
                      Ticket ID: <a href="/app/tickets/${e.id}">${e.id} </a><br>
                      Concert: <a href="/app/concerts/${e.concertId}">${this._concerts?.find(t=>t.id===e.concertId)?.title}</a> <br>
                      Type: ${e.type}
                    </div>
                    <div class="ticket-actions">
                      <svg class="trash-icon" @click=${()=>this.deleteTicket(e.id)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.5001 6H3.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
                        <path d="M9.5 11L10 16" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
                        <path d="M14.5 11L14 16" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
                        <path d="M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6" stroke="#1C274C" stroke-width="1.5"/>
                        <path d="M18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5M18.8334 8.5L18.6334 11.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
                      </svg>
                    </div>
                  </li>
                `)}
              </ul>
            `:n`<p>You have no tickets.</p>`}
          </div>
          <div class="logout-section">
            <button class="logout-button" @click=${this.logout}>Log Out</button>
          </div>
        </div>
      `:n`
      <div> Loading...</div>
    `}};T.styles=m`

    a { text-decoration: none; color: inherit; }
    a:hover { text-decoration: underline; }

    .profile-container {
      max-width: 800px;
      margin-left: 1rem;
    }

    .logout-section {
      margin-top: calc(var(--space-4, 16px) * 0.5);
      display: flex;
      justify-content: flex-start;
    }

    .logout-button {
      padding: 0.6rem 0.9rem;
      border-radius: calc(var(--radius-md, 8px) / 1.3);
      background: red;
      color: white;
      border: none;
      cursor: pointer;
      font-weight: 700;
    }

    .logout-button:hover { transform: translateY(-1px); }

    .ticket-item {
      display: flex;
      gap: 0.5rem;
      width: 300px;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 0;
    }

    /* Icon styles for inline SVG <use> references */
    .trash-icon {
      width: 1.25rem;
      height: 1.25rem;
      display: inline-block;
      vertical-align: middle;
      fill: none; /* paths in icon use stroke */
      stroke: currentColor;
      color: var(--muted);
      cursor: pointer;
    }
    .ticket-actions { display:flex; align-items:center; gap:0.5rem; }
    .trash-icon:hover { color: var(--danger); transform: translateY(-1px); }

    @media (max-width: 720px) {
      .profile-details { grid-template-columns: 1fr; }
      .avatar { width: 120px; height: 120px; margin: 0 auto; }
    }
  `;let u=T;y([c()],u.prototype,"_user");y([c()],u.prototype,"_profile");y([c()],u.prototype,"_tickets");y([c()],u.prototype,"_concerts");function ie(s){if(!localStorage.getItem("mu:auth:jwt")){const t=window.location.pathname;return window.location.href=`/login.html?redirect=${encodeURIComponent(t)}`,n`<div><h1>Redirecting to login…</h1></div>`}return s}const re=[{path:"/app/venues",view:()=>n`
      <venues-view></venues-view>
    `},{path:"/app/venues/:id",view:s=>n`
      <venue-view venue-id=${s.id}></venue-view>
    `},{path:"/app/artists",view:()=>n`
      <artists-view></artists-view>
    `},{path:"/app/concerts",view:()=>n`
      <concerts-view></concerts-view>
    `},{path:"/app/concerts/:id",view:s=>n`
      <main class="app-main page-concerts" id="main">
        <section class="content concerts-content">
          <dl class="entity-list concerts-list">
            <concert-item concert-id=${s.id}></concert-item>
          </dl>
          
        </section>
      </main>
    `},{path:"/app/tickets/:id",view:s=>n`
      <ticket-view ticket-id=${s.id}></ticket-view>
    `},{path:"/app/profile",view:()=>ie(n`<profile-view></profile-view>`)},{path:"/",redirect:"/app/concerts"},{path:"/app",redirect:"/app/concerts"}];U({"mu-auth":Y.Provider,"mu-history":M.Provider,"cf-header":f,"venues-view":w,"venue-view":x,"concerts-view":N,"artists-view":X,"ticket-view":h,"profile-view":u,"concert-venue":v,"concert-venues":k,"concert-item":d,"mu-store":class extends E.Provider{constructor(){super(G,D,"cf:auth")}},"mu-switch":class extends B.Element{constructor(){super(re,"cf:history","cf:auth")}createRenderRoot(){return this}}});
