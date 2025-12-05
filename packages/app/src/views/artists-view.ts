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
              Genre: Rock
              Shows: <a href="/app/concerts/c-001">Rock Night Live</a><br>
            </dd>

            <dt id="artist2" class="entity-term artist-item">Smooth Jazz Ensemble</dt>
            <dd class="entity-desc">
              Genre: Jazz
              Shows: <a href="/app/concerts/c-002">Jazz in the Park</a><br>
            </dd>

            <dt id="artist3" class="entity-term artist-item">Oasis</dt>
            <dd class="entity-desc">
              Genre: Rock
              Shows: <a href="/app/concerts/c-003">Oasis Reunion Tour</a><br>
            </dd>
          </dl>
        </section>
      </main>
    `;
      
  }

}