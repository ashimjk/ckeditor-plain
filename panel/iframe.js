// import IframeView from '../../../src/iframe/iframeview';
// import BalloonPanelView from '../../../src/panel/balloon/balloonpanelview';
// import ContextualBalloon from '../../../src/panel/balloon/contextualballoon';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import BalloonPanelView from "@ckeditor/ckeditor5-ui/src/panel/balloon/balloonpanelview";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";

export class BalloonViewDemo extends Plugin {

    init() {
        const editor = this.editor;
        const t = editor.t;

        editor.ui.componentFactory.add('balloon', locale => {
            const panel = new BalloonPanelView(locale);
            const positions = BalloonPanelView.defaultPositions;

            const buttonView = new ButtonView(locale);
            buttonView.set({
                label: t('Click'),
                withText: true,
                tooltip: true
            });

            panel.render();

            /// Add a child view to the panel's content collection.
            panel.content.add(buttonView);

            // Start pinning the panel to an element with the "target" id DOM.
            // The balloon will remain pinned until unpin() is called.
            panel.pin({
                target: document.querySelector('span'),
                positions: [
                    positions.northArrowSouth,
                    positions.southArrowNorth
                ]
            });

            return panel;
        });
    }


    // constructor(editor) {
    //     super(editor);
    //
    //     this.iframe = new IframeView();
    //     this.contextualBalloon = editor.plugins.get(ContextualBalloon);
    // }
    //
    // init() {
    //     const editor = this.editor;
    //     const editingView = editor.editing.view;
    //     const defaultPositions = BalloonPanelView.defaultPositions;
    //
    //     editor.on('ready', () => {
    //         this.contextualBalloon.add({
    //             view: this.iframe,
    //             position: {
    //                 // Attach the balloon to the first paragraph in the content.
    //                 target: editingView.domConverter.viewToDom(editingView.document.getRoot().getChild(0)),
    //                 position: [
    //                     // The balloon will always be south of the target.
    //                     defaultPositions.northArrowSouth
    //                 ]
    //             }
    //         });
    //
    //         this.iframe.element.src = 'https://ckeditor.com';
    //         this.iframe.on('loaded', () => {
    //             console.log('The iframe has loaded', this.iframe.element.contentWindow);
    //         });
    //     });
    // }
}
