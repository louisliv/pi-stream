'use strict'

const Store = require('electron-store');
const { net } = require('electron');

class DataStore extends Store {
  constructor (settings) {
    super(settings)

    // initialize with buttons or empty array
    this.buttons = this.get('buttons') || []
  }

  saveButtons () {
    // save buttons to JSON file
    this.set('buttons', this.buttons)

    // returning 'this' allows method chaining
    return this
  }

  getButtons () {
    // set object's buttons to buttons in JSON file
    this.buttons = this.get('buttons') || []

    return this
  }

  buttonClick (id) {
    var button = this.buttons.find(x => x.id === id)
    var postData = JSON.stringify({"button" : button.text });
    var request = net.request({
      method: 'POST',
      url: 'http://127.0.0.1:5000/btn-click',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    request.on('response', (response) => {
      console.log(response)
    })

    request.write(postData)
    request.end()

    return this
  }
}

module.exports = DataStore