import {
  formalize,
  filterItemsFromIds,
  getHighestId,
  getHighestIdElement
} from '../../utils'
import { toDaysHHMMSS } from '../../utils/convertToTime'
describe('utils', () => {
  test('formalises input', () => {
    expect(formalize('NORMAL    string with spaces')).toBe(
      'normalstringwithspaces'
    )
    expect(formalize(',,,')).toBe('')
    expect(formalize('really-normal')).toBe('really-normal')
  })
  test('filterItemsFromIds', () => {
    expect(filterItemsFromIds([0, 1, 2], { 0: 'hi' })).toEqual({ 0: 'hi' })
    expect(filterItemsFromIds([10], { 2: '10' })).toEqual({})
    expect(
      filterItemsFromIds([3, 1, 5], {
        3: {
          name: 'hi'
        },
        2: { id: 3, name: ':)' },
        5: { name: 'smile' }
      })
    ).toEqual({ 3: { name: 'hi' }, 5: { name: 'smile' } })
  })
  test('getHighestId', () => {
    expect(getHighestId({ 1: 'hi', 2: 'three' })).toBe(2)
  })
  test('getHighestIdElement', () => {
    expect(getHighestIdElement({ 1: 'hi', 3: 'yo', 2: 'third' })).toBe('yo')
  })
  test('toDaysHHMMSS', () => {
    expect(toDaysHHMMSS(0)).toBe('00:00')
    expect(toDaysHHMMSS(20)).toBe('00:20')
    expect(toDaysHHMMSS(60)).toBe('01:00')
    expect(toDaysHHMMSS(80)).toBe('01:20')
    expect(toDaysHHMMSS(600)).toBe('10:00')
    expect(toDaysHHMMSS(3600)).toBe('1:00:00')
    expect(toDaysHHMMSS(36000)).toBe('10:00:00')
    expect(toDaysHHMMSS(86400)).toBe('1 Day 00:00:00')
    expect(toDaysHHMMSS(864000)).toBe('10 Days 00:00:00')
    expect(toDaysHHMMSS(1000001)).toBe('11 Days 13:46:41')
    // verbose
    expect(toDaysHHMMSS(0, true)).toBe('')
    expect(toDaysHHMMSS(20, true)).toBe('20 seconds')
    expect(toDaysHHMMSS(60, true)).toBe('1 Minute ')
    expect(toDaysHHMMSS(80, true)).toBe('1 Minute 20 seconds')
    expect(toDaysHHMMSS(600, true)).toBe('10 Minutes ')
    expect(toDaysHHMMSS(3600, true)).toBe('1 Hour ')
    expect(toDaysHHMMSS(864000, true)).toBe('10 Days ')
  })
  test('special', () => {
    expect(toDaysHHMMSS(1000001, true)).toBe('11 Days 13 Hours 46 Minutes ')
  })
})
