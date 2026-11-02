// Original compact study vignette. Geometry is kept at the header's 42px height.
import { bold, lettering, escape } from './design.mjs';

export function studySetup(theme) {
  const c = theme === 'dark'
    ? { edge: '#8896a7', metal: '#79889a', top: '#b8c2ce', holder: '#8597aa', holderEdge: '#a6b4c3', steam: '#7c8998', shadow: '#000000' }
    : { edge: '#627183', metal: '#8391a0', top: '#c5cdd7', holder: '#9baab8', holderEdge: '#6d7e8f', steam: '#8b96a2', shadow: '#223246' };
  return [
    // The cup, laptop, and holder sit on one baseline; no surrounding desk panel.
    '<ellipse cx="23" cy="38.6" rx="18" ry="1.2" fill="' + c.shadow + '" opacity=".12"/>',
    '<ellipse cx="100" cy="39.5" rx="46" ry=".8" fill="' + c.shadow + '" opacity=".12"/>',
    '<ellipse cx="178" cy="38.8" rx="13" ry=".9" fill="' + c.shadow + '" opacity=".12"/>',
    // Chai: an ivory ceramic cup with visible milk tea and a single steam curl.
    '<path d="M11.4 22 C3.5 18.8 3 29.1 11.8 29.1" fill="none" stroke="#d6cfc1" stroke-width="2.8" stroke-linecap="round"/>',
    '<ellipse cx="23" cy="37" rx="16" ry="2" fill="#d8d3c9"/>',
    '<ellipse cx="23" cy="36.5" rx="14.8" ry="1.5" fill="#f2ece1"/>',
    '<path d="M11.8 19.8 L14.1 31.7 Q14.7 35.3 22.8 35.3 Q30.9 35.3 31.7 31.5 L33.7 19.8 Z" fill="#eee7da" stroke="#aba497" stroke-width=".75" stroke-linejoin="round"/>',
    '<path d="M28.8 21.5 L27.7 32.1 Q27.3 33.4 25.8 34.3 Q30.3 34 31 31.4 L32.8 21 Z" fill="#d9d1c3"/>',
    '<ellipse cx="22.7" cy="19.7" rx="11" ry="3" fill="#faf5e9" stroke="#b8ad9c" stroke-width=".6"/>',
    '<ellipse cx="22.7" cy="19.6" rx="8.8" ry="1.9" fill="#b77c48"/>',
    '<path d="M17.8 19.3 Q22.2 18.4 26.9 19.1" fill="none" stroke="#d8a26c" stroke-width=".65" stroke-linecap="round"/>',
    '<path d="M23 13.2 C18.9 9.8 26.5 7.3 22.8 3.4" fill="none" stroke="' + c.steam + '" stroke-width="1.15" stroke-linecap="round"/>',
    // Slim laptop: quiet graphite frame, terminal status, shallow metal base.
    '<rect x="63" y="4" width="72" height="28" rx="2.6" fill="#35414f" stroke="' + c.edge + '" stroke-width=".9"/>',
    '<path d="M66 5 H132" fill="none" stroke="#a7b6c7" stroke-opacity=".35" stroke-width=".7" stroke-linecap="round"/>',
    '<rect x="67" y="8" width="64" height="20" rx="1" fill="#111a28"/>',
    '<circle cx="99" cy="6.1" r=".55" fill="#a8b8ca"/>',
    '<path d="M73 15.5 L75.8 18 L73 20.5 M78.3 21 H81" fill="none" stroke="#a5b7cc" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>',
    lettering('200 OK', 86, 21, 8.5, bold, '#8eb7ff'),
    '<path d="M62 32 H136 L145 37 H54 Z" fill="' + c.top + '" stroke="' + c.edge + '" stroke-width=".7" stroke-linejoin="round"/>',
    '<path d="M54 37 H145 Q144 39.4 139.5 39.4 H59 Q55.3 39.4 54 37 Z" fill="' + c.metal + '"/>',
    '<path d="M69 34 H84 M115 34 H130" fill="none" stroke="' + c.edge + '" stroke-width=".65" stroke-linecap="round"/>',
    '<rect x="91" y="34.7" width="18" height="1.8" rx=".65" fill="#e0e5eb" fill-opacity=".72"/>',
    // Unequal pen heights keep the holder from feeling like a repeated icon.
    '<path d="M171 10 L175.5 25" stroke="#2f81f7" stroke-width="2.6" stroke-linecap="round"/>',
    '<path d="M171 10 L172.2 14" stroke="#9fc3ff" stroke-width=".8" stroke-linecap="round"/>',
    '<path d="M181 11 L182.4 26" stroke="#384b61" stroke-width="2.8" stroke-linecap="round"/>',
    '<path d="M183.4 5 L185.9 5.7 L180.2 26 L177.6 25.4 Z" fill="#c39b68"/>',
    '<path d="M183.4 5 L185.1 1.9 L185.9 5.7 Z" fill="#e2c79e"/>',
    '<path d="M184.5 3.1 L185.1 1.9 L185.4 3.4 Z" fill="#3b4653"/>',
    '<path d="M168 22 H188.5 L186.9 35.4 Q186.7 38 178.2 38 Q169.5 38 169.2 35.4 Z" fill="' + c.holder + '" stroke="' + c.holderEdge + '" stroke-width=".75" stroke-linejoin="round"/>',
    '<path d="M183.1 23 L182.1 35.9 Q184.3 35.6 186.1 35 L187.5 23 Z" fill="#52677d" opacity=".36"/>',
    '<ellipse cx="178.3" cy="22" rx="10.2" ry="1.9" fill="#566b81" stroke="' + c.holderEdge + '" stroke-width=".65"/>',
    '<path d="M171.7 25 L172.5 34" fill="none" stroke="#d7e0e9" stroke-opacity=".35" stroke-width=".75" stroke-linecap="round"/>',
  ].join('');
}

export function responsiveIntro(title, wordmark, illustration) {
  return '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="42" role="img" aria-labelledby="title">'
    + '<title id="title">' + escape(title) + '</title>'
    + '<style>@media(max-width:580px){.study-setup{display:none}}</style>'
    + wordmark
    + '<svg class="study-setup" x="100%" y="0" width="200" height="42" overflow="visible" aria-hidden="true">'
    + '<g transform="translate(-200 0)">' + illustration + '</g></svg></svg>\n';
}
