import { Component, OnInit } from '@angular/core';

declare const google: any;

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.css'],
})
export class RegionsComponent implements OnInit {
  map: any;
  searchAddress: string = '';
  nearbyFacilities: { name: string; address: string }[] = [];
  marker: any;

  ngOnInit(): void {
    // Initialize the map
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 37.7749, lng: -122.4194 }, // Default to San Francisco
      zoom: 12,
    });

    // Add click listener to the map
    this.map.addListener('click', (event: any) => {
      const clickedLocation = event.latLng;
      this.placeMarker(clickedLocation);
      this.findNearbyFacilities(clickedLocation.lat(), clickedLocation.lng());
    });
  }

  onSearchAddress(): void {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: this.searchAddress }, (results: any, status: any) => {
      if (status === 'OK') {
        const location = results[0].geometry.location;
        this.map.setCenter(location);
        this.placeMarker(location);
        this.findNearbyFacilities(location.lat(), location.lng());
      } else {
        console.error('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  placeMarker(location: any): void {
    if (this.marker) {
      this.marker.setMap(null);
    }
    this.marker = new google.maps.Marker({
      position: location,
      map: this.map,
    });
  }

  findNearbyFacilities(lat: number, lng: number): void {
    // Mock data for nearby facilities
    this.nearbyFacilities = [
      { name: 'General Hospital', address: '123 Health St, Nearby City' },
      { name: 'Family Clinic', address: '456 Wellness Blvd, Nearby Town' },
    ];
    console.log('Nearby facilities found:', this.nearbyFacilities);
  }

  goBack(): void {
    // Implement back navigation logic
  }

  proceed(): void {
    // Implement proceed logic
  }
}
