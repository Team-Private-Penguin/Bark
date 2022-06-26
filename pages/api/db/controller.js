import db from "./";
import model from "./model";

module.exports = {
  post: {
    event: function (req, res) {
      let { name, description, address, group_id, date, prospective } =
        req.body;
      const query = {
        text: model.postEvent,
        values: [name, description, address, group_id, date, prospective],
      };
      db.queryAsync(query)
        .then(() => res.sendStatus(201))
        .catch((err) => res.status(404).send(err));
    },

    group: function (req, res) {},
  },
  get: {
    events: {
      group: function (req, res) {
        let { group_id } = req.body;
        const query = {
          text: model.getEventsGroup,
          values: [group_id],
        };
        db.queryAsync(query)
          .then((results) => res.status(200).send(results))
          .catch((err) => res.status(404).send(err));
      },
    },
  },
  groups: {
    user: function (req, res) {},
  },
};
