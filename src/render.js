/* eslint-env browser,commonjs */
import App from "./App";

const mountPoint = document.createElement("div");
document.body.appendChild(mountPoint);

let app = App();
mountPoint.appendChild(app);

if (module && module.hot) {
  module.hot.accept("./App.js", function() {
    mountPoint.removeChild(app);
    app = App();
    mountPoint.appendChild(app);
  });
}
