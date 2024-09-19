import { useState, useRef, useEffect } from "react";
import { Navbar } from "./components/ChatNavComp";
import ChatBot from "./ConnectToApiGemini";

function App() {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [messages, setMessages] = useState<
    { sender: "user" | "My Super IA Assistant"; text: string }[]
  >([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    if (searchInputValue.trim() === "") return;

    const newMessages = [
      ...messages,
      { sender: "user" as const, text: searchInputValue },
    ];

    setMessages(newMessages);

    const conversation = newMessages
      .map((msg) => `${msg.sender === "user" ? "Vous" : "My Super IA Assistant"}: ${msg.text}`)
      .join("\n");

    const response = await ChatBot(conversation);

    setMessages([
      ...newMessages,
      { sender: "My Super IA Assistant" as const, text: response },
    ]);

    setSearchInputValue("");
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="flex-1 overflow-auto p-4">
          <div className="p-4 rounded-lg h-[calc(100vh-10vh)] overflow-y-auto bg-brown-100">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex flex-col mb-3 ${
                  message.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div className="text-black text-sm mb-1">
                  {message.sender === "user" ? "Vous" : "My Super IA Assistant"}
                </div>
                <div className={`p-2 rounded-lg shadow ${message.sender === "user"? "bg-blue-200 text-right": "bg-blue-500 text-left"} ${message.text.length > 50 ? "max-w-lg" : "max-w-md"} `}>
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className="w-full mb-3">
          <Navbar
            onSearchChange={handleSearchChange}
            searchValue={searchInputValue}
            onSendMessage={handleSendMessage}
          />
        </div>
      </div>
    </>
  );
}

export default App;
