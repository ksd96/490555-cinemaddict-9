export const getComment = () => ({
  image: [
    `smile.png`,
    `sleeping.png`,
    `puke.png`,
    `angry.png`,
  ] [Math.floor(Math.random() * 4)],
  text: [
    `Interesting setting and a good cast`,
    `Booooooooooring`,
    `Very very old. Meh`,
    `Almost two hours? Seriously?`,
  ] [Math.floor(Math.random() * 4)],
  author: [
    `Tim Macoveev`,
    `John Doe`,
    `Kevin Doe`,
    `Sidney Lumet`,
  ] [Math.floor(Math.random() * 4)],
});
