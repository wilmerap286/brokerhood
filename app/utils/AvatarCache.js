import React from "react";
import { Avatar } from "react-native-elements";
import shorthash from "shorthash";
import * as FileSystem from "expo-file-system";

export default class CacheAvatar extends React.Component {
  state = {
    source: null
  };

  componentDidMount = async () => {
    const { uri } = this.props;
    const name = shorthash.unique(uri);
    const path = `${FileSystem.cacheDirectory}${name}`;
    const image = await FileSystem.getInfoAsync(path);
    if (image.exists) {
      console.log("read image from cache");
      this.setState({
        source: {
          uri: image.uri
        }
      });
      return;
    }

    console.log("downloading image to cache");
    const newImage = await FileSystem.downloadAsync(uri, path);
    this.setState({
      source: {
        uri: newImage.uri
      }
    });
  };

  render() {
    console.log(this.state.source);
    return (
      <Avatar
        style={this.props.style}
        source={this.state.source}
        rounded
        size={this.props.size}
        PlaceholderContent={this.props.PlaceholderContent}
      />
    );
  }
}
