export default class ModelComments {
  constructor(data) {
    this.id = data[`id`];
    this.image = `./images/emoji/${data[`emotion`]}.png`;
    this.text = data[`comment`];
    this.author = data[`author`];
    this.date = data[`date`];
  }

  static parseTask(data) {
    return new ModelComments(data);
  }

  static parseTasks(data) {
    return data.map(ModelComments.parseTask);
  }
}
