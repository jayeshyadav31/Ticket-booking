import { atom } from "recoil"
const seatAtom=atom({
    key:"seatAtom",
    default:JSON.parse(localStorage.getItem('seats'))
})
export default seatAtom;