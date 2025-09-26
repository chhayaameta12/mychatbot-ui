import React, { useState } from "react";

function App() {
  // Style panel states
  const [showPanel, setShowPanel] = useState(false); // Panel hidden by default
  const [activeTab, setActiveTab] = useState("Style");
  const [darkMode, setDarkMode] = useState(false);
  const [userBubbleColor, setUserBubbleColor] = useState("#2563eb");
  const [botBubbleColor, setBotBubbleColor] = useState("#e5e7eb");
  const [userTextColor, setUserTextColor] = useState("#fff");
  const [botTextColor, setBotTextColor] = useState("#222");
  const [headerBg, setHeaderBg] = useState("#2563eb");
  const [areaBg, setAreaBg] = useState("#f3f4f6");
  const [bubbleRadius, setBubbleRadius] = useState(16);
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState("Inter, sans-serif");
  const [widgetWidth, setWidgetWidth] = useState(380);
  const [cornerRadius, setCornerRadius] = useState(20);
  const [showPowered, setShowPowered] = useState(true);
  const [userAvatar, setUserAvatar] = useState("https://cdn-icons-png.flaticon.com/512/456/456283.png");
  const [botAvatar, setBotAvatar] = useState("https://cdn-icons-png.flaticon.com/512/4712/4712109.png");
  const [chatIcon, setChatIcon] = useState("https://cdn-icons-png.flaticon.com/512/4712/4712109.png");
  const [syncUserColor, setSyncUserColor] = useState(false);

  // Chat logic states
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I help you today?", time: new Date() },
  ]);
  const [input, setInput] = useState("");
  const [botTyping, setBotTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "user", text: input, time: new Date() }]);
    setInput("");
    setBotTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Got it 👍", time: new Date() },
      ]);
      setBotTyping(false);
    }, 1200);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Sync user bubble color with header if enabled
  React.useEffect(() => {
    if (syncUserColor) setUserBubbleColor(headerBg);
  }, [syncUserColor, headerBg]);

  // File upload handlers
  const handleAvatarUpload = (setter) => (e) => {
    if (e.target.files && e.target.files[0]) {
      setter(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Save settings and close panel
  const handleSaveSettings = () => {
    setShowPanel(false);
    // Optionally, persist settings here
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen px-2 transition-colors duration-300 ${
        darkMode ? "bg-zinc-900" : "bg-gray-100"
      }`}
      style={{
        background: darkMode
          ? "linear-gradient(135deg, #18181b 0%, #27272a 100%)"
          : `linear-gradient(135deg, ${areaBg} 0%, #e5e7eb 100%)`,
        fontFamily,
        fontSize: `${fontSize}px`,
      }}
    >
      {/* Settings Panel Modal */}
      {showPanel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div
            className={`relative shadow-2xl border p-4 md:p-8 rounded-3xl flex flex-col gap-6 items-start overflow-y-auto w-full max-w-md ${
              darkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-gray-200"
            }`}
            style={{
              minHeight: 400,
              maxHeight: "90vh",
              fontFamily,
              fontSize: `${fontSize}px`,
              transition: "background 0.3s",
            }}
            tabIndex={0}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-700"
              onClick={() => setShowPanel(false)}
              aria-label="Close settings"
            >
              &times;
            </button>
            {/* Tabs */}
            <div className="flex w-full border-b mb-4">
              <button
                className={`px-4 py-2 font-semibold border-b-2 ${
                  activeTab === "Style"
                    ? darkMode
                      ? "border-white text-white"
                      : "border-black text-black"
                    : "border-transparent text-gray-400"
                }`}
                onClick={() => setActiveTab("Style")}
              >
                Style
              </button>
              <button
                className={`px-4 py-2 font-semibold border-b-2 ${
                  activeTab === "Content"
                    ? darkMode
                      ? "border-white text-white"
                      : "border-black text-black"
                    : "border-transparent text-gray-400"
                }`}
                onClick={() => setActiveTab("Content")}
              >
                Content
              </button>
              <button
                className={`ml-auto px-5 py-2 bg-gray-100 rounded-xl font-semibold shadow ${darkMode ? "text-gray-800" : "text-gray-700"}`}
                onClick={handleSaveSettings}
              >
                Save
              </button>
            </div>
            {activeTab === "Style" && (
              <>
                {/* Appearance */}
                <div>
                  <div className={`font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>Appearance</div>
                  <div className="flex gap-4 items-center">
                    <div
                      className={`flex items-center gap-2 px-4 py-2 rounded-2xl border-2 ${
                        !darkMode
                          ? "border-black bg-gray-50"
                          : "border-gray-200 bg-gray-50"
                      }`}
                    >
                      <span className="text-gray-700 font-medium">Light</span>
                    </div>
                    {/* Toggle Switch */}
                    <label className="relative inline-flex items-center cursor-pointer mx-2">
                      <input
                        type="checkbox"
                        checked={darkMode}
                        onChange={() => setDarkMode((d) => !d)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-gray-700 transition"></div>
                      <span className={`ml-3 font-medium ${darkMode ? "text-white" : "text-gray-700"}`}>{darkMode ? "Dark" : "Light"}</span>
                    </label>
                    <div
                      className={`flex items-center gap-2 px-4 py-2 rounded-2xl border-2 ${
                        darkMode
                          ? "border-black bg-gray-900"
                          : "border-gray-200 bg-gray-900"
                      }`}
                    >
                      <span className="text-gray-200 font-medium">Dark</span>
                    </div>
                  </div>
                </div>
                {/* Branding */}
                <div>
                  <div className={`font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>Profile picture</div>
                  <label className={`inline-block px-4 py-2 bg-gray-100 rounded-lg shadow cursor-pointer ${darkMode ? "text-gray-900" : ""}`}>
                    <span>Upload</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload(setBotAvatar)} />
                  </label>
                  <div className={`font-semibold mb-2 mt-4 ${darkMode ? "text-white" : "text-gray-900"}`}>Chat icon</div>
                  <label className={`inline-block px-4 py-2 bg-gray-100 rounded-lg shadow cursor-pointer ${darkMode ? "text-gray-900" : ""}`}>
                    <span>Upload</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload(setChatIcon)} />
                  </label>
                </div>
                {/* Colors */}
                <div>
                  <div className={`font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>User message color</div>
                  <input type="color" value={userBubbleColor} onChange={e => setUserBubbleColor(e.target.value)} className="w-8 h-8 rounded border" />
                  <div className="flex items-center mt-2">
                    <span className={`mr-2 text-sm ${darkMode ? "text-gray-300" : ""}`}>Sync user message color with agent header</span>
                    <input type="checkbox" checked={syncUserColor} onChange={e => setSyncUserColor(e.target.checked)} />
                  </div>
                  <div className={`font-semibold mt-4 mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>Chat bubble button color</div>
                  <input type="color" value={botBubbleColor} onChange={e => setBotBubbleColor(e.target.value)} className="w-8 h-8 rounded border" />
                  <div className={`font-semibold mt-4 mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>User text color</div>
                  <input type="color" value={userTextColor} onChange={e => setUserTextColor(e.target.value)} className="w-8 h-8 rounded border" />
                  <div className={`font-semibold mt-4 mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>Bot text color</div>
                  <input type="color" value={botTextColor} onChange={e => setBotTextColor(e.target.value)} className="w-8 h-8 rounded border" />
                  <div className={`font-semibold mt-4 mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>Header background</div>
                  <input type="color" value={headerBg} onChange={e => setHeaderBg(e.target.value)} className="w-8 h-8 rounded border" />
                  <div className={`font-semibold mt-4 mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>Area background</div>
                  <input type="color" value={areaBg} onChange={e => setAreaBg(e.target.value)} className="w-8 h-8 rounded border" />
                </div>
                {/* Typography & Layout */}
                <div>
                  <div className={`font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>Font size</div>
                  <input type="range" min={12} max={18} value={fontSize} onChange={e => setFontSize(Number(e.target.value))} />
                  <div className={`font-semibold mt-4 mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>Font family</div>
                  <select value={fontFamily} onChange={e => setFontFamily(e.target.value)} className="w-full border rounded px-2 py-1">
                    <option value="Inter, sans-serif">Inter</option>
                    <option value="Arial, sans-serif">Arial</option>
                    <option value="Roboto, sans-serif">Roboto</option>
                    <option value="Georgia, serif">Georgia</option>
                    <option value="monospace">Monospace</option>
                  </select>
                  <div className={`font-semibold mt-4 mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>Widget width</div>
                  <input type="range" min={280} max={420} value={widgetWidth} onChange={e => setWidgetWidth(Number(e.target.value))} />
                  <div className={`font-semibold mt-4 mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>Corner radius</div>
                  <input type="range" min={0} max={24} value={cornerRadius} onChange={e => setCornerRadius(Number(e.target.value))} />
                </div>
                {/* Powered by toggle */}
                <div className="mb-2 flex items-center">
                  <span className={`mr-2 text-sm ${darkMode ? "text-gray-300" : ""}`}>Show "Powered by" line</span>
                  <input type="checkbox" checked={showPowered} onChange={e => setShowPowered(e.target.checked)} />
                </div>
              </>
            )}
            {activeTab === "Content" && (
              <div className={`text-gray-400 text-center py-8 ${darkMode ? "text-gray-300" : ""}`}>Content settings coming soon...</div>
            )}
          </div>
        </div>
      )}

      {/* Chat Window */}
      <div
        className={`flex flex-col overflow-hidden shadow-2xl w-full md:w-[420px] max-w-full ${
          darkMode ? "bg-zinc-900" : "bg-white"
        }`}
        style={{
          minHeight: 400,
          height: "70vh",
          borderRadius: cornerRadius,
          background: darkMode ? "#18181b" : "#fff",
          transition: "background 0.3s",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center gap-2 p-4 relative"
          style={{
            background: headerBg,
            borderTopLeftRadius: cornerRadius,
            borderTopRightRadius: cornerRadius,
            transition: "background 0.3s",
          }}
        >
          <img src={chatIcon} alt="bot" className="w-8 h-8 rounded-full" />
          <h1 className="text-lg font-bold text-white">My Chatbot</h1>
          {/* Settings Icon - now to the left of dark mode button */}
          <button
            className="ml-auto mr-2 p-2 rounded-full hover:bg-white/20 transition"
            title="Open settings"
            onClick={() => setShowPanel(true)}
            aria-label="Open settings"
            style={{ background: "rgba(255,255,255,0.15)" }}
          >
            <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 8 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 8a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 8 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09c0 .38.22.73.56.91A1.65 1.65 0 0 0 16 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 8c.38 0 .73.22.91.56A1.65 1.65 0 0 0 21 8.6V9a2 2 0 1 1 0 4h-.09c-.38 0-.73.22-.91.56A1.65 1.65 0 0 0 19.4 15z" />
            </svg>
          </button>
          <button
            className="px-2 py-1 rounded bg-white text-gray-700"
            onClick={() => setDarkMode((d) => !d)}
            tabIndex={0}
          >
            {darkMode ? "🌞 Light" : "🌙 Dark"}
          </button>
        </div>

        {/* Messages */}
        <div
          className="flex-1 p-4 space-y-3 overflow-y-auto"
          style={{ background: areaBg, transition: "background 0.3s" }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex items-end ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "bot" && (
                <img
                  src={botAvatar}
                  alt="bot"
                  className="w-7 h-7 rounded-full mr-2"
                />
              )}
              <div
                className="px-4 py-3 shadow-sm max-w-xs flex flex-col"
                style={{
                  background: msg.sender === "user" ? userBubbleColor : botBubbleColor,
                  color: msg.sender === "user" ? userTextColor : botTextColor,
                  borderRadius: bubbleRadius,
                }}
              >
                <span>{msg.text}</span>
                <span className="self-end text-xs text-gray-400 mt-1">
                  {formatTime(msg.time)}
                </span>
              </div>
              {msg.sender === "user" && (
                <img
                  src={userAvatar}
                  alt="user"
                  className="w-7 h-7 rounded-full ml-2"
                />
              )}
            </div>
          ))}
          {botTyping && (
            <div className="flex items-end justify-start mt-2">
              <img
                src={botAvatar}
                alt="bot"
                className="w-7 h-7 rounded-full mr-2"
              />
              <div
                className="px-4 py-2 rounded-xl shadow-sm max-w-xs flex items-center gap-2"
                style={{
                  background: botBubbleColor,
                  color: botTextColor,
                  borderRadius: bubbleRadius,
                }}
              >
                <span className="animate-pulse">Bot is typing</span>
                <span className="animate-bounce">...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input and Upload Controls */}
        <div className="flex p-3 border-t bg-white items-end">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1 border rounded-xl px-3 py-2 mr-2 focus:ring focus:ring-blue-400 outline-none"
            style={{ fontFamily, fontSize: `${fontSize}px` }}
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-xl shadow active:scale-95"
            style={{ borderRadius: bubbleRadius }}
          >
            Send
          </button>
          {/* Upload controls beside message box */}
          <div className="flex flex-col gap-2 ml-3">
            <label className="inline-block px-2 py-1 bg-gray-100 rounded-lg shadow cursor-pointer text-xs text-center">
              <span>Bot Pic</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload(setBotAvatar)} />
            </label>
            <label className="inline-block px-2 py-1 bg-gray-100 rounded-lg shadow cursor-pointer text-xs text-center">
              <span>Chat Icon</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload(setChatIcon)} />
            </label>
          </div>
        </div>

        {/* Footer */}
        {showPowered && (
          <div className="text-xs text-gray-500 text-center py-1 bg-gray-50">
            Powered by ChhayaBot 🚀
          </div>
        )}
      </div>
    </div>
  );
}

export default App;