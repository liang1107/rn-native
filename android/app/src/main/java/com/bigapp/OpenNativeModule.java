package com.bigapp;

import android.app.Activity;

import android.text.TextUtils;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.ys.rkapi.MyManager;


public class OpenNativeModule extends ReactContextBaseJavaModule {
    public static final String TAG = "TAG";
    private ReactContext mReactContext;
    private static ReactContext myContext;
    public static final String EVENT_NAME = "nativeCallRn";
    MyManager manager;
    public OpenNativeModule(ReactApplicationContext context) {
        super(context);
        this.mReactContext = context;
        myContext=context;
        manager = MyManager.getInstance(myContext);
    }

    @Override
    public String getName() {
        return "OpenNativeModule";
    }
    @ReactMethod
    public void gitVersion(Callback successBack, Callback errorBack){
        try{
            Log.d(TAG,"调取版本好");
            String result;
            result =  manager.getApiVersion();
            Log.d(TAG,"API Version = " + result);
            successBack.invoke(result);
        }catch (Exception e){
            errorBack.invoke(e.getMessage());
        }

    }
    @ReactMethod
    public void changebar(Callback successBack, Callback errorBack){
        try{
            Log.d(TAG,"更改状态栏");
            String result;
            Log.d(TAG, String.valueOf(manager.getNavBarHideState())+"状态栏的状态查看");
            if (manager.getNavBarHideState())
            {
                manager.hideNavBar(false);
            }else{
                manager.hideNavBar(true);
            }
            successBack.invoke("ok");
        }catch (Exception e){
            errorBack.invoke(e.getMessage());
        }

    }
    @ReactMethod
    public boolean console() {
        Log.d(TAG,"跳转123跳转");
        Toast.makeText(mReactContext,"原生toast",Toast.LENGTH_SHORT).show();
//        Settings.System.putInt(myContext.getContentResolver(), Settings.System.SYSTEMBAR_HIDE,1);
//            Intent i = new Intent("com.tchip.changeBarHideStatus");
//        myContext.sendBroadcast(i);

        return false;


    }



    @ReactMethod
    public void dataToJS(Callback successBack, Callback errorBack){
        try{
            Activity currentActivity = getCurrentActivity();

            String result = currentActivity.getIntent().getStringExtra("number");
            if (TextUtils.isEmpty(result)){
                result = "没有1111数据";
            }
            System.out.print(result+"123");
            Log.d(TAG,result);
            Toast.makeText(mReactContext,result,Toast.LENGTH_SHORT).show();
            successBack.invoke(result);
        }catch (Exception e){
            errorBack.invoke(e.getMessage());
        }
    }

}
