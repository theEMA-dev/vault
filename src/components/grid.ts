import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

interface Asset {
  id: number;
  src: string;
  title: string;
  release: string;
  author: string;
  resolution: string;
  sgdb?: string;
  sdb?: string;
  attributes?: string[];
  tags: string[];
}

@customElement('grid-hx')
class GridComponent extends LitElement {
  static styles = css`
    .grid {
      display: grid; 
      grid-auto-rows: auto; 
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr; 
      gap: 32px;
      padding: 88px 40px 40px 40px;
    }
    .item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      aspect-ratio: 2/3;
      background-color: var(--hx-background-alpha);
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(10px);
      border: 1px solid var(--hx-border-100);
      border-radius: 12px;
    }
    .item.horizontal img {
      border-radius: 0px;
    }
    .item img {
      max-width: 100%;
      height: auto;
      border-radius: 12px;
      cursor: pointer;
    }
    .item .info {
      margin-top: 8px;
      text-align: center;
    }
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--hx-background-alpha);
      backdrop-filter: blur(10px);
      webkit-backdrop-filter: blur(10px);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      visibility: hidden;
      opacity: 0;
      transition: visibility 0s, opacity 0.3s ease;
    }
    .overlay img {
      visibility: hidden;
      opacity: 0;
      max-width: 60vw;
      max-height: 94vh;
      transition: visibility 0s, opacity 0.3s ease;
    }
    .overlay img.visible {
      visibility: visible;
      opacity: 1;
    }
    .overlay.visible {
      visibility: visible;
      opacity: 1;
    }
    .item img.loaded {
      animation: fadeIn 0.5s ease-in-out;
    }
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    .skeleton {
      position: absolute;
      opacity: 0;
      width: auto;
      height: 94vh;
      aspect-ratio: 2/3;
      background-color: #e0e0e0;
      background-image: linear-gradient(90deg, var(--hx-background-200), var(--hx-background-300), var(--hx-background-200));
      background-size: 200% 100%;
      animation: skeleton-loading 1.5s infinite;
      transition: opacity 0.3s ease;
    }
    .skeleton.horizontal {
      width: 60vw;
      height: auto;
      aspect-ratio: 92/43;
    }
    .skeleton.visible {
      opacity: 1;
    }
    @keyframes skeleton-loading {
      0% {
        background-position: 200% 0;
      }
      100% {
        background-position: -200% 0;
      }
    }
  `;

