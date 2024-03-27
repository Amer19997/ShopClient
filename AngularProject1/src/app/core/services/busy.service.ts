import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  spinnerCounter = 0;
  constructor(private spinnerService: NgxSpinnerService) { }
  StartSpinner() {
    this.spinnerCounter++;
    this.spinnerService.show(undefined,
      {
        type: 'timer',
        bdColor: 'rgba(255,255,255,0.7)',
        color: '#333333'
      })

  }

    StopSpinner(){
      this.spinnerCounter--;
      if (this.spinnerCounter <= 0) {
        this.spinnerService.hide();
      }
    }
  }

