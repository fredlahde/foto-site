import { VApp, VNodeBuilder, Component, Renderer, cssClass, Attribute } from '@kloudsoftware/eisen';

function chunkArrayIntoThree<T>(arr: Array<T>): Array<Array<T>> {
    const chunkSize = Math.floor(arr.length / 3);

    const arr1 = arr.slice(0, chunkSize);
    const arr2 = arr.slice(chunkSize, chunkSize * 2);
    const arr3 = arr.slice(chunkSize * 2, chunkSize * 3);

    return [arr1, arr2, arr3];
}
const app = new VApp("target", new Renderer());
app.init();

const nImgNodes = 21;
const imgNodes = Array.from(Array(nImgNodes).keys()).map(_ => app.k("img", { attrs: [new Attribute("src", "placeholder.png")] }));

const imgArrays = chunkArrayIntoThree(imgNodes);
const mainDiv = app.k("div", { attrs: [cssClass("container center-container")] }, [
    app.k("h1", { value: "Freds fotos" }),
    app.k("div", { attrs: [cssClass("row")] }, [
        app.k("div", { attrs: [cssClass("column")] }, [
            ...imgArrays[0]
        ]),
        app.k("div", { attrs: [cssClass("column")] }, [
            ...imgArrays[1]
        ]),
        app.k("div", { attrs: [cssClass("column")] }, [
            ...imgArrays[2]
        ]),
    ]),
]);

app.rootNode.appendChild(mainDiv);
