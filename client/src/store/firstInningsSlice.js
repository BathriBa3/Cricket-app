import { createSlice } from '@reduxjs/toolkit'

const firstInningsSlice = createSlice({
  name: 'firstInnings',
  initialState: {
    battingPlayers: {},
    bowlingPlayers: {},
    totalScore: 0,
    wickets: 0,
    legalBalls: 0,
    currentStriker: '',
    currentNonStriker: '',
    currentBowler: '',
  },
  reducers: {
    updateFirstInnings: (state, action) => {
      return action.payload
    },
    resetFirstInnings: () => firstInningsSlice.getInitialState(),
  },
})

export const { updateFirstInnings, resetFirstInnings } = firstInningsSlice.actions
export default firstInningsSlice.reducer