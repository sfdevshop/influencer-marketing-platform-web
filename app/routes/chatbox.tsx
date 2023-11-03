import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { getUserSession } from "~/utils/userSession";
import type { LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async (args) => {
  const { userId, token } = await getUserSession(args);
  if (!userId || !token) {
    return redirect("/log-in");
  }

  return json(
    { userId, token },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0, must-revalidate",
      },
    }
  );
};

export function getRandomFloat() {
  const min = 0.0; // Minimum value
  const max = 1.0; // Maximum value

  return Math.random() * (max - min) + min;
}

function ChatBox() {
  const creds = useLoaderData<any>();
  const myID = creds.userId;
  const token = creds.token;
  const [messages, setMessages] = useState<any[]>([]);
  const [otherPersonID, setOtherPersonID] = useState("");
  const [chatboxID, setChatboxID] = useState("");
  const [loading, setLoading] = useState(true); // Loading state
  const [typedMessage, setTypedMessage] = useState("");
  const [socket, setSocket] = useState<any>(null);
  const [messageArrived, setMessageArrived] = useState<any>(null);

  const chatBoxViewRef = useRef(null);

  useEffect(() => {
    const url_string = window.location.href;
    const url = new URL(url_string);
    const params = url.searchParams;

    const otherPerson = params.get("otherPerson") || "911";
    setOtherPersonID(otherPerson);

    fetch(`http://localhost:3000/chat/getchatbox?otherPerson=${otherPerson}`, {
      method: "GET",
      headers: {
        authorization: "Bearer " + String(token),
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
        setMessageArrived(getRandomFloat());
        setChatboxID(data.id);
        setLoading(false);
      });
  }, [otherPersonID]);

  useEffect(() => {
    if (chatBoxViewRef.current) {
      const scrollContainer = chatBoxViewRef.current;

      // Use requestAnimationFrame to ensure smooth scrolling
      const scrollDown = () => {
        if (scrollContainer) {
          // @ts-ignore
          scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }
      };

      // Request animation frame to scroll
      window.requestAnimationFrame(scrollDown);
    }
  }, [messageArrived]);

  useEffect(() => {
    if (!loading) {
      // When loading is complete, initiate the socket connection
      initiateSocketConnection(myID, otherPersonID, chatboxID);
    }
  }, [loading, myID, otherPersonID, chatboxID]); // Include 'loading' as a dependency

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col items-center p-10">
      <div className="bg-blue-500 text-white py-4 px-6 rounded-t-lg">
        {/* <h1 className="text-xl font-bold">Hello Chat</h1> */}
      </div>
      {loading ? (
        <p className="py-4 text-gray-600">Loading...</p>
      ) : (
        <div className="flex flex-col flex-1 w-full max-w-md rounded-lg bg-white shadow-md">
          <div className="p-4">
            {chatboxID && <p>Chatbox id - {chatboxID}</p>}
            {otherPersonID && <p>Chatting with user {otherPersonID}</p>}
            {myID && <p>I am user: {myID}</p>}
          </div>
          <hr className="border-t border-gray-300" />
          <div
            id="chat_box_view"
            ref={chatBoxViewRef}
            style={{ height: "50vh", overflowY: "scroll" }}
          >
            <div className="flex flex-col p-4 space-y-4 flex-1">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-2 ${
                    message.sender === myID
                      ? "bg-green-500 text-white self-start rounded-r-lg"
                      : "bg-gray-200 self-end rounded-l-lg"
                  }`}
                >
                  <div className="p-2">
                    <span className="font-bold">
                      {message.sender === myID ? "Me" : "Brand X"}
                    </span>
                    <p className="text-black">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 flex items-center">
            <input
              name="message"
              value={typedMessage}
              type="text"
              placeholder="Type your message here"
              onChange={(e) => setTypedMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
              className="flex-1 border border-gray-300 rounded-md p-2 text-black"
            />
            <button
              className="bg-blue-500 text-white rounded-md p-2 ml-2"
              onClick={sendMessage}
            >
              <span className=" text-black ">Send</span>
            </button>
          </div>
        </div>
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
      content: typedMessage ? typedMessage : "! NUDGE !",
    });

    setTypedMessage("");
    setMessageArrived(getRandomFloat());
  }

  function initiateSocketConnection(
    myID: string,
    otherPersonID: string,
    chatboxID: string
  ) {
    const socket = io("http://localhost:3000");
    setSocket(socket);

    socket.on("receive_from_server", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      setMessageArrived(getRandomFloat());
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
