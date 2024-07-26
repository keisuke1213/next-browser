'use client'
import { Box, Container,Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { loadGoogleMapsAPI } from './loadGoogleMapsAPI'
import shelters from '../shelter.json'

type ButtonState = {
  [key: string]: 'outlined' | 'contained'
};

type Spot = {
  避難施設名称: string;
  住所: string;
  経度: number;
  緯度: number;
  連絡先?: number;
  屋内収容可能人数: number;
}

export const ShowMap = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null)

  useEffect(() => {
    loadGoogleMapsAPI(setMap)
  }, [])

  return (
    <>
      <Container maxWidth="xl">
        <SelectArea map={map} />
        <Box id="map" style={{ height: '80vh', width: '100%' }}></Box>
      </Container>
    </>
  )
}

type selectAreaProps = {
  map: google.maps.Map | null;
}

 const SelectArea = ({map}: selectAreaProps) => {
  const [buttonState, setButtonState] = useState<ButtonState>({
    "北区": "outlined",
    "上京区": "outlined",
    "中京区": "outlined",
    "下京区": "outlined",
    "右京区": "outlined",
    "左京区": "outlined",
  });

  const handleClicked = (area: string) => {
    setButtonState(prevState => ({
      ...prevState,
      [area]: prevState[area] === "outlined" ? "contained" : "outlined",
    }));
  }

  const handleSubmit = () => {
    const area = Object.keys(buttonState).filter((key) => buttonState[key] === "contained")
    const spots = [...area].flatMap((area) => getFilterSpot(area))
    console.log(spots)
    addMarker(map,spots)

    setButtonState(prevState => {
      const newState = {...prevState};
      Object.keys(newState).forEach(key => {
        newState[key] = "outlined";
      })
      return newState;
    });
  }

  const addMarker = (map: google.maps.Map | null, spots: Spot[]) => {
    spots.forEach((spot) => {
      const marker = new google.maps.Marker({
        position: { lat:spot.緯度 || 1111, lng:spot.経度 || 1111 },
        map: map,
        title:spot.避難施設名称,
      });
      const infoWindow = new google.maps.InfoWindow({
        content: `<h3>${spot.避難施設名称}</h3><p>${spot.住所}</p><p>${spot.屋内収容可能人数}人</p>`,
      });
      marker.addListener('click', () => {
        infoWindow.open(map, marker);
    });
  });
}

  const getFilterSpot = (area: string) : Spot[] => {
    const cleanedArea = area.replace(/['"]/g, ''); 
    return shelters.shelters.filter((shelter) => {
      return shelter.住所.includes(cleanedArea);
    });
  }
  

  return (
    <>
      <Button variant={buttonState['北区']} onClick={() => handleClicked('北区')}>北区</Button>
      <Button variant={buttonState['上京区']} onClick={() => handleClicked('上京区')}>上京区</Button>
      <Button variant={buttonState['中京区']} onClick={() => handleClicked('中京区')}>中京区</Button>
      <Button variant={buttonState['下京区']} onClick={() => handleClicked('下京区')}>下京区</Button>
      <Button variant={buttonState['右京区']} onClick={() => handleClicked('右京区')}>右京区</Button>
      <Button variant={buttonState['左京区']} onClick={() => handleClicked('左京区')}>左京区</Button>
      <Button onClick={handleSubmit}>検索する</Button>
    </>
  )
}

