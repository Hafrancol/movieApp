import { Component, Input, OnInit } from '@angular/core';
import { Cast } from '../../interfaces/credits.interface';

@Component({
  selector: 'app-slider-actors',
  templateUrl: './slider-actors.component.html',
  styleUrls: ['./slider-actors.component.scss']
})
export class SliderActorsComponent implements OnInit {
	@Input() title:string = '';
	@Input() actors : Cast [] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
