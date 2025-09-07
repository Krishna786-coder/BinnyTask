package com.binnytask

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import android.os.Build

class DeviceModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "DeviceModule"

    @ReactMethod
    fun getOSVersion(promise: Promise) {
        try {
            val version = Build.VERSION.RELEASE
            promise.resolve(version)
        } catch (e: Exception) {
            promise.reject("Error", e)
        }
    }
}
