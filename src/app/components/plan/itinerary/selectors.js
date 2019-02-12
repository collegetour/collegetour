import { createSelector } from 'reselect'

const steps = (state, props) => state.steps

export const itinerary = createSelector(
  steps,
  (steps) => steps.reduce((itinerary, step) => ({
    ...itinerary,
    [step.date]: [
      ...itinerary[step.date] || [],
      step
    ]
  }), {})
)
