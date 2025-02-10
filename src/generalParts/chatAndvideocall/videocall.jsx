'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Mic, MicOff, Video, VideoOff } from 'lucide-react';
import SimplePeer from 'vite-compatible-simple-peer';
import { useSocket } from '../../Components/context/socketContext';
import { useCallback } from 'react';

export default function VideoCall({ participant, onClose, sender }) {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const { socket } = useSocket();
  const [peer, setPeer] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const startVideoCall = useCallback(async () => {
    try {
     
      const stream  = await window.navigator.mediaDevices.getUserMedia({ video: true, audio: true });
       
      
      setLocalStream(stream);
  
      if(localVideoRef.current){
        localVideoRef.current.srcObject = stream;
      }
       
      
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  }, []);
  


  useEffect(() => {
    startVideoCall()

    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop())
      }
    setLocalStream(null)
    }
  }, [])





  useEffect(() => {
    if (!socket || !sender || !localStream) return

    console.log(localStream, "streams")
    

    if (localStream) {
      console.log(sender._id, participant._id, "participant and something")
      

      try {
        
        const peerInstance = new SimplePeer({
          initiator: sender?._id != participant?._id ,
          trickle: false,
          stream: localStream
        })

        console.log(peerInstance , "preer insgtance have  ebeen creted")

        console.log("peer initialized")
        setPeer(peerInstance)

        peerInstance.on("signal", (data) => {
          console.log("Sending Signal", data)
          socket.emit("peerSignal", { signal: data, receiverId: participant._id })
        })

        const handlePeerSignal = ({ signal }) => {
          console.log("recheed at peersignal listened at client ")
          peerInstance.signal(signal)
        }

        socket.on("peerSignal", handlePeerSignal)

        peerInstance.on("stream", (stream) => {
          console.log("Received Remote Stream")
          setRemoteStream(stream)
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = stream
          }
        })

        return () => {
          peerInstance.destroy()
          socket.off("peerSignal")
          localStream.getTracks().forEach((track) => track.stop())
        }
      } catch (error) {
        console.error("Error initializing SimplePeer:", error)
      }
    }
  }, [localStream])


  const toggleMute = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };


  const toggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsVideoOff(!isVideoOff);
    }
  };

  
  const handleClose = () => {
    if (peer) peer.destroy();
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl">
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-xl font-bold">Video Call with {participant.firstName}</h2>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-4 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <video ref={remoteVideoRef} autoPlay playsInline className="w-full rounded-lg" />
            <p className="mt-2 text-center">{participant.firstName}</p>
          </div>
          <div className="flex-1">
            <video ref={localVideoRef} autoPlay playsInline muted className="w-full rounded-lg" />
            <p className="mt-2 text-center">{sender.firstName}</p>
          </div>
        </div>
        <div className="p-4 flex justify-center space-x-4">
          <button onClick={toggleMute} className={`p-2 rounded-full ${isMuted ? 'bg-red-500' : 'bg-gray-200'}`}>
            {isMuted ? <MicOff className="w-6 h-6 text-white" /> : <Mic className="w-6 h-6" />}
          </button>
          <button onClick={toggleVideo} className={`p-2 rounded-full ${isVideoOff ? 'bg-red-500' : 'bg-gray-200'}`}>
            {isVideoOff ? <VideoOff className="w-6 h-6 text-white" /> : <Video className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </div>
  );
}
