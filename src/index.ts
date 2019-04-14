import { VApp, VNodeBuilder, Component, Renderer, cssClass } from '@kloudsoftware/eisen';

const app = new VApp("target", new Renderer());
app.init();

const mainDiv = app.k("div", {attrs: [cssClass("container center-container")]}, [
    app.k("h1", {value: "Freds fotos"})
])

app.rootNode.appendChild(mainDiv);
