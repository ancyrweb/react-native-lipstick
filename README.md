# react-native-lipstick

Add powerful styling to your react-native components,
including scaling, global variables, selectors and more !

## Why this ?

Working with style in react-native is lovely ! But it's also really painful when
it comes to repeat the same things : using colors, scaling sizes, sharing style
among multiple components...

This is where Lipstick comes in : it replaces the default StyleSheet object
provided by react and allows you to do much more funny things !

## Installation

`npm install --save react-native-lipstick`
OR
`yarn add react-native-lipstick`

## Example

```js
import React from "react";
import { View } from "react-native";
import StyleSheet from "react-native-lipstick";

const styles = StyleSheet.create({
  $blue: "#5a99ee",

  topBar: {
    backgroundColor: "$blue",
    height: "60@vs",
    width: "100%",
  },

  profilePicture: {
    height: "25@vs",
    width: "25@s",
  },

  'topBar|profilePicture': {
    borderWidth: 1,
  }
});

export const Element = () => (
  <View style={styles.topBar}>
    <Image style={styles.profilePicture} source={{ uri: "https://..." }} />
  </View>
)
```

## Plugins

Lipstick works with a plugin system : actually, everything is a plugin in Lipstick !
By default are provided three plugins :
* **globalVariablePlugin** : allows the usage of global variables
* **multiSelectorsPlugin** : handle the use of selectors (like 'topBar|profilePicture')
* **scalePlugin** : scales the values according to the screen dimensions so your app looks the same
on every screen (inspired by [react-native-size-matters)](https://github.com/nirsky/react-native-size-matters)) 

## Write your own plugin !

A plugin is a simple function that takes a style in, and spit a style out. It's really easy to add
your own !

```js
import StyleSheet from "react-native-lipstick";

StyleSheet.addPlugin((object) => {
  // Do whatever you want with the object and return the modified style !
  return object;
});
```

## Performances ?

I really don't know if it's a threat in terms of performance, because in depth **every plugin 
loops through every keys of the style object**. I think it's gonna add a few ms to launch time, so it's 
really not noticeable. 

If you have ideas or anything on this please share :)