const { app, BrowserWindow} = require('electron')
require('electron-reload')(__dirname);
function criarJanela(){
    const janela = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            nodeIntegration: true
        }
    })
    janela.loadFile('./pages/index.html')
    //janela.setFullScreen(true);
}
app.whenReady().then(criarJanela)