  // ASSET GENERATE LINE (DO NOT DELETE THIS LINE)
  assets: Asset[] = [
  {
    "id": 35,
    "src": "asset/grid/thumbnail/35.jpg",
    "title": "High Strangeness",
    "release": "2015",
    "author": "Moofy",
    "resolution": "1840x860",
    "attributes": [
      "horizontal"
    ],
    "tags": [
      "black"
    ]
  },
  {
    "id": 34,
    "src": "asset/grid/thumbnail/34.jpg",
    "title": "FAST Racing Neo",
    "release": "2015",
    "author": "Moofy",
    "resolution": "1840x860",
    "attributes": [
      "horizontal"
    ],
    "tags": [
      "pink"
    ]
  },
  {
    "id": 33,
    "src": "asset/grid/thumbnail/33.jpg",
    "title": "Starblast",
    "release": "2017",
    "author": "theEMA",
    "resolution": "1200x1800",
    "tags": [
      "blue"
    ]
  },
  {
    "id": 32,
    "src": "asset/grid/thumbnail/32.jpg",
    "title": "Cyberpunk 2077",
    "release": "2020",
    "author": "theEMA",
    "resolution": "1440x2160",
    "tags": [
      "minimal",
      "white"
    ]
  },
  {
    "id": 31,
    "src": "asset/grid/thumbnail/31.jpg",
    "title": "Hollow Knight: Silksong",
    "release": "TBA",
    "author": "theEMA",
    "resolution": "2280x3420",
    "tags": []
  },
  {
    "id": 30,
    "src": "asset/grid/thumbnail/30.jpg",
    "title": "Zork Nemesis: The Forbidden Lands",
    "release": "2019",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": []
  },
  {
    "id": 29,
    "src": "asset/grid/thumbnail/29.jpg",
    "title": "ACE COMBAT™ 7: SKIES UNKNOWN",
    "release": "2019",
    "author": "theEMA",
    "resolution": "1200x1800",
    "attributes": [
      "multi"
    ],
    "tags": []
  },
  {
    "id": 28,
    "src": "asset/grid/thumbnail/28.jpg",
    "title": "ACE COMBAT™ 7: SKIES UNKNOWN",
    "release": "2019",
    "author": "theEMA",
    "resolution": "1200x1800",
    "attributes": [
      "multi"
    ],
    "tags": []
  },
  {
    "id": 27,
    "src": "asset/grid/thumbnail/27.jpg",
    "title": "Ancestors: The Humankind Odyssey",
    "release": "2020",
    "author": "theEMA",
    "resolution": "1200x1800",
    "tags": []
  },
  {
    "id": 26,
    "src": "asset/grid/thumbnail/26.jpg",
    "title": "Ancestors: The Humankind Odyssey",
    "release": "2020",
    "author": "theEMA",
    "resolution": "1200x1800",
    "tags": []
  },
  {
    "id": 25,
    "src": "asset/grid/thumbnail/25.jpg",
    "title": "Ancestors: The Humankind Odyssey",
    "release": "2020",
    "author": "theEMA",
    "resolution": "1200x1800",
    "tags": []
  },
  {
    "id": 24,
    "src": "asset/grid/thumbnail/24.jpg",
    "title": "Overwolf",
    "release": "2021",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": []
  },
  {
    "id": 23,
    "src": "asset/grid/thumbnail/23.jpg",
    "title": "Overwolf",
    "release": "2021",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": []
  },
  {
    "id": 22,
    "src": "asset/grid/thumbnail/22.jpg",
    "title": "LEGO® The Hobbit™",
    "release": "2014",
    "author": "theEMA",
    "resolution": "1200x1800",
    "tags": []
  },
  {
    "id": 21,
    "src": "asset/grid/thumbnail/21.jpg",
    "title": "Template for Lego Collection",
    "release": "2021",
    "author": "theEMA",
    "resolution": "1200x1800",
    "tags": []
  },
  {
    "id": 20,
    "src": "asset/grid/thumbnail/20.jpg",
    "title": "Fall Guys",
    "release": "2020",
    "author": "theEMA",
    "resolution": "1200x1800",
    "tags": []
  },
  {
    "id": 19,
    "src": "asset/grid/thumbnail/19.jpg",
    "title": "Portal 2",
    "release": "2011",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": []
  },
  {
    "id": 18,
    "src": "asset/grid/thumbnail/18.jpg",
    "title": "Shotcut",
    "release": "2011",
    "author": "theEMA",
    "resolution": "1200x1800",
    "tags": []
  },
  {
    "id": 17,
    "src": "asset/grid/thumbnail/17.jpg",
    "title": "Microsoft Teams",
    "release": "2019",
    "author": "theEMA",
    "resolution": "1200x1800",
    "tags": []
  },
  {
    "id": 16,
    "src": "asset/grid/thumbnail/16.jpg",
    "title": "Zoom",
    "release": "2011",
    "author": "theEMA",
    "resolution": "1200x1800",
    "tags": []
  },
  {
    "id": 15,
    "src": "asset/grid/thumbnail/15.jpg",
    "title": "Photoscape X",
    "release": "2019",
    "author": "theEMA",
    "resolution": "1200x1800",
    "tags": []
  },
  {
    "id": 14,
    "src": "asset/grid/thumbnail/14.jpg",
    "title": "GIMP",
    "release": "1996",
    "author": "theEMA",
    "resolution": "1200x1800",
    "tags": []
  },
  {
    "id": 13,
    "src": "asset/grid/thumbnail/13.jpg",
    "title": "Paint.NET",
    "release": "2009",
    "author": "theEMA",
    "resolution": "1200x1800",
    "tags": []
  },
  {
    "id": 12,
    "src": "asset/grid/thumbnail/12.jpg",
    "title": "Visual Studio Code",
    "release": "2016",
    "author": "theEMA",
    "resolution": "1200x1800",
    "tags": []
  },
  {
    "id": 11,
    "src": "asset/grid/thumbnail/11.jpg",
    "title": "Discord",
    "release": "2019",
    "author": "theEMA",
    "resolution": "1200x1800",
    "tags": []
  },
  {
    "id": 10,
    "src": "asset/grid/thumbnail/10.jpg",
    "title": "Spotify",
    "release": "2009",
    "author": "theEMA",
    "resolution": "1200x1800",
    "tags": []
  },
  {
    "id": 9,
    "src": "asset/grid/thumbnail/9.jpg",
    "title": "Template for Software Collection",
    "release": "2021",
    "author": "theEMA",
    "resolution": "1200x1800",
    "tags": []
  },
  {
    "id": 8,
    "src": "asset/grid/thumbnail/8.jpg",
    "title": "Oxygen Not Included",
    "release": "2019",
    "author": "theEMA",
    "resolution": "1200x1800",
    "tags": []
  },
  {
    "id": 7,
    "src": "asset/grid/thumbnail/7.jpg",
    "title": "Payday 2",
    "release": "2013",
    "author": "theEMA",
    "resolution": "1200x1800",
    "tags": []
  },
  {
    "id": 6,
    "src": "asset/grid/thumbnail/6.jpg",
    "title": "Skul: The Hero Slayer",
    "release": "2020",
    "author": "theEMA",
    "resolution": "1200x1800",
    "tags": []
  },
  {
    "id": 5,
    "src": "asset/grid/thumbnail/5.jpg",
    "title": "Among Us",
    "release": "2018",
    "author": "theEMA",
    "resolution": "1200x1800",
    "sgdb": "null",
    "sdb": "https://steamdb.info/app/945360/",
    "tags": []
  },
  {
    "id": 4,
    "src": "asset/grid/thumbnail/4.jpg",
    "title": "Maid of Sker",
    "release": "2020",
    "author": "theEMA",
    "resolution": "1200x1800",
    "sgdb": "null",
    "sdb": "https://steamdb.info/app/826940/",
    "tags": []
  },
  {
    "id": 3,
    "src": "asset/grid/thumbnail/3.jpg",
    "title": "Parkasaurus",
    "release": "2018",
    "author": "theEMA",
    "resolution": "1200x1800",
    "sgdb": "null",
    "sdb": "https://steamdb.info/app/591460/",
    "tags": []
  },
  {
    "id": 2,
    "src": "asset/grid/thumbnail/2.jpg",
    "title": "Factorio",
    "release": "2016",
    "author": "theEMA",
    "resolution": "1200x1800",
    "sgdb": "null",
    "sdb": "https://steamdb.info/app/427520/",
    "tags": []
  },
  {
    "id": 1,
    "src": "asset/grid/thumbnail/1.jpg",
    "title": "Aion: The Tower of Eternity Collector Edition",
    "release": "2009",
    "author": "theEMA",
    "resolution": "1200x1800",
    "sgdb": "null",
    "sdb": "https://steamdb.info/app/29670/",
    "tags": []
  }
];

