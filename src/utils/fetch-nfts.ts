import axios from "axios";

const BASE_URL = "https://eos.api.atomicassets.io/atomicassets/v1";

const api = axios.create({
  baseURL: BASE_URL,
});

export const fetchNFTs = async (accountName: string) => {
  try {
    const response = await api.get(`/assets?owner=${accountName}`);
    return response.data.data;
  } catch (error) {
    throw new Error("Failed to fetch NFTs. Please try again later.");
  }
};

export default api;
