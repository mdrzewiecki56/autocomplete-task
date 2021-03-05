export default (_, res) => {
  res.status(200).json({ cities: ["Warszawa", "Kraków", "Gdańsk"] });
};
