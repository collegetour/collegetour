const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('impressions').del()

  await knex('impressions').insert([
    {
      id: 1,
      type: 'image',
      visit_id: 1,
      user_id: 1,
      asset_id: 16,
      caption: 'Lorem ipsum dolor amet squid sartorial godard shaman, twee hashtag green juice retro edison bulb freegan food truck put a bird on it. Palo santo bicycle rights woke next level. 90s quinoa cloud bread pickled, austin flannel hashtag',
      created_at: moment(),
      updated_at: moment()
    },
    {
      id: 2,
      type: 'image',
      visit_id: 1,
      user_id: 3,
      asset_id: 17,
      caption: 'Lorem ipsum dolor amet squid sartorial godard shaman, twee hashtag green juice retro edison bulb freegan food truck put a bird on it. Palo santo bicycle rights woke next level. 90s quinoa cloud bread pickled, austin flannel hashtag',
      created_at: moment(),
      updated_at: moment()
    },
    {
      id: 3,
      type: 'video',
      visit_id: 1,
      user_id: 1,
      asset_id: 16,
      caption: 'Lorem ipsum dolor amet squid sartorial godard shaman, twee hashtag green juice retro edison bulb freegan food truck put a bird on it. Palo santo bicycle rights woke next level. 90s quinoa cloud bread pickled, austin flannel hashtag',
      created_at: moment(),
      updated_at: moment()
    },
    {
      id: 4,
      type: 'video',
      visit_id: 1,
      user_id: 3,
      asset_id: 17,
      caption: 'Lorem ipsum dolor amet squid sartorial godard shaman, twee hashtag green juice retro edison bulb freegan food truck put a bird on it. Palo santo bicycle rights woke next level. 90s quinoa cloud bread pickled, austin flannel hashtag',
      created_at: moment(),
      updated_at: moment()
    }
  ])

}
