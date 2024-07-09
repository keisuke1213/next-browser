'use client'
import React, { useEffect } from 'react';
import places from '../places.json';
import { loadGoogleMapsAPI } from './loadGoogleMapsAPI'

export const addMarker = (map: google.maps.Map | null) => {
    
        places.locations.forEach((location) => {
          const marker = new google.maps.Marker({
            position: { lat: location.緯度 || 1111, lng: location.経度 || 1111 },
            map: map,
            title: location.名称,
          });
    
          const infoWindow = new google.maps.InfoWindow({
            content: `<h3>${location.名称}</h3><a href="${location.URL}">詳細はこちら</a><p>${location.住所}</p><p>${location.説明}</p>`,
          });
    
          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });
        });
}