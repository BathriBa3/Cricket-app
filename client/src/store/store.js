import { configureStore } from '@reduxjs/toolkit'
import teamsReducer from './teamsSlice'
import matchReducer from './matchSlice'
import firstInningsReducer from './firstInningsSlice'
import secondInningsReducer from './secondInningsSlice'

export const store = configureStore({
  reducer: {
    teams: teamsReducer,
    match: matchReducer,
    firstInnings: firstInningsReducer,
    secondInnings: secondInningsReducer,
  },
})