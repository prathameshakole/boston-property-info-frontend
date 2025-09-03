import React, { useState, useRef } from 'react';
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
  MapRef
} from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Box, Paper, Typography} from '@mui/material';

interface Property {
  [key: string]: any;
  geocode_latitude?: number;
  geocode_longitude?: number;
  Full_Address?: string;
  BLDG_TYPE?: string;
  OWNER?: string;
  CITY?: string;
  ZIP_CODE?: string;
  YR_BUILT?: number;
}

interface PropertyMapProps {
  properties: Property[];
  darkMode: boolean;
}

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const Pin = ({ size = 20 }: { size?: number }) => {
  const pinStyle = {
    cursor: 'pointer',
    fill: '#d00',
    stroke: 'none'
  };

  return (
    <svg height={size} viewBox="0 0 24 24" style={pinStyle}>
      <path d={ICON} />
    </svg>
  );
};

const PropertyMap = ({ properties, darkMode }: PropertyMapProps) => {
  const mapRef = useRef<MapRef>(null);
  const [popupInfo, setPopupInfo] = useState<Property | null>(null);

  const calculateMapCenter = () => {
    if (properties.length === 0) {
      return { latitude: 40, longitude: -100, zoom: 3.5 };
    }
    const validProperties = properties.filter(
      prop =>
        typeof prop.geocode_latitude === 'number' &&
        typeof prop.geocode_longitude === 'number'
    );
    if (validProperties.length === 0) {
      return { latitude: 40, longitude: -100, zoom: 3.5 };
    }
    const sumLat = validProperties.reduce((sum, prop) => sum + Number(prop.geocode_latitude), 0);
    const sumLng = validProperties.reduce((sum, prop) => sum + Number(prop.geocode_longitude), 0);
    return {
      latitude: sumLat / validProperties.length,
      longitude: sumLng / validProperties.length,
      zoom: validProperties.length === 1 ? 14 : 11
    };
  };

  const initialViewState = calculateMapCenter();

  const mapStyle = darkMode
    ? 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json'
    : 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';

  const handleMarkerClick = (property: Property) => {
    setPopupInfo(property);
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [Number(property.geocode_longitude), Number(property.geocode_latitude)],
        zoom: 15,
        duration: 1000
      });
    }
  };

  return (
    <Map
      ref={mapRef}
      initialViewState={initialViewState}
      mapStyle={mapStyle}
      style={{ width: '100%', height: '100%' }}
      onClick={() => setPopupInfo(null)}
    >
      <GeolocateControl position="top-left" />
      <FullscreenControl position="top-left" />
      <NavigationControl position="top-left" />
      <ScaleControl />
      {properties.map((property, index) => {
        const lat = Number(property.geocode_latitude);
        const lng = Number(property.geocode_longitude);
        if (isNaN(lat) || isNaN(lng)) return null;
        return (
          <Marker
            key={`marker-${index}`}
            longitude={lng}
            latitude={lat}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              handleMarkerClick(property);
            }}
          >
            <Pin />
          </Marker>
        );
      })}
      {popupInfo && (
        <Popup
          longitude={Number(popupInfo.geocode_longitude)}
          latitude={Number(popupInfo.geocode_latitude)}
          anchor="bottom"
          onClose={() => setPopupInfo(null)}
          closeButton={true}
          closeOnClick={false}
          maxWidth="300px"
        >
          <Paper
            sx={{
              p: 1,
              backgroundColor: darkMode ? '#424242' : '#fff',
              color: darkMode ? '#fff' : '#000',
              boxShadow: 3
            }}
            elevation={3}
          >
            <Box sx={{ p: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {popupInfo.Full_Address || 'Property Details'}
              </Typography>
              {popupInfo.BLDG_TYPE && (
                <Typography variant="body2">Type: {popupInfo.BLDG_TYPE}</Typography>
              )}
              {popupInfo.OWNER && (
                <Typography variant="body2">Owner: {popupInfo.OWNER}</Typography>
              )}
              {popupInfo.CITY && (
                <Typography variant="body2">City: {popupInfo.CITY}</Typography>
              )}
              {popupInfo.ZIP_CODE && (
                <Typography variant="body2">ZIP: {popupInfo.ZIP_CODE}</Typography>
              )}
              {popupInfo.YR_BUILT && (
                <Typography variant="body2">Built: {popupInfo.YR_BUILT}</Typography>
              )}
            </Box>
          </Paper>
        </Popup>
      )}
    </Map>
  );
};

export default PropertyMap;
