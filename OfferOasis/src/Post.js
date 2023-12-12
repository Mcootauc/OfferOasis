export class Post {
  constructor(id, authorID, body, price, date, imageURL, title) {
    this.id = id
    this.authorID = authorID
    this.body = body
    this.price = price
    this.date = date
    this.imageURL = imageURL
    this.title = title
  }

  toString() {
    return (
      this.id +
      ' posted by ' +
      this.authorID +
      ' on ' +
      this.date +
      ' with image ' +
      this.imageName +
      ' and title ' +
      this.title +
      ' and body ' +
      this.body +
      ' and price ' +
      this.price
    )
  }
}
