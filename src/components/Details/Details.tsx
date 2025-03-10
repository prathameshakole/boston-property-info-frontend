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
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();

    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
        },
    });

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

    const initialViewState = calculateMapCenter();

    const mapStyle = darkMode
        ? "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
        : "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

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

    

    const handleBackClick = () => {
        navigate('/');
    };

    const propertiesCount = Array.isArray(properties) ? properties.length : 0;


    const renderPropertyData = () => {
        const renderTableRows = (property: Property) => {
            const fields = [
                { key: 'Full_address', label: 'Address' },
                { key: 'CITY', label: 'City' },
                { key: 'ZIP_CODE', label: 'Zip Code' },
                { key: 'YR_BUILT', label: 'Year Built' },
                { key: 'YR_REMODEL', label: 'Year Remodeled' },
                { key: 'LIVING_AREA', label: 'Living Area', suffix: ' sq. ft.' },
                { key: 'GROSS_AREA', label: 'Gross Area', suffix: ' sq. ft.' },
                { key: 'BLDG_TYPE', label: 'Building Type' },
                { key: 'RES_FLOOR', label: 'Floor' },
                { key: 'BED_RMS', label: 'Bed Rooms' },
                { key: 'FULL_BTH', label: 'Bath Rooms' },
                { key: 'KITCHENS', label: 'Kitchens' },
                { key: 'KITCHEN_TYPE', label: 'Kitchen Type' },
                { key: 'HEAT_TYPE', label: 'Heat Type' },
                { key: 'OVERALL_COND', label: 'Overall Condition' },
                { key: 'OWNER', label: 'Owner' },
                { key: 'MAIL_ADDRESSEE', label: 'Owner Address' },
                { key: 'MAIL_CITY', label: 'Owner City' },
                { key: 'MAIL_ZIP_CODE', label: 'Owner Zip Code' }
            ];

            return fields.map(({ key, label, suffix = '' }) => {
                const value = property[key];
                if (value) {
                    return (
                        <TableRow key={key}>
                            <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                {label}
                            </TableCell>
                            <TableCell>
                                {typeof value === 'object' ? JSON.stringify(value) : String(value)}{suffix}
                            </TableCell>
                        </TableRow>
                    );
                }
                return null;
            });
        };

        if (Array.isArray(properties) && properties.length > 1) {
            return properties.map((property, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                    <Accordion>
                        <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                            <Typography variant="h6" sx={{ mb: 1 }}>
                                Property {index + 1}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableBody>{renderTableRows(property)}</TableBody>
                                </Table>
                            </TableContainer>
                        </AccordionDetails>
                    </Accordion>
                </Box>
            ));
        } else if (propertyData[0]) {
            const property = propertyData[0];
            return (
                <Box sx={{ mb: 2 }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                        Property Details
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableBody>{renderTableRows(property)}</TableBody>
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

            <Box sx={{ display: 'flex', alignItems: 'center', ml: 1, mt: 1 }}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={handleBackClick}
                    sx={{ textTransform: 'none' }}
                >
                    New Search
                </Button>
                <Typography variant="body1" sx={{ ml: 2 }}>
                    The address is associated with {propertiesCount} {propertiesCount === 1 ? 'property' : 'properties'}
                </Typography>
            </Box>

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