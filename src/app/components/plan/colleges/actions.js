export const changeMode = (mode) => ({
  type: 'CHANGE_MODE',
  mode
})

export const remove = (index) => ({
  type: 'REMOVE',
  index
})

export const reorder = (from, to) => ({
  type: 'REORDER',
  from,
  to
})
