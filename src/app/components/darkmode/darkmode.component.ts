import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-darkmode',
  templateUrl: './darkmode.component.html',
  styleUrls: ['./darkmode.component.css']
})
export class DarkmodeComponent implements OnInit {

  darkMode: boolean = false;
  modeText: string = 'Light Mode';
  @Output() modeChangeEvent = new EventEmitter<boolean>();
  
  

  constructor() { }

  ngOnInit(): void {
    this.darkMode = localStorage.getItem('dark-mode') === "true" ? true : false;
    this.modeChangeEvent.emit(this.darkMode);
  }

  changeMode() {
    this.darkMode = !this.darkMode;
    this.modeText = this.darkMode ? 'Dark Mode' : 'Light Mode'
    localStorage.setItem('dark-mode', this.darkMode ? 'true' : 'false');
    this.modeChangeEvent.emit(this.darkMode);
  }

}
