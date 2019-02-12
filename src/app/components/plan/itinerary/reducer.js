const INITIAL_STATE = {
  steps: [
    {
      delta: 1,
      date: '2019-02-18',
      text: '3.5 hr drive to Vassar',
      type: 'drive'
    },
    {
      delta: 2,
      date: '2019-02-18',
      text: '12:00PM: Vassar Tour',
      type: 'tour'
    },
    {
      delta: 3,
      date: '2019-02-18',
      text: '01:30PM: Vassar Info Session',
      type: 'tour'
    },
    {
      delta: 3,
      date: '2019-02-18',
      text: '1.5 hr drive to Weslyan',
      type: 'drive'
    },
    {
      delta: 2,
      date: '2019-02-19',
      text: '09:30AM: Weslyan Tour',
      type: 'tour'
    },
    {
      delta: 3,
      date: '2019-02-19',
      text: '10:30AM: Weslyan Info Session',
      type: 'tour'
    },
    {
      delta: 3,
      date: '2019-02-19',
      text: '3.5 hr drive to Swarthmore',
      type: 'drive'
    },
    {
      delta: 3,
      date: '2019-02-20',
      text: '09:00AM: Swarthmore Info Session',
      type: 'tour'
    },
    {
      delta: 2,
      date: '2019-02-20',
      text: '10:00AM: Swarthmore Tour',
      type: 'tour'
    },
    {
      delta: 3,
      date: '2019-02-20',
      text: '18 min drive to Villanova',
      type: 'drive'
    },
    {
      delta: 3,
      date: '2019-02-20',
      text: '2:15PM: Villanova Info Session',
      type: 'tour'
    },
    {
      delta: 2,
      date: '2019-02-20',
      text: '3:00PM: Villanova Tour',
      type: 'tour'
    },
    {
      delta: 3,
      date: '2019-02-20',
      text: '11 min drive to Haverford',
      type: 'drive'
    },
    {
      delta: 2,
      date: '2019-02-21',
      text: '09:30AM: Haverford Tour',
      type: 'tour'
    },
    {
      delta: 3,
      date: '2019-02-21',
      text: '10:00AM: Haverford Info Session',
      type: 'tour'
    },
    {
      delta: 3,
      date: '2019-02-22',
      text: '46 min drive to University of Pennsylvania',
      type: 'drive'
    },
    {
      delta: 2,
      date: '2019-02-22',
      text: '1:00PM: University of Pennsylvania Tour',
      type: 'tour'
    },
    {
      delta: 3,
      date: '2019-02-22',
      text: '2:00PM: University of Pennsylvania Info Session',
      type: 'tour'
    }
  ]
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  default:
    return state
  }

}
