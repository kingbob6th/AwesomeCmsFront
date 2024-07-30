import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employees/employee.service';
import { Employee } from '../employees/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeDialogComponent } from '../employees/employee-dialog/employee-dialog.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  displayedColumns: string[] = ['employeeName', 'salary', 'actions'];

  constructor(
    private employeeService: EmployeeService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService
      .getEmployees()
      .subscribe((employees) => (this.employees = employees));
  }

  openDialog(employee?: Employee): void {
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      width: '250px',
      data: employee ? { ...employee } : { employeeName: '', salary: 0 },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.employeeId) {
          this.employeeService
            .updateEmployee(result)
            .subscribe(() => this.loadEmployees());
        } else {
          this.employeeService
            .addEmployee(result)
            .subscribe(() => this.loadEmployees());
        }
      }
    });
  }

  deleteEmployee(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService
        .deleteEmployee(id)
        .subscribe(() => this.loadEmployees());
    }
  }
}
