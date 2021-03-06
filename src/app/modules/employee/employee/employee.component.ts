import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/api.service';
export interface Employee {
  id: number;
  name: string;
  gender: string;
  Mobile: number;
  pAddress: string;
  cAddress: string;
  email: string;
  dob: string;
  language: string;
  education: string;
  MaritalStatus: string;
  // jobexp: number;
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})

export class EmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  employeeList: [];
  isView: boolean = true;
  Employee: any;
  deleteId;

  constructor(
    private _datePipe: DatePipe,
    public _fb: FormBuilder,
    private _dialog: MatDialog,
    private apiService: ApiService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  displayedColumns: string[] = ['actions', 'id', 'name', 'gender', 'Mobile', 'cAddress', 'email', 'dob', 'MaritalStatus', 'createdAt', 'view'];
  dataSource;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator; // test paginator
  @ViewChild('employeeDeleteDialog', { static: false }) employeeDeleteDialog: TemplateRef<any>;
  @ViewChild('employeeDialog', { static: false }) employeeDialog: TemplateRef<any>;

  async ngOnInit() {

    this.getData();
    await this.EmploeeFormBulder();

    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    // this.dataSource.filterPredicate = (data, filter) => {
    //   return this.displayedColumns.some(ele => {
    //     return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
    //   });
    // };

  }

  getData() {
    this.apiService.getData().subscribe((data: any) => {

      data.data.user.forEach((value, index) => {

        data.data.user[index].name = value.name ? JSON.parse(value.name) : value.name;
        data.data.user[index].gender = value.gender ? JSON.parse(value.gender) : value.gender;
        data.data.user[index].pAddress = value.pAddress ? JSON.parse(value.pAddress) : value.pAddress;
        data.data.user[index].cAddress = value.cAddress ? JSON.parse(value.cAddress) : value.cAddress;
        data.data.user[index].email = value.email ? JSON.parse(value.email) : value.email;
        data.data.user[index].Mobile = value.Mobile ? JSON.parse(value.Mobile) : value.Mobile;
        data.data.user[index].MaritalStatus = value.MaritalStatus ? JSON.parse(value.MaritalStatus) : value.MaritalStatus;
        data.data.user[index].createdAt = value.createdAt;
        data.data.user[index].index = index;

      });

      this.dataSource = new MatTableDataSource<Employee>(data.data.user);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  Language: any = [
    { "label": "English" },
    { "label": "Hindi" },
    { "label": "Gujarati" },
    { "label": "Marathi" },
    { "label": "Urdu" }
  ];

  Education: any = [
    { "label": "MCA" },
    { "label": "BE" },
    { "label": "MSC(IT)" },
    { "label": "BCA" },
  ];

  EmploeeFormBulder() {
    this.employeeForm = this._fb.group({
      Id: [null],
      name: [null, Validators.required],
      gender: [null],
      Mobile: [null],
      pAddress: [null],
      cAddress: [null],
      email: [null, Validators.email],
      dob: [null],
      language: [null],
      education: [null],
      MaritalStatus: [null],
      createdAt: [null]
      // jobexp: [null],
    });
  }

  view(id) {
    this.router.navigate(['user-detail/', id])
  }

  onCencle() {
    this._dialog.closeAll();
    this.isView = true;
    return;
  }

  async onEdit(row) {
    this.isView = false;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this._dialog.open(this.employeeDialog, dialogConfig);
    await this.setFormValue(row);
  }

  get f() { return this.employeeForm.controls; }
  setFormValue(row) {

    this.f.Id.setValue(row.Id);
    this.f.name.setValue(row.name);
    this.f.gender.setValue(row.gender);
    this.f.Mobile.setValue(row.Mobile);

    this.f.pAddress.setValue(row.pAddress);
    this.f.cAddress.setValue(row.cAddress);
    this.f.email.setValue(row.email);
    this.f.dob.setValue(new Date(row.dob));

    this.f.language.setValue(row.language);
    this.f.education.setValue(row.education);
    this.f.MaritalStatus.setValue(row.MaritalStatus);
    // this.f.jobexp.setValue(row.jobexp);
  }


  async onDelete(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '450px';
    dialogConfig.height = '210px';
    this._dialog.open(this.employeeDeleteDialog, dialogConfig);
    this.deleteId = row._id;
  }

  async confirmDelete(row) {
    this._dialog.closeAll();
    this.deleteEmployee();
  }

  deleteEmployee() {
    this.apiService.deleteCandidate(this.deleteId).subscribe(
      data => {
        if (data) {
          this.toastr.success('User deleted Successfully');
          this.getData();
        }
      },
      error => {
        this.toastr.error(error.error.errorMessage);
      }
    )
  }
}