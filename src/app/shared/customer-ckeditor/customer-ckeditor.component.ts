import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CKEditor5 } from '@ckeditor/ckeditor5-angular/ckeditor';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CkEditorConfig } from './ckeditor-config';
@Component({
  selector: 'app-customer-ckeditor',
  templateUrl: './customer-ckeditor.component.html',
  styleUrls: ['./customer-ckeditor.component.scss'],
})
export class CustomerCkeditorComponent implements OnInit {
  public Editor = ClassicEditor;
  public config: CKEditor5.Config;
  @Output() readonly charactersLength: EventEmitter<number> =
    new EventEmitter<number>();
  @ViewChild('myEditor') myEditor: any;
  constructor() {
    this.config = new CkEditorConfig().getConfig(this.charactersLength);
  }

  ngOnInit(): void {}
  saveArticle() {}

  private getArticleContent() {
    if (this.myEditor && this.myEditor.editorInstance) {
      return this.myEditor.editorInstance.getData();
    }

    return '';
  }
}
