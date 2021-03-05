import axios from "axios";

export const getCities = async () => {
  const res = await axios.get("http://localhost:3000/api/cities");
  return res.status === 200 ? res.data.cities : []; // placeholder - response will always be 200
};
