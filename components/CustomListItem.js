import { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  orderBy,
} from "../firebase";

const CustomListItem = ({ id, chatName, enterChat }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const db = getFirestore();

  useEffect(() =>
    onSnapshot(
      query(
        collection(db, `chats/${id}`, "messages"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        setChatMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      }
    )
  );

  return (
    <ListItem onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
      <Avatar
        rounded
        source={{
          uri:
            chatMessages?.[0]?.photoURL ||
            "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: 800 }}>{chatName}</ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {chatMessage?.[0]?.displayName}: {chatMessage?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

const styles = StyleSheet.create({});

export default CustomListItem;
