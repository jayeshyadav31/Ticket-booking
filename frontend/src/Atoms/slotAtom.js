import { atom } from "recoil"
const slotAtom=atom({
    key:"slotAtom",
    default:JSON.parse(localStorage.getItem('slots'))
})
export default slotAtom;