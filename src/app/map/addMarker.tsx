'use client'
import { filter } from '../fileter/getNearSpot';
import shelters from '../shelter.json';

export const addMarker = (map: google.maps.Map | null) => {
        
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      console.log(latitude, longitude);
      const shelters = filter({ latitude: latitude, longitude: longitude });
      
    
       shelters.forEach((shelter) => {
          const marker = new google.maps.Marker({
            position: { lat:shelter.緯度 || 1111, lng:shelter.経度 || 1111 },
            map: map,
            title:shelter.避難施設名称,
          });

          
         
          const infoWindow = new google.maps.InfoWindow({
            content: `<h3>${shelter.避難施設名称}</h3><p>${shelter.住所}</p><p>${shelter.屋内収容可能人数}人</p><p>${shelter.連絡先}</p>`,
          });
    
          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });
        });
      });
}