  // ASSET GENERATE LINE END (DO NOT DELETE THIS LINE)

  private showOverlay(src: number) {
    const overlay = this.shadowRoot?.querySelector('.overlay');
    const overlayImg = overlay?.querySelector('img');
    const skeleton = overlay?.querySelector('.skeleton');
    if (overlay && overlayImg && skeleton) {
      overlayImg.src = "";
      this.assets.find(asset => asset.id === src)?.attributes?.includes('horizontal') ? skeleton.classList.add('horizontal') : skeleton.classList.remove('horizontal');
      skeleton.classList.add('visible');
      overlayImg.src = "asset/grid/" + src + ".png";
      overlayImg.onload = () => {
        overlayImg.classList.add('visible');
        skeleton.classList.remove('visible');
      };
      overlay.classList.add('visible');
      window.addEventListener('scroll', this.hideOverlay.bind(this), { once: true });
    }
  }

  private hideOverlay() {
    const overlay = this.shadowRoot?.querySelector('.overlay');
    const overlayImg = overlay?.querySelector('img');
    if (overlay) {
      overlay.animate([
        { opacity: 1 },
        { opacity: 0 }
      ], {
        duration: 300,
        easing: 'ease'
      }).onfinish = () => {
        overlay.classList.remove('visible');
      };
      overlayImg?.classList.remove('visible');
    }
  }

  private lazyLoadImages() {
    const images = this.shadowRoot?.querySelectorAll('img[data-src]');
    if (images) {
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.style.opacity = '0';
            img.src = img.dataset.src!;
            img.onload = () => {
              img.style.transition = 'opacity 0.3s ease-in-out';
              img.style.opacity = '1';
              img.classList.add('loaded');
            };
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '10% 0px'
      });

      images.forEach(img => observer.observe(img));
    }
  }

  updated() {
    this.lazyLoadImages();
  }

  render() {
    return html`
      <div class="grid">
        ${this.assets.map((asset) => html`
          <div class="item${asset.attributes ? " " + asset.attributes[0] : ""}">
            <img data-src="${asset.src}" @click="${() => this.showOverlay(asset.id)}">
          </div>
        `)}
      </div>
      <div class="overlay" @click="${this.hideOverlay}">
        <div class="skeleton"></div>
        <img src="" alt="Zoomed Image">
      </div>
    `;
  }
}