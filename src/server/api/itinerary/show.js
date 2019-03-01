const route = async (req, res) => {

  const visits = [
    {
      date: '2019-02-18',
      text: '3.5 hr drive to Vassar',
      type: 'drive'
    },
    {
      date: '2019-02-18',
      text: '12:00PM: Vassar Tour',
      type: 'tour'
    },
    {
      date: '2019-02-18',
      text: '01:30PM: Vassar Info Session',
      type: 'tour'
    },
    {
      date: '2019-02-18',
      text: '1.5 hr drive to Weslyan',
      type: 'drive'
    },
    {
      date: '2019-02-19',
      text: '09:00AM: Weslyan Tour',
      type: 'tour'
    },
    {
      date: '2019-02-19',
      text: '10:00AM: Weslyan Info Session',
      type: 'tour'
    },
    {
      date: '2019-02-19',
      text: '3.5 hr drive to Swarthmore',
      type: 'drive'
    },
    {
      date: '2019-02-20',
      text: '09:00AM: Swarthmore Info Session',
      type: 'tour'
    },
    {
      date: '2019-02-20',
      text: '10:00AM: Swarthmore Tour',
      type: 'tour'
    },
    {
      date: '2019-02-20',
      text: '46 min drive to University of Pennsylvania',
      type: 'drive'
    },
    {
      date: '2019-02-20',
      text: '1:00PM: University of Pennsylvania Tour',
      type: 'tour'
    },
    {
      date: '2019-02-20',
      text: '2:00PM: University of Pennsylvania Info Session',
      type: 'tour'
    },
    {
      date: '2019-02-20',
      text: '11 min drive to Haverford',
      type: 'drive'
    },
    {
      date: '2019-02-21',
      text: '09:30AM: Haverford Tour',
      type: 'tour'
    },
    {
      date: '2019-02-21',
      text: '10:00AM: Haverford Info Session',
      type: 'tour'
    },
    {
      date: '2019-02-21',
      text: '1 hr 11 min drive to Muhlenberg College',
      type: 'drive'
    },
    {
      date: '2019-02-21',
      text: '01:30AM: Muhlenberg College Tour',
      type: 'tour'
    },
    {
      date: '2019-02-21',
      text: '2:30AM: Muhlenberg College Info Session',
      type: 'tour'
    },
    {
      date: '2019-02-21',
      text: '1 hr 58 min drive to Dickenson',
      type: 'drive'
    },
    {
      date: '2019-02-22',
      text: '09:00AM: Dickenson Tour',
      type: 'tour'
    },
    {
      date: '2019-02-22',
      text: '10:15AM: Dickenson Info Session',
      type: 'tour'
    },
    {
      date: '2019-02-22',
      text: '3 hr 56 min drive to 322 S Geneva St',
      type: 'drive'
    }
  ].reduce((itinerary, step) => ({
    ...itinerary,
    [step.date]: [
      ...itinerary[step.date] || [],
      step
    ]
  }), {})

  res.status(200).json({
    data: visits
  })

}

export default route
