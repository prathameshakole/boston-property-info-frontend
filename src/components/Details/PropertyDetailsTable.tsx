import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface Property {
  [key: string]: any;
}

interface PropertyDetailsTableProps {
  properties: Property[];
}

const PropertyDetailsTable = ({ properties }: PropertyDetailsTableProps) => {
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
        ))}
      </>
    );
  } else if (properties[0]) {
    const property = properties[0];
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

export default PropertyDetailsTable;
