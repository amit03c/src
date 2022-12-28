import axios from "axios";
const baseUrl = `https://dabbawalaapi.iosx.in:3091/api`;

export const dietsApiData = async (method, url ,body,headers={}) => {
  try {
    const res = await axios.request({
      baseURL: baseUrl,
      url,
      method,
      data:body,
      headers
    });

    return res;
  } catch (e) {}

    
};
