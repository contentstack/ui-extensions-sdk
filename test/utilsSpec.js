import * as Utils from "../lib/stack/utils.js";

describe("Utils", () => {
  it("merge", () => {
    const source = {
      "name": "Molecule Man",
      "age": 29,
      "secretIdentity": "Dan Jukes",
      "powers": [
        "Radiation resistance",
        "Turning tiny",
        "Radiation blast"
      ],
      "new": {
        "id": "0001",
        "type": "donut",
        "name": "Cake",
        "image": {
          "url": "images/0001.jpg",
          "width": 200,
          "height": 200
        },
        "thumbnail": {
          "url": "images/thumbnails/0001.jpg",
          "width": 32,
          "height": 32
        }
      }
    }

    const target = {
      "name": "Madame Uppercut",
      "age": 39,
      "secretIdentity": "Jane Wilson",
      "powers": [
        "Million tonne punch",
        "Damage resistance",
        "Superhuman reflexes"
      ],
      "new": {
        "id": "0001",
        "type": "donut",
        "name": "Cake",
        "image": {
          "url": "images/0001.jpg",
          "width": 200,
          "height": 200
        },
        "thumbnail": {
          "url": "images/thumbnails/0001.jpg",
          "width": 32,
          "height": 32
        }
      }
    }

    const merged = Utils.mergeDeep(target, source)
    const expected = {"name":"Molecule Man","age":29,"secretIdentity":"Dan Jukes","powers":["Million tonne punch","Damage resistance","Superhuman reflexes","Radiation resistance","Turning tiny","Radiation blast"],"new":{"id":"0001","type":"donut","name":"Cake","image":{"url":"images/0001.jpg","width":200,"height":200},"thumbnail":{"url":"images/thumbnails/0001.jpg","width":32,"height":32}}}
    expect(merged).toEqual(expected);
    expect(Utils.merge({})).toEqual({})
    expect(Utils.merge({'x': 'x'},{'z':'z'})).toEqual({'x': 'x','z':'z'})
  });
});