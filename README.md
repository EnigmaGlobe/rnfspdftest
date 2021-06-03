# rnfspdftest

The app uses react-native-fs and react-native-document-picker

Upon clicking on the 'Start' button, it will initiate to select a PDF file.
After which it will try to use RNFS to read the PDF, based on a successful RNFS.stat (using it's originalFilepath)

Unfortunately, it fails here , with the below error message

com.rnfs.IORejectionException: ENOENT: /storage/emulated/0/Download/xx.pdf: open failed: EACCES (Permission denied), open '/storage/emulated/0/Download/xx.pdf'
com.rnfs.RNFSManager.getInputStream(RNFSManager.java:110)
com.rnfs.RNFSManager.readFile(RNFSManager.java:221)


A console.log also shows that both PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE and PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE are true
via manifest
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

Note there is no legacy storage used.
