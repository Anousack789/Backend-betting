import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-d-edit-balance-dialog',
  templateUrl: './d-edit-balance-dialog.component.html',
  styleUrls: ['./d-edit-balance-dialog.component.scss'],
})
export class DEditBalanceDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DEditBalanceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { amount: number }
  ) {}

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close();
  }
}
