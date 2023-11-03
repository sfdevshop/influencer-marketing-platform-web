import { LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData, useMatches, useParams } from "@remix-run/react";
import { getUserSession } from "~/utils/userSession";
import { getRandomFloat } from "./chatbox";
import { useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";

export const loader: LoaderFunction = async (args) => {
  const chatId = args.params.chatId;

  // get the user session
  const { userId, token } = await getUserSession(args);
  // if the user is not logged in, redirect to the login page
  if (!userId || !token) {
    return redirect("/log-in");
  }
  // get the chatbox data
  return {
    chatId,
    userId,
    token,
  };
};

export default function ActiveChat() {
  const creds = useLoaderData<any>();

  const [messages, setMessages] = useState<any[]>([]);
  const [otherPersonID, setOtherPersonID] = useState(creds.chatId || "911");
  const [chatboxID, setChatboxID] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [typedMessage, setTypedMessage] = useState("");
  const [socket, setSocket] = useState<any>(null);
  const [messageArrived, setMessageArrived] = useState<any>(null);

  const chatBoxViewRef = useRef(null);

  useEffect(() => {
    fetch(
      `http://localhost:3000/chat/getchatbox?otherPerson=${otherPersonID}`,
      {
        method: "GET",
        headers: {
          authorization: "Bearer " + String(creds.token),
        },
      }
    )
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
    // When loading is complete, initiate the socket connection
    initiateSocketConnection(creds.userId, otherPersonID, chatboxID);
    return () => {
      console.log("cleaning up socket connection...");
      if (socket) socket.disconnect();
    };
  }, []); // Include 'loading' as a dependency

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col items-center p-10">
      <div className="bg-blue-500 text-white py-4 px-6 rounded-t-lg">
        <h1 className="text-xl font-bold">Hello Chat</h1>
      </div>
      {loading ? (
        <p className="py-4 text-gray-600">Loading...</p>
      ) : (
        <div className="flex flex-col flex-1 w-full max-w-md rounded-lg bg-white shadow-md">
          <div className="p-4">
            {chatboxID && <p>Chatbox id - {chatboxID}</p>}
            {otherPersonID && <p>Chatting with user {otherPersonID}</p>}
            {creds.userId && <p>I am user: {creds.userId}</p>}
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
                    message.sender === creds.userId
                      ? "bg-green-500 text-white self-start rounded-r-lg"
                      : "bg-gray-200 self-end rounded-l-lg"
                  }`}
                >
                  <div className="p-2">
                    <span className="font-bold">
                      {message.sender === creds.userId ? "Me" : "Brand X"}
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
      from: creds.userId.toString(),
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
