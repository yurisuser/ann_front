import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ConfirmComponent } from '../modal/confirm/confirm.component';

@Injectable()
export class DialogService {

  constructor(
    private dialog: MatDialog,
  ) { }

  public confirm(message: string): Promise<boolean> {
    const dialogRef = this.dialog.open(ConfirmComponent, {data: {message}});
    return dialogRef.afterClosed().toPromise();
  }
}
