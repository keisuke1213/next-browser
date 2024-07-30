'use client'
import { Box, Grid,Button,ButtonGroup,Container } from '@mui/material'
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
      <Grid container  maxWidth="xl">
        <Grid item xs={2}>
        <SelectArea map={map}/>
        </Grid>
        <Grid item xs={10} >
        <Box id="map" sx={{ height: '75vh', width: '100%', mt: 3 }}></Box>
        </Grid>
      </Grid>
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
    "東山区": "outlined",
    "山科区": "outlined",
    "伏見区": "outlined",
    "西京区": "outlined",
    "南区" : "outlined",
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
    <Container sx={{mt: 3, ml: 1}}>
    <Grid container xs={12}>
      <Button variant={buttonState['北区']} onClick={() => handleClicked('北区')} sx={{px: 3, mb: 1}}>北区</Button>
      <Button variant={buttonState['上京区']} onClick={() => handleClicked('上京区')} sx={{ mb: 1}}>上京区</Button>
      <Button variant={buttonState['中京区']} onClick={() => handleClicked('中京区')} sx={{ mb: 1}}>中京区</Button>
      <Button variant={buttonState['下京区']} onClick={() => handleClicked('下京区')} sx={{ mb: 1}}>下京区</Button>
      <Button variant={buttonState['右京区']} onClick={() => handleClicked('右京区')} sx={{ mb: 1}}>右京区</Button>
      <Button variant={buttonState['左京区']} onClick={() => handleClicked('左京区')} sx={{ mb: 1}}>左京区</Button>
      <Button variant={buttonState['東山区']} onClick={() => handleClicked('東山区')} sx={{ mb: 1}}>東山区</Button>
      <Button variant={buttonState['山科区']} onClick={() => handleClicked('山科区')} sx={{ mb: 1}}>山科区</Button>
      <Button variant={buttonState['伏見区']} onClick={() => handleClicked('伏見区')} sx={{ mb: 1}}>伏見区</Button>
      <Button variant={buttonState['西京区']} onClick={() => handleClicked('西京区')} sx={{ mb: 1}}>西京区</Button>
      <Button variant={buttonState['南区']} onClick={() => handleClicked('南区')} sx={{ mb: 1}}>南区</Button>
    </Grid>
    <Button variant={'outlined'} color="success" onClick={handleSubmit}>検索する</Button>
    </Container>
  )
}

