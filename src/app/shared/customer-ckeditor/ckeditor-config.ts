import {EventEmitter} from '@angular/core';

export class CkEditorConfig {
    constructor() {
    }

    public getConfig(charLength: EventEmitter<number>) {
        return {
            toolbar: {
                items: [
                    'heading',
                    '|',
                    'fontSize',
                    'fontFamily',
                    '|',
                    'bold',
                    'italic',
                    'underline',
                    'strikethrough',
                    'highlight',
                    '|',
                    'alignment',
                    '|',
                    'numberedList',
                    'bulletedList',
                    '|',
                    'indent',
                    'outdent',
                    '|',
                    'todoList',
                    'link',
                    'blockQuote',
                    'imageUpload',
                    'insertTable',
                    '|',
                    'undo',
                    'redo',
                ],
            },
            language: 'en',
            image: {
                toolbar: [
                    'imageTextAlternative',
                    'imageStyle:full',
                    'imageStyle:side',
                ],
            },
            table: {
                contentToolbar: [
                    'tableColumn',
                    'tableRow',
                    'mergeTableCells',
                ],
            },
            licenseKey: '',
            wordCount: {
                onUpdate: stats => {
                    charLength.emit(stats.characters);
                },
            },
        };
    }
}
