import React, { useState, FormEvent, useEffect } from "react";
import { useParams } from "@remix-run/react";

function ChatBox() {

    const { otherPerson } = useParams();


    useEffect(() => {
    console.log("Other person is ", otherPerson);

    }, []);
    

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);



  return (
    <div className="h-screen flex justify-center items-center px-40">
        Hello Chat
    </div>
  );
}

export default ChatBox;
