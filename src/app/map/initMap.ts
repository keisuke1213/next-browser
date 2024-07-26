import  {addMarker}  from './addMarker'

interface Coordinates {
  latitude: number;
  longitude: number;
}

export const initMap = async (
    setMap: React.Dispatch<React.SetStateAction<google.maps.Map | null>>,
    curLocation: Coordinates
  ) => {
    const mapElement = document.getElementById('map')
  
    if (mapElement) {
      const map = new google.maps.Map(mapElement, {
        zoom: 14,
        mapId: 'DEMO_MAP_ID',
        maxZoom: 25,
        center: { lat: curLocation.latitude, lng: curLocation.longitude },
      })
  
      setMap(map)
      addMarker(map);
    } else {
      console.error('Google Maps API is not available')
    }
  }
  