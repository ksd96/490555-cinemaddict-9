export const getComment = () => ({
  image: [
    `./images/emoji/smile.png`,
    `./images/emoji/sleeping.png`,
    `./images/emoji/puke.png`,
    `./images/emoji/angry.png`,
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

export const arrayComents = new Array(4)
.fill(``)
.map(getComment);
