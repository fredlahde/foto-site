import { VNode, Component, ComponentBuildFunc, VApp, cssClass, Attribute, Props, src } from '@kloudsoftware/eisen'

export class LightBox {
    images: Array<VNode> = new Array<VNode>();
    current: VNode;

    constructor() {
    }

    public addImage(img: VNode) {
        img.addEventlistener("click", this.onClickFunc);
        img.setAttribute("style", "cursor: zoom-in");
        this.images.push(img);
    }

    public onClickFunc = (event: Event, node: VNode) => {
        this.current = node;
        node.app.mountComponent(new LightboxComponent(this), node.app.rootNode, new Props(node.app));
        console.log("clicked on ", node)
    }

    getNextImage = (): VNode => {
        return this.images[(this.images.indexOf(this.current) + 1) % this.images.length];
    }

    getPrevImage = (): VNode => {
        return this.images[(this.images.indexOf(this.current) + this.images.length - 1) % this.images.length]
    }
}

const classes = {
    lightBoxImage: "lightBoxStyleImg",
    lightBoxDiv: "lightBoxStyleDiv",
    arrow: "arrowSvg",
    arrowRight: "arrowSvgRight",
    arrowLeft: "arrowSvgLeft"
}

const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const ESCAPE = 27;

const getSrcFromAttributes = (attrs: Array<Attribute>): string => {
    return attrs.filter(attr => attr.attrName === "src").map(attr => attr.attrValue)[0];
}

class LightboxComponent extends Component {
    lightBox: LightBox;

    constructor(lightBox: LightBox) {
        super();
        this.lightBox = lightBox;
    }

    build(app: VApp): ComponentBuildFunc {
        return (root, props) => {
            const lightBoxOpaque = app.k("div", { attrs: [cssClass(classes.lightBoxDiv)] })
            lightBoxOpaque.addEventlistener("click", () => app.unmountComponent(root));
            root.appendChild(lightBoxOpaque);

            let clone = app.k("img", { attrs: [src(getSrcFromAttributes(this.lightBox.current.$getAttrs()))] })
            lightBoxOpaque.appendChild(clone);
            clone.addClass(classes.lightBoxImage)
            const rightArrow = app.k("img", { attrs: [src("arrow.svg"), cssClass(classes.arrowRight)] })
            const leftArrow = app.k("img", { attrs: [src("arrow.svg"), cssClass(classes.arrowLeft, classes.arrow)] })

            lightBoxOpaque.appendChild(rightArrow);
            lightBoxOpaque.appendChild(leftArrow);

            const handleNextImg = () => {
                const next = this.lightBox.getNextImage();
                clone.setAttribute("src", getSrcFromAttributes(next.$getAttrs()));
                this.lightBox.current = next;
            }

            const handlePrevImg = () => {
                const prev = this.lightBox.getPrevImage();
                clone.setAttribute("src", getSrcFromAttributes(prev.$getAttrs()));
                this.lightBox.current = prev;
            }

            rightArrow.addEventlistener("click", () => {
                handleNextImg();
            });

            leftArrow.addEventlistener("click", () => {
                handlePrevImg();
            });

            return {
                mounted: () => {
                    const handleKeyUp = (ev: KeyboardEvent) => {
                        switch (ev.keyCode) {
                            case RIGHT_ARROW:
                                handleNextImg();
                                break;
                            case LEFT_ARROW:
                                handlePrevImg();
                                break;
                            case ESCAPE:
                                app.unmountComponent(root);
                                break;
                        }
                    }
                    window.onkeyup = handleKeyUp;
                },

                unmounted: () => {
                    window.onkeyup = () => { };
                }
            };
        }
    }
}
