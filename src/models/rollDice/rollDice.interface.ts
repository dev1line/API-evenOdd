// export interface IRefferal {
//   wallet: string
//   refferals: string[],
//   amount: string,
//   lastRefferedAt: string
// }

// export interface IBuyToken {
//   refferal: string,
//   buyer: string,
//   usdt: string,
//   boughtAt: string
// }

export interface IRollDice {
  rollId: number,
  diceNumber_1: number,  
  diceNumber_2: number,  
  isEven: boolean
}