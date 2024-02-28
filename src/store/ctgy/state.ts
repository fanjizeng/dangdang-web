export interface FirstCtgy {
  firstCtgyId: number
  firstctgyname: string
}

export interface SecondCtgy {
  secondctgyid: number
  secctgyname: string
  thirdctgyList: ThirdCtgy[]
  isReadOpen: boolean
}

export interface ThirdCtgy {
  thirdctgyid: number
  thirdctgyname: string
  secctgyid:  number
}

export interface CtgyState {
  firstCtgyList: FirstCtgy[]
  secondCtgyList: SecondCtgy[]
}

export const initCtgyState: CtgyState = {
  firstCtgyList: [],
  secondCtgyList: []
}