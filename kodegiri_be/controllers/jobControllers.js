const axios = require("axios");
const url = "http://dev3.dansmultipro.co.id/api/recruitment/positions";

module.exports = {
  allJobPagination: async (req, res) => {
    try {
      const { page, description, location, full_time } = req.query;
      let { data } = await axios.get(url + ".json", {
        params: {
          page,
          description,
          location,
          full_time,
        },
      });
      console.log(data.length);
      res.status(200).send(data);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  jobDetail: async (req, res) => {
    try {
      const { id } = req.params;

      const { data } = await axios.get(url + `/${id}`);
      res.status(200).send(data);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
};
