import { Component, VApp, ComponentBuildFunc, VNode, Props, src, cssClass } from "@kloudsoftware/eisen";
import { LightBox } from "./plugins/LightBox";

export const placeholder = "https://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif";

export class ImageGrid extends Component {
    images: string[];
    title: string;
    lightbox: LightBox;

    constructor(images: string[], title: string) {
        super();
        this.images = images;
        this.title = title;
        this.lightbox = new LightBox();
    }

    private nImgs() {
        return this.images.length + 1;
    }

    private computeImgCols<T>(arr: Array<T>): Array<Array<T>> {
        let ret: T[][] = [];
        for (let i = 0; i < 3; i++) {
            ret[i] = []
        }

        const push = (ret: T[][], dst: number, item: T) => {
            if (undefined == item) return;
            ret[dst].push(item);
        };

        for (let i = 2; i < arr.length; i += 3) {
            push(ret, 0, arr[i - 2]);
            push(ret, 1, arr[i - 1]);
            push(ret, 2, arr[i]);
        }

        return ret;
    }

    private mapImagesToNodes(app: VApp): VNode[] {
        return Array.from(Array(this.nImgs()).keys()).map(i => {
            const imageSrc = this.images[i] != undefined ? this.images[i] : placeholder;
            const node = app.k("img", { attrs: [src(imageSrc)] });
            if (this.images[i] != undefined) {
                this.lightbox.addImage(node);
            }
            return node;
        });
    }

    private buildHeading(app: VApp): VNode {
        return app.k("div", { attrs: [cssClass("heading-container")] }, [
            app.k("div", { attrs: [cssClass("arrow-up arrow-up-left")] }),
            app.k("div", { attrs: [cssClass("heading")] }, [
                app.k("h3", { value: this.title })
            ]),
            app.k("div", { attrs: [cssClass("arrow-up arrow-up-right")] })
        ]);
    }

    build(app: VApp): ComponentBuildFunc {
        return (root: VNode, props: Props) => {
            const imgNodes = this.mapImagesToNodes(app);
            const imgCols = this.computeImgCols(imgNodes);

            const heading = this.buildHeading(app);
            const grid =
                app.k("div", {}, [
                    heading,
                    app.k("div", { attrs: [cssClass("wrapper container center-container")] }, [
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
                        ])
                    ])
                ]);

            root.appendChild(grid);

            return {};
        }
    }
}
