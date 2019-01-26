import { TSnackbar } from '../types/state'

import { TState } from '../types/state'
import { colors } from '../colors'
import { TDay } from 'src/types/pomodoro'
import { addDays, subDays } from 'date-fns'

export const defaultSnackbar: TSnackbar = {
  open: false,
  message: "YOU CAN'T SEE ME! BAM DAM WHAN CHAM, Boo do do dodo doooo",
  variant: 'success'
}
const result: TDay[] = new Array(7).fill(0).map((none, i: any) => {
  return { minutes: 0, day: i }
})

export const defaultState: TState = {
  pastAction: { type: '@@INIT' } as any,
  pomodoro: {
    paused: true,
    working: true,
    selectingTask: false,
    selectedTaskId: null,
    currSeconds: 60 * 25, // will be reset to startSeconds when they click start either way
    breakSeconds: 60 * 5,
    workSeconds: 60 * 25,
    totalTimes: result,
    stopWatch: {
      pastTimes: [],
      time: 0,
      paused: true,
      highest: 0
    }
  },
  snackbar: defaultSnackbar,
  isLoading: false,
  projects: {
    0: {
      name: "Karen's robotic dog factory",
      categories: [
        'Doggo',
        'Weed',
        'Karen',
        'Great Ideas',
        'minimum wage',
        'cat'
      ],
      id: 0,
      columnIds: [0, 1, 2]
    },
    1: {
      name: 'Self developerment',
      categories: ['Russia'],
      id: 1,
      columnIds: [3, 4, 5]
    },
    2: {
      name: 'New House',
      categories: [],
      id: 2,
      columnIds: [6, 7, 8]
    }
  },
  columns: {
    0: {
      name: 'To-do',
      taskIds: [0, 1, 2],
      id: 0
    },
    1: { name: 'In Progress', taskIds: [3, 4], id: 1 },
    2: {
      name: 'Complete',
      isCompletedColumn: true,
      taskIds: [5],
      id: 2
    },
    3: {
      name: 'To-do',
      taskIds: [6],
      id: 3
    },
    4: { name: 'In Progress', taskIds: [], id: 4 },
    5: {
      name: 'Complete',
      isCompletedColumn: true,
      taskIds: [],
      id: 5
    },
    6: {
      name: 'To-do',
      taskIds: [],
      id: 6
    },
    7: { name: 'In Progress', taskIds: [], id: 7 },
    8: {
      name: 'Complete',
      isCompletedColumn: true,
      taskIds: [],
      id: 8
    }
  },
  tasks: {
    0: {
      id: 0,
      name: 'Find a factory',
      subTasks: [
        {
          name: 'Get Karen a passport',
          id: 1,
          completed: true
        },
        {
          name: 'Talk to 可智 in 深圳.',
          id: 2,
          completed: false
        },
        {
          name: '让中国工厂真正生产东西.',
          id: 3,
          completed: false
        }
      ],
      color: colors.Blue,
      timeWorkedOn: 0,
      dueDate: new Date()
    },
    2: {
      id: 2,
      name: 'Finish prototype design on sketch',
      subTasks: [],
      timeWorkedOn: 4,
      dueDate: addDays(new Date(), 1),
      color: colors.White
    },
    1: {
      id: 1,
      name: 'Receive prototype from China',
      subTasks: [{ name: 'Organize shipping', id: 2, completed: false }],
      timeWorkedOn: 24,
      color: colors.White
    },
    // col 2
    3: {
      id: 3,
      name: 'Believe',
      dueDate: subDays(new Date(), 1),
      subTasks: [
        {
          id: 1,
          completed: false,
          name: 'Hire Workers'
        }
      ],
      timeWorkedOn: 0,
      color: colors.White
    },

    // col 3
    5: {
      id: 5,
      name: 'Motivational Lizard',
      subTasks: [],
      timeWorkedOn: 0,
      color: colors.White
    },
    4: {
      id: 4,
      name: 'Sell our planes',
      subTasks: [],
      timeWorkedOn: 0,
      color: colors.White
    },
    6: {
      id: 6,
      name: 'Dwigt',
      subTasks: [],
      timeWorkedOn: 0,
      color: colors.White
    }
  }
}
