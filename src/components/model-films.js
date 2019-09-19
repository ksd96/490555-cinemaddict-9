export default class ModelFilms {
  constructor(data) {
    this.id = data[`id`];
    this.arrayComments = data[`comments`];
    this.title = data[`film_info`][`title`];
    this.alternativeTitle = data[`film_info`][`alternative_title`];
    this.rating = data[`film_info`][`total_rating`];
    this.ageRating = data[`film_info`][`age_rating`];
    this.date = data[`film_info`][`release`][`date`];
    this.duration = data[`film_info`][`runtime`];
    this.genres = data[`film_info`][`genre`];
    this.nameImage = data[`film_info`][`poster`];
    this.description = data[`film_info`][`description`];
    this.director = data[`film_info`][`director`];
    this.writers = data[`film_info`][`writers`];
    this.actors = data[`film_info`][`actors`];
    this.country = data[`film_info`][`release`][`release_country`];
    this.isWatchlist = data[`user_details`][`watchlist`];
    this.isFavorites = data[`user_details`][`favorite`];
    this.isHistory = data[`user_details`][`already_watched`];
    this.ratingFilm = data[`user_details`][`personal_rating`];
    this.watchingDate = data[`user_details`][`watching_date`];
  }

  static parseTask(data) {
    return new ModelFilms(data);
  }

  static parseTasks(data) {
    return data.map(ModelFilms.parseTask);
  }
}
