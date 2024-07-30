import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../employee.service'; // Ensure Employee is correctly imported

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
})
export class EmployeeDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }
}
