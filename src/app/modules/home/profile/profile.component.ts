import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  id: number;
  myForm: FormGroup;
  labelText = 'Add';


  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id')
    });

    this.myForm = new FormGroup({
      code: new FormControl('', [Validators.required, Validators.maxLength(5), Validators.minLength(3)]),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')),
      phone: new FormControl('', Validators.required),
      isactive: new FormControl(''),
    });

    if (this.id > 0) {
      this.labelText = "Edit";
      this.getEditFormData();
    }

  }

  onSubmit(form: FormGroup) {

    let form2 = form;
    console.log('Valid?', form.valid); // true or false
    console.log('Name', form.value.name);
    console.log('Email', form.value.email);

    if (this.id > 0) {
      this.updateRow(form);
    } else {
      this.addNewRow(form);
    }

  }

  addNewRow(form: FormGroup) {   

    if (localStorage.getItem('json_empData')) {
      let returnTable: ITableElement[] = new Array();
      returnTable = JSON.parse(localStorage.getItem('json_empData'));

      let tableItems: ITableElement = {
        id: returnTable[returnTable.length-1].id+1,
        name: form.value.name,
        code: form.value.code,
        phone: form.value.phone,
        email: form.value.email,
        isactive: form.value.isactive
      }

      returnTable.push(tableItems);
      localStorage.removeItem('json_empData');
      localStorage.setItem('json_empData', JSON.stringify(returnTable));
    }
  }

  updateRow(form: FormGroup) {

  }

  getEditFormData() {
    if (localStorage.getItem('json_empData')) {
      let returnTable: ITableElement[] = new Array();
      returnTable = JSON.parse(localStorage.getItem('json_empData'));
      let formdata = returnTable.filter(x => x.id == this.id)[0];
      this.myForm.patchValue({
        id: formdata.id,
        code: formdata.code,
        name: formdata.name,
        email: formdata.email,
        phone: formdata.phone,
        isactive: formdata.isactive
      });
      this.myForm.updateValueAndValidity();
    }
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
