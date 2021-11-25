const { app, BrowserWindow} = require('electron')
require('electron-reload')(__dirname);
function criarJanela(){
    const janela = new BrowserWindow({
        width: 1080,
        height: 720,
        webPreferences: {
            nodeIntegration: true
        }
    })
    janela.loadFile('index.html')
}
app.whenReady().then(criarJanela)