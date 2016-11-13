import { Component, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';
import { BarcodeScanner } from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  constructor(public navCtrl: NavController) {

  }

  ngOnInit() {
    console.log('ngOnInit');

    BarcodeScanner.scan().then((barcodeData) => {
      console.log('barcodeData', barcodeData);
      // Success! Barcode data is here
    }, (err) => {
      // An error occurred
    });
  }
}
