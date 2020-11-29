import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import { client } from "../utils/client";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function MyCamera(activity_id, landmark_id) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);

  const sendPhoto = async (photo) => {
    const data = await (client,
    `mutation MyMutation($activity_id:uuid, $landmark_id:uuid, $photo: String) {
  insert_photos_one(object: {activity_id: $activity_id, landmark_id: $landmark_id, photo: $photo}){
    id
  }`,
    { activity_id, landmark_id, photo });
    console.log(data);
  };

  const cameraRef = React.createRef();
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      const options = { quality: 1, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      if (data) {
        await sendPhoto(data.base64);
      }
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            justifyContent: "flex-end",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: "center",
              alignItems: "center",
            }}
            onPress={async () => {
              await takePicture();
            }}
          >
            <View
              style={{
                width: 50,
                height: 50,
                borderWidth: 2,
                borderColor: "white",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 100,
              }}
            >
              <MaterialCommunityIcons
                name="camera-outline"
                size={24}
                color="white"
              />
            </View>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}
