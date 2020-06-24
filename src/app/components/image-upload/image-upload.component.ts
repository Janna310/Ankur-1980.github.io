import { Component, Output, EventEmitter } from '@angular/core';
import { ImageUploadService } from './image-upload.service';
// import { ImageSnippet } from 'src/app/interfaces/imageSnippet';

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) {
    this.src = src;
    this.file = file;
  }
}

@Component({
  selector: 'image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css'],
})
export class ImageUploadComponent {
  selectedFile: ImageSnippet;

  constructor(private imageService: ImageUploadService) {}

  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      console.log('event', event.target);

      this.selectedFile = new ImageSnippet(event.target.result, file);
      console.log('selected file', this.selectedFile.src);

      this.selectedFile.pending = true;
      this.imageService.uploadImage(this.selectedFile.src).subscribe(
        (res) => {
          console.log('comp response', res);

          this.onSuccess();
        },
        (err) => {
          console.log('component', err);

          this.onError();
        }
      );
    });

    reader.readAsDataURL(file);
  }
}
