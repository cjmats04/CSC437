import { html, css, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";

export class VenueElement extends LitElement {
  

  @property({ attribute: "img-src" })
  imgSrc?: string;

  @property({ attribute: "img-alt" })
  imgAlt?: string;

  @property()
  href?: string;

  override render() {
    return html`
      <dt id=${this.id ?? nothing} class="entity-term venue-item">
        ${this.imgSrc
          ? html`<img class="venue-image" src=${this.imgSrc} alt=${this.imgAlt ?? ""} />`
          : null}
        <slot></slot>
      </dt>
      <dd class="entity-desc">
        Events:
        ${this.href
          ? html`<a href=${this.href}><slot name="event-title"></slot></a>`
          : html`<slot name="event-title"></slot>`}
      </dd>
    `;
  }

  static styles = css`
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
  `;
}