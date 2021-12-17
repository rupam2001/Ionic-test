import { Injectable } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Observable, of } from 'rxjs';
import { GeoLocationType } from 'src/types';

import {
  NativeGeocoder,
  NativeGeocoderResult,
  NativeGeocoderOptions,
} from '@awesome-cordova-plugins/native-geocoder/ngx';

let options: NativeGeocoderOptions = {
  useLocale: true,
  maxResults: 5,
};

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder
  ) {}

  async getCurrentLocationAsync(): Promise<Observable<GeoLocationType>> {
    const location = await this.geolocation.getCurrentPosition();
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
      // console.log(data);
    });
    return of({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  }
  async getReverseGeoCodedLocation(
    location: GeoLocationType
  ): Promise<Observable<NativeGeocoderResult>> {
    const res: NativeGeocoderResult[] =
      await this.nativeGeocoder.reverseGeocode(
        location.latitude,
        location.longitude,
        options
      );
    return of(res[0]);
  }
}
