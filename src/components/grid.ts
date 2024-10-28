import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

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
export class GridComponent extends LitElement {
  @property({ type: String, attribute: 'collection' })
  collectionRenderer = '';

  static styles = css`
    .grid {
      display: grid; 
      grid-auto-rows: auto; 
      grid-template-columns: repeat(6, 1fr); 
      gap: 32px;
      padding: 5rem 2.5rem 2.5rem 2.5rem;
    }
    .item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      aspect-ratio: 2/3;
      background-color: var(--hx-background-alpha-100);
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
      background: var(--hx-background-alpha-100);
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
      max-height: 94dvh;
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
    .error-container {
      color: var(--hx-red-500);
      position: absolute;
      z-index: 1;
    }
    .error-container p {
      color: var(--hx-text-100);
      text-align: center;
    }
    .info-pane {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgb(10,10,10);
      background: -moz-linear-gradient(0deg, rgba(10,10,10,1) 0%, rgba(255,0,0,0) 64%);
      background: -webkit-linear-gradient(0deg, rgba(10,10,10,1) 0%, rgba(255,0,0,0) 64%);
      background: linear-gradient(0deg, rgba(10,10,10,1) 0%, rgba(255,0,0,0) 64%);
      filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#0a0a0a",endColorstr="#ff0000",GradientType=1);
      border-radius: 11px;
      z-index: 10;
      opacity: 0;
      transition: opacity 0.3s ease, transform 0.3s ease;
      pointer-events: none;
      overflow: hidden;
    }
    .info-pane.visible {
      opacity: 1;
    }
    #info-pane-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding: .5rem 1rem;
    }
    #info-pane-top span {
      font-size: .8rem;
      padding: 4px;
      border-radius: 6px;
      color: var(--hx-text-100);
      background-color: var(--hx-background-alpha-200);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      border: 1px solid var(--hx-border-200);
      line-height: 1;
    }
    #info-pane-top a > span{
      color: var(--hx-text-100);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      padding: 6px;
      transition: color 0.3s ease-in-out;
      pointer-events: all;
    }
    #info-pane-top a:hover > span {
      color: var(--hx-text-brand);
    }
    #info-pane-bottom {
      padding: 1.5rem 1rem;
    }
    #info-pane-bottom p {
      color: var(--hx-text-200);
      margin: 0;
      font-size: .9rem;
      font-weight: 500;
    }
    #info-pane-bottom h2 {
      color: var(--hx-text-100);
      margin-bottom: 8px;
      font-size: 1.25rem;
      font-weight: 700;
      line-height: 1;
    }
    .info-overlay {
      display: flex;
      flex-direction: column;
      position: absolute;
      justify-content: space-between;
      align-items: center;
      opacity: 1;
      width: auto;
      height: 94dvh;
      height: 94vh;
      aspect-ratio: 2/3;
      transition: opacity 0.3s ease-in-out;
    }
    .info-overlay.horizontal {
      width: 60vw;
      height: auto;
      aspect-ratio: 92/43;
    }
    .info-overlay > div {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      transition: opacity .5s ease-out;
    }
    .info-overlay.effects:hover > div {
      opacity: 0;
    }
    .info-overlay.effects > div:hover {
      opacity: 1;
    }
    .info-overlay #overlay-material-200 {
      width: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: var(--hx-background-alpha-200);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      border: 1px solid var(--hx-border-200);
      border-radius: 8px;
      margin: .75rem;
      padding: .75rem;
    }
    .info-overlay a {
      padding: .5rem;
    }
    .info-overlay a > span{
      color: var(--hx-text-100);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      padding: 8px;
      background-color: var(--hx-background-alpha-200);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      border: 1px solid var(--hx-border-200);
      line-height: 1;
      transition: color 0.3s ease-in-out;
      pointer-events: all;
    }
    .info-overlay a:hover > span {
      color: var(--hx-text-brand);
    }
    .info-overlay h2 {
      display: block;
      font-weight: 700;
      text-align: center;
      margin: 0;
      line-height: 1;
    }
    .info-overlay h2 > span {
      display: inline-block;
      vertical-align: 24%;
      margin-left: 4px;
      font-size: .9rem;
      font-weight: 500;
    }
    .visible {
      visibility: visible;
      opacity: 1;
    }
    /* BREAKPOINTS */
    @media (max-width: 1600px) {
      .grid {
        grid-template-columns: repeat(5, 1fr);
      }
    }
    @media (max-width: 1200px) {
      .grid {
        grid-template-columns: repeat(4, 1fr);
      }
    }
    @media (max-width: 990px) {
      .grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    @media (max-width: 770px) {
      .grid {
        grid-template-columns: repeat(2, 1fr);
      }
      .overlay img {
        max-width: 80vw;
      }
    }
    @media (max-width: 480px) {
      .grid {
        grid-template-columns: 1fr;
      }
      .overlay img {
        max-width: 90vw;
      }
    }
  `;

