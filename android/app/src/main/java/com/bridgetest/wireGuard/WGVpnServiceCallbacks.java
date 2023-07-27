package com.bridgetest.wireGuard;

import android.app.PendingIntent;

public interface WGVpnServiceCallbacks {
    void stop();
    boolean getStatus();
}