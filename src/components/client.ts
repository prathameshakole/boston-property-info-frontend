import axios from 'axios';
export const API_BASE_URL = "http://localhost:4000";

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

      console.log(response);
      const addresses = response.data.sort();
      return addresses;
    } catch (error: any) {
      throw new Error(error.response.data.error || error.message);
    }
  };
  


  


  
  