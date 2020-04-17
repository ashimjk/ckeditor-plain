import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import image from "@ckeditor/ckeditor5-image/src/image";

export class InsertImage extends Plugin {
    init() {
        console.log('InsertImage was initialized');

        const editor = this.editor;

        editor.ui.componentFactory.add('insertImage', locale => {
            const view = new ButtonView(locale);

            view.set({
                label: 'Insert Image',
                // icon: imageIcon,
                tooltip: true
            });

            // Callback executed once the image is clicked
            view.on('execute', () => {
                const imageURL = prompt('Image URL');

                editor.model.change(writer => {
                    const imageElement = writer.createElement('image', {
                        src: imageURL
                    });

                    // Insert the image in the current selection location.
                    editor.model.insertContent(imageElement, editor.model.document.selection);
                });
            });

            return view;
        });
    }
}
