import { atom } from "recoil";
const movieAtom=atom({
    key:"movieAtom",
    default:JSON.parse(localStorage.getItem("movie")),
})
export default movieAtom;