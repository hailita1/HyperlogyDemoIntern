import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const URL = 'http://localhost:3000/employees/';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  constructor(private httpClient: HttpClient) {
  }

  // getEmployee(): Observable<any[]> {
  //   return this.httpClient.get<any[]>(URL);
  // }
  //
  // findEmployeeById(id): Observable<any> {
  //   return this.httpClient.get<any>(URL + id);
  // }
  //
  // addEmployee(object: any): Observable<any> {
  //   return this.httpClient.post<any>(URL, object);
  // }
  //
  // deleteEmployee(id: number): Observable<any> {
  //   return this.httpClient.delete<any>(URL + id);
  // }
  //
  // editEmployee(object, id: number): Observable<any> {
  //   return this.httpClient.put<any>(URL + id, object);
  // }
}
