'use strict'

const path = require('path')
const { app, ipcMain } = require('electron')
require('electron-reload')(__dirname)

const Window = require('./Window')
const DataStore = require('./DataStore')

require('electron-reload')(__dirname)

// create a new todo store name "buttons"
const buttonsData = new DataStore({ name: 'buttons' })

function main () {
  // todo list window
  let mainWindow = new Window({
    file: path.join('renderer', 'index.html')
  })

  // initialize with todos
  mainWindow.once('show', () => {
    mainWindow.webContents.send('buttons', buttonsData.buttons)
  })

  ipcMain.on('click-button', (event, button) => {
    buttonsData.buttonClick(button)
  })
}

app.on('ready', main)

app.on('window-all-closed', function () {
  app.quit()
})