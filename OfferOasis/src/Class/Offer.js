/**
 * The Offer Class
 */

export class Offer {
  constructor(id, authorID, description, price, date, imageURL, imageName, itemName, latitude, longitude) {
    this.id = id
    this.authorID = authorID
    this.description = description
    this.price = price
    this.date = date
    this.imageURL = imageURL
    this.imageName = imageName
    this.itemName = itemName
    this.latitude = latitude
    this.longitude = longitude
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
      ' and itemName ' +
      this.itemName +
      ' and description ' +
      this.description +
      ' and price ' +
      this.price +
      ' and latitude ' +
      this.latitude +
      ' and longitude ' +
      this.longitude
    )
  }
}
