import { LoaderFunction, json, redirect } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import Navbar from "~/components/Navbar";
import { getUserSession } from "~/utils/userSession";
import { PeopleChat, type Chats } from "~/types/ApiOps";

export const loader: LoaderFunction = async (args) => {
  const { userId, token } = await getUserSession(args);
  if (!userId || !token) {
    return redirect("/log-in");
  }

  return json({ userId, token });
};

export default function MyChats() {
  const data = useLoaderData<any>();
  const [chats, setChats] = useState<Chats>({ peopleChat: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/chat/getconversations?userid=28",
          {
            method: "GET",
            headers: {
              authorization: "Bearer " + String(data.token),
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);

          setChats({ peopleChat: data });
        } else {
          // Handle error if needed
          console.error("Failed to fetch data");
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col w-full lg:flex-row h-screen">
        <div className="h-screen card bg-base-300 rounded-box min-w-[300px]">
          <div className="card-body font-bold text-lg ">Messages</div>
          {chats.peopleChat.length > 0 && (
            <ul className="menu w-full h-full">
              {chats.peopleChat.map((chat: PeopleChat, id) => (
                <Link to={`/mychats/${chat.id}`}>
                  <li
                    className={`py-2 w-full `}
                    key={chat.id}
                    onClick={() => {
                      console.log(chat.id);
                    }}
                  >
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-row">
                        <div className="avatar">
                          <div className="w-10 h-10 rounded-full ring ring-primary"></div>
                        </div>
                        <div className="flex flex-col ml-2">
                          <div className="font-bold">
                            {chat.fname} {chat.lname}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </div>
        <div className="divider lg:divider-horizontal" />
        <div className="grid flex-grow h-screen card bg-base-300 rounded-box place-items-center mx-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
