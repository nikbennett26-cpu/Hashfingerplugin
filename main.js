const { app, BrowserWindow, protocol, net } = require("electron");
const path = require("path");
const { pathToFileURL } = require("url");

// Serve the app from its own secure origin so the audio engine (AudioWorklet) loads normally.
protocol.registerSchemesAsPrivileged([
  { scheme: "hf", privileges: { standard: true, secure: true, supportFetchAPI: true, stream: true } }
]);

const root = __dirname;
const allowed = (f) => f === path.join(root, "index.html") || f === path.join(root, "fonts.css") || f.startsWith(path.join(root, "fonts") + path.sep);

function createWindow() {
  const win = new BrowserWindow({
    width: 1240, height: 900, minWidth: 980, minHeight: 640,
    backgroundColor: "#0b0b0c", title: "Hashfinger",
    webPreferences: { contextIsolation: true, sandbox: true, backgroundThrottling: false }
  });
  win.loadURL("hf://app/index.html");
}

app.whenReady().then(() => {
  protocol.handle("hf", (req) => {
    const file = path.normalize(path.join(root, decodeURIComponent(new URL(req.url).pathname)));
    if (!allowed(file)) return new Response("Not found", { status: 404 });
    return net.fetch(pathToFileURL(file).toString());
  });
  createWindow();
  app.on("activate", () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});

app.on("window-all-closed", () => app.quit());
