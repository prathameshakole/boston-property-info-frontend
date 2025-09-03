import React, { useState, useEffect } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Divider, CircularProgress } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { getViolationsByAddress } from '../client';

interface Violation {
  _id: string;
  count: number;
}

interface Property {
  [key: string]: any;
}

interface PropertyDetailsTableProps {
  properties: Property[];
}

interface PropertyViolations {
  [address: string]: {
    violations: Violation[];
    loading: boolean;
    error: string | null;
  };
}

const PropertyDetailsTable = ({ properties }: PropertyDetailsTableProps) => {
  const [propertyViolations, setPropertyViolations] = useState<PropertyViolations>({});

  useEffect(() => {
    properties.forEach(property => {
      if (property.Full_Address) {
        fetchViolations(property.Full_Address);
      }
    });
  }, [properties]);

  const fetchViolations = async (address: string) => {
    setPropertyViolations(prev => ({
      ...prev,
      [address]: { violations: [], loading: true, error: null }
    }));
    
    try {
      const data = await getViolationsByAddress(address);
      setPropertyViolations(prev => ({
        ...prev,
        [address]: { violations: data || [], loading: false, error: null }
      }));
    } catch (error) {
      console.error('Error fetching violations for', address, error);
      setPropertyViolations(prev => ({
        ...prev,
        [address]: { violations: [], loading: false, error: 'Failed to load violations data' }
      }));
    }
  };

  const renderViolations = (address: string) => {
    const violationData = propertyViolations[address];
    
    if (!violationData) {
      return <Typography variant="body2">Loading violations...</Typography>;
    }
    
    if (violationData.loading) {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <CircularProgress size={20} />
          <Typography variant="body2" sx={{ ml: 1 }}>
            Loading violations...
          </Typography>
        </Box>
      );
    }
    
    if (violationData.error) {
      return <Typography variant="body2" color="error">{violationData.error}</Typography>;
    }
    
    if (violationData.violations.length === 0) {
      return <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>No violations found for this property.</Typography>;
    }
    
    return (
      <TableContainer component={Paper} sx={{ mt: 1, mb: 2 }}>
        <Table size="small">
          <TableBody>
            {violationData.violations.map((violation, idx) => (
              <TableRow key={idx}>
                <TableCell component="th" scope="row">
                  {violation._id}
                </TableCell>
                <TableCell>
                  {violation.count} {violation.count === 1 ? 'occurrence' : 'occurrences'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const renderTableRows = (property: Property) => {
    const fields = [
      { key: 'Full_Address', label: 'Address' },
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
              {typeof value === 'object' ? JSON.stringify(value) : String(value)}
              {suffix}
            </TableCell>
          </TableRow>
        );
      }
      return null;
    });
  };

  if (properties.length > 1) {
    return (
      <>
        {properties.map((property, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Accordion>
              <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                <Typography variant="h6">
                  Property {index + 1}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TableContainer component={Paper}>
                  <Table>
                    <TableBody>{renderTableRows(property)}</TableBody>
                  </Table>
                </TableContainer>
                
                <Box sx={{ mt: 3 }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Property Violations
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  {renderViolations(property.Full_Address)}
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>
        ))}
      </>
    );
  } else if (properties[0]) {
    const property = properties[0];
    return (
      <>
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
        
        <Box sx={{ mt: 4, mb: 2 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Property Violations
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {renderViolations(property.Full_Address)}
        </Box>
      </>
    );
  } else {
    return <Typography>No property data available.</Typography>;
  }
};

export default PropertyDetailsTable;
