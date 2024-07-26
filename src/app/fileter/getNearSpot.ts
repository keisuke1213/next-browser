import shelters from '../shelter.json';

interface Shelter {
  避難施設名称: string;
  住所: string;
  経度: number;
  緯度: number;
  連絡先?: number;
  屋内収容可能人数: number;
}

interface Position {
  latitude: number;
  longitude: number;
}

export const filter = (currentPosition: Position): Shelter[] => {
  const earthRadiusKm = 6371;

  const toRad = (value: number): number => {
    return (value * Math.PI) / 180;
  };

  const getDistance = (position1: Position, position2: Position): number => {
    const dLat = toRad(position2.latitude - position1.latitude);
    const dLon = toRad(position2.longitude - position1.longitude);

    const lat1 = toRad(position1.latitude);
    const lat2 = toRad(position2.latitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
  };

  return shelters.shelters.filter((shelter) => {
    const distance = getDistance(currentPosition, {
      latitude: shelter.緯度,
      longitude: shelter.経度,
    });
    return distance <= 1;
  });
};