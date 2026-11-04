# Umoja KIKOBA - Android app (Capacitor)

Wraps the web app in a native Android shell. Works offline; data is stored on the phone.

## Easiest: build the APK online (no Android Studio)

1. Create a free GitHub account and a new repository.
2. Upload all files of this project (including the hidden .github folder) to the repository's main branch.
3. Open the Actions tab > "Build Android APK" > Run workflow. Wait about 5-10 minutes.
4. Open the finished run, download the artifact "kikoba-debug-apk", unzip it, and send app-debug.apk to your phone.
5. On the phone, open the file and allow "install unknown apps" when asked.

## Build a test APK on your computer (alternative)

Requirements: Node 18+, Android Studio (includes the Android SDK and Java).

    npm install
    npx cap add android        # first time only
    npm run android:sync
    npm run android:open       # opens Android Studio

In Android Studio: Build > Build Bundle(s) / APK(s) > Build APK(s).
Copy the .apk to a phone and install it (allow "install unknown apps").

## Publish on Google Play

1. Create a Google Play Console developer account (one-time USD 25 fee, identity verification).
2. Change appId in capacitor.config.json to your own, e.g. com.yourname.kikoba. It cannot change after publishing.
3. Create a signing key: Build > Generate Signed Bundle / APK > Android App Bundle > Create new keystore.
   KEEP THIS FILE AND ITS PASSWORDS SAFE. Losing it blocks all future updates.
4. Build the signed .aab and upload it under Internal testing first, then Production.
5. Fill in the store listing: description, screenshots, 512x512 icon, 1024x500 feature graphic.
6. Publish a privacy policy page (required) and complete the Data safety form.
7. New personal developer accounts must run a closed test with a minimum number of testers for
   14 days before production access. Check the current rule in Play Console.
8. Finance apps get stricter review. Describe it as a record-keeping tool for member savings groups,
   not an app that lends money to the public.

## Before real use with real money

Data currently lives only on one phone. If the phone is lost or app data is cleared, records are gone.
Next phase: connect the app to the hosted FastAPI backend (kikoba_backend) so data is shared and backed up.
