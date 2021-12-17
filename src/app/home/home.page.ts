import { Component } from '@angular/core';
import { GeoLocationType } from 'src/types';
import { GeolocationService } from '../services/geolocation.service';

// import { FCM } from '@ionic-native/fcm/ngx';
import { Platform } from '@ionic/angular';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  pushes: any = [];

  currentLocation: GeoLocationType = { latitude: -99, longitude: -99 };
  administrativeArea: string = '';
  pincode: string = '';

  constructor(
    private geoLocationService: GeolocationService,
    private notificationService: NotificationService,
    // private fcm: FCM,
    public plt: Platform
  ) {}

  async onClickAutoFill() {
    (await this.geoLocationService.getCurrentLocationAsync()).subscribe(
      (location) => (this.currentLocation = location)
    );
    (
      await this.geoLocationService.getReverseGeoCodedLocation(
        this.currentLocation
      )
    ).subscribe((adrs) => {
      this.administrativeArea = adrs.administrativeArea;
      this.pincode = adrs.postalCode;
    });
  }
}
