import { Component, OnInit, Output, Input } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

    // MatPaginator Inputs
    @Input() length;
    pageSize = 10;
    pageSizeOptions: number[] = [5, 10, 25, 100];

    @Output() pageEvent: EventEmitter<PageEvent> = new EventEmitter()

    setPageSizeOptions(setPageSizeOptionsInput: string) {
      if (setPageSizeOptionsInput) {
        this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
      }
    }
  constructor() { }

  ngOnInit(): void {
  }

}
