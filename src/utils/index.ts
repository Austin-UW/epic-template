import { cloneDeep } from 'lodash'

export const formalize = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/,/g, '')
    .replace(/ /g, '')
}

export const filterItemsFromIds = <T = any>(
  ids: number[],
  items: { [id: string]: any } & T // add index signature
): T => {
  const newItems = cloneDeep(items) // fuckin changed in past :()
  Object.keys(newItems)
    .map(key => parseInt(key, 10)) // Object.keys returns strings nomatter what
    .forEach((key: any) => {
      if (!ids.includes(key)) {
        delete newItems[key]
      }
    })
  return newItems
}

export const getHighestId = (obj: { [i: number]: any }): number => {
  const result = Math.max(...Object.keys(obj).map(key => parseInt(key, 10)))
  if (result === -Infinity) {
    return -1
  }
  return result
}

export const getHighestIdElement = (obj: { [i: number]: any }) => {
  const highestId = getHighestId(obj)
  const highestIdElement = obj[highestId] // return the value of the highest

  return highestIdElement
}

export const getDaysInMonth = (month: number, year: number): Date[] => {
  // Since no month has fewer than 28 days
  const date: Date = new Date(year, month, 1)
  const days: Date[] = []
  while (date.getMonth() === month) {
    days.push(new Date(date))
    date.setDate(date.getDate() + 1)
  }
  return days
}
