// import create from 'zustand'
// import { subscribeWithSelector } from 'zustand/middleware'

// export const gameStates = {
//     MENU: 'MENU',
//     GAME: 'GAME',
//     GAME_OVER: 'GAME_OVER',
// }

// export const playAudio = (path, callback) => {
//     const audio = new Audio(`/sounds/${path}.mp3`)
//     if (callback) {
//         audio.addEventListener('ended', callback)
//     }
//     audio.play()
// }

// export const useGameStore = create(
//     subscribeWithSelector((set, get) => ({
//         activeForm: false,
//         setActiveForm: (bool) => set({ activeForm: bool }),
//         selectedAnforaForm: null,
//         setSelectedAnforaForm: (id) => set({ selectedAnforaForm: id }),
//         selectedFormOption: false,
//         setSelectedFormOption: (bool) => set({ selectedFormOption: bool }),
//         qtyCorrectOptions: 0,
//         setQtyCorrectOptions: (qty) => set({ qtyCorrectOptions: qty }),
//         inGame: false,
//         setInGame: (bool) => set({ inGame: bool }),
//         showMap: false,
//         setShowMap: (bool) => set({ showMap: bool }),
//         showMenu: true,
//         setShowMenu: (bool) => set({ showMenu: bool }),
//         clickDisabled: false,
//         setClickDisabled: (bool) => set({ clickDisabled: bool }),
//         isPageVisible: true,
//         setPageVisibility: (bool) => set({ isPageVisible: bool }),
//         resetCharacterPosition: false,
//         setResetCharacterPosition: (bool) => set({ resetCharacterPosition: bool }),
//         // READINGS
//         readings: [],
//         setReadings: (readings) => set({ readings }),
//     })),
// )
