# Mindwise DBT

## Table of Contents

* [Overview](#overview)
* [Tech Stack](#tech-stack)
* [Requirements](#requirements)
* [Environment Setup](#environment-setup)

  * [macOS (iOS + Android)](#macos-ios--android)
  * [Windows (Android)](#windows-android)
  * [Linux (Android)](#linux-android)
* [Project Setup](#project-setup)
* [Running the App](#running-the-app)
* [Builds & Releases](#builds--releases)

  * [Android](#android)
  * [iOS](#ios)
* [Environment Variables](#environment-variables)
* [Common Scripts](#common-scripts)
* [Troubleshooting](#troubleshooting)
* [Folder Structure](#folder-structure)

---

## Overview

Mindewise DBT is a mobile application built with React Native. 

## Tech Stack

* **React Native** (CLI)
* **TypeScript** 
* **Jest** for unit tests
* **ESLint / Prettier** for code quality


## Requirements

* **Node.js**: 20.19.5
* **Package Manager**: `yarn` or `npm`
* **Java**: JDK 17 (for Android builds)
* **Android**: Android Studio w/ SDKs & platform tools
* **iOS**: Xcode (macOS only)

## Environment Setup

### macOS (iOS + Android)

1. **Install Xcode** from the App Store.

   * Open Xcode once to install additional components.
   * Install **Command Line Tools**: `Xcode → Settings → Locations`.
2. **Install Homebrew** (optional):

   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
3. **Install Node & Watchman**:

   ```bash
   brew install node watchman
   ```
4. **CocoaPods** (for iOS):

   ```bash
   sudo gem install cocoapods
   ```
5. **Android Studio**:

   * Install **Android SDK**, **SDK Platform 34+**, **Android SDK Platform-Tools**, **Android SDK Build-Tools**.
   * Create a **Virtual Device (AVD)** via Device Manager.
6. **Environment variables** (add to `~/.zshrc` or `~/.bashrc`):

   ```bash
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```

### Windows (Android)

1. Install **Node.js 20.19.5**.
2. Install **Android Studio** + SDK Platform 34+ and Platform-Tools.
3. Set Environment Variables (System Properties → Environment Variables):

   * `ANDROID_HOME` → `C:\Users\<you>\AppData\Local\Android\Sdk`
   * Add to `Path`: `%ANDROID_HOME%\platform-tools` and `%ANDROID_HOME%\emulator`
4. Install **JDK 17** and ensure `java -version` shows 17.

### Linux (Android)

1. Install **Node.js** (via nvm recommended).
2. Install **OpenJDK 17**.
3. Install **Android Studio** and set env vars in `~/.bashrc`/`~/.zshrc`:

   ```bash
   export ANDROID_HOME=$HOME/Android/Sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```

## Project Setup

Clone and install dependencies.

```bash
git clone <repo-url> mindwise
cd mindwise
# choose one
npm install
# or
yarn install
```

If iOS is included, install pods:

```bash
cd ios && pod install && cd ..
```

## Running the App

Start the Metro bundler in a terminal:

```bash
npm run start
# or
yarn start
```

### Android (emulator or device)

```bash
npm run android
# or
yarn android
```

* Make sure an **AVD** is running or a device is connected with **USB debugging** enabled.

### iOS (simulator or device on macOS)

```bash
npm run ios
# or
yarn ios
```

* Ensure you’ve run `pod install` in the `ios/` folder.

## Builds & Releases

### Android

**Generate a release APK/AAB**

1. **Create signing key** (one-time):

   ```bash
   keytool -genkeypair -v -keystore android/app/mindwise.keystore -alias mindwise -keyalg RSA -keysize 2048 -validity 10000
   ```
2. **Configure Gradle signing** in `android/gradle.properties`:

   ```properties
   MYAPP_UPLOAD_STORE_FILE=android/app/mindwise.keystore
   MYAPP_UPLOAD_KEY_ALIAS=mindwise
   MYAPP_UPLOAD_STORE_PASSWORD=********
   MYAPP_UPLOAD_KEY_PASSWORD=********
   ```
3. **Reference in** `android/app/build.gradle` (if not auto-configured by RN template):

   ```gradle
   android {
     signingConfigs {
       release {
         storeFile file(MYAPP_UPLOAD_STORE_FILE)
         storePassword MYAPP_UPLOAD_STORE_PASSWORD
         keyAlias MYAPP_UPLOAD_KEY_ALIAS
         keyPassword MYAPP_UPLOAD_KEY_PASSWORD
       }
     }
     buildTypes {
       release {
         signingConfig signingConfigs.release
         minifyEnabled true
         shrinkResources true
         proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
       }
     }
   }
   ```
4. **Build**:

   ```bash
   cd android
   ./gradlew clean
   ./gradlew assembleRelease      # APK at android/app/build/outputs/apk/release/
   ./gradlew bundleRelease        # AAB at android/app/build/outputs/bundle/release/
   cd ..
   ```

### iOS

**Signing & Release build**

1. Open `ios/MindWise.xcworkspace` in Xcode.
2. Set your **Team**, **Bundle Identifier**, and **Signing** for Release.
3. Select *Any iOS Device (arm64)* and **Product → Archive**.
4. Use the **Organizer** to distribute to **TestFlight** or **App Store**.

**CLI build (optional)**

```bash
cd ios
xcodebuild -workspace MindWise.xcworkspace -scheme MindWise -configuration Release -sdk iphoneos -archivePath build/MindWise.xcarchive archive
xcodebuild -exportArchive -archivePath build/MindWise.xcarchive -exportOptionsPlist ExportOptions.plist -exportPath build
cd ..
```

## Common Scripts

Add/verify these in `package.json`:

```json
{
  "scripts": {
    "start": "react-native start",
    "android": "react-native run-android",
    "ios": "react-native run-ios",
    "clean:metro": "watchman watch-del-all && rm -rf $TMPDIR/metro-* && rm -rf $TMPDIR/haste-map-*",
    "test": "jest",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx"
  }
}
```

## Troubleshooting

* **Stuck Metro / stale cache**:

  ```bash
  npm run clean:metro
  rm -rf node_modules && npm install # or yarn install
  cd ios && pod deintegrate && pod install && cd ..
  ```
* **Android build fails with Java version**: Ensure JDK **17** is being used.
* **Android emulator not detected**: Start an AVD via Android Studio → Device Manager.
* **iOS build fails on pods**: Run `pod repo update && pod install`.
* **Permission issues on iOS**: Add usage descriptions to `Info.plist` (Camera, Location, etc.).

## Folder Structure

```
MindWise/
├─ android/           # Android native project
├─ ios/               # iOS native project
├─ src/               # TS source code
├─ __tests__/         # unit tests
├─ .env.development     # environment variables
├─ package.json
├─ babel.config.js
├─ tsconfig.json     
└─ README.md
```

## Development
Check console log.
```
adb logcat | findstr "ReactNativeJS"
```