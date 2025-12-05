import { html, LitElement } from "lit";

export class ArtistsViewElement extends LitElement {

  protected createRenderRoot() {
    return this;
  }

  override render() {
    return html`
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
    `;
      
  }

}