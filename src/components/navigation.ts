import { LitElement, html, css } from 'lit';

class NavComponent extends LitElement {
  static styles = css`
    nav {
      display: flex;
      position: fixed;
      justify-content: space-between;
      width: 100%;
      height: 48px;
      background-color: var(--hx-background-alpha);
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid var(--hx-border-100);
      z-index: 1;
    }
    .brand {
      display: flex;
      align-items: center;
      margin-left: 40px;
      color: var(--hx-text-brand);
    }
    .brand span {
      font-weight: 600;
      font-size: 1.25rem;
      margin-left: 8px;
    }
    ul {
      display: flex;
      align-items: center;
      list-style-type: none;
      margin: 0;
      margin-right: 40px;
      padding: 0;
    }
    li {
      display: inline;
      margin-left: 1em;
    }
    a {
      color: white;
      text-decoration: none;
    }
  `;

  render() {
    return html`
      <nav>
        <div class="brand">
          <svg height="1.25rem" viewBox="0 0 16 16" style="color: currentcolor;" stroke="#cacaca" stroke-width="0.00016">
            <g stroke-width="0"/><g stroke-linecap="round" stroke-linejoin="round" stroke="#ffffff" stroke-width="0.128"/><g><path d="M0 1a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm9 0a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V1zm0 9a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-5z" fill="currentColor"/></g>
          </svg>
          <span>Vault</span>
        </div>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    `;
  }
}

customElements.define('navigation-hx', NavComponent);