// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class EmployeeService {

//   constructor() { }
// }
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
//import 'rxjs/add/operator/toPromise';

import {Employee} from'./employee.model'

@Injectable()
export class EmployeeService {
  selectedEmployee : Employee;
  employeeList : Employee[];
  constructor(private http : Http) { }

  postEmployee(emp : Employee){
    var body = JSON.stringify(emp);
    var headerOptions = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
    return this.http.post('http://localhost:49776/api/Employee',body,requestOptions).pipe(map(x => x.json()));
  }

  putEmployee(id, emp) {
    var body = JSON.stringify(emp);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put('http://localhost:49776/api/Employee/' + id,
      body,
      requestOptions).pipe(map(res => res.json()));
  }

  getEmployeeList(){
    this.http.get('http://localhost:49776/api/Employee')
    .pipe(map((data : Response) =>{
      return data.json() as Employee[];
    })).toPromise().then(x => {
      this.employeeList = x;
    })
  }

  deleteEmployee(id: number) {
    return this.http.delete('http://localhost:49776/api/Employee/' + id).pipe(map(res => res.json()));
  }
}