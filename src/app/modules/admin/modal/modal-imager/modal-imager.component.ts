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
  imageList: string[];
  status: EStatus;
  preview: string;
  errMsg: string;
  isUploaded: boolean;

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

  initFlags() {
    this.errMsg = '';
    this.isUploaded = false;
    this.currentFile = '';
    this.preview = '';
  }

  onClose() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.dialogRef.close(this.currentFile);
  }

  getImgPath() {
    return this.imgSrv.getFullImgPath(this.data.fileName);
  }

  getThumbPath(fileName) {
    return this.imgSrv.getFullThumbPath(fileName);
  }

  onUpload() {
    this.initFlags();
    this.status = EStatus.upload;
    console.log('upload');
  }

  onSelect() {
    this.initFlags();
    this.status = EStatus.select;
    this.imgSrv.getListImg()
      .subscribe(x => this.imageList = x);
    console.log('select', this.imageList);
  }

  onAcceptUpload(evt) {
    this.errMsg = '';
    if (evt.target.elements[0].files && evt.target.elements[0].files[0]) {
      const file = evt.target.elements[0].files[0];
      const formData = new FormData();
      formData.append('file', file, file.name);
      this.imgSrv.sendFile(formData)
        .subscribe(x => {
          this.currentFile = x.fileName;
          this.isUploaded = true;
        },
        (err) => {
          this.errMsg = err.error.message;
        }
      );
    } else {
      this.errMsg = 'Front: error upload';
    }
  }

  onSelectImage(evt) {
    // console.log(evt.target.files[0]);
    if (evt.target.files && evt.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.preview = e.target.result;
      };
      reader.readAsDataURL(evt.target.files[0]);
    }

  }

}
