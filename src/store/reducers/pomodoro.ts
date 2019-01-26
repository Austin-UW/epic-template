import { PomodoroAction } from '@store/actions/types'
import { TPomodoro } from 'src/types/pomodoro'
import { defaultState } from '../defaultState'

type IReducer<A = PomodoroAction, S = Readonly<TPomodoro>> = (
  state: S,
  action: A
) => S

export const pomodoroReducer: IReducer = (
  pom = defaultState.pomodoro,
  action
): TPomodoro => {
  switch (action.type) {
    case 'TICK':
      if (pom.currSeconds > 0 && !pom.paused) {
        // just a double check
        return {
          ...pom,
          currSeconds: pom.currSeconds - 1
        }
      }
      return {
        ...pom,
        paused: true,
        working: !pom.working,
        currSeconds: !pom.working ? pom.workSeconds : pom.breakSeconds
      }
    case 'STOP_TIMER':
      return {
        ...pom,
        paused: true
      }
    case 'START_TIMER':
      return {
        ...pom,
        paused: false
      }
    case 'CHANGE_WORK_TIME':
    case 'CHANGE_BREAK_TIME':
      const sliceOfState =
        action.type === 'CHANGE_WORK_TIME' ? 'workSeconds' : 'breakSeconds'
      const isChangingCurrentMode =
        (action.type === 'CHANGE_WORK_TIME' && pom.working) ||
        (action.type === 'CHANGE_BREAK_TIME' && !pom.working)
      const result =
        action.operator === '+'
          ? pom[sliceOfState] + action.minutes * 60
          : pom[sliceOfState] - action.minutes * 60

      if (result <= 0) {
        return { ...pom }
      }
      const newSeconds = isChangingCurrentMode
        ? action.operator === '+'
          ? pom.currSeconds + action.minutes * 60
          : pom.currSeconds - action.minutes * 60
        : pom.currSeconds

      return {
        ...pom,
        currSeconds: newSeconds,
        [sliceOfState]: result
      }
    case 'RESET_POMODORO':
      return defaultState.pomodoro
    case 'INCREMENT_DAILY_TIME':
      const day = new Date().getDay()
      return {
        ...pom,
        totalTimes: [
          ...pom.totalTimes.slice(0, day),
          { ...pom.totalTimes[day], minutes: pom.totalTimes[day].minutes + 1 },
          ...pom.totalTimes.slice(day + 1)
        ]
      }
    case 'SELECT_POMODORO_TASK':
      if (action.taskId === pom.selectedTaskId) {
        return { ...pom, selectedTaskId: null, selectingTask: false }
      }
      return { ...pom, selectedTaskId: action.taskId, selectingTask: false }
    case 'TOGGLE_SELECTING_TASK':
      return { ...pom, selectingTask: !pom.selectingTask }
    case 'SET_TIME_DEV':
      return { ...pom, currSeconds: 5 }
    case 'TICK_STOPWATCH':
      return {
        ...pom,
        stopWatch: {
          ...pom.stopWatch,
          time: pom.stopWatch.time + 1,
          highest:
            pom.stopWatch.time >= pom.stopWatch.highest
              ? pom.stopWatch.highest + 1
              : pom.stopWatch.highest
        }
      }
    case 'TOGGLE_STOPWATCH': {
      return {
        ...pom,
        stopWatch: { ...pom.stopWatch, paused: !pom.stopWatch.paused }
      }
    }
    case 'RESET_STOPWATCH': {
      return {
        ...pom,
        stopWatch: { ...pom.stopWatch, time: 0, paused: true }
      }
    }
    default:
      return pom
  }
}
