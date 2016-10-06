package com.project;

import android.support.annotation.Nullable;
import android.view.ViewGroup;
import android.widget.Button;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

/**
 * Created by jadams on 10/5/16.
 */

public class ReactImageManager extends SimpleViewManager<Button> {

    public static final String REACT_CLASS = "RCTButtonView";

    @Override
    public String getName() {
        return REACT_CLASS;
    }
    
    @Override
    public Button createViewInstance(ThemedReactContext context) {
        Button theButton = new Button(context);
        theButton.setLayoutParams(new ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.WRAP_CONTENT,
                ViewGroup.LayoutParams.WRAP_CONTENT));
        theButton.setText("foo bar baz");
        return theButton;
    }

    @ReactProp(name = "text")
    public void setText(Button view, @Nullable String text) {
        view.setText(text);
    }
}
