import axios from "axios";

export const getStreets = async (city, q) => {
  const res = await axios.request({
    url: "http://localhost:3000/api/streets",
    method: "GET",
    params: { city, q },
  });
  return res.status === 200 ? res.data.streets : []; // placeholder - response will always be 200
};
