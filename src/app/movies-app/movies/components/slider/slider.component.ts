import { Component, Input, OnInit } from '@angular/core';
import { Result } from '../../interfaces/popularMovies.interface';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})


export class SliderComponent implements OnInit {
	@Input() movies:Result[] = [];
	@Input() title:string = "";
  constructor() { }

  ngOnInit(): void {
  }

}
