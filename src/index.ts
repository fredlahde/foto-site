import { VApp, Props, VNodeBuilder, Component, Renderer, cssClass, Attribute, src } from '@kloudsoftware/eisen';
import { ImageGrid, Photo } from './ImageGrid';


function getMarcoPhotos(fullSize: boolean): Photo[] {
    return Array.from(Array(6).keys())
        .map(e => e + 1)
        .map(e => fullSize ? `macro/${e}.jpg` : `macro/${e}-small.jpg`)
        .map(e => new Photo(e, ""))
}




function getExcercisePhotos(): Photo[] {
    const exercise_photos = [
        "architektur_lahde.jpg",
        "fotokunst_lahde.jpg",
        "landschaft_lahde.jpg",
        "menschen_lahde.jpg",
        "monochrom_lahde.jpg",
        "muster_lahde.jpg",
        "produktfoto_lahde.jpg",
        "schaerfentiefe_lahde.jpg",
        "standort_oben_lahde.jpg",
        "standort_unten_lahde.jpg",
        "symmetrie_lahde.jpg",
        "wahlbild_lahde.jpg",
        "weich_hartlicht_lahde_1.jpg",
        "weich_hartlicht_lahde_2.jpg",
        "zwei_gesichter_lahde.jpg",
    ];

    return exercise_photos.map(f => new Photo(`exercise/${f}`, f.replace(".jpg", "")));
}

function getRiddlePhotos(): Photo[] {
    const exercise_photos = [
        "raetsel_lahde_1.jpg",
        "raetsel_lahde_2.jpg",
        "raetsel_lahde_3.jpg",
        "raetsel_lahde_4.jpg",
    ];

    return exercise_photos.map(f => new Photo(`riddle/${f}`));
}

const app = new VApp("target", new Renderer());
app.init();

const macroImages = getMarcoPhotos(false);

const mainDiv = app.k("div", { attrs: [cssClass("container center-container")] }, [
    app.k("h1", { value: "Fred's Photos", attrs: [cssClass("site-heading")] }),
]);

app.mountComponent(new ImageGrid(getExcercisePhotos(), "Aufgaben"), mainDiv, new Props(app, new Map()));
app.mountComponent(new ImageGrid(getRiddlePhotos(), "Rätsel"), mainDiv, new Props(app, new Map()));
app.mountComponent(new ImageGrid(macroImages, "Macro"), mainDiv, new Props(app, new Map()));

document.title = "Fred's Photos";
app.rootNode.appendChild(mainDiv);

