import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DarkmodeService } from 'src/app/services/darkmode.service';

@Component({
  selector: 'app-darkmode',
  templateUrl: './darkmode.component.html',
  styleUrls: ['./darkmode.component.css']
})
export class DarkmodeComponent implements OnInit {

  darkMode: boolean = false;
  @Output() modeChangeEvent = new EventEmitter<boolean>();
  
  

  constructor(private darkmode: DarkmodeService) {
    this.darkmode.currentMode.subscribe(() => {
      this.darkMode = localStorage.getItem('dark-mode') === "true" ? true : false;
      this.modeChangeEvent.emit(this.darkMode);
    })
   }

  ngOnInit(): void {

    this.darkmode.currentMode.subscribe(() => {
      this.darkMode = localStorage.getItem('dark-mode') === "true" ? true : false;
      this.modeChangeEvent.emit(this.darkMode);
    })

  }


}
