export interface Item {
  id: string
  type: string
  color: string
  rotation: number
  x: number
  y: number
  width: number
  height: number
}

export interface Project {
  id: string
  name: string
  width: number
  height: number
  items: Item[]
}
