import { Component } from '@angular/core';
import { GeoLocationType } from 'src/types';
import { GeolocationService } from '../services/geolocation.service';

import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  currentLocation: GeoLocationType = { latitude: -99, longitude: -99 };
  administrativeArea: string = '';
  pincode: string = '';
  address: string = '';
  subLocality: string = '';
  street: string = '';

  constructor(
    private geoLocationService: GeolocationService,
    private notificationService: NotificationService
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
      this.subLocality = adrs.subLocality;
      this.street = adrs.thoroughfare;
    });
  }
}
