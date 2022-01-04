import { Component, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatRadioChange } from '@angular/material/radio';
import { MdePopoverTrigger } from '@material-extended/mde';



@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements OnInit {
  @ViewChild(MdePopoverTrigger, { static: false }) trigger: MdePopoverTrigger;
  //@ViewChildren(MdePopoverTrigger) popoverTrigger: QueryList<MdePopoverTrigger>;
  @Input() popoverDescription;
  finalArray: any[] = [];
  selectedValue = '';
  isSubmitted = false;
  constructor() { }

  ngOnInit(): void {
    console.log('in popover', this.popoverDescription);
  }

  closePopover() {
    this.trigger.togglePopover();
  }
  radioChange(event: MatRadioChange, data) {
    var obj = this.popoverDescription.filter(x => x.id == data.id)[0];
    console.log(obj);
    obj.selected = event.value;
    this.selectedValue = obj.selected;
    console.log('selected variable', this.selectedValue);
    console.log(this.finalArray.some(x => x.id == data.id));
    if (!this.finalArray.some(x => x.id == data.id)) {
      this.finalArray.push(obj);
    }
  }

  onChange(ob: MatCheckboxChange, data, i) {
    console.log("checked : " + ob.checked);
    console.log("checked  value: " + data);
    var checkedData = new Array();
    if (ob.checked === true) {
      checkedData.push(data[i]);
    }
    if (ob.checked === false) {
      var index: number = checkedData.indexOf(data);
      checkedData.splice(index, 1);
    }
    console.log('checkd data', checkedData);
  }

  onSubmit() {
    this.isSubmitted = true;
    // Form Logic

    // On Success close popover
    this.closePopover();
  }
}
