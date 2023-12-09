export class Post {
  constructor(id, authorID, body, date, imageName, title) {
    this.id = id
    this.authorID = authorID
    this.body = body
    this.date = date
    this.imageName = imageName
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
      this.body
    )
  }
}
