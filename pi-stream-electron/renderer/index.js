'use strict'

const { ipcRenderer } = require('electron')

const streamButtonClicked = (e) => {
    var buttonId = parseInt(e.target.dataset.buttonId);
    ipcRenderer.send('click-button', buttonId);
}

// on receive buttons
ipcRenderer.on('buttons', (event, buttons) => {
    // get the buttonList ul
    const buttonList = document.getElementById('buttonList')
  
    // create html string
    const buttonItems = buttons.reduce((html, button) => {
        html += `<div class="col-2">
            <button class="btn btn-primary stream-button" data-button-id=${button.id}>${button.text}</button>
        </div>`
  
        return html
    }, '')
  
    // set list html to the button items
    buttonList.innerHTML = buttonItems
    buttonList.querySelectorAll('.stream-button').forEach(item => {
        item.addEventListener('click', streamButtonClicked)
    })
})