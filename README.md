# Hashfinger (Mac app)

Offline tape saturation, optical compressor, low pass and adaptive limiter.
Load files exported from Logic, process them, export 32-bit float WAVs back.

## Build it on your Mac
1. Install Node.js (https://nodejs.org, the LTS version).
2. In Terminal:  cd path/to/hashfinger-app
3. npm install
4. npm start        (runs the app)
5. npm run dist     (makes dist/Hashfinger-1.0.0-universal.dmg)

## Or build it without a Mac
Put this folder in a GitHub repo, open the Actions tab, run "Build Mac app", then download the Hashfinger-mac file from the finished run.

## First launch
The app is not signed with an Apple Developer account, so macOS will warn about it. Right-click the app, choose Open, then Open again. You only need to do this once.
