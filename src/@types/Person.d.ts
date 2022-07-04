import type { Group } from '@/@types/Group'
import type { Parent } from '@/@types/Parent'

export type Person = {
  id: string
  name: string
  birthday: Temporal.PlainDate | Temporal.PlainMonthDay
  groups?: Group[]
  parentOne?: Parent
  parentTwo?: Parent
  children?: Child[]
  meta?: {
    from: 'google'
  }
}

export type PersonUpdateInput = {
  name?: string
  birthday?: Date
  groups?: Group[]
  parentOne?: Parent
  parentTwo?: Parent
  children?: Child[]
}
