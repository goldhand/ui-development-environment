/* eslint-env browser */
const render = () => {
  const app = document.createElement("div");
  app.innerHTML = "Hello World";
  document.body.appendChild(app);
};

render();
