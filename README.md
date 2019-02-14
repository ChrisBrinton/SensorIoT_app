# SensorIoT_app
The app for the SensorIoT suite

The SensorIoT app is a react-native app that works with the SensorIoT GW, SensorIoT nodes and the SensorIoT server and broker components to display current and historical data collected by the system.

# Installation
Prerequisites:
- The first order of business is to make sure you have a functional [react-native](https://facebook.github.io/react-native/docs/getting-started) development environment. Follow the "Building Projects with Native Code" directions for your platform.
  Follow these directions until you can successfully run the test app (AwesomeProject) in the emulator.
  
  This will have you install the other following dependencies as appropriate:
  - [python](https://www.python.org/)
  - [node.js](https://nodejs.org/en/)
  - [XCode](https://developer.apple.com/xcode/) or [Android Studio](https://developer.android.com/studio/index.html) (or both)
  - [java](https://www.java.com) java SE Development Kit (JDK) (version 8 or better)

- You will also need git if you dont already have it [git](https://www.git-scm.com/downloads)

Once the prereqs are installed, in your dev area on your local machine:

    git clone https://github.com/ChrisBrinton/SensorIoT_app
    cd SensorIoT_app
    npm install
    react-native run-android (or react-native run-ios)

On Android, depending on how many revisions Android Studio and react-native have moved forward, you may need to fiddle with the android/app/build.gradle file to get the sdk version matched properly.

To recreate the project on iOS after the build is hopelessly buggered:

    git clone https://github.com/ChrisBrinton/SensorIoT_app
    react-native init SensorIoT (yes, a different app with a different name)
    cp SensorIoT_app/actions/* SensorIoT
    cp SensorIoT_app/components/* SensorIoT
    cp SensorIoT_app/containers/* SensorIoT
    cp SensorIoT_app/reducers/* SensorIoT
    cp SensorIoT_app/package.json SensorIoT
    cp SensorIoT_app/package-lock.json SensorIoT

      for iOS
    cp SensorIoT_app/ios/SensorIoT/AppDelegate.m SensorIoT/ios
    cp SensorIoT_app/ios/SensorIoT/Base.lproj SensorIoT/ios/SensorIoT/Base.lproj
    rm SensorIoT/ios/Images.xcassets
    cp SensotIoT_app/ios/Images.xcassets SensorIoT/ios/SensorIoT

manually link ART.xcodeproj [react-native instructions](https://facebook.github.io/react-native/docs/linking-libraries-ios.html#manual-linking) or the more specific [stack overflow instructions](https://stackoverflow.com/questions/37658957/no-component-found-for-view-with-name-artshape/49381982#49381982) then:

    cd SensorIoT

    npm install
    react-native link
    react-native run-ios

    Once the build is recovered, replace the original ios folder with the working one:
    cd ..
    rm -rf SensorIoT_app/ios
    cp -r SensorIoT/ios/ SensorIoT/ios
    
    fingers crossed, the ios build now works.



## Building the SensorIoT app
The current build instructions are based on running the Android Studio build environment on Windows using VSCode as an IDE and the Android Simulator to test & debug.

node.js packages will likely need to be updated if any significant time has passed since the project was last touched.
- Update node.js itself by downloading the windows installer from https://nodejs.org
 
- In SensorIoT_app project dir

      npm outdated - will list all local packages that need an update
        edit the package.json file with newer version numbers for any desired updated (This is potentially a PITA of incompatibility, so proceed cautiously)
      npm install will pull any versions from package.json that are not installed. 
 
- react-native may need to be updated:

      react-native-git-upgrade
    
### Building SensorIoT on Android
Make sure you are running the latest version of Android Studio: Help->Check for Updates
The "AVD Manager" menu holds the simulators. We've been using a "Pixel 2 no sound" simulator profile. Start the simulator


    react-native run-android - will build the project and start execution on the simulator
    react-native log-android - this will show the debug log info coming from the simulator
    ./gradew clean - run this from the android directory

### Building SensorIoT on iOS
The target project is in ~SensorIoT/ios/SensorIoT.xcodeproj
This needs to be loaded on an up to date version of XCode running on a Mac
To test/debug, make sure a legitimate simulator or target device is selected in the XCode product->destination menu.
Press the "Play" button to build and deploy onto target device

## Deploying the app
Most of the information about this process was gleaned from this article:
https://medium.com/the-react-native-log/checklist-to-deploy-react-native-to-production-47157f8f85ed

This explains the process for both iOS and Android, and is a high level checklist but very useful. Many of the steps are one
time only either for a given account, or for a given app. For the same app, but newer version here is a summary:

- Create a build for both playforms. 
  - Android - create a release build and then a "Signed APK" - https://facebook.github.io/react-native/docs/signed-apk-android.html
    - The keystore file is called SensorIoT.keystore and the alias is sensoriot-alias. The password is stored in android/gradle.properties
      and this needs to be in .gitignore for hopefully obvious reasons.
    - Increment the versionCode and versionName in android/build.gradle. VersionCode needs to be a positive integer, so just versionCode++ is as
      this number is internal and only used to tell if a version is older or newer than another. VersionName is the version that will be seen
      by the user. This is what should match the version for iOS.
    - Assuming the build.gradle has been setup as per the above instructions, create the signed release APKs by executing:
      cd android
      ./gradlew assembleRelease
    - Testing the release version on the simulator:
      react-native run-android --variant=release

  - iOS - after you have a functioning build, in XCode make sure the target is set to Generic iOS Device, then do a Product->Archive (this option isnt
      available until you select Generic iOS Device).

- Upload the app to the appropriate service:
  - Android - You control the deployment through the Google Play Console: https://play.google.com/apps/publish
    - Once logged in, select the SensorIoT app, then open the Release management tree from the lefthand menu and select App releases
    - Depending on the state of the app release cycle (whether its production, open beta or closed beta track), select the app that needs
      to be updated and click "Manage" on the right-hand side, then select the "Edit Release" button.
    - Upload the APK files created in the previous section. Enter release notes, save and review, then rollout.
    - The new version can take many minutes to hours to become available to testers.


  - iOS - Once the archive build is done, select "Distribute App" and choose iTunes Store via App Store Connect. The rest of the questions can take the
      default answers. You then go to App Store Connect: https://appstoreconnect.apple.com to manage.

- Distribute to test users
  - Android - log into the Google Play Console, select the app and click on "Manage" for the appropriate track. There will be a "Manage testers"
    dropdown and an "EDIT" link to add new tester emails.

  - iOS - after the app has been uploaded and processed (and approved, can take a day or two), you can see it on the 
    testflight tab of the connect console under the "Builds" section. Then you can select it and select which users will
    recieve an email with an offer to download it. The email has full instructions and seems to be pretty easy for people
    to execute these days. More details in the TestFlight article mentioned below.

## Icon assets were created with:
http://appiconmaker.co

## Create a clean project from Git repo (On Windows for Android)

    git clone https://github.com/ChrisBrinton/SensorIoT_app.git SensorIoT
    cd SensorIoT
    npm install
    react-native run-android

## Upload app to TestFlight
Instructions here: 
[put your app on testflight](https://medium.com/@dmathewwws/steps-to-put-your-app-on-testflight-and-then-the-ios-app-store-10a7996411b1)

TL;DR:

  Create an Product->Archive with a target of Generic iOS Device. 
  
  Once the Archive is created use the "Distribute App" button on the right or the archive pane to push it to the app store.
  