  // ASSET GENERATE LINE (DO NOT DELETE THIS LINE)
  assets: Asset[] = [
  {
    "id": 116,
    "src": "asset/grid/thumbnail/116.webp",
    "title": "RimWorld",
    "release": "2018",
    "author": "theEMA",
    "resolution": "1440x2160",
    "tags": [
      "blue"
    ]
  },
  {
    "id": 115,
    "src": "asset/grid/thumbnail/115.webp",
    "title": "Dune: Awakening",
    "release": "2025",
    "author": "theEMA",
    "resolution": "1440x2160",
    "tags": [
      "yellow"
    ]
  },
  {
    "id": 114,
    "src": "asset/grid/thumbnail/114.webp",
    "title": "Cyberpunk 2077",
    "release": "2020",
    "author": "theEMA",
    "resolution": "1440x2160",
    "tags": [
      "red"
    ]
  },
  {
    "id": 113,
    "src": "asset/grid/thumbnail/113.webp",
    "title": "Terraria",
    "release": "2011",
    "author": "Metaloe",
    "resolution": "1000x1500",
    "tags": [
      "green"
    ]
  },
  {
    "id": 112,
    "src": "asset/grid/thumbnail/112.webp",
    "title": "Starfield",
    "release": "2023",
    "author": "theEMA",
    "resolution": "1843x2763",
    "tags": [
      "yellow"
    ]
  },
  {
    "id": 111,
    "src": "asset/grid/thumbnail/111.webp",
    "title": "Starfield",
    "release": "2023",
    "author": "theEMA",
    "resolution": "1843x2763",
    "tags": [
      "purple"
    ]
  },
  {
    "id": 110,
    "src": "asset/grid/thumbnail/110.webp",
    "title": "Starfield",
    "release": "2023",
    "author": "theEMA",
    "resolution": "1843x2763",
    "tags": [
      "red"
    ]
  },
  {
    "id": 109,
    "src": "asset/grid/thumbnail/109.webp",
    "title": "LVL2 - Map Labs #15",
    "release": "2021",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 108,
    "src": "asset/grid/thumbnail/108.webp",
    "title": "TUNE TWO: Crossfade - Map Labs Test Tube #13",
    "release": "2021",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 107,
    "src": "asset/grid/thumbnail/107.webp",
    "title": "Map Labs Presents - ATOM WEEK",
    "release": "2021",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 106,
    "src": "asset/grid/thumbnail/106.webp",
    "title": "CrossFire - Map Labs Test Tube #12",
    "release": "2021",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 105,
    "src": "asset/grid/thumbnail/105.webp",
    "title": "Abridged All-Stars - Map Labs #12",
    "release": "2021",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 104,
    "src": "asset/grid/thumbnail/104.webp",
    "title": "LEGO® Star Wars™ III: The Clone Wars™",
    "release": "2011",
    "author": "theEMA",
    "resolution": "1200x1800",
    "tags": [
      "collection:lego"
    ]
  },
  {
    "id": 103,
    "src": "asset/grid/thumbnail/103.webp",
    "title": "LEGO® Star Wars™ II: The Original Trilogy",
    "release": "2006",
    "author": "theEMA",
    "resolution": "1200x1800",
    "tags": [
      "collection:lego"
    ]
  },
  {
    "id": 102,
    "src": "asset/grid/thumbnail/102.webp",
    "title": "LEGO® Star Wars™: The Video Game",
    "release": "2005",
    "author": "theEMA",
    "resolution": "1200x1800",
    "tags": [
      "collection:lego"
    ]
  },
  {
    "id": 101,
    "src": "asset/grid/thumbnail/101.webp",
    "title": "LEGO® Star Wars™: The Skywalker Saga",
    "release": "2020",
    "author": "theEMA",
    "resolution": "1200x1800",
    "tags": [
      "collection:lego"
    ]
  },
  {
    "id": 100,
    "src": "asset/grid/thumbnail/100.webp",
    "title": "LEGO® The Lord of the Rings™",
    "release": "2012",
    "author": "theEMA",
    "resolution": "1200x1800",
    "tags": [
      "collection:lego"
    ]
  },
  {
    "id": 99,
    "src": "asset/grid/thumbnail/99.webp",
    "title": "The LEGO® NINJAGO® Movie Video Game",
    "release": "2017",
    "author": "theEMA",
    "resolution": "1200x1800",
    "tags": [
      "collection:lego"
    ]
  },
  {
    "id": 98,
    "src": "asset/grid/thumbnail/98.webp",
    "title": "LEGO® Worlds",
    "release": "2017",
    "author": "theEMA",
    "resolution": "1200x1800",
    "tags": [
      "collection:lego"
    ]
  },
  {
    "id": 97,
    "src": "asset/grid/thumbnail/97.webp",
    "title": "Halloween Horror 3: Bone Room - Map Labs Test Tube #11",
    "release": "2020",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 96,
    "src": "asset/grid/thumbnail/96.webp",
    "title": "The Wrap-Up! - Map Labs Test Tube #10",
    "release": "2020",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 95,
    "src": "asset/grid/thumbnail/95.webp",
    "title": "Two Rooms - Map Labs Test Tube #9",
    "release": "2020",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 94,
    "src": "asset/grid/thumbnail/94.webp",
    "title": "Eye Candy - Map Labs Test Tube #8",
    "release": "2020",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 93,
    "src": "asset/grid/thumbnail/93.webp",
    "title": "CromulentVille 2 - Map Labs Test Tube #7",
    "release": "2020",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 92,
    "src": "asset/grid/thumbnail/92.webp",
    "title": "Smoke on the Water - Map Labs Test Tube #6",
    "release": "2020",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 91,
    "src": "asset/grid/thumbnail/91.webp",
    "title": "Blockout - Map Labs Test Tube #5",
    "release": "2020",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 90,
    "src": "asset/grid/thumbnail/90.webp",
    "title": "1,000,000,000 Units - Map Labs Test Tube #4",
    "release": "2020",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 89,
    "src": "asset/grid/thumbnail/89.webp",
    "title": "Abstraction - Map Labs Test Tube #3",
    "release": "2020",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 88,
    "src": "asset/grid/thumbnail/88.webp",
    "title": "Companion Piece - Map Labs Test Tube #2",
    "release": "2020",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 87,
    "src": "asset/grid/thumbnail/87.webp",
    "title": "One Room - Map Labs Test Tube #1",
    "release": "2020",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 86,
    "src": "asset/grid/thumbnail/86.webp",
    "title": "FusionVille 2 - Map Labs #10",
    "release": "2020",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 85,
    "src": "asset/grid/thumbnail/85.webp",
    "title": "Back on Track - Map Labs #9",
    "release": "2020",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 84,
    "src": "asset/grid/thumbnail/84.webp",
    "title": "Companion Piece 2: Companion Harder - Map Labs #8",
    "release": "2020",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 83,
    "src": "asset/grid/thumbnail/83.webp",
    "title": "The Grid - Map Labs #7",
    "release": "2020",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 82,
    "src": "asset/grid/thumbnail/82.webp",
    "title": "Halloween Horror 2: The Darkness - Map Labs #6",
    "release": "2020",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 81,
    "src": "asset/grid/thumbnail/81.webp",
    "title": "Half-Life: Abridged - Map Labs #5",
    "release": "2020",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 80,
    "src": "asset/grid/thumbnail/80.webp",
    "title": "Think Tank - Map Labs #4",
    "release": "2020",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 79,
    "src": "asset/grid/thumbnail/79.webp",
    "title": "RunThinkShootLiveVille 2 - Map Labs #3",
    "release": "2020",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 78,
    "src": "asset/grid/thumbnail/78.webp",
    "title": "Episode One - Map Labs #2",
    "release": "2020",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 77,
    "src": "asset/grid/thumbnail/77.webp",
    "title": "Halloween Horror - Map Labs #1",
    "release": "2020",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 76,
    "src": "asset/grid/thumbnail/76.webp",
    "title": "Freeze - Map Labs Atom #5",
    "release": "2020",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 75,
    "src": "asset/grid/thumbnail/75.webp",
    "title": "TUNE - Map Labs Atom #4",
    "release": "2020",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 74,
    "src": "asset/grid/thumbnail/74.webp",
    "title": "Gnome - Map Labs Atom #3",
    "release": "2020",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 73,
    "src": "asset/grid/thumbnail/73.webp",
    "title": "ABCDEFGHIJKLMNOPQRSTUVWXYZ - Map Labs Atom #2",
    "release": "2020",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 72,
    "src": "asset/grid/thumbnail/72.webp",
    "title": "Blade - Map Labs Atom #1",
    "release": "2020",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 71,
    "src": "asset/grid/thumbnail/71.webp",
    "title": "Freeze - Map Labs Atom #5",
    "release": "2020",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 70,
    "src": "asset/grid/thumbnail/70.webp",
    "title": "Starbase",
    "release": "2021",
    "author": "theEMA",
    "resolution": "1200x1800",
    "tags": [
      "blue"
    ]
  },
  {
    "id": 69,
    "src": "asset/grid/thumbnail/69.webp",
    "title": "Dark Fracture",
    "release": "2021",
    "author": "Moofy",
    "resolution": "1920x2880",
    "tags": [
      "green"
    ]
  },
  {
    "id": 68,
    "src": "asset/grid/thumbnail/68.webp",
    "title": "Back 4 Blood",
    "release": "2021",
    "author": "Moofy",
    "resolution": "1840x860",
    "attributes": [
      "horizontal"
    ],
    "tags": [
      "red"
    ]
  },
  {
    "id": 67,
    "src": "asset/grid/thumbnail/67.webp",
    "title": "Back 4 Blood",
    "release": "2021",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "red"
    ]
  },
  {
    "id": 66,
    "src": "asset/grid/thumbnail/66.webp",
    "title": "TerraTech",
    "release": "2018",
    "author": "theEMA",
    "resolution": "1200x1800",
    "tags": [
      "yellow"
    ]
  },
  {
    "id": 65,
    "src": "asset/grid/thumbnail/65.webp",
    "title": "Halloween Horror 3: Bone Room - Map Labs Test Tube #11",
    "release": "2020",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 64,
    "src": "asset/grid/thumbnail/64.webp",
    "title": "The Wrap-Up! - Map Labs Test Tube #10",
    "release": "2020",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 63,
    "src": "asset/grid/thumbnail/63.webp",
    "title": "Two Rooms - Map Labs Test Tube #9",
    "release": "2020",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 62,
    "src": "asset/grid/thumbnail/62.webp",
    "title": "Eye Candy - Map Labs Test Tube #8",
    "release": "2020",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 61,
    "src": "asset/grid/thumbnail/61.webp",
    "title": "CromulentVille 2 - Map Labs Test Tube #7",
    "release": "2020",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 60,
    "src": "asset/grid/thumbnail/60.webp",
    "title": "Smoke on the Water - Map Labs Test Tube #6",
    "release": "2020",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 59,
    "src": "asset/grid/thumbnail/59.webp",
    "title": "Blockout - Map Labs Test Tube #5",
    "release": "2020",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 58,
    "src": "asset/grid/thumbnail/58.webp",
    "title": "1,000,000,000 Units - Map Labs Test Tube #4",
    "release": "2020",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 57,
    "src": "asset/grid/thumbnail/57.webp",
    "title": "Abstraction - Map Labs Test Tube #3",
    "release": "2020",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 56,
    "src": "asset/grid/thumbnail/56.webp",
    "title": "Companion Piece - Map Labs Test Tube #2",
    "release": "2020",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 55,
    "src": "asset/grid/thumbnail/55.webp",
    "title": "One Room - Map Labs Test Tube #1",
    "release": "2020",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 54,
    "src": "asset/grid/thumbnail/54.webp",
    "title": "FusionVille 2 - Map Labs #10",
    "release": "2020",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 53,
    "src": "asset/grid/thumbnail/53.webp",
    "title": "Back on Track - Map Labs #9",
    "release": "2020",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 52,
    "src": "asset/grid/thumbnail/52.webp",
    "title": "Companion Piece 2: Companion Harder - Map Labs #8",
    "release": "2020",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 51,
    "src": "asset/grid/thumbnail/51.webp",
    "title": "The Grid - Map Labs #7",
    "release": "2020",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 50,
    "src": "asset/grid/thumbnail/50.webp",
    "title": "Halloween Horror 2: The Darkness - Map Labs #6",
    "release": "2020",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 49,
    "src": "asset/grid/thumbnail/49.webp",
    "title": "Half-Life: Abridged - Map Labs #5",
    "release": "2020",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 48,
    "src": "asset/grid/thumbnail/48.webp",
    "title": "Think Tank - Map Labs #4",
    "release": "2020",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 47,
    "src": "asset/grid/thumbnail/47.webp",
    "title": "RunThinkShootLiveVille 2 - Map Labs #3",
    "release": "2020",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 46,
    "src": "asset/grid/thumbnail/46.webp",
    "title": "Episode One - Map Labs #2",
    "release": "2020",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 45,
    "src": "asset/grid/thumbnail/45.webp",
    "title": "Halloween Horror - Map Labs #1",
    "release": "2020",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 44,
    "src": "asset/grid/thumbnail/44.webp",
    "title": "TUNE - Map Labs Atom #4",
    "release": "2020",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 43,
    "src": "asset/grid/thumbnail/43.webp",
    "title": "Gnome - Map Labs Atom #3",
    "release": "2020",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 42,
    "src": "asset/grid/thumbnail/42.webp",
    "title": "ABCDEFGHIJKLMNOPQRSTUVWXYZ - Map Labs Atom #2",
    "release": "2020",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 41,
    "src": "asset/grid/thumbnail/41.webp",
    "title": "Blade - Map Labs Atom #1",
    "release": "2020",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": [
      "collection:maplabs"
    ]
  },
  {
    "id": 40,
    "src": "asset/grid/thumbnail/40.jpg",
    "title": "Map Labs Collection",
    "release": "2021",
    "author": "Map Labs Team",
    "resolution": "1200x1800",
    "attributes": [
      "collection"
    ],
    "tags": [
      "black"
    ]
  },
  {
    "id": 39,
    "src": "asset/grid/thumbnail/39.webp",
    "title": "Dark Echo",
    "release": "2015",
    "author": "theEMA",
    "resolution": "1200x1800",
    "tags": [
      "black"
    ]
  },
  {
    "id": 38,
    "src": "asset/grid/thumbnail/38.webp",
    "title": "JOLT: Super Robot Racer",
    "release": "2016",
    "author": "Moofy",
    "resolution": "1000x1500",
    "tags": [
      "blue"
    ]
  },
  {
    "id": 37,
    "src": "asset/grid/thumbnail/37.webp",
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
    "id": 36,
    "src": "asset/grid/thumbnail/36.webp",
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
    "id": 35,
    "src": "asset/grid/thumbnail/35.webp",
    "title": "Starblast",
    "release": "2017",
    "author": "theEMA",
    "resolution": "1200x1800",
    "tags": [
      "blue"
    ]
  },
  {
    "id": 34,
    "src": "asset/grid/thumbnail/34.webp",
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
    "id": 33,
    "src": "asset/grid/thumbnail/33.webp",
    "title": "Hollow Knight: Silksong",
    "release": "TBA",
    "author": "theEMA",
    "resolution": "2280x3420",
    "tags": []
  },
  {
    "id": 32,
    "src": "asset/grid/thumbnail/32.webp",
    "title": "Zork Nemesis: The Forbidden Lands",
    "release": "2019",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": []
  },
  {
    "id": 31,
    "src": "asset/grid/thumbnail/31.webp",
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
    "id": 30,
    "src": "asset/grid/thumbnail/30.webp",
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
    "id": 29,
    "src": "asset/grid/thumbnail/29.webp",
    "title": "Ancestors: The Humankind Odyssey",
    "release": "2020",
    "author": "theEMA",
    "resolution": "1200x1800",
    "tags": []
  },
  {
    "id": 28,
    "src": "asset/grid/thumbnail/28.webp",
    "title": "Ancestors: The Humankind Odyssey",
    "release": "2020",
    "author": "theEMA",
    "resolution": "1200x1800",
    "tags": []
  },
  {
    "id": 27,
    "src": "asset/grid/thumbnail/27.webp",
    "title": "Ancestors: The Humankind Odyssey",
    "release": "2020",
    "author": "theEMA",
    "resolution": "1200x1800",
    "tags": []
  },
  {
    "id": 26,
    "src": "asset/grid/thumbnail/26.webp",
    "title": "Overwolf",
    "release": "2021",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": []
  },
  {
    "id": 25,
    "src": "asset/grid/thumbnail/25.webp",
    "title": "Overwolf",
    "release": "2021",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": []
  },
  {
    "id": 24,
    "src": "asset/grid/thumbnail/24.webp",
    "title": "LEGO® The Hobbit™",
    "release": "2014",
    "author": "theEMA",
    "resolution": "1200x1800",
    "tags": [
      "collection:lego"
    ]
  },
  {
    "id": 23,
    "src": "asset/grid/thumbnail/23.webp",
    "title": "Template for Lego Collection",
    "release": "2021",
    "author": "theEMA",
    "resolution": "1200x1800",
    "tags": [
      "collection:lego"
    ]
  },
  {
    "id": 22,
    "src": "asset/grid/thumbnail/22.jpg",
    "title": "Lego Collection",
    "release": "2021",
    "author": "theEMA",
    "resolution": "1200x1800",
    "attributes": [
      "collection"
    ],
    "tags": []
  },
  {
    "id": 21,
    "src": "asset/grid/thumbnail/21.webp",
    "title": "Fall Guys",
    "release": "2020",
    "author": "theEMA",
    "resolution": "1200x1800",
    "tags": []
  },
  {
    "id": 20,
    "src": "asset/grid/thumbnail/20.webp",
    "title": "Portal 2",
    "release": "2011",
    "author": "Moofy",
    "resolution": "1200x1800",
    "tags": []
  },
  {
    "id": 19,
    "src": "asset/grid/thumbnail/19.webp",
    "title": "Shotcut",
    "release": "2011",
    "author": "theEMA",
    "resolution": "1200x1800",
    "tags": [
      "collection:software"
    ]
  },
  {
    "id": 18,
    "src": "asset/grid/thumbnail/18.webp",
    "title": "Microsoft Teams",
    "release": "2019",
    "author": "theEMA",
    "resolution": "1200x1800",
    "tags": [
      "collection:software"
    ]
  },
  {
    "id": 17,
    "src": "asset/grid/thumbnail/17.webp",
    "title": "Zoom",
    "release": "2011",
    "author": "theEMA",
    "resolution": "1200x1800",
    "tags": [
      "collection:software"
    ]
  },
  {
    "id": 16,
    "src": "asset/grid/thumbnail/16.webp",
    "title": "Photoscape X",
    "release": "2019",
    "author": "theEMA",
    "resolution": "1200x1800",
    "tags": [
      "collection:software"
    ]
  },
  {
    "id": 15,
    "src": "asset/grid/thumbnail/15.webp",
    "title": "GIMP",
    "release": "1996",
    "author": "theEMA",
    "resolution": "1200x1800",
    "tags": [
      "collection:software"
    ]
  },
  {
    "id": 14,
    "src": "asset/grid/thumbnail/14.webp",
    "title": "Paint.NET",
    "release": "2009",
    "author": "theEMA",
    "resolution": "1200x1800",
    "tags": [
      "collection:software"
    ]
  },
  {
    "id": 13,
    "src": "asset/grid/thumbnail/13.webp",
    "title": "Visual Studio Code",
    "release": "2016",
    "author": "theEMA",
    "resolution": "1200x1800",
    "tags": [
      "collection:software"
    ]
  },
  {
    "id": 12,
    "src": "asset/grid/thumbnail/12.webp",
    "title": "Discord",
    "release": "2019",
    "author": "theEMA",
    "resolution": "1200x1800",
    "tags": [
      "collection:software"
    ]
  },
  {
    "id": 11,
    "src": "asset/grid/thumbnail/11.webp",
    "title": "Spotify",
    "release": "2009",
    "author": "theEMA",
    "resolution": "1200x1800",
    "tags": [
      "collection:software"
    ]
  },
  {
    "id": 10,
    "src": "asset/grid/thumbnail/10.webp",
    "title": "Template for Software Collection",
    "release": "2021",
    "author": "theEMA",
    "resolution": "1200x1800",
    "tags": [
      "collection:software"
    ]
  },
  {
    "id": 9,
    "src": "asset/grid/thumbnail/9.jpg",
    "title": "Software Collection",
    "release": "2021",
    "author": "theEMA",
    "resolution": "1200x1800",
    "attributes": [
      "collection"
    ],
    "tags": []
  },
  {
    "id": 8,
    "src": "asset/grid/thumbnail/8.webp",
    "title": "Oxygen Not Included",
    "release": "2019",
    "author": "theEMA",
    "resolution": "1200x1800",
    "tags": []
  },
  {
    "id": 7,
    "src": "asset/grid/thumbnail/7.webp",
    "title": "Payday 2",
    "release": "2013",
    "author": "theEMA",
    "resolution": "1200x1800",
    "tags": []
  },
  {
    "id": 6,
    "src": "asset/grid/thumbnail/6.webp",
    "title": "Skul: The Hero Slayer",
    "release": "2020",
    "author": "theEMA",
    "resolution": "1200x1800",
    "tags": []
  },
  {
    "id": 5,
    "src": "asset/grid/thumbnail/5.webp",
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
    "src": "asset/grid/thumbnail/4.webp",
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
    "src": "asset/grid/thumbnail/3.webp",
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
    "src": "asset/grid/thumbnail/2.webp",
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
    "src": "asset/grid/thumbnail/1.webp",
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
  collections: { [key: string]: Asset[] } = {};

  private collectionsCollector(assets: Asset[]) {
    const collections: { [key: string]: Asset[] } = {};
    const browseCollection: Asset[] = [];

    for (let i = assets.length - 1; i >= 0; i--) {
      const asset = assets[i];
      let addedToCollection = false;

      for (let j = 0; j < asset.tags.length; j++) {
        const tag = asset.tags[j];
        if (tag.startsWith('collection:')) {
          const collectionName = tag.substring(11) || 'default';
          if (!collections[collectionName]) {
            collections[collectionName] = [];
          }
          collections[collectionName].unshift(asset);
          addedToCollection = true;
          break; // Exit the loop once the asset is added to a collection
        }
      }

      if (!addedToCollection) {
        browseCollection.unshift(asset);
      }
    }

    if (browseCollection.length > 0) {
      collections['browse'] = browseCollection;
    }

    this.collections = collections;
  }

  private showOverlay(src: number) {
    const overlay = this.shadowRoot?.querySelector('.overlay');
    const overlayImg = overlay?.querySelector('img');
    const skeleton = overlay?.querySelector('.skeleton');
    const overlayInfo = overlay?.querySelector('.info-overlay');
    console.log(overlayInfo);
    if (overlay && overlayImg && skeleton) {
      overlayImg.src = "";
      const isHorizontal = this.assets.find(asset => asset.id === src)?.attributes?.includes('horizontal');
      if (isHorizontal) {
        skeleton.classList.add('horizontal');
        overlayInfo?.classList.add('horizontal');
      } else {
        skeleton.classList.remove('horizontal');
        overlayInfo?.classList.remove('horizontal');
      }
      skeleton.classList.add('visible');
      const asset = this.assets.find(asset => asset.id === src);
      if (asset) {
        overlayImg.src = "/asset/grid/" + src + ".png";
        overlayImg.onload = () => {
          overlayImg.classList.add('visible');
          skeleton.classList.remove('visible');
          if (overlayInfo) {
            overlayInfo.innerHTML = `
              <div>
                <a title="Download the asset" href="/asset/grid/${src}.png" download>
                  <span>
                    <svg height="24" stroke-linejoin="round" viewBox="0 0 16 16" width="24" style="color: currentcolor;"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.75 1V1.75V8.68934L10.7197 6.71967L11.25 6.18934L12.3107 7.25L11.7803 7.78033L8.70711 10.8536C8.31658 11.2441 7.68342 11.2441 7.29289 10.8536L4.21967 7.78033L3.68934 7.25L4.75 6.18934L5.28033 6.71967L7.25 8.68934V1.75V1H8.75ZM13.5 9.25V13.5H2.5V9.25V8.5H1V9.25V14C1 14.5523 1.44771 15 2 15H14C14.5523 15 15 14.5523 15 14V9.25V8.5H13.5V9.25Z" fill="currentColor"></path></svg>
                  </span>
                </a>
              </div>
              <div id="overlay-material-200">
                <h2>${asset.title} <span>by ${asset.author}</span></h2>
              </div>
            `;
            overlayInfo.classList.add('visible');
            setTimeout(() => {
              overlayInfo.classList.add('effects');
              overlayInfo.querySelector('div')?.dispatchEvent(new Event('mouseenter'));
            }, 3000);
          }
        };
        overlayImg.onerror = () => {
          skeleton.classList.remove('visible');
          this.constructError(404, src);
        };
      } else {
        skeleton.classList.remove('visible');
        this.constructError(404, src);
      }
      overlay.classList.add('visible');
      window.addEventListener('scroll', this.hideOverlay.bind(this), { once: true });
      window.location.hash = `#preview${src}`;
    }
  }

  private hideOverlay() {
    const overlay = this.shadowRoot?.querySelector('.overlay');
    const overlayImg = overlay?.querySelector('img');
    const overlayInfo = overlay?.querySelector('.info-overlay');
    if (overlay) {
      var prevError = overlay.querySelector('.error-container');
      if (prevError) {
        prevError.remove();
      }
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
      if (overlayInfo) {
        overlayInfo.innerHTML = '';
        overlayInfo.classList.remove('visible', 'effects');
      }
    }
    history.replaceState(null, '', ' ');
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

  private handleHash() {
    const hash = window.location.hash;
    if (hash.startsWith('#preview')) {
      const assetId = parseInt(hash.replace('#preview', ''), 10);
      if (!isNaN(assetId)) {
        this.showOverlay(assetId);
      }
    }
  }

  private constructError(status: number = 404, src?: number) {
    const overlay = this.shadowRoot?.querySelector('.overlay');
    if (overlay) {
      const errorContainer = document.createElement('div');
      errorContainer.classList.add('error-container');

      const errorTop = document.createElement('div');
      errorTop.style.display = 'flex';
      errorTop.style.justifyContent = 'center';
      const errorTitle = document.createElement('span');
      const errorIcon = document.createElement('span');
      errorIcon.style.marginRight = '8px';
      errorIcon.innerHTML = '<svg data-testid="geist-icon" height="16" stroke-linejoin="round" viewBox="0 0 16 16" style="color: currentcolor;"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.55846 2H7.44148L1.88975 13.5H14.1102L8.55846 2ZM9.90929 1.34788C9.65902 0.829456 9.13413 0.5 8.55846 0.5H7.44148C6.86581 0.5 6.34092 0.829454 6.09065 1.34787L0.192608 13.5653C-0.127943 14.2293 0.355835 15 1.09316 15H14.9068C15.6441 15 16.1279 14.2293 15.8073 13.5653L9.90929 1.34788ZM8.74997 4.75V5.5V8V8.75H7.24997V8V5.5V4.75H8.74997ZM7.99997 12C8.55226 12 8.99997 11.5523 8.99997 11C8.99997 10.4477 8.55226 10 7.99997 10C7.44769 10 6.99997 10.4477 6.99997 11C6.99997 11.5523 7.44769 12 7.99997 12Z" fill="currentColor"></path></svg>';


      const errorMessage = document.createElement('p');
      switch (status) {
        case 404:
          errorTitle.textContent = 'Error: Not Found';
          errorMessage.textContent = 'We cannot found the asset you are looking for.';
          break;
        case 501:
          errorTitle.textContent = 'Error: Not Implemented';
          errorMessage.innerHTML = `The asset/collection is not yet implemented.<br><br><span style="font-family: var(--hx-font-mono)">asset-access-${status}-id-${src}</span>`;
          break;
        default:
          errorTitle.textContent = 'Not Found';
          break;
      }
      errorTop.appendChild(errorIcon);
      errorTop.appendChild(errorTitle);
      errorContainer.appendChild(errorTop);
      errorContainer.appendChild(errorMessage);

      overlay.appendChild(errorContainer);
    }
  }

  private showInfoPane(event: MouseEvent, asset: Asset) {
    const target = event.currentTarget as HTMLElement;
    const source = "/asset/grid/" + asset.id + ".png"
    // Remove any existing info pane
    const existingInfoPane = target.querySelector('.info-pane');
    if (existingInfoPane) {
      existingInfoPane.remove();
    }

    const infoPane = document.createElement('div');
    infoPane.classList.add('info-pane');
    infoPane.innerHTML = `
      <div id="info-pane-top">
        <span>${asset.resolution}</span>
        <a href="${source}" download>
          <span id="svg-container">
            <svg height="20" stroke-linejoin="round" viewBox="0 0 16 16" width="20" style="color: currentcolor;"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.75 1V1.75V8.68934L10.7197 6.71967L11.25 6.18934L12.3107 7.25L11.7803 7.78033L8.70711 10.8536C8.31658 11.2441 7.68342 11.2441 7.29289 10.8536L4.21967 7.78033L3.68934 7.25L4.75 6.18934L5.28033 6.71967L7.25 8.68934V1.75V1H8.75ZM13.5 9.25V13.5H2.5V9.25V8.5H1V9.25V14C1 14.5523 1.44771 15 2 15H14C14.5523 15 15 14.5523 15 14V9.25V8.5H13.5V9.25Z" fill="currentColor"></path></svg>
          </span>
        </a>
      </div>
      <div id="info-pane-bottom">
        <h2>${asset.title}</h2>
        <p>by ${asset.author}</p>
      </div>
    `;

    target.appendChild(infoPane);
    requestAnimationFrame(() => infoPane.classList.add('visible'));
  }

  private hideInfoPane(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    const infoPane = target.querySelector('.info-pane');
    if (infoPane) {
      infoPane.classList.remove('visible');
      infoPane.addEventListener('transitionend', () => infoPane.remove(), { once: true });
    }
  }

  firstUpdated() {
    this.handleHash();
  }

  updated() {
    this.lazyLoadImages();
  }

  render() {
    this.collectionsCollector(this.assets);
    return html`
      <div class="grid">
        ${this.collections[this.collectionRenderer].map((asset) => html`
          <div class="item${asset.attributes ? " " + asset.attributes[0] : ""}"
               @mouseenter="${(e: MouseEvent) => this.showInfoPane(e, asset)}"
               @mouseleave="${this.hideInfoPane}">
            <img data-src="/${asset.src}" @click="${() => this.showOverlay(asset.id)}">
          </div>
        `)}
      </div>
      <div class="overlay" @click="${this.hideOverlay}">
        <div class="skeleton"></div>
        <img src="" alt="Zoomed Image">
        <div class="info-overlay"></div>
      </div>
    `;
  }
}