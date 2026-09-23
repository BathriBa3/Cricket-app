import { createSlice } from '@reduxjs/toolkit'

const matchSlice = createSlice({
  name: 'match',
  initialState: {
    battingTeam: '',
    bowlingTeam: '',
    overs: '',
  },
  reducers: {
    setMatchLineup: (state, action) => {
      state.battingTeam = action.payload.battingTeam
      state.bowlingTeam = action.payload.bowlingTeam
      state.overs = action.payload.overs
    },
  },
})

export const { setMatchLineup } = matchSlice.actions
export default matchSlice.reducer