import "./fvtt-configuration";

import processedStyles from "./sass/pub-crusade.scss?inline";

// Inject CSS
// normal css imports don't work in foundry because the html is loaded from
// foundry itself and vite's css injection never kicks in. So we have to
// import the css as a string and inject it ourselves.
const styleElement = document.createElement("style");
styleElement.innerHTML = processedStyles;
document.head.appendChild(styleElement);

console.log("Pub Crusade loading");
