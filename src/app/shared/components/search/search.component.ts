import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [
    trigger(
        'inOutAnimation',
        [
            transition(
                ':enter',
                [
                    style({ width: 0, opacity: 0 }),
                    animate('1s ease-out',
                        style({ width: 280, opacity: 1 }))
                ]
            ),
            transition(
                ':leave',
                [
                    style({ width: 280, opacity: 1 }),
                    animate('1s ease-in',
                        style({ width: 0, opacity: 0 }))
                ]
            )
        ]
    )
]
})
export class SearchComponent implements OnInit {

  searchNotFound = false;
  hideSearchCrossIcon = true;
  isSearchBoxFilled = false;
  searchText= '';

  @ViewChild('txtSearch', { static: false }) txtSearch: ElementRef;

  constructor( private elementRef: ElementRef) { }

  ngOnInit(): void {

  }

  /**
   * @description Method to trigger the search
   */
   searchGrid(searchText: string) {
    this.searchNotFound = false;   

    if (searchText.trim().length > 0) {
        this.hideSearchCrossIcon = false;
    } else {
        this.hideSearchCrossIcon = true;
        this.txtSearch.nativeElement.value = '';
        this.isSearchBoxFilled = false;
    }
    this.searchText = searchText;    
}

/**
* @description Method to hide and show search box
*/
toggleSearchBox() {
    if (this.isSearchBoxFilled) {
        this.searchGrid(this.txtSearch.nativeElement.value);
    } else {
        this.isSearchBoxFilled = !this.isSearchBoxFilled;
    }
}


}
