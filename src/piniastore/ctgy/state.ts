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
  thirdctgyid: number | null
  thirdctgyname: string
  secctgyid: number | null
}

export interface CtgyState {
  firstCtgyList: FirstCtgy[]
  secondCtgyList: SecondCtgy[],
  thirdCtgy: ThirdCtgy
}

export const initCtgyState: CtgyState = {
  firstCtgyList: [],
  secondCtgyList: [],
  thirdCtgy: {} as ThirdCtgy
}