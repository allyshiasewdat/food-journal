import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { Button, Header } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

export function Create() {
  const [image, setImage] = useState();
  const [hasPermission, setPermission] = useState(false);

  return (
    <View>
      <Header centerComponent={{ text: "Food Journal" }} />
      <Button title="Add meal photo" onPress={_pickImage} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
    </View>
  );

  async function _pickImage() {
    const permission = await _getCameraRollPermission();
    setPermission(permission);

    if (!permission) {
      return;
    }

    let result = (await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All
    })) as { cancelled: boolean; uri: string };

    if (!result.cancelled) {
      alert("image: " + result.uri);
      setImage(result.uri);
    }
  }

  async function _getCameraRollPermission() {
    const {
      granted,
      canAskAgain
    } = await ImagePicker.getCameraPermissionsAsync();

    if (granted) {
      return true;
    }

    if (!granted && canAskAgain) {
      return _requestCameraRollPermission();
    }

    return false;
  }

  async function _requestCameraRollPermission() {
    const { granted } = await ImagePicker.requestCameraRollPermissionsAsync();
    return granted;
  }
}
