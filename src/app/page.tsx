'use client'
import { Box, Container } from '@mui/material'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { loadGoogleMapsAPI } from './map/loadGoogleMapsAPI'

const Index: NextPage = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null)

  useEffect(() => {
    loadGoogleMapsAPI(setMap)
  }, [])

  return (
    <>
      <Container maxWidth="xl">
        <Box id="map" style={{ height: '80vh', width: '100%' }}></Box>
      </Container>
    </>
  )
}

export default Index
