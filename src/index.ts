import { VApp, Props, VNodeBuilder, Component, Renderer, cssClass, Attribute, src } from '@kloudsoftware/eisen';
import { ImageGrid } from './ImageGrid';


function getMarcoPhotos(fullSize: boolean): Array<string> {
    return Array.from(Array(6).keys())
        .map(e => e + 1)
        .map(e => fullSize ? `macro/${e}.jpg` : `macro/${e}-small.jpg`)
}

const app = new VApp("target", new Renderer());
app.init();

const macroImages = getMarcoPhotos(false);

const mainDiv = app.k("div", { attrs: [cssClass("container center-container")] }, [
    app.k("h1", { value: "Fred's Photos", attrs: [cssClass("site-heading")] }),
]);

app.mountComponent(new ImageGrid(macroImages, "Macro"), mainDiv, new Props(app, new Map()));
app.mountComponent(new ImageGrid(macroImages, "Test"), mainDiv, new Props(app, new Map()));

document.title = "Fred's Photos";
app.rootNode.appendChild(mainDiv);
