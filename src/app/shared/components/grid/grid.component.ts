import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnDestroy,OnInit {

  pageNum = 0;
  gridLastIndex = 0;
  pageSize = 8;
  isAsc: boolean;
  sortFiledName = 'column1';
  sortDirection = 'asc';
  tempSortDirection = '';
  alldatafetched = false;
  isInProgress = false;
  columnsToDisplay = ['column1', 'column2', 'column3', 'column4', 'column5'];
  allGridData: ITableElement[] = new Array();
  dataSource: ITableElement[] = new Array();
  curRequestInProgressForGrid = false;
  selectedGroup: ITableElement;
  totalCount: Number = 0;
  displayCount: Number = 0;


  constructor() { }

  ngOnInit() {
    this.getAllSearchedDataFromApi();
  }

  ngOnDestroy() {
    this.allGridData = null;
    this.dataSource = null;
  }

  /**
   * @description pagination for infinite scroll
   */
  async onTableScroll(e) {
    const tableViewHeight = e.target.offsetHeight; // viewport: ~500px
    const tableScrollHeight = e.target.scrollHeight; // length of all table
    const scrollLocation = e.target.scrollTop; // how far user scrolled

    // If the user has scrolled within 200px of the bottom, add more data
    const buffer = 20;
    const limit = tableScrollHeight - tableViewHeight - buffer;

    if (scrollLocation > limit) {
      if (!this.curRequestInProgressForGrid) {
        if (!this.alldatafetched) {
          await this.fetchGridData();
        }
      }
    }
  }

  /**
    * @description Sorting
    */
  isSorting(name: string) {
    return this.sortFiledName !== name && name !== '';
  }

  /**
  * @description when sort order is asc
  */
  isSortAsc(name: string) {
    const isSortAScOrder: boolean = this.sortFiledName === name && this.sortDirection === 'asc';
    return isSortAScOrder;
  }

  /**
  * @description when sort order is desc
  */
  isSortDesc(name: string) {
    const isSortDesc: boolean = this.sortFiledName === name && this.sortDirection === 'desc';
    return isSortDesc;
  }

  /**
  * @description Method to sort table
  */
  sortHeaderClick(headerName: string) {
    if ((!headerName) || (headerName.trim().toLowerCase() !== this.sortFiledName.trim().toLowerCase())
      || (this.sortDirection !== this.tempSortDirection)) {
      if (headerName) {
        if (this.sortFiledName === headerName) {
          this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
          this.sortDirection = 'desc';
        }
        this.sortFiledName = headerName;
        this.pageNum = 0;
        this.gridLastIndex = 0;
        this.fetchGridData();
      }
    }
  }

  /**
  * @description Fetch grid data
  */
  async fetchGridData() {
    
    this.tempSortDirection = this.sortDirection;
    this.alldatafetched = false;
    this.curRequestInProgressForGrid = true;
    this.isInProgress = true;
    let returnTable: ITableElement[] = new Array();
    returnTable = this.sortAndPagination();

    if (returnTable.length > 0) {
      this.totalCount = this.allGridData.length;
      if (this.pageNum > 0) {
        returnTable.forEach(item => {
          this.dataSource.push(item);
        });
        let cloned = [...this.dataSource];
        this.dataSource = cloned; this.isInProgress = false;
        this.curRequestInProgressForGrid = false;
        if (returnTable.length < this.pageSize) {
          this.alldatafetched = true;
        }
        this.pageNum++;
        this.tempSortDirection = '';
        this.displayCount = this.dataSource.length;
        const countModel = { totalCount: this.totalCount, displayCount: this.displayCount };

        return;
      } else {
        this.dataSource = new Array();
        this.dataSource = returnTable;
        this.isInProgress = false;
        if (returnTable.length < this.pageSize) {
          this.alldatafetched = true;
        }
        const customerTable = document.getElementById('dataTable');
        customerTable.scrollTop = 0;
        this.curRequestInProgressForGrid = false;
        this.tempSortDirection = '';
        this.displayCount = this.dataSource.length;
        const countModel = { totalCount: this.totalCount, displayCount: this.displayCount };
        this.pageNum++;
        return;
      }
    } else {
      if (this.pageNum === 0) {
        this.dataSource = new Array();
        const countModel = { totalCount: 0, displayCount: 0 };
      }
      this.isInProgress = false;
      this.curRequestInProgressForGrid = false;
    }
  }

  /**
  * @description Sorting and Pagination
  */
  sortAndPagination() {
    let returnTable: ITableElement[] = new Array();
    if ((this.sortFiledName) && (this.sortFiledName.trim().length > 0)) {
      if ((this.sortDirection) && (this.sortDirection === 'asc')) {//sort asc
        if (this.sortFiledName === 'column1') {
          this.allGridData.sort((a, b) => a.column1.localeCompare(b.column1));
        } else if (this.sortFiledName === 'column2') {
          this.allGridData.sort((a, b) => a.column2.localeCompare(b.column2));
        } else if (this.sortFiledName === 'column3') {
          this.allGridData.sort((a, b) => a.column3.localeCompare(b.column3));
        } else if (this.sortFiledName === 'column4') {
          this.allGridData.sort((a, b) => a.column4.toString().localeCompare(b.column4));
        } else if (this.sortFiledName === 'column5') {
          this.allGridData.sort((a, b) => a.column5.toString().localeCompare(b.column5));
        }
      } else {// sort desc
        if (this.sortFiledName === 'column1') {
          this.allGridData.sort((a, b) => b.column1.localeCompare(a.column1));
        } else if (this.sortFiledName === 'column2') {
          this.allGridData.sort((a, b) => b.column2.localeCompare(a.column2));
        } else if (this.sortFiledName === 'column3') {
          this.allGridData.sort((a, b) => b.column3.localeCompare(a.column3));
        } else if (this.sortFiledName === 'column4') {
          this.allGridData.sort((a, b) => b.column4.toString().localeCompare(a.column4));
        } else if (this.sortFiledName === 'column5') {
          this.allGridData.sort((a, b) => b.column5.toString().localeCompare(a.column5));
        }
      }

      //pagination
      let begin = this.gridLastIndex;
      let end = begin + this.pageSize;
      returnTable = this.allGridData.slice(begin, end);
      this.gridLastIndex = end;
    }
    return returnTable;
  }

  /**
  * @description Get searched data
  */
  private getAllSearchedDataFromApi() {
    this.isInProgress = true;
    let querystring = '';
    this.allGridData = new Array();
    this.dataSource = new Array();

    //temp data
    this.loadDummyData();

    // Enable below code for api call to get all grid data

    // const promise = new Promise((resolve, reject) => {
    //   this.httpService.getAllData(querystring).toPromise()
    //     .then(
    //       res => {
    //         if (res && res.data && res.data.length > 0) {

    //           res.data.forEach((tItem, index) => {              

    //             const tableItems: ITableElement = {
    //               column1: (tItem.column1 === null || tItem.column1 === undefined) ? '' : tItem.column1,
    //               column2: (tItem.column2 === null || tItem.column2 === undefined) ? '' : tItem.column2,
    //               column3: (tItem.column3 === null || tItem.column3 === undefined) ? '' : tItem.column3,
    //               column4: (tItem.column4 === null || tItem.column4 === undefined) ? '' : tItem.column4,
    //               column5: (tItem.column5 === null || tItem.column5 === undefined) ? '' : tItem.column5,
    //             }
    //             this.allGridData.push(tableItems);
    //           });
    //           this.fetchGridData();
    //         }
    //       },
    //       msg => { // Error
    //         if (this.pageNum === 0) {
    //           this.dataSource = new Array();
    //         }
    //         this.isInProgress = false;
    //         reject(msg);
    //       });
    // });
    // return promise;
  }

  /**
  * @description On selected row emit data
  */
  onSelect(row: object): void {
    if ((!this.selectedGroup) || (row['column1'] !== this.selectedGroup.column1)) {
      const tableData: ITableElement = {
        column1: row['column1'],
        column2: row['column2'],
        column3: row['column3'],
        column4: row['column4'],
        column5: row['column5'],
      };
      this.selectedGroup = tableData;
    }
  }

  loadDummyData() {
    let tableItems: ITableElement = {
      column1: 'aa',
      column2: 'bb',
      column3: 'cc',
      column4: 'dd',
      column5: 'ee',
    }
    this.allGridData.push(tableItems);

    tableItems = {
      column1: 'ddd',
      column2: 'aa',
      column3: 'ff',
      column4: 'fff',
      column5: 'ggg',
    }
    this.allGridData.push(tableItems);

    tableItems = {
      column1: 'dd',
      column2: 'fd',
      column3: 'hh',
      column4: 'kkl',
      column5: 'ui',
    }
    this.allGridData.push(tableItems);

    tableItems = {
      column1: 'sa',
      column2: 'fd',
      column3: 'hgh',
      column4: 'ky',
      column5: 'nm',
    }
    this.allGridData.push(tableItems);

    tableItems = {
      column1: 'vf',
      column2: 'df',
      column3: 'gg',
      column4: 'jjj',
      column5: 'ghg',
    }
    this.allGridData.push(tableItems);

    tableItems = {
      column1: 're',
      column2: 'eew',
      column3: 'zx',
      column4: 'ew',
      column5: 'za',
    }
    this.allGridData.push(tableItems);

    tableItems = {
      column1: 'ac',
      column2: 'sf',
      column3: 'bh',
      column4: 'hj',
      column5: 'jn',
    }
    this.allGridData.push(tableItems);

    tableItems = {
      column1: 'tr',
      column2: 're',
      column3: 'ye',
      column4: 'he',
      column5: 'sg',
    }
    this.allGridData.push(tableItems);

    tableItems = {
      column1: 'yf',
      column2: 'fn',
      column3: 'hh',
      column4: 'kk',
      column5: 'll',
    }
    this.allGridData.push(tableItems);

    tableItems = {
      column1: 'gw',
      column2: 'dj',
      column3: 'ng',
      column4: 'go',
      column5: 'pl',
    }
    this.allGridData.push(tableItems);
    this.fetchGridData();
  }
}

interface ITableElement {
  column1: string;
  column2: string;
  column3: string;
  column4: string;
  column5: string;
}
