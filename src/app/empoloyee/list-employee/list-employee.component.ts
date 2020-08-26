import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ModalDismissReasons, NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EmployeeItemComponent} from '../employee-item/employee-item.component';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css'],
})
export class ListEmployeeComponent implements OnInit {


  constructor(private modalService: NgbModal) {
  }

  modalReference: any;
  closeResult: string;
  pageSize = 5;
  page = 1;
  searchedKeyword!: string;
  listEmployee = [
    {
      id: '1',
      name: 'Trần Thanh Hải',
      email: 'hailit2306@gmail.com',
      address: '98 Lạc Long Quân',
      telephoneNumber: '0396355470',
      dateOfBirth: '1999-01-10'
    },
    {
      id: '2',
      name: 'Vũ Quang Minh',
      email: 'hailit2306@gmail.com',
      address: '1194 Đường Láng',
      telephoneNumber: '0396355470',
      dateOfBirth: '2020-08-25'
    },
    {
      id: '3',
      name: 'Vũ Quang Minh',
      email: 'hailit2306@gmail.com',
      address: '1194 Đường Láng',
      telephoneNumber: '0396355470',
      dateOfBirth: '2020-08-25'
    },
    {
      id: '4',
      name: 'Vũ Quang Minh',
      email: 'hailit2306@gmail.com',
      address: '1194 Đường Láng',
      telephoneNumber: '0396355470',
      dateOfBirth: '2020-08-25'
    },
    {
      id: '5',
      name: 'Trần Thanh Hải',
      email: 'hailit2306@gmail.com',
      address: '98 Lạc Long Quân',
      telephoneNumber: '0396355470',
      dateOfBirth: '1999-01-10'
    },
    {
      id: '6',
      name: 'Vũ Quang Minh',
      email: 'hailit2306@gmail.com',
      address: '1194 Đường Láng',
      telephoneNumber: '0396355470',
      dateOfBirth: '2020-08-25'
    },
    {
      id: '7',
      name: 'Vũ Quang Minh',
      email: 'hailit2306@gmail.com',
      address: '1194 Đường Láng',
      telephoneNumber: '0396355470',
      dateOfBirth: '2020-08-25'
    },
    {
      id: '8',
      name: 'Vũ Quang Minh',
      email: 'hailit2306@gmail.com',
      address: '1194 Đường Láng',
      telephoneNumber: '0396355470',
      dateOfBirth: '2020-08-25'
    }, {
      id: '9',
      name: 'Trần Thanh Hải',
      email: 'hailit2306@gmail.com',
      address: '98 Lạc Long Quân',
      telephoneNumber: '0396355470',
      dateOfBirth: '1999-01-10'
    },
    {
      id: '10',
      name: 'Vũ Quang Minh',
      email: 'hailit2306@gmail.com',
      address: '1194 Đường Láng',
      telephoneNumber: '0396355470',
      dateOfBirth: '2020-08-25'
    },
    {
      id: '11',
      name: 'Vũ Quang Minh',
      email: 'hailit2306@gmail.com',
      address: '1194 Đường Láng',
      telephoneNumber: '0396355470',
      dateOfBirth: '2020-08-25'
    },
    {
      id: '12',
      name: 'Vũ Quang Minh',
      email: 'hailit2306@gmail.com',
      address: '1194 Đường Láng',
      telephoneNumber: '0396355470',
      dateOfBirth: '2020-08-25'
    }
  ];

  @ViewChild(EmployeeItemComponent) view!: EmployeeItemComponent;

  ngOnInit(): void {
  }

  delete(id: number): void {
    this.deleteEmployee(id);
    this.modalReference.dismiss();
  }

  // tslint:disable-next-line:typedef
  open(content: any) {
    this.modalReference = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
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

  initModal(model: any, type = null): void {
    this.view.view(model, type);
  }

  deleteEmployee(id: any): void {
    const index = this.listEmployee.findIndex(employee => employee.id === id);
    this.listEmployee.splice(index, 1);
  }

  public showEmployee(list: any): void {
    this.listEmployee = list;
  }
}
