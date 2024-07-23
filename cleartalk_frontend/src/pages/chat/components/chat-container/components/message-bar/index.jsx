import React, { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { Image, Paperclip, SendHorizonal, Sticker } from "lucide-react";
import { useAppStore } from "@/store";
import { useSocket } from "@/context/SocketContext";
import axios from "axios";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { UPLOAD_FILE_ROUTE } from "@/utils/constants";
import { useTheme } from "@/context/ThemeContext";

const MessageBar = () => {
  const [message, setMessage] = useState("");
  const emojiRef = useRef();
  const fileInputRef = useRef();
  const socket = useSocket();
  const { theme } = useTheme();
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const {
    selectedChatType,
    selectedChatData,
    userInfo,
    setIsUploading,
    setFileUploadProgress,
  } = useAppStore();

  const handleAddEmoji = (emoji) => {
    setMessage((msg) => msg + emoji.emoji);
  };

  const handleAttachMentClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAttachmentChange = async (event) => {
    try {
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        setIsUploading(true);
        const response = await apiClient.post(UPLOAD_FILE_ROUTE, formData, {
          withCredentials: true,
          onUploadProgress: (data) => {
            setFileUploadProgress(Math.round(100 * data.loaded) / data.total);
          },
        });
        if (response.status === 200) {
          setIsUploading(false);
          if (selectedChatType === "contact") {
            socket.emit("sendMessage", {
              sender: userInfo.id,
              content: undefined,
              recipient: selectedChatData._id,
              messageType: "file",
              fileUrl: response.data.filePath,
            });
          }
        }
      }
    } catch (error) {
      setIsUploading(false);
      if (axios.isAxiosError(error)) {
        toast.error(error.response.data);
      }
    }
  };

  const handleSendMessage = async () => {
    if (selectedChatType === "contact") {
      socket.emit("sendMessage", {
        sender: userInfo.id,
        content: message,
        recipient: selectedChatData._id,
        messageType: "text",
        fileUrl: undefined,
      });
    }
    setMessage("");
  };

  useEffect(() => {
    const handleOutsideEmojiPickerClick = (event) => {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setEmojiPickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideEmojiPickerClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideEmojiPickerClick);
    };
  }, [emojiRef]);

  return (
    <div className="h-[10vh] bg-[#1c1d25] flex items-center justify-center  px-8 mb-5 gap-6">
      <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center gap-5 pr-5">
        <input
          type="text"
          className="flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none"
          placeholder="Enter Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="text-neutral-500 focus:border-none focus:outline-none focus:text-white transition-all duration-300"
          onClick={handleAttachMentClick}
        >
          <Paperclip />
        </button>
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={handleAttachmentChange}
        />
        <div className="relative">
          <button
            className="text-neutral-500 focus:border-none focus:outline-none focus:text-white transition-all duration-300"
            onClick={() => setEmojiPickerOpen(!emojiPickerOpen)}
          >
            <Sticker />
            {/* <Image  */}
          </button>
          {/*  */}
          <div className="absolute bottom-16 right-0" ref={emojiRef}>
            <EmojiPicker
              theme="dark"
              open={emojiPickerOpen}
              onEmojiClick={handleAddEmoji}
              autoFocusSearch={false}
            />
          </div>
          {/*  */}
        </div>
      </div>
      <button
        className={`bg-color-${theme} hover:bg-color-${theme}-hover text-color-${theme} border-color-${theme} p-5 flex items-center justify-center rounded-md focus:border-none focus:outline-none focus:bg-color-${theme} focus:text-color-${theme} transition-all duration-300`}
        onClick={handleSendMessage}
      >
        <SendHorizonal />
      </button>
    </div>
  );
};

export default MessageBar;
