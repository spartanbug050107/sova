import React from 'react'
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";
import { Channel,ChannelHeader,Chat,MessageInput,MessageList,Thread,Window} from "stream-chat-react";
import toast from "react-hot-toast";
import { StreamChat } from "stream-chat";
import ChatLoader from "../components/ChatLoader";
import CallButton from "../components/CallButton";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY

const ChatPage = () => {
  
  const { id: targetUserId } = useParams();

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  const { authUser } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    
    const inChat = async () => {
      if(!tokenData?.token || !authUser) return;

      try {
        console.log("Initialising stream chat client...");

        const client = StreamChat.getInstance(STREAM_API_KEY);
        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.fullname,
            image: authUser.profilePic,
          },
          tokenData.token
        );

        const channelId = [authUser._id, targetUserId].sort().join("-");

        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });

        await currChannel.watch();

        setChatClient(client);
        setChannel(currChannel);
      } catch (error) {
        console.log("Error initialising chat interface...", error);
        toast.error("Could not connect to chat. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    inChat();
  }, [tokenData, authUser, targetUserId]);

  const handleVideoCall = () => {
    if(channel) {
      const callURL = `${window.location.origin}/call/${channel.id}`;

      channel.sendMessage({
        text: `A video meeting has been initiated. You may join the session using the following link:\n${callURL}`,
      });

      toast.success("Video call initiated successfully");
    }
  };

  if(loading || !chatClient || !channel) return <ChatLoader/>

  return (
    <div className='h-[93vh]'>
      <Chat client={chatClient} theme=''>
        <Channel channel={channel}>
          <div className='w-full relative'>
            <CallButton handleVideoCall={handleVideoCall} />
            <Window>
              <ChannelHeader/>
              <MessageList/>
              <MessageInput focus/>
            </Window>
          </div>
          <Thread/>
        </Channel>
      </Chat>
    </div>
  );
};

export default ChatPage
