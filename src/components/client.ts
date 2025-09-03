import axios from 'axios';

// Use environment variable for API base URL, fallback to localhost for development
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const client = axios.create({
    withCredentials: true,
  });
  
  export const getPropertyByAddress = async (address: string) => {
    try {
      const response = await client.get(`${API_BASE_URL}/property`, {
        params: {
          address,
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.error || error.message);
    }
  };
  
  export const getPropertiesByAddressKeyword = async (keyword: string) => {
    try {
      const response = await client.get('/properties/search', {
        params: {
          keyword,
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.error || error.message);
    }
  };

  
  export const getAddressbyKeyword = async (keyword: string) => {
    if (!keyword) {
      throw new Error("Keyword query parameter is required");
    }
    try {
      const response = await client.get(`${API_BASE_URL}/properties/addresses`, {
        params: {
          keyword,
        },
      });
      const addresses = response.data.sort();
      return addresses;
    } catch (error: any) {
      throw new Error(error.response.data.error || error.message);
    }
  };

  export const getOwnersbyKeyword = async (keyword: string) => {
    if (!keyword) {
      throw new Error("Keyword query parameter is required");
    }
    try {
      const response = await client.get(`${API_BASE_URL}/owners/search`, {
        params: {
          keyword,
        },
      });

      const owners = response.data.sort();    
      return owners;          
    } catch (error: any) {
      throw new Error(error.response.data.error || error.message);
    }    
  };

  export const getPropertiesByOwner = async (owner: string) => {
    try {
      const response = await client.get(`${API_BASE_URL}/owner`, {
        params: {
          owner,
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.error || error.message);
    }
  };

  export const getViolationsByAddress = async (address: string) => {
    try {
      const response = await client.get(`${API_BASE_URL}/properties/violation`, {
        params: {
          address,
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.error || error.message);
    }
  };
  


  


  
  
