// declare global {
//     interface Window {
//         AudioContext: typeof AudioContext;
//         webkitAudioContext: typeof AudioContext;
//     }
// }
interface Window {
    webkitAudioContext: typeof AudioContext
  }