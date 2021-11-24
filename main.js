const { app, BrowserWindow} = require('electron')
function criarJanela(){
    const janela = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })
    janela.loadFile('index.html')
}
app.whenReady().then(criarJanela)