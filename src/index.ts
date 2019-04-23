import { VApp, VNodeBuilder, Component, Renderer, cssClass, Attribute, src } from '@kloudsoftware/eisen';
import { LightBox } from './plugins/LightBox';

function computeImgCols<T>(arr: Array<T>): Array<Array<T>> {
    let ret: T[][] = [];
    for (let i = 0; i < 3; i++) {
        ret[i] = []
    }
    for (let i = 2; i < arr.length; i += 3) {
        ret[0].push(arr[i - 2])
        ret[1].push(arr[i - 1])
        ret[2].push(arr[i])
    }

    return ret;
}

function getMarcoPhotos(fullSize: boolean): Array<string> {
    return Array.from(Array(6).keys())
        .map(e => e + 1)
        .map(e => fullSize ? `macro/${e}.jpg` : `macro/${e}-small.jpg`)
}

const app = new VApp("target", new Renderer());
const lightbox = new LightBox();
app.init();

const nImgNodes = 9;
const macroImages = getMarcoPhotos(false);
const placeholder =  "https://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif";
const imgNodes = Array.from(Array(nImgNodes).keys()).map(i => {
    const imageSrc = macroImages[i] != undefined ? macroImages[i] : placeholder;
    const node = app.k("img", { attrs: [src(imageSrc)] });
    if (macroImages[i] != undefined) {
        lightbox.addImage(node);
    }
    return node;
});

const imgCols = computeImgCols(imgNodes);
console.log(imgCols);
const mainDiv = app.k("div", { attrs: [cssClass("container center-container")] }, [
    app.k("h1", { value: "Fred's Photos", attrs: [cssClass("site-heading")] }),
    app.k("div", { attrs: [cssClass("row")] }, [
        app.k("div", { attrs: [cssClass("column")] }, [
            ...imgCols[0]
        ]),
        app.k("div", { attrs: [cssClass("column")] }, [
            ...imgCols[1]
        ]),
        app.k("div", { attrs: [cssClass("column")] }, [
            ...imgCols[2]
        ]),
    ]),
]);

document.title = "Fred's Photos";
app.rootNode.appendChild(mainDiv);
