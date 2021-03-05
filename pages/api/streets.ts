import Fuse from "fuse.js";

export default (req, res) => {
  const streets = {
    Warszawa: ["aleje Ujazadowskie", "aleje Jerozolimskie"],
    Kraków: ["aleje Pokoju", "Floriańska"],
    Gdańsk: ["ulica Długa", "Ulica Krótka"],
  };
  const filterWithQuery = (streets) => {
    const fuse = new Fuse(streets, {});
    return fuse.search(req.query.q).map((r) => r.item);
  };
  res.status(200).json({ streets: filterWithQuery(streets[req.query.city]) });
};
