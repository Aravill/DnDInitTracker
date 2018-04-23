const DateFormat = require('dateformat');
const FileSystem = require('fs');
const Electron = require('electron');
const {
  app,
  BrowserWindow,
  Menu,
  ipcMain
} = Electron;
const Path = require('path');
const URL = require('url');

var mainWin;

// Advanced logging function
function log(colourCode, toLog) {
  let now = new Date();
  let formatted = DateFormat(now, 'dd.mm.yyyy | hh:MM:ss TT');
  let message = '';
  for (let i = 2; i < arguments.length; i++) {
    message = message + arguments[i];
  }
  console.log('\x1b[%dm%s\x1b[0m', colourCode, formatted, ' - ', message);
  let log = formatted + ' - ' + message + '\n';
  if (toLog) {
    try {
      FileSystem.appendFileSync('./log.txt', log, 'utf-8');
    } catch (e) {
      FileSystem.writeFileSync('./log.txt', log, 'utf-8');
    }
  }

}

// Create app window on app start
function createMainWindow() {
  // Create browser window
  mainWin = new BrowserWindow({
    width: 800,
    height: 600
  });
  // Load index.html
  mainWin.loadURL(URL.format({
    pathname: Path.join(__dirname, '..', 'client', 'main.html'),
    protocol: 'file:',
    slashes: true
  }));
  // win.webContents.openDevTools();
  log(36, false, 'Electron started');
  mainWin.once('close', function() {
    log(36, false, 'Electron stopping');
    app.quit();
  });
}

// Load the main window
app.on('ready', createMainWindow);

app.once('window-all-closed', () => {
  if (proccess.platform !== 'darwin') {
    log(36, false, 'Electron stopping');
    app.quit()
  }
});