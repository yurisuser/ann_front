import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ImageService } from '../../services/image.service';

enum EStatus {
  undefined = 0,
  upload = 1,
  select = 2,
}

@Component({
  selector: 'app-modal-imager',
  templateUrl: './modal-imager.component.html',
  styleUrls: ['./modal-imager.component.scss']
})
export class ModalImagerComponent implements OnInit {

  currentFile: string;
  status: EStatus;
  preview;

  constructor(
    private imgSrv: ImageService,
    public dialogRef: MatDialogRef<ModalImagerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {fileName: string}
  ) {}

  ngOnInit() {
    if (this.data.fileName) {
      this.currentFile = this.data.fileName;
    }
    this.status = EStatus.undefined;
  }

  onClose() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.dialogRef.close(this.data.fileName);
  }

  getImgPath() {
    return this.imgSrv.getFullImgPath(this.data.fileName);
  }

  onUpload() {
    this.status = EStatus.upload;
    console.log('upload');
  }

  onSelect() {
    this.status = EStatus.select;
    console.log('select');
  }

  onAcceptUpload() {

  }

  onSelectImage(evt) {
    console.log(evt.target.files[0]);
    if (evt.target.files && evt.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.preview = e.target.result;
      };
      reader.readAsDataURL(evt.target.files[0]);
    }

  }

}
