import { createSlice } from '@reduxjs/toolkit'

const secondInningsSlice = createSlice({
  name: 'secondInnings',
  initialState: {
    targetScore: 0,
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
    setTargetScore: (state, action) => {
      state.targetScore = action.payload
    },
    updateSecondInnings: (state, action) => {
      state.battingPlayers = action.payload.battingPlayers
      state.bowlingPlayers = action.payload.bowlingPlayers
      state.totalScore = action.payload.totalScore
      state.wickets = action.payload.wickets
      state.legalBalls = action.payload.legalBalls
      state.currentStriker = action.payload.currentStriker
      state.currentNonStriker = action.payload.currentNonStriker
      state.currentBowler = action.payload.currentBowler
    },
  },
})

export const { setTargetScore, updateSecondInnings } = secondInningsSlice.actions
export default secondInningsSlice.reducer