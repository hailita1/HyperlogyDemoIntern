import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-employee-item',
  templateUrl: './employee-item.component.html',
  styleUrls: ['./employee-item.component.css']
})
export class EmployeeItemComponent implements OnInit {

  @ViewChild('content') public childModal!: ModalDirective;
  @Input() listEmployee = [];
  @Output() listAddEditEmpolyee: EventEmitter<any> = new EventEmitter<any>();
  checkButton = false;
  closeResult: string;
  modalReference!: any;
  listEditEmployee: any;
  type: any;
  model: any;
  submitted = false;
  arrCheck = [];
  formGroup = new FormGroup({
    id: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)]),
    address: new FormControl('', [Validators.required]),
    telephoneNumber: new FormControl('', [Validators.required, Validators.pattern(new RegExp('[0-9]{10}'))]),
    dateOfBirth: new FormControl('', [Validators.required]),
  });
  nameList = '';
  nameButton = '';

  constructor(private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.arrCheck = this.listEmployee;
    console.log(this.arrCheck);
  }

  view(model: any, type = null): void {
    this.open(this.childModal);
    this.type = type;
    this.model = model;
    switch (this.type) {
      case 'add':
        this.checkButton = false;
        this.submitted = false;
        this.formGroup.controls.id.enable();
        this.formGroup.controls.name.enable();
        this.formGroup.controls.email.enable();
        this.formGroup.controls.telephoneNumber.enable();
        this.formGroup.controls.address.enable();
        this.formGroup.controls.dateOfBirth.enable();
        this.nameList = 'Thêm mới nhân viên';
        this.nameButton = 'Thêm mới';
        this.formGroup.reset();
        break;
      case 'edit':
        this.submitted = false;
        this.checkButton = false;
        this.formGroup.controls.id.disable();
        this.formGroup.controls.name.enable();
        this.formGroup.controls.email.enable();
        this.formGroup.controls.telephoneNumber.enable();
        this.formGroup.controls.address.enable();
        this.formGroup.controls.dateOfBirth.enable();
        this.nameList = 'Sửa thông tin nhân viên';
        this.nameButton = 'Sửa';
        // tslint:disable-next-line:no-unused-expression
        this.listEditEmployee = model;
        if (this.listEditEmployee != null) {
          this.formGroup.controls.id.setValue(this.listEditEmployee.id);
          this.formGroup.controls.name.setValue(this.listEditEmployee.name);
          this.formGroup.controls.email.setValue(this.listEditEmployee.email);
          this.formGroup.controls.telephoneNumber.setValue(this.listEditEmployee.telephoneNumber);
          this.formGroup.controls.address.setValue(this.listEditEmployee.address);
          this.formGroup.controls.dateOfBirth.setValue(this.listEditEmployee.dateOfBirth);
        }
        break;
      case 'show':
        this.checkButton = true;
        this.formGroup.controls.id.disable();
        this.formGroup.controls.name.disable();
        this.formGroup.controls.email.disable();
        this.formGroup.controls.telephoneNumber.disable();
        this.formGroup.controls.address.disable();
        this.formGroup.controls.dateOfBirth.disable();
        this.nameList = 'Xem chi tiết nhân viên';
        // tslint:disable-next-line:no-unused-expression
        this.listEditEmployee = model;
        if (this.listEditEmployee != null) {
          this.formGroup.controls.id.setValue(this.listEditEmployee.id);
          this.formGroup.controls.name.setValue(this.listEditEmployee.name);
          this.formGroup.controls.email.setValue(this.listEditEmployee.email);
          this.formGroup.controls.telephoneNumber.setValue(this.listEditEmployee.telephoneNumber);
          this.formGroup.controls.address.setValue(this.listEditEmployee.address);
          this.formGroup.controls.dateOfBirth.setValue(this.listEditEmployee.dateOfBirth);
        }
        break;
    }
  }

  // tslint:disable-next-line:typedef
  open(content: any) {
    this.modalReference = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      centered: true,
      size: 'md',
    });
    this.modalReference.result.then(
      (result: any) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason: any) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  handling(): void {
    switch (this.type) {
      case 'add':
        this.addEmployee();
        break;
      case 'edit':
        this.editEmployee();
        break;
      case 'show':
        break;
    }
  }

  addEmployee(): void {
    let check = false;
    this.submitted = true;
    if (this.formGroup.invalid) {
      return;
    }
    const employee = {
      id: this.formGroup.get('id')?.value,
      name: this.formGroup.get('name')?.value,
      email: this.formGroup.get('email')?.value,
      address: this.formGroup.get('address')?.value,
      telephoneNumber: this.formGroup.get('telephoneNumber')?.value,
      dateOfBirth: this.formGroup.get('dateOfBirth')?.value
    };
    for (let i = 0; i < this.arrCheck.length; i++) {
      if (this.arrCheck[i].id === employee.id) {
        check = true;
        break;
      }
    }
    if (check === true) {
      alert('Mã nhân viên đã tồn tại');
    } else {
      this.listEmployee = [];
      this.listEmployee.push(employee);
      this.pickEmployee(this.listEmployee);
      alert('Thêm mới thành công');
      this.modalReference.dismiss();
    }
  }

  editEmployee(): void {
    // tslint:disable-next-line:prefer-const
    let update: any;
    const arr = [];
    this.submitted = true;
    if (this.formGroup.invalid) {
      return;
    }
    const employee = {
      id: this.formGroup.get('id')?.value,
      name: this.formGroup.get('name')?.value,
      email: this.formGroup.get('email')?.value,
      address: this.formGroup.get('address')?.value,
      telephoneNumber: this.formGroup.get('telephoneNumber')?.value,
      dateOfBirth: this.formGroup.get('dateOfBirth')?.value,
    };
    for (let i = 0; i < this.arrCheck.length; i++) {
      if (this.arrCheck[i].id === employee.id) {
        this.listEmployee[i].name = employee.name;
        this.listEmployee[i].email = employee.email;
        this.listEmployee[i].address = employee.address;
        this.listEmployee[i].telephoneNumber = employee.telephoneNumber;
        this.listEmployee[i].dateOfBirth = employee.dateOfBirth;
        arr.push(this.listEmployee[i]);
      }
    }
    this.pickEmployee(arr);
    alert('Sửa thành công');
    this.modalReference.dismiss();
  }

  public pickEmployee(list: any): void {
    this.listAddEditEmpolyee.emit(list);
  }
}


