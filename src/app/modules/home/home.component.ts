import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../shared/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  jsondata: any = [];

  displayedColumns: string[] = ['id', 'name', 'code', 'phone', 'email', 'action'];
  dataSource: ITableElement[];

  constructor(private dataService: DataService, private router: Router, private httpClient: HttpClient) {


  }

  ngOnInit(): void {
    this.getEmpData();
  }

  getEmpData() {
    if (localStorage.getItem('json_empData')) {
      let returnTable: ITableElement[] = new Array();
      returnTable = JSON.parse(localStorage.getItem('json_empData'));
      this.dataSource = returnTable;
    } else {
      this.fetchGridData();
    }
  }

  fetchGridData() {
    let returnTable: ITableElement[] = new Array();
    this.dataService.getJSON().subscribe(data => {
      this.jsondata = data;
      if (this.jsondata.employees && this.jsondata.employees.length > 0) {
        this.jsondata.employees.forEach(element => {
          let tableItems: ITableElement = {
            id: element.id,
            name: element.name,
            code: element.code,
            phone: element.phone,
            email: element.email,
            isactive: element.isactive
          }
          returnTable.push(tableItems);
        });
        this.dataSource = returnTable;
        localStorage.removeItem('json_empData');
        localStorage.setItem('json_empData', JSON.stringify(returnTable));
      }
    });
  }

  addNew() {
    this.router.navigateByUrl('/home/profile');
  }
  editEmp(id: number) {
   // this.router.navigateByUrl(['/profile',String(id)]);
  }
  deleteEmp(id: number) {
    let returnTable: ITableElement[] = this.dataSource;
    let item = returnTable.filter(x => x.id == id)[0];
    var index = returnTable.indexOf(item);
    if (index !== -1) {
      returnTable.splice(index, 1);
      this.dataSource = [...returnTable];
      localStorage.removeItem('json_empData');
      localStorage.setItem('json_empData', JSON.stringify(returnTable));
    }
  }

  refresh() {
    alert('refresh')
    localStorage.removeItem('json_empData');
    this.fetchGridData();
  }

}

export interface ITableElement {
  id: number,
  name: string,
  code: string,
  phone: string,
  email: string,
  isactive: boolean
}
