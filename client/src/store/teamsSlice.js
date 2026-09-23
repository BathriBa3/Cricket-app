import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  names: {
    A: 'Rexus XI',
    B: 'Zenith XI',
  },
  players: {
    A: ['Bathri', 'Vijay', 'Mukesh', 'Vikash', 'Pandi', 'Sudhan', 'Nandhu', 'Kailash', 'Sanjeev', 'Aditiya', 'Anand'],
    B: ['Anishanth', 'Hari', 'Abi sangeth', 'Gowtham', 'Geerthi', 'Surendar', 'Sakthi', 'Gopi', 'Naveen', 'Ajees', 'Chithambaram'],
  },
}

const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    setTeamName: (state, action) => {
      const { team, name } = action.payload
      state.names[team] = name
    },
    addPlayer: (state, action) => {
      const { team, player } = action.payload
      if (state.players[team].length < 11) state.players[team].push(player)
    },
  },
})

export const { setTeamName, addPlayer } = teamsSlice.actions
export default teamsSlice.reducer