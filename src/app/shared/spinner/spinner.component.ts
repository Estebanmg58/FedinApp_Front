import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template:  `<div class="overlay"><div class="lds-hourglass"></div></div>`,
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
