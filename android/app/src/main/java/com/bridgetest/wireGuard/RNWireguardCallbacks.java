package com.bridgetest.wireGuard;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import android.app.Activity;

public interface RNWireguardCallbacks {
    ReactApplicationContext getContext();
    Activity getActivity();
    Promise getConnectPromise();
    public void emit(String type, String event);
}
