import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { EnumTabs } from '../../shared/enums';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  enumTabs = EnumTabs;
  selectedTab = '';
  tooltipMsg='';
  popoverDescription: any[] = [];

  constructor(private observer: BreakpointObserver) { }

  ngOnInit(): void {
    this.popoverDescription = [
      { type: "content", data: [], name: "This is a sample popover with material design in Angular with Angular cdk.", isFlagEnabled: true },
      { type: 'radio', data: ['apple', 'orange', 'grape'], name: "Select your Favourite fruit", isFlagEnabled: true },
      { type: 'checkbox', data: ['Male', 'Female', 'Others'], name: "Select your Gender", isFlagEnabled: false }
    ];
  }

  changeTab(tab: EnumTabs) {
    this.selectedTab = tab;
  }

  showTooltip(){
    this.tooltipMsg="tooltip description";
  }

  showPopOver(){
    //this.popoverDescription = "This is a sample popover with material design in Angular with Angular cdk.";
  }
}
