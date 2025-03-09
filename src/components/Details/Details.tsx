import React, { useState, useRef } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import NavBar from '../navbar';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
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
 
interface DetailsProps {
    darkMode: boolean;
    toggleDarkMode: () => void;
}
 
const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;
 
const Pin = ({ size = 20 }) => {
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
 
interface Property {
  [key: string]: any;
  geocode_latitude?: number;
  geocode_longitude?: number;
}
 
const Details = ({ darkMode, toggleDarkMode }: DetailsProps) => {
    const location = useLocation();
    const { propertyData } = location.state || {};
    const [popupInfo, setPopupInfo] = useState<Property | null>(null);
    const mapRef = useRef<MapRef>(null);
 
    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
        },
    });
 
    // Function to get properties as an array
    const getPropertiesArray = () => {
        if (Array.isArray(propertyData)) {
            return propertyData.length > 1 ? propertyData : [propertyData[0]];
        } else if (propertyData) {
            return [propertyData];
        }
        return [];
    };
 
    const properties = getPropertiesArray();
 
    const calculateMapCenter = () => {
        if (properties.length === 0) {
            return { latitude: 40, longitude: -100, zoom: 3.5 };
        }
 
        const validProperties = properties.filter(
            prop => typeof prop.geocode_latitude === 'number' && typeof prop.geocode_longitude === 'number'
        );
 
        if (validProperties.length === 0) {
            return { latitude: 40, longitude: -100, zoom: 3.5 }; // Default center
        }
 
        const sumLat = validProperties.reduce((sum, prop) => sum + Number(prop.geocode_latitude!), 0);
        const sumLng = validProperties.reduce((sum, prop) => sum + Number(prop.geocode_longitude!), 0);
       
        return {
            latitude: sumLat / validProperties.length,
            longitude: sumLng / validProperties.length,
            zoom: validProperties.length === 1 ? 14 : 11
        };
    };
 
    // Calculate the initial view state
    const initialViewState = calculateMapCenter();
 
    // MapLibre style URL - using an open source style
    const mapStyle = darkMode
        ? "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
        : "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";
 
    // Function to handle clicking on a marker
    const handleMarkerClick = (property: Property) => {
        setPopupInfo(property);
       
        // If we have a map reference, fly to the location
        if (mapRef.current) {
            mapRef.current.flyTo({
                center: [Number(property.geocode_longitude), Number(property.geocode_latitude)],
                zoom: 15,
                duration: 1000
            });
        }
    };
 
    const renderPropertyData = () => {
        if (Array.isArray(properties) && properties.length > 1) {
            return properties.map((prop, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                    <Accordion>
                    <AccordionSummary
                        expandIcon={<ArrowDropDownIcon />}>
                        <Typography variant="h6" sx={{ mb: 1 }}>
                            Property {index + 1}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableBody>
                                {prop.Full_address && (<TableRow>
                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                        Address
                                    </TableCell>
                                    <TableCell>
                                        {typeof prop.Full_address === 'object' ? JSON.stringify(prop.Full_address) : String(prop.Full_Address)}
                                    </TableCell>
                                </TableRow> )}
                                {prop.CITY && (<TableRow>
                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                        City
                                    </TableCell>
                                    <TableCell>
                                        {typeof prop.CITY === 'object' ? JSON.stringify(prop.CITY) : String(prop.CITY)}
                                    </TableCell>
                                </TableRow> )}
                                {prop.ZIP_CODE && (<TableRow>
                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                        Zip Code
                                    </TableCell>
                                    <TableCell>
                                        {typeof prop.ZIP_CODE === 'object' ? JSON.stringify(prop.ZIP_CODE) : String(prop.ZIP_CODE)}
                                    </TableCell>
                                </TableRow> )}
                                {prop.YR_BUILT && (<TableRow>
                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                        Year Built
                                    </TableCell>
                                    <TableCell>
                                        {typeof prop.YR_BUILT === 'object' ? JSON.stringify(prop.YR_BUILT) : String(prop.YR_BUILT)}
                                    </TableCell>
                                </TableRow> )}
                                {prop.YR_REMODEL && (<TableRow>
                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                        Year Remodeled
                                    </TableCell>
                                    <TableCell>
                                        {typeof prop.YR_REMODEL === 'object' ? JSON.stringify(prop.YR_REMODEL) : String(prop.YR_REMODEL)}
                                    </TableCell>
                                </TableRow> )}
                                {prop.LIVING_AREA && (<TableRow>
                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                        Living Area
                                    </TableCell>
                                    <TableCell>
                                        {typeof prop.LIVING_AREA === 'object' ? JSON.stringify(prop.LIVING_AREA) : String(prop.LIVING_AREA)} sq. ft.
                                    </TableCell>
                                </TableRow> )}
                                {prop.GROSS_AREA && (<TableRow>
                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                        Gross Area
                                    </TableCell>
                                    <TableCell>
                                        {typeof prop.GROSS_AREA === 'object' ? JSON.stringify(prop.GROSS_AREA) : String(prop.GROSS_AREA)} sq. ft.
                                    </TableCell>
                                </TableRow> )}
                                {prop.BLDG_TYPE && (<TableRow>
                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                        Building Type
                                    </TableCell>
                                    <TableCell>
                                        {typeof prop.BLDG_TYPE === 'object' ? JSON.stringify(prop.BLDG_TYPE) : String(prop.BLDG_TYPE)}
                                    </TableCell>
                                </TableRow> )}
                                {prop.RES_FLOOR && (<TableRow>
                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                        Floor
                                    </TableCell>
                                    <TableCell>
                                        {typeof prop.RES_FLOOR === 'object' ? JSON.stringify(prop.RES_FLOOR) : String(prop.RES_FLOOR)}
                                    </TableCell>
                                </TableRow> )}
                                {prop.BED_RMS && (<TableRow>
                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                        Bed Rooms
                                    </TableCell>
                                    <TableCell>
                                        {typeof prop.BED_RMS === 'object' ? JSON.stringify(prop.BED_RMS) : String(prop.BED_RMS)}
                                    </TableCell>
                                </TableRow> )}
                                {prop.FULL_BTH && (<TableRow>
                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                        Bath Rooms
                                    </TableCell>
                                    <TableCell>
                                        {typeof prop.FULL_BTH === 'object' ? JSON.stringify(prop.FULL_BTH) : String(prop.FULL_BTH)}
                                    </TableCell>
                                </TableRow> )}
                                {prop.KITCHENS && (<TableRow>
                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                        Kitchens
                                    </TableCell>
                                    <TableCell>
                                        {typeof prop.KITCHENS === 'object' ? JSON.stringify(prop.KITCHENS) : String(prop.KITCHENS)}
                                    </TableCell>
                                </TableRow> )}
                                {prop.KITCHEN_TYPE && (<TableRow>
                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                        Kitchen Type
                                    </TableCell>
                                    <TableCell>
                                        {typeof prop.KITCHEN_TYPE === 'object' ? JSON.stringify(prop.KITCHEN_TYPE) : String(prop.KITCHEN_TYPE)}
                                    </TableCell>
                                </TableRow> )}
                                {prop.HEAT_TYPE && (<TableRow>
                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                        Heat Type
                                    </TableCell>
                                    <TableCell>
                                        {typeof prop.HEAT_TYPE === 'object' ? JSON.stringify(prop.HEAT_TYPE) : String(prop.HEAT_TYPE)}
                                    </TableCell>
                                </TableRow> )}
                                {prop.OVERALL_COND && (<TableRow>
                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                        Overall Condition
                                    </TableCell>
                                    <TableCell>
                                        {typeof prop.OVERALL_COND === 'object' ? JSON.stringify(prop.OVERALL_COND) : String(prop.OVERALL_COND)}
                                    </TableCell>
                                </TableRow> )}
                                {prop.OWNER && (<TableRow>
                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                        Owner
                                    </TableCell>
                                    <TableCell>
                                        {typeof prop.OWNER === 'object' ? JSON.stringify(prop.OWNER) : String(prop.OWNER)}
                                    </TableCell>
                                </TableRow> )}
                                {(prop.MAIL_ADDRESSEE) && (<TableRow>
                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                        Owner Address
                                    </TableCell>
                                    <TableCell>
                                        {typeof prop.MAIL_ADDRESSEE === 'object' ? JSON.stringify(prop.MAIL_ADDRESSEE) : String(prop.MAIL_ADDRESSEE)}
                                    </TableCell>
                                </TableRow> )}
                                {prop.MAIL_CITY && (<TableRow>
                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                        Owner City
                                    </TableCell>
                                    <TableCell>
                                    {typeof prop.MAIL_CITY === 'object' ? JSON.stringify(prop.MAIL_CITY) : String(prop.MAIL_CITY)}
                                    </TableCell>
                                </TableRow> )}
                                {prop.MAIL_ZIP_CODE && (<TableRow>
                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                        Owner Zip Code
                                    </TableCell>
                                    <TableCell>
                                    {typeof prop.MAIL_ZIP_CODE === 'object' ? JSON.stringify(prop.MAIL_ZIP_CODE) : String(prop.MAIL_ZIP_CODE)}
                                    </TableCell>
                                </TableRow> )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    </AccordionDetails>
                    </Accordion>
                </Box>
            ));
        } else if (propertyData[0]) {
            return (
                <Box sx={{ mb: 2 }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                        Property Details
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                        <TableBody>
                                {propertyData[0].Full_Address && (<TableRow>
                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                        Address
                                    </TableCell>
                                    <TableCell>
                                        {typeof propertyData[0].Full_Address === 'object' ? JSON.stringify(propertyData[0].Full_Address) : String(propertyData[0].Full_Address)}
                                    </TableCell>
                                </TableRow> )}
                                {propertyData[0].CITY && (<TableRow>
                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                        City
                                    </TableCell>
                                    <TableCell>
                                        {typeof propertyData[0].CITY === 'object' ? JSON.stringify(propertyData[0].CITY) : String(propertyData[0].CITY)}
                                    </TableCell>
                                </TableRow> )}
                                {propertyData[0].ZIP_CODE && (<TableRow>
                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                        Zip Code
                                    </TableCell>
                                    <TableCell>
                                        {typeof propertyData[0].ZIP_CODE === 'object' ? JSON.stringify(propertyData[0].ZIP_CODE) : String(propertyData[0].ZIP_CODE)}
                                    </TableCell>
                                </TableRow> )}
                                {propertyData[0].YR_BUILT && (<TableRow>
                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                        Year Built
                                    </TableCell>
                                    <TableCell>
                                        {typeof propertyData[0].YR_BUILT === 'object' ? JSON.stringify(propertyData[0].YR_BUILT) : String(propertyData[0].YR_BUILT)}
                                    </TableCell>
                                </TableRow> )}
                                {propertyData[0].YR_REMODEL && (<TableRow>
                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                        Year Remodeled
                                    </TableCell>
                                    <TableCell>
                                        {typeof propertyData[0].YR_REMODEL === 'object' ? JSON.stringify(propertyData[0].YR_REMODEL) : String(propertyData[0].YR_REMODEL)}
                                    </TableCell>
                                </TableRow> )}
                                {propertyData[0].LIVING_AREA && (<TableRow>
                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                        Living Area
                                    </TableCell>
                                    <TableCell>
                                        {typeof propertyData[0].LIVING_AREA === 'object' ? JSON.stringify(propertyData[0].LIVING_AREA) : String(propertyData[0].LIVING_AREA)} sq. ft.
                                    </TableCell>
                                </TableRow> )}
                                {propertyData[0].GROSS_AREA && (<TableRow>
                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                        Gross Area
                                    </TableCell>
                                    <TableCell>
                                        {typeof propertyData[0].GROSS_AREA === 'object' ? JSON.stringify(propertyData[0].GROSS_AREA) : String(propertyData[0].GROSS_AREA)} sq. ft.
                                    </TableCell>
                                </TableRow> )}
                                {propertyData[0].BLDG_TYPE && (<TableRow>
                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                        Building Type
                                    </TableCell>
                                    <TableCell>
                                        {typeof propertyData[0].BLDG_TYPE === 'object' ? JSON.stringify(propertyData[0].BLDG_TYPE) : String(propertyData[0].BLDG_TYPE)}
                                    </TableCell>
                                </TableRow> )}
                                {propertyData[0].RES_FLOOR && (<TableRow>
                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                        Floor
                                    </TableCell>
                                    <TableCell>
                                        {typeof propertyData[0].RES_FLOOR === 'object' ? JSON.stringify(propertyData[0].RES_FLOOR) : String(propertyData[0].RES_FLOOR)}
                                    </TableCell>
                                </TableRow> )}
                                {propertyData[0].BED_RMS && (<TableRow>
                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                        Bed Rooms
                                    </TableCell>
                                    <TableCell>
                                        {typeof propertyData[0].BED_RMS === 'object' ? JSON.stringify(propertyData[0].BED_RMS) : String(propertyData[0].BED_RMS)}
                                    </TableCell>
                                </TableRow> )}
                                {propertyData[0].FULL_BTH && (<TableRow>
                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                        Bath Rooms
                                    </TableCell>
                                    <TableCell>
                                        {typeof propertyData[0].FULL_BTH === 'object' ? JSON.stringify(propertyData[0].FULL_BTH) : String(propertyData[0].FULL_BTH)}
                                    </TableCell>
                                </TableRow> )}
                                {propertyData[0].KITCHENS && (<TableRow>
                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                        Kitchens
                                    </TableCell>
                                    <TableCell>
                                        {typeof propertyData[0].KITCHENS === 'object' ? JSON.stringify(propertyData[0].KITCHENS) : String(propertyData[0].KITCHENS)}
                                    </TableCell>
                                </TableRow> )}
                                {propertyData[0].KITCHEN_TYPE && (<TableRow>
                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                        Kitchen Type
                                    </TableCell>
                                    <TableCell>
                                        {typeof propertyData[0].KITCHEN_TYPE === 'object' ? JSON.stringify(propertyData[0].KITCHEN_TYPE) : String(propertyData[0].KITCHEN_TYPE)}
                                    </TableCell>
                                </TableRow> )}
                                {propertyData[0].HEAT_TYPE && (<TableRow>
                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                        Heat Type
                                    </TableCell>
                                    <TableCell>
                                        {typeof propertyData[0].HEAT_TYPE === 'object' ? JSON.stringify(propertyData[0].HEAT_TYPE) : String(propertyData[0].HEAT_TYPE)}
                                    </TableCell>
                                </TableRow> )}
                                {propertyData[0].OVERALL_COND && (<TableRow>
                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                        Overall Condition
                                    </TableCell>
                                    <TableCell>
                                        {typeof propertyData[0].OVERALL_COND === 'object' ? JSON.stringify(propertyData[0].OVERALL_COND) : String(propertyData[0].OVERALL_COND)}
                                    </TableCell>
                                </TableRow> )}
                                {propertyData[0].OWNER && (<TableRow>
                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                        Owner
                                    </TableCell>
                                    <TableCell>
                                        {typeof propertyData[0].OWNER === 'object' ? JSON.stringify(propertyData[0].OWNER) : String(propertyData[0].OWNER)}
                                    </TableCell>
                                </TableRow> )}
                                {(propertyData[0].MAIL_ADDRESSEE) && (<TableRow>
                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                        Owner Address
                                    </TableCell>
                                    <TableCell>
                                        {typeof propertyData[0].MAIL_ADDRESSEE === 'object' ? JSON.stringify(propertyData[0].MAIL_ADDRESSEE) : String(propertyData[0].MAIL_ADDRESSEE)}
                                    </TableCell>
                                </TableRow> )}
                                {propertyData[0].MAIL_CITY && (<TableRow>
                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                        Owner City
                                    </TableCell>
                                    <TableCell>
                                    {typeof propertyData[0].MAIL_CITY === 'object' ? JSON.stringify(propertyData[0].MAIL_CITY) : String(propertyData[0].MAIL_CITY)}
                                    </TableCell>
                                </TableRow> )}
                                {propertyData[0].MAIL_ZIP_CODE && (<TableRow>
                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                        Owner Zip Code
                                    </TableCell>
                                    <TableCell>
                                    {typeof propertyData[0].MAIL_ZIP_CODE === 'object' ? JSON.stringify(propertyData[0].MAIL_ZIP_CODE) : String(propertyData[0].MAIL_ZIP_CODE)}
                                    </TableCell>
                                </TableRow> )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            );
        } else {
            return <Typography>No property data available.</Typography>;
        }
    };
 
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <NavBar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
            <Box sx={{ display: 'flex', flexDirection: 'row', height: '90vh', width: '100%', justifyContent: 'space-between' }}>
                <Box sx={{ flex: 1, height: '100%', padding: 1 }}>
                    <Paper elevation={3} sx={{ height: '100%', overflow: 'hidden' }}>
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
                           
                            {/* Markers for Properties */}
                            {properties.map((property, index) => {
                                const lat = Number(property.geocode_latitude);
                                const lng = Number(property.geocode_longitude);
                               
                                if (isNaN(lat) || isNaN(lng)) {
                                    return null;
                                }
                               
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
                           
                            {/* Popup Component */}
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
                                            backgroundColor: theme.palette.background.paper, 
                                            color: theme.palette.text.primary,
                                            boxShadow: 3
                                        }} 
                                        elevation={3}
                                    >
                                    <Box sx={{ p: 1 }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                            {popupInfo.Full_Address || 'Property Details'}
                                        </Typography>
                                        {popupInfo.BLDG_TYPE && (
                                            <Typography variant="body2">
                                                Type: {popupInfo.BLDG_TYPE}
                                            </Typography>
                                        )}
                                        {popupInfo.OWNER && (
                                            <Typography variant="body2">
                                                Owner: {popupInfo.OWNER}
                                            </Typography>
                                        )}
                                        {popupInfo.CITY && (
                                            <Typography variant="body2">
                                                City: {popupInfo.CITY}
                                            </Typography>
                                        )}
                                        {popupInfo.ZIP_CODE && (
                                            <Typography variant="body2">
                                                ZIP: {popupInfo.ZIP_CODE}
                                            </Typography>
                                        )}
                                        {popupInfo.YR_BUILT && (
                                            <Typography variant="body2">
                                                Built: {popupInfo.YR_BUILT}
                                            </Typography>
                                        )}
                                    </Box>
                                    </Paper>
                                </Popup>
                            )}
                        </Map>
                    </Paper>
                </Box>
                <Box sx={{ flex: 2, padding: 2, overflowY: 'auto' }}>
                    {renderPropertyData()}
                </Box>
            </Box>
        </ThemeProvider>
    );
};
 
export default Details;