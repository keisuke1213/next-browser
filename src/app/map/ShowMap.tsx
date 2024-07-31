'use client'
import { Box, Grid,Button,ButtonGroup,Container,InputLabel,FormControl,MenuItem,Select,SelectChangeEvent, useMediaQuery, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import { loadGoogleMapsAPI } from './loadGoogleMapsAPI'
import shelters from '../shelter.json'

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
      <Grid container  maxWidth="xl" sx={{mb: 5}}>
        <Grid item xs={2}>
        <SelectArea map={map}/>
        </Grid>
        <Grid item xs={10} >
        <Box id="map" sx={{ height: '80vh', width: '100%', mt: 2 }}></Box>
        </Grid>
      </Grid>
    </>
  )
}

type selectAreaProps = {
  map: google.maps.Map | null;
}

 const SelectArea = ({map}: selectAreaProps) => {
  const [selectedArea, setSelectedArea] = useState('');
  
  
  const handleChange = (event: SelectChangeEvent<string>) => {
    const area = event.target.value as string;
    setSelectedArea(area);
  };

  const handleSubmit = () => {
    const spots = getFilterSpot(selectedArea);
    addMarker(map, spots);

  }

  const addMarker = (map: google.maps.Map | null, spots: Spot[]) => {
    spots.forEach((spot) => {
      const marker = new google.maps.Marker({
        position: { lat:spot.緯度 || 1111, lng:spot.経度 || 1111 },
        map: map,
        title:spot.避難施設名称,
      });
      const infoWindow = new google.maps.InfoWindow({
        content: `<h3>${spot.避難施設名称}</h3><p><span style="color: blue">住所   </span>${spot.住所}</p><p><span style="color: blue">収容可能人数   </span>${spot.屋内収容可能人数}人</p><p><span style="color: blue">連絡先   </span>${spot.連絡先}</p>`,
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
    <Container sx={{mt: 2}}>
    <Grid container xs={12}>
      <FormControl fullWidth>
    <InputLabel id="area-select-label">地域を選択</InputLabel>
          <Select
            labelId="area-select-label"
            value={selectedArea}
            onChange={handleChange}
            sx={{ mb: 1 }}
          >
            <MenuItem value={'北区'}>北区</MenuItem>
            <MenuItem value={'上京区'}>上京区</MenuItem>
            <MenuItem value={'中京区'}>中京区</MenuItem>
            <MenuItem value={'下京区'}>下京区</MenuItem>
            <MenuItem value={'右京区'}>右京区</MenuItem>
            <MenuItem value={'左京区'}>左京区</MenuItem>
            <MenuItem value={'東山区'}>東山区</MenuItem>
            <MenuItem value={'山科区'}>山科区</MenuItem>
            <MenuItem value={'伏見区'}>伏見区</MenuItem>
            <MenuItem value={'西京区'}>西京区</MenuItem>
            <MenuItem value={'南区'}>南区</MenuItem>
          </Select>
        </FormControl>
    </Grid>
    <Button variant={'outlined'} color="success" onClick={handleSubmit}>検索する</Button>
    </Container>
    </>
  )
}

