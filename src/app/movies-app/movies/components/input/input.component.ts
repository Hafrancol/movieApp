import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
	public termino:string = ""
	public debounder:Subject<string> = new Subject()
	@Output() onDebounce:EventEmitter<string> = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
		this.debounder
			.pipe(
				debounceTime(300)
			)
			.subscribe(res=>this.onDebounce.emit(this.termino))
  }

	recomendation(event:any){
		this.debounder.next(this.termino)

	}
}
