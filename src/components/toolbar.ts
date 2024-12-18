import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

interface DropdownOption {
  value: string;
  label: string;
}

@customElement('toolbar-hx')
export class ToolbarComponent extends LitElement {
  @property({ type: String }) 
  activeDropdown = '';

  @property({ type: Object })
  prefs = {
    preview: false,
    toolbarState: 'normal',
    keepFilters: true
  };

  @property({ type: Object })
  selectedValues = {
    resolution: ['1000x1500', '1200x1800', '1440x2160', '1843x2763', '2280x3420'] as string[],
    aspectRatio: ['2:3', '92:43'] as string[],
    sortBy: 'newest'
  };

  @property({ type: Array })
  resolutionOptions: DropdownOption[] = [
    { value: '1000x1500', label: '1000x1500' },
    { value: '1200x1800', label: '1200x1800' },
    { value: '1440x2160', label: '1440x2160' },
    { value: '1843x2763', label: '1843x2763' },
    { value: '2280x3420', label: '2280x3420' }
  ];

  @property({ type: Array })
  aspectRatioOptions: DropdownOption[] = [
    { value: '2:3', label: 'Steam Vertical (2:3)' },
    { value: '92:43', label: 'Steam Horizontal (92:43)' }
  ];

  @property({ type: Array })
  sortOptions: DropdownOption[] = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'nameasc', label: 'Name Ascending (A-Z)' },
    { value: 'namedesc', label: 'Name Descending (Z-A)' }
  ];

  static styles = css`
    :host {
      display: flex;
      justify-content: center;
      padding: .5rem 2.5rem;
      width: 100%;
      z-index: 99;
    }

    .toolbar {
      position: relative !important;
      display: flex;
      align-items: center;
      justify-content: center;
      width: auto;
      height: max-content;
      padding: 0 1rem;
      margin: .5rem 0;
      background-color: var(--hx-background-alpha-100);
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(10px);
      border: 1px solid var(--hx-border-100);
      border-radius: 30px;
      z-index: 99;
      transition: all 0.3s ease-in-out;
      opacity: 1;
      transform: translateY(0);
    }
    
    .toolbar.float {
      margin: 0;
      position: fixed !important;
      transform: translateY(-20px);
      animation: slideIn 0.3s ease-in-out forwards;
    }

    @keyframes slideIn {
      from {
        transform: translateY(-20px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    .toolbar > div {
      height: 100%;
      border-right: 1px solid var(--hx-border-100);
      position: relative;
      display: flex;
      align-items: center;
      padding: .5rem 1.5rem;
      cursor: pointer;
      user-select: none;
      transition: background-color 0.2s;
    }

    .toolbar > div#toolbar-sort span.selections {
      display: inline-block;
      overflow-x: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      width: 124px;
    }

    .toolbar > div#toolbar-prefs svg {
      margin-left: 0;
      height: 1.8rem;
    }

    .toolbar > div#toolbar-prefs .dropdown-container {
      left: auto;
      right: 0;
    }

    .toolbar > div:last-child{
      border-right: none;
    }

    .toolbar > div > span {
      font-size: 1rem;
      font-weight: 600;
      font-family: var(--hx-font-sans);
      line-height: .9;
      flex-wrap: nowrap;
      transition: filter 0.2s;
    }
    .toolbar > div span.selections {
      color: var(--hx-text-200);
      font-size: 0.875rem;
      font-weight: 400;
    }

    .dropdown-container {
      position: absolute;
      top: 100%;
      left: 0;
      padding-top: 4px;
      min-width: 100%;
      width: max-content;
      z-index: 100;
    }

    .dropdown-content {
      background: var(--hx-background-alpha-100);
      -webkit-backdrop-filter: blur(6px);
      backdrop-filter: blur(6px);
      border: 1px solid var(--hx-border-100);
      border-radius: 8px;
      padding: .25rem;
      display: none;
    }

    .dropdown-content > span {
      display: block;
      color: var(--hx-text-100);
      padding: .75rem 1rem .5rem;
    }

    .toolbar > div.active .dropdown-content {
      display: block;
      animation: slideIn 0.2s ease forwards;
    }
    .toolbar > div svg {
      margin-left: .75rem;
      transition: transform 0.2s;
    }
    .toolbar > div.active svg {
      transform: rotate(180deg);
    }
    .toolbar > div#toolbar-prefs {
      color: var(--hx-text-200);
      transition: color 0.2s;
    }
    .toolbar > div#toolbar-prefs svg {
      width: 1rem;
    }
    .toolbar > div#toolbar-prefs.active {
      color: var(--hx-red-500);
    }
    .toolbar > div#toolbar-prefs.active svg {
      transform: none;
    }

    .dropdown-layout {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: .25rem;
    }

    .dropdown-item {
      padding: 0.75rem 1rem;
      transition: background-color 0.2s;
      color: var(--hx-text-200);
      font-size: 0.875rem;
      border-radius: 8px;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .dropdown-item:hover {
      background: color-mix(in srgb,#fff 5%,transparent);
    }

    .dropdown-item:hover .checkbox, .dropdown-item:hover .radio-circle {
      border-color: var(--hx-text-200);
    }

    .dropdown-item:hover .checkbox.selected, .dropdown-item:hover .radio-circle.selected {
      border-color: var(--hx-red-500);
    }

    .checkbox {
      display: inline-block;
      width: 12px;
      height: 12px;
      border: 2px solid var(--hx-border-300);
      border-radius: 4px;
      position: relative;
    }

    .checkbox.selected, .radio-circle.selected {
      border-color: var(--hx-red-500);
      background-color: var(--hx-red-100);
    }

    .radio-circle {
      width: 12px;
      height: 12px;
      border: 2px solid var(--hx-border-300);
      border-radius: 50%;
      position: relative;
    }

    /* BREAKPOINTS */
    @media (max-width: 990px) {
      :host {
        padding: .5rem 2rem;
      }
    }
    @media (max-width: 698px) {
      :host {
        padding: 1rem 2rem;
      }
      .toolbar {
        width: 100%;
        flex-wrap: wrap;
        justify-content: stretch;
        border-radius: 12px;
        margin: 0;
        padding: .5rem;
      }
      .toolbar.float {
        width: fit-content;
        margin: 0 1rem;
      }
      .toolbar > div {
        justify-content: space-between;
        border-right: none;
        flex-grow: 1;
        border-radius: 8px;
        padding: .5rem;
        margin: .125rem;
      }
      .toolbar > div.active  {
        background-color: color-mix(in srgb,#fff 5%,transparent);
      }
      .toolbar > div#toolbar-prefs {
        justify-content: center;
      }
      .toolbar > div#toolbar-prefs svg {
        width: 1rem;
        box-sizing: border-box;
      }
      .toolbar > div#toolbar-sort {
        width: calc(100% - 5rem);
      }
      .toolbar > div#toolbar-sort .dropdown-container {
      left: 0;
      right: auto;
      }
      .toolbar > div#toolbar-prefs .dropdown-container, .toolbar > div#toolbar-aspect-ratio .dropdown-container {
        left: auto;
        right: 0;
      }
      .dropdown-layout {
        grid-template-columns: 1fr;
      }
    }
    @media (max-width: 480px) {
      :host {
        padding: 1rem;
      }
      .toolbar.float {
        margin: 0 .5rem;
      }
    }
    @media (max-width: 370px) {
    }
  `;

  setActiveDropdown(type: string) {
    this.activeDropdown = this.activeDropdown === type ? '' : type;
  }

  updatePrefs(pref: 'toolbarState' | 'preview' | 'keepFilters') {
    switch (pref) {
      case 'toolbarState':
        this.prefs.toolbarState = this.prefs.toolbarState === 'normal' ? 'float' : 'normal';
        localStorage.setItem('prefs', JSON.stringify(this.prefs));
        break;
      case 'keepFilters':
        this.prefs.keepFilters = !this.prefs.keepFilters;
        localStorage.setItem('prefs', JSON.stringify(this.prefs));
        break;
      case 'preview':
        this.prefs.preview = !this.prefs.preview;
        localStorage.setItem('prefs', JSON.stringify(this.prefs));
        window.location.reload();
        break;
    }
  }

  handleCheckboxSelect(type: 'resolution' | 'aspectRatio', value: string) {
    const currentValues = [...this.selectedValues[type]];
    const index = currentValues.indexOf(value);
    
    if (index === -1) {
      currentValues.push(value);
    } else {
      currentValues.splice(index, 1);
    }

    this.selectedValues = {
      ...this.selectedValues,
      [type]: currentValues
    };
    sessionStorage.setItem('selectedValues', JSON.stringify(this.selectedValues));
  }

  handleRadioSelect(value: string) {
    this.selectedValues = {
      ...this.selectedValues,
      sortBy: value
    };
    sessionStorage.setItem('selectedValues', JSON.stringify(this.selectedValues));
  }

  firstUpdated() {
    localStorage.getItem('prefs') ? this.prefs = JSON.parse(localStorage.getItem('prefs')!) : localStorage.setItem('prefs', JSON.stringify(this.prefs));
    if (sessionStorage.getItem('selectedValues') && this.prefs.keepFilters) {
      this.selectedValues = JSON.parse(sessionStorage.getItem('selectedValues')!);
    } else {
      sessionStorage.setItem('selectedValues', JSON.stringify(this.selectedValues));
    }
  }

    render() {
      return html`
        <div class="toolbar ${this.prefs.toolbarState === 'float' ? 'float' : ''}">
          <div id="toolbar-resolution" class="${this.activeDropdown === 'resolution' ? 'active' : ''}" tabindex="0"
           @click=${() => this.setActiveDropdown('resolution')}
           @keydown=${(e: KeyboardEvent) => {
              if (e.key === 'Enter') {
                this.setActiveDropdown('resolution');
              } else if (e.key === 'Escape') {
                this.setActiveDropdown('');
              }
           }}>
        <span>Resolution${this.selectedValues.resolution.length > 0 ? html`<br><span class="selections">
          ${this.selectedValues.resolution.length === 5 ? 'All' : this.selectedValues.resolution.length + ' selected'}
        </span>` : ''}</span>
        <svg data-testid="geist-icon" height="16" stroke-linejoin="round" style="color: currentcolor;" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.0607 5.49999L13.5303 6.03032L8.7071 10.8535C8.31658 11.2441 7.68341 11.2441 7.29289 10.8535L2.46966 6.03032L1.93933 5.49999L2.99999 4.43933L3.53032 4.96966L7.99999 9.43933L12.4697 4.96966L13 4.43933L14.0607 5.49999Z" fill="currentColor"></path></svg>
        <div class="dropdown-container">
          <div class="dropdown-content">
            ${this.resolutionOptions.map(option => html`
          <div class="dropdown-item" tabindex="0"
          @click=${(e: Event) => { e.stopPropagation(); this.handleCheckboxSelect('resolution', option.value); }}
          @keydown=${(e: KeyboardEvent) => { e.stopPropagation();
            if (e.key === 'Enter') {
              this.handleCheckboxSelect('resolution', option.value);
            } else if (e.key === 'Escape') {
              this.setActiveDropdown('');
            }
          }}>
            <div class="checkbox ${this.selectedValues.resolution.includes(option.value) ? 'selected' : ''}"></div>
            <span>${option.label}</span>
          </div>
            `)}
          </div>
        </div>
          </div>
      
          <div id="toolbar-aspect-ratio" class="${this.activeDropdown === 'aspectRatio' ? 'active' : ''}" tabindex="0"
          @click=${() => this.setActiveDropdown('aspectRatio')}
           @keydown=${(e: KeyboardEvent) => {
              if (e.key === 'Enter') {
                this.setActiveDropdown('aspectRatio');
              } else if (e.key === 'Escape') {
                this.setActiveDropdown('');
              }
           }}>
           <span>Aspect Ratio${this.selectedValues.aspectRatio.length > 0 ? html`<br><span class="selections">
          ${this.selectedValues.aspectRatio.length === 2 ? 'All' : this.selectedValues.aspectRatio}
        </span>` : ''}</span>
        <svg data-testid="geist-icon" height="16" stroke-linejoin="round" style="color: currentcolor;" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.0607 5.49999L13.5303 6.03032L8.7071 10.8535C8.31658 11.2441 7.68341 11.2441 7.29289 10.8535L2.46966 6.03032L1.93933 5.49999L2.99999 4.43933L3.53032 4.96966L7.99999 9.43933L12.4697 4.96966L13 4.43933L14.0607 5.49999Z" fill="currentColor"></path></svg>
        <div class="dropdown-container">
          <div class="dropdown-content">
            ${this.aspectRatioOptions.map(option => html`
            <div class="dropdown-item" tabindex="0"
            @click=${(e: Event) => { e.stopPropagation(); this.handleCheckboxSelect('aspectRatio', option.value); }}
            @keydown=${(e: KeyboardEvent) => { e.stopPropagation();
              if (e.key === 'Enter') {
                this.handleCheckboxSelect('aspectRatio', option.value);
              } else if (e.key === 'Escape') {
                this.setActiveDropdown('');
              }
            }}>
              <div class="checkbox ${this.selectedValues.aspectRatio.includes(option.value) ? 'selected' : ''}"></div>
              <span>${option.label}</span>
              </div>`)}
            </div>
          </div>
        </div>
      
          <div id="toolbar-sort" class="${this.activeDropdown === 'sortBy' ? 'active' : ''}" tabindex="0"
          @click=${() => this.setActiveDropdown('sortBy')}
           @keydown=${(e: KeyboardEvent) => { e.stopPropagation();
              if (e.key === 'Enter') {
                this.setActiveDropdown('sortBy');
              } else if (e.key === 'Escape') {
                this.setActiveDropdown('');
              }
           }}>
        <span>Sort<br><span class="selections" tabindex="-1">${this.sortOptions.find(option => option.value === this.selectedValues.sortBy)?.label || ''}</span></span>
        <svg data-testid="geist-icon" height="16" stroke-linejoin="round" style="color: currentcolor;" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.0607 5.49999L13.5303 6.03032L8.7071 10.8535C8.31658 11.2441 7.68341 11.2441 7.29289 10.8535L2.46966 6.03032L1.93933 5.49999L2.99999 4.43933L3.53032 4.96966L7.99999 9.43933L12.4697 4.96966L13 4.43933L14.0607 5.49999Z" fill="currentColor"></path></svg>
        <div class="dropdown-container">
          <div class="dropdown-content">
            ${this.sortOptions.map(option => html`
          <div class="dropdown-item"
               @click=${(e: Event) => { e.stopPropagation(); this.handleRadioSelect(option.value);}}
               @keydown=${(e: KeyboardEvent) => { e.stopPropagation();
                if (e.key === 'Enter') {
                  this.handleRadioSelect(option.value);
                } else if (e.key === 'Escape') {
                  this.setActiveDropdown('');
                }
               }}>
            <div class="radio-circle ${this.selectedValues.sortBy === option.value ? 'selected' : ''}"></div>
            <span>${option.label}</span>
          </div>
            `)}
          </div>
        </div>
          </div>
      
          <div id="toolbar-prefs" class="${this.activeDropdown === 'prefs' ? 'active' : ''}" tabindex="0"
          @click=${() => this.setActiveDropdown('prefs')}
           @keydown=${(e: KeyboardEvent) => { e.stopPropagation();
              if (e.key === 'Enter') {
                this.setActiveDropdown('prefs');
              } else if (e.key === 'Escape') {
                this.setActiveDropdown('');
              }}}>
            <svg data-testid="geist-icon" height="16" stroke-linejoin="round" style="color: currentcolor; --darkreader-inline-color: currentcolor;" viewBox="0 0 16 16" width="16" data-darkreader-inline-color=""><path fill-rule="evenodd" clip-rule="evenodd" d="M10.75 5.5C11.7165 5.5 12.5 4.7165 12.5 3.75C12.5 2.7835 11.7165 2 10.75 2C9.7835 2 9 2.7835 9 3.75C9 4.7165 9.7835 5.5 10.75 5.5ZM10.75 0.75C12.1479 0.75 13.3225 1.70608 13.6555 3H15.25H16V4.5H15.25H13.6555C13.3225 5.79392 12.1479 6.75 10.75 6.75C9.35212 6.75 8.17754 5.79392 7.84451 4.5H0.75H0V3H0.75H7.84451C8.17754 1.70608 9.35212 0.75 10.75 0.75ZM15.25 13H16V11.5H15.25L8.15549 11.5C7.82245 10.2061 6.64788 9.25 5.25 9.25C3.85212 9.25 2.67755 10.2061 2.34451 11.5H0.75H0V13H0.75H2.34451C2.67755 14.2939 3.85212 15.25 5.25 15.25C6.64788 15.25 7.82246 14.2939 8.15549 13L15.25 13ZM7 12.2513C7 12.2509 7 12.2504 7 12.25C7 12.2496 7 12.2491 7 12.2487C6.99929 11.2828 6.21606 10.5 5.25 10.5C4.2835 10.5 3.5 11.2835 3.5 12.25C3.5 13.2165 4.2835 14 5.25 14C6.21606 14 6.99929 13.2172 7 12.2513Z" fill="currentColor" style="--darkreader-inline-fill: currentColor;" data-darkreader-inline-fill=""></path></svg>
            <div class="dropdown-container">
              <div class="dropdown-content">
                <span>Preferences</span>
                <div class="dropdown-layout">
                  <div class="dropdown-item" tabindex="0" @click=${() => this.updatePrefs('toolbarState')}
                    @keydown=${(e: KeyboardEvent) => {
                      if (e.key === 'Enter') {
                        this.updatePrefs('toolbarState');
                      } else if (e.key === 'Escape') {
                        this.setActiveDropdown('');
                      }
                    }}>
                    <div class="checkbox ${this.prefs.toolbarState === 'float' ? 'selected' : ''}"></div>
                    <span>Floating Toolbar</span>
                  </div>
                  <div class="dropdown-item" tabindex="0" @click=${() => this.updatePrefs('preview')}
                    @keydown=${(e: KeyboardEvent) => {
                      if (e.key === 'Enter') {
                        this.updatePrefs('preview');
                      } else if (e.key === 'Escape') {
                        this.setActiveDropdown('');
                      }
                    }}>
                    <div class="checkbox ${this.prefs.preview === true ? 'selected' : ''}"></div>
                    <span>Load Preview Features</span>
                  </div>
                  <div class="dropdown-item" tabindex="0" @click=${() => this.updatePrefs('keepFilters')}
                    @keydown=${(e: KeyboardEvent) => { e.stopPropagation();
                      if (e.key === 'Enter') {
                        this.updatePrefs('keepFilters');
                      } else if (e.key === 'Escape') {
                        this.setActiveDropdown('');
                      }
                    }}>
                    <div class="checkbox ${this.prefs.keepFilters === true ? 'selected' : ''}"></div>
                    <span>Store Filter Preferences</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }
}