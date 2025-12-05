import{i,x as s,b as t}from"./lit-element-Dzoz5mRd.js";const e=class e extends i{render(){return s`
      <header class="app-header">
        <h1 class="site-title">ConcertFinder</h1>
        <label class="darkmode-label">
          <input id="dark-mode-toggle" type="checkbox" autocomplete="off" />
          Dark mode
        </label>
        <nav class="site-nav" aria-label="Main navigation">
          <div class="nav-list">
            <div class="nav-item"><a class="nav-link" href="concerts.html">Concerts</a></div>
            <div class="nav-item"><a class="nav-link" href="artists.html">Artists</a></div>
            <div class="nav-item"><a class="nav-link" href="venues.html">Venues</a></div>
            <div class="nav-item"><a class="nav-link" href="tickets.html">Tickets</a></div>
            <div class="nav-item"><a class="nav-link" href="genres.html">Genres</a></div>
          </div>
        </nav>
      </header>
    `}};e.styles=t`
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
  `;let a=e;customElements.get("cf-header")||customElements.define("cf-header",a);export{a as A};
