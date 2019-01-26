export type TDay = {
  day: 0 | 1 | 2 | 3 | 4 | 5 | 6
  minutes: number
}

export type TStopWatch = {
  pastTimes: number[]
  time: number
  paused: boolean
  highest: number
}

export type TPomodoro = {
  paused: boolean
  working: boolean // if false we are in break
  currSeconds: number
  breakSeconds: number
  workSeconds: number
  totalTimes: TDay[]
  selectingTask: boolean
  selectedTaskId: null | string
  stopWatch: TStopWatch
}
