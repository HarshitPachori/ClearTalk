import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTheme } from "@/context/ThemeContext";
import { apiClient } from "@/lib/api-client";
import { useAppStore } from "@/store";
import { BASE_URL, GET_ALL_MESSAGES_ROUTE } from "@/utils/constants";
import axios from "axios";
import { Download, FolderArchive, X } from "lucide-react";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const MessageContainer = () => {
  const scrollRef = useRef();

  const [showImagePreview, setShowImagePreview] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const { theme } = useTheme();

  const {
    selectedChatType,
    selectedChatData,
    userInfo,
    selectedChatMessages,
    setSelectedChatMessages,
    setIsDownloading,
    setFileDownloadProgress,
  } = useAppStore();

  const checkIfImage = (filePath) => {
    const imageRegex =
      /\.(jpg|jpeg|png|gif|bmp|tiff|tif|webp|svg|ico|heic|heif)$/i;
    return imageRegex.test(filePath);
  };

  const downloadFileHandler = async (fileUrl) => {
    try {
      setIsDownloading(true);
      setFileDownloadProgress(0);
      const response = await apiClient.get(`${BASE_URL}/${fileUrl}`, {
        withCredentials: true,
        responseType: "blob",
        onDownloadProgress: (data) => {
          setFileDownloadProgress(Math.round(100 * data.loaded) / data.total);
        },
      });
      const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = urlBlob;
      link.setAttribute("download", fileUrl.split("/").pop());
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(urlBlob);
      setIsDownloading(false);
      setFileDownloadProgress(0);
    } catch (error) {
      setIsDownloading(false);
      setFileDownloadProgress(0);
      if (axios.isAxiosError(error)) {
        toast.error(error.response.data);
      }
    }
  };

  const renderMessages = () => {
    let lastDate = null;
    return selectedChatMessages.map((message, index) => {
      const messageDate = moment(message.timestamp).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;
      return (
        <div key={index}>
          {showDate && (
            <div className="text-center text-gray-400 my-2">
              {moment(message.timestamp).format("LL") === moment().format("LL")
                ? "Today"
                : moment(message.timestamp).format("LL")}
            </div>
          )}
          {selectedChatType === "contact" && renderDMMessages(message)}
        </div>
      );
    });
  };

  const renderDMMessages = (message) => (
    <div
      className={`${
        message.sender === selectedChatData._id ? "text-left" : "text-right"
      } relative`}
    >
      {message.messageType === "text" && (
        <>
          <div
            className={`${
              message.sender !== selectedChatData._id
                ? // ? "bg-[#8417ff]/2 text-[#8417ff]/90 border-[#8417ff]/60"
                  `bg-color-${theme}-sender-msg text-color-${theme}-sender-msg rounded-tl-full`
                : `bg-color-${theme}-reciever-msg text-color-${theme}-reciever-msg  rounded-tr-full`
            }  inline-block p-3 rounded-b-full  my-1 max-w-[70%]  break-words`}
          >
            {message.content}
          </div>
        </>
      )}

      {message.messageType === "file" && (
        <div
          className={`${
            message.sender !== selectedChatData._id
              ? 
                `bg-color-${theme}-sender-msg text-color-${theme}-sender-msg  rounded-tl-xl`
              : `bg-color-${theme}-reciever-msg text-color-${theme}-reciever-msg `
          } inline-block p-3 rounded-b-xl my-1 max-w-[70%] break-words`}
        >
          {checkIfImage(message.fileUrl) ? (
            <>
              <div
                className="cursor-pointer"
                onClick={() => {
                  setShowImagePreview(true);
                  setImageUrl(message.fileUrl);
                }}
              >
                <img
                  src={`${BASE_URL}/${message.fileUrl}`}
                  alt="uploaded image"
                  height={300}
                  width={300}
                  className="rounded-md"
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center gap-4">
                <span className="text-white/80 text-3xl bg-black/50 rounded-lg p-3 ">
                  <FolderArchive />
                </span>
                <span> {message.fileUrl.split("/").pop()}</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger
                      className="bg-black/50 hover:bg-black/50 p-3 cursor-pointer text-2xl rounded-full transition-all duration-300 text-white/80"
                      onClick={() => downloadFileHandler(message.fileUrl)}
                    >
                      <Download />
                    </TooltipTrigger>
                    <TooltipContent className="bg-[#1c1b1e] border-none text-white">
                      Download
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </>
          )}
        </div>
      )}
      <div className="text-xs text-gray-300 mb-2">
        {moment(message.timestamp).format("LT")}
      </div>
    </div>
  );

  useEffect(() => {
    const getChatMessages = async () => {
      try {
        const response = await apiClient.post(
          GET_ALL_MESSAGES_ROUTE,
          { id: selectedChatData._id },
          { withCredentials: true }
        );
        if (response.data.messages) {
          setSelectedChatMessages(response.data.messages);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response.data);
        }
      }
    };

    if (selectedChatData._id) {
      if (selectedChatType === "contact") {
        getChatMessages();
      }
    }
  }, [selectedChatData, selectedChatType, setSelectedChatMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessages]);

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 w-full md:w-[65vw]  lg:w-[70vw] xl:w-[80vw]">
      {renderMessages()}
      <div ref={scrollRef} />
      {showImagePreview && (
        <div className="fixed top-0 left-0 z-[1000] h-[100vh] w-[100vw] backdrop-blur-md flex items-center justify-center">
          <div>
            <img
              src={`${BASE_URL}/${imageUrl}`}
              alt=""
              className="h-[80vh] w-full object-contain rounded-md"
            />
            <div className="flex gap-5 fixed top-0 right-0 mt-5 px-5">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <button
                      className="bg-black/20 hover:bg-black/50 p-3 cursor-pointer text-2xl rounded-full transition-all duration-300"
                      onClick={() => downloadFileHandler(imageUrl)}
                    >
                      <Download />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-[#1c1b1e] border-none  text-neutral-100">
                    Download
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <button
                      className="bg-black/20 hover:bg-black/50 p-3 cursor-pointer text-2xl rounded-full transition-all duration-300"
                      onClick={() => {
                        setShowImagePreview(false);
                        setImageUrl(null);
                      }}
                    >
                      <X />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-[#1c1b1e] border-none  text-neutral-100">
                    Close
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageContainer;
