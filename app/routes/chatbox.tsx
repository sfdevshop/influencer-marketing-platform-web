import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import io from "socket.io-client";
import { getUserSession } from "~/utils/userSession";
import { LoaderFunction, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async (args) => {
  const { userId, token } = await getUserSession(args);
  if (!userId || !token) {
    return redirect("/log-in");
  }

  return json({ userId, token });
};

function ChatBox() {
  const creds = useLoaderData<any>();

  const [messages, setMessages] = useState<any[]>([]);
  const [myID, setMyID] = useState("");
  const [otherPersonID, setOtherPersonID] = useState("");
  const [chatboxID, setChatboxID] = useState("");
  const [loading, setLoading] = useState(true); // Loading state
  const [typedMessage, setTypedMessage] = useState("");
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const url_string = window.location.href;
    const url = new URL(url_string);
    const params = url.searchParams;

    const otherPerson = params.get("otherPerson") || "";
    setOtherPersonID(otherPerson);

    fetch(`http://localhost:3000/chat/getchatbox?otherPerson=${otherPerson}`, {
      method: "GET",
      headers: {
        authorization: "Bearer " + String(creds.token),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setMessages(
          data.messages
            ? data.messages.sort((a: any, b: any) => b.createdAt > a.createdAt)
            : []
        );
        setChatboxID(data.id);

        fetch(`http://localhost:3000/user/me`, {
          method: "GET",
          headers: {
            authorization: "Bearer " + String(creds.token),
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setMyID(data.id ? data.id.toString() : "");
            setLoading(false); // Set loading to false when data is available
          })
          .catch((err) => {
            console.error("Error fetching data:", err);
            setLoading(false); // Ensure loading is set to false even on error
          });
      });
  }, [otherPersonID]);

  useEffect(() => {
    if (!loading) {
      // When loading is complete, initiate the socket connection
      initiateSocketConnection(myID, otherPersonID, chatboxID);
    }
  }, [loading, myID, otherPersonID, chatboxID]); // Include 'loading' as a dependency

  return (
    <div className="h-screen flex-column justify-center items-center px-40">
      <h1>Hello Chat</h1>
      {loading ? ( // Render a loading indicator while data is loading
        <p>Loading...</p>
      ) : (
        <>
          {chatboxID && <p>Chatbox id - {chatboxID}</p>}
          {otherPersonID && <p>Chatting with user {otherPersonID}</p>}
          {myID && <p>I am user: {myID}</p>}
          <hr></hr>
          <input
            name="message"
            value={typedMessage}
            type="text"
            placeholder="Type your message here"
            onChange={(e) => setTypedMessage(e.target.value)}
          ></input>
          <button className="btn btn-primary" onClick={sendMessage}>
            Send
          </button>
          <div className="message-container">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${
                  message.sender === myID ? "my-message" : "other-message"
                }`}
              >
                {message.sender === myID ? "Me - " : "Other - "}
                {message.content}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );

  function sendMessage() {
    let meta = {
      from: myID,
      to: otherPersonID,
      chatboxID: chatboxID,
    };

    socket.emit("push_to_server", {
      meta: meta,
      content: typedMessage,
    });

    setTypedMessage("");
  }

  function initiateSocketConnection(
    myID: string,
    otherPersonID: string,
    chatboxID: string
  ) {
    const socket = io("http://localhost:3000");
    setSocket(socket);

    socket.on("receive_from_server", (message) => {
      setMessages((prevMessages) => [message, ...prevMessages]);
    });

    socket.emit("enter_room", {
      myID,
      otherPersonID,
      chatboxID,
    });

    // return () => {
    //   console.log("cleaning up socket connection...");
    //   socket.disconnect();
    // };
  }
}

export default ChatBox;
