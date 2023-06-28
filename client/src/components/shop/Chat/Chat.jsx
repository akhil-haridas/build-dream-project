import React, { useState, useEffect } from "react";
import "../../client/Chat/Chat.css";
import Axios from "axios";
import { SHOPAPI } from "utils/api";
import { useSelector } from "react-redux";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:4000";

var socket, selectedChatCompare;

const Chat = () => {
  const userID = useSelector((state) => state.shop.shopID);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socketConnected, setsocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [notification, setNotification] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", userID);
    socket.on("connected", () => setsocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    Axios.get(`${SHOPAPI}chat`, { withCredentials: true })
      .then((response) => {
        setChats(response.data);
        console.log(response.data, "response.data");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    console.log(chat)
  };

  useEffect(() => {
    fetchMessages();

    if (selectedChat) {
      fetchMessages();
    }
  }, [selectedChat]);

  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      const response = await Axios.get(
        `${SHOPAPI}message?id=${selectedChat._id}`,
        {
          withCredentials: true,
        }
      );
      setMessages(response.data);
      socket.emit("join chat", selectedChat._id);

      selectedChatCompare = selectedChat;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          fetchMessages();
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    if (!socketConnected) return;
    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  const sendMessage = async () => {
    if (newMessage && selectedChat) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const response = await Axios.post(
          `${SHOPAPI}message`,
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          { withCredentials: true }
        );
        
        const newSentMessage = response.data;
        socket.emit("new message", newSentMessage);
        setMessages([...messages, newSentMessage]);
        setNewMessage("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const isSameSender = (m) => {
    if (m.sender.refType === "Shop") {
      return false;
    } else {
      return true;
    }
  };

  const getSender = (users) => {
    console.log(users)
    return users[0].refType !== "User" ? users[1].refId : users[0].refId;
  };

  const formatTimestamp = (timestamp) => {
    const currentDate = new Date();
    const date = new Date(timestamp);
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    if (currentYear === year && currentMonth === month && currentDay === day) {
      const period = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes.toString().padStart(2, "0");
      return `${formattedHours}:${formattedMinutes} ${period}, Today`;
    } else if (
      currentYear === year &&
      currentMonth === month &&
      currentDay - 1 === day
    ) {
      const period = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes.toString().padStart(2, "0");
      return `${formattedHours}:${formattedMinutes} ${period}, Yesterday`;
    } else if (
      currentYear === year &&
      currentMonth === month &&
      currentDay - 7 < day
    ) {
      const weekdays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const period = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes.toString().padStart(2, "0");
      return `${
        weekdays[date.getDay()]
      }, ${formattedHours}:${formattedMinutes} ${period}`;
    } else {
      const formattedDate = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      });
      const period = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes.toString().padStart(2, "0");
      return `${formattedDate}, ${formattedHours}:${formattedMinutes} ${period}`;
    }
  };
  const toggleInfo = (e) => {
    e.target.parentNode.classList.toggle("open");
  };

  return (
    <>
      <div className="main__chatbody">
        <div className="main__chatlist">
          <div className="chatlist__heading">
            <h2 className="chatRecent">Chats</h2>
            <button className="btn-nobg">
              <i className="fa fa-ellipsis-h"></i>
            </button>
          </div>
          <div className="chatList__search">
            <div className="search_wrap">
              <input
                type="text"
                placeholder="Search Here"
                required
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="search-btn">
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
          {notification.length > 0 && (
            <div className="profile__card" style={{ marginTop: "15px" }}>
              <div className="card__header" onClick={toggleInfo}>
                <h4>Notifications</h4>
                <i className="fa fa-angle-down"></i>
              </div>
              <div className="card__content">
                {notification.map((notif) => (
                  <p
                    key={notif.chat._id}
                    onClick={() => {
                      setSelectedChat(notif.chat);
                      setNotification(notification.filter((n) => n !== notif));
                    }}
                  >
                    {notif.chat.isGroupChat
                      ? ""
                      : `${notif.content} from ${notif.sender.refId.name}`}
                  </p>
                ))}
              </div>
            </div>
          )}

          <div className="chatlist__items">
            {chats
              .filter((chat) =>
                chat.isGroupChat
                  ? chat.chatName
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  : getSender(chat.users)
                      .name.toLowerCase()
                      .includes(searchTerm.toLowerCase())
              )
              .map((chat, index) => (
                <div
                  style={{
                    animationDelay: `0.${index + 1}`,
                    backgroundColor: selectedChat === chat ? "white" : "",
                  }}
                  onClick={() => handleChatSelect(chat)}
                  className={`chatlist__item ${
                    selectedChat === chat ? "active" : ""
                  } `}
                >
                  <div className="avatar">
                    <div className="avatar-img">
                      <img
                        src={`http://localhost:4000/uploads/${
                          getSender(chat.users).image
                        }`}
                        alt="#"
                      />
                    </div>
                    <span className={`isOnline ${true ? "active" : ""}`}></span>
                  </div>
                  <div className="userMeta">
                    <p>
                      {!chat.isGroupChat
                        ? getSender(chat.users).name
                        : chat.chatName}
                    </p>
                    <span className="activeTime">32 mins ago</span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {selectedChat ? (
          <div className="main__chatcontent">
            <div className="content__header">
              <div className="blocks">
                <div className="current-chatting-user">
                  <div className="avatar">
                    <div className="avatar-img">
                      <img
                        src={`http://localhost:4000/uploads/${selectedChat?.users[0]?.refId?.image}`}
                        alt="avatar"
                      />
                    </div>
                    <span className={`isOnline active`}></span>
                  </div>
                  <p>{selectedChat?.users[0]?.refId?.name}</p>
                  {isTyping ? (
                    <div>
                      <box-icon name="wifi-0" animation="fade-right"></box-icon>
                      <box-icon name="wifi-0" animation="fade-right"></box-icon>
                      <box-icon name="wifi-0" animation="fade-right"></box-icon>
                      <box-icon name="wifi-0" animation="fade-right"></box-icon>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>

              <div className="blocks">
                <div className="settings">
                  <button className="btn-nobg">
                    <i className="fa fa-cog"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="content__body">
              <div className="chat__items">
                {messages &&
                  messages.map((m, i) => (
                    <div
                      style={{ animationDelay: `0.${i + 1}` }}
                      className={`chat__item ${
                        isSameSender(m) ? "other" : "me"
                      }`}
                    >
                      <div className="chat__item__content">
                        <div className="chat__msg">{m.content}</div>
                        <div className="chat__meta">
                          <span>{formatTimestamp(m.createdAt)}</span>
                          {/* <span>Seen 1.03PM</span> */}
                        </div>
                      </div>
                      <div className="avatar">
                        <div className="avatar-img">
                          <img
                            src={
                              isSameSender(m)
                                ? `http://localhost:4000/uploads/${selectedChat?.users[0]?.refId?.image}`
                                : `http://localhost:4000/uploads/${selectedChat?.users[1]?.refId?.image}`
                            }
                            alt="#"
                          />
                        </div>
                        <span className={`isOnline ${"active"}`}></span>
                      </div>
                    </div>
                  ))}
                <div />
              </div>
            </div>
            <div className="content__footer">
              <div className="sendNewMessage">
                <button className="addFiles">
                  <i className="fa fa-plus"></i>
                </button>
                <input
                  type="text"
                  placeholder="Type a message here"
                  onChange={typingHandler}
                  value={newMessage}
                />
                <button
                  className="btnSendMsg"
                  id="sendMsgBtn"
                  onClick={sendMessage}
                >
                  <i className="fa fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ width: "75vw", textAlign: "center", margin: "auto" }}>
            <h1 style={{ fontSize: "35px", fontWeight: "600" }}>
              Please Select a chat
            </h1>
            <p>Connect with your clients</p>
          </div>
        )}
        {selectedChat && (
          <div className="main__userprofile">
            <div className="profile__card user__profile__image">
              <div className="profile__image">
                <img
                  src={`http://localhost:4000/uploads/${selectedChat?.users[0]?.refId?.image}`}
                  alt="avatar"
                />
              </div>
              <h4>{selectedChat?.users[0]?.refId?.name}</h4>
            </div>
            <div className="profile__card">
              <div className="card__header" onClick={toggleInfo}>
                <h4>Information</h4>
                <i className="fa fa-angle-down"></i>
              </div>
              <div className="card__content">
                Mobile : {selectedChat?.users[0]?.refId?.mobile}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Chat;
