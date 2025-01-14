import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html'
})
export class VideoCallComponent implements OnInit {
  localStream: MediaStream | null = null;
  remoteStream: MediaStream | null = null;
  peerConnection: RTCPeerConnection | null = null;
  socket: WebSocket | null = null;
  room: string = 'default';

  async ngOnInit() {
    this.socket = new WebSocket('ws://localhost:3000');

    // Ascultă mesajele de la server
    this.socket.onmessage = async (message) => {
      try {
        const data = JSON.parse(message.data);
    
        switch (data.type) {
          case 'offer':
            console.log('Received offer:', data);
            // Set the remote description for the offer
            await this.peerConnection?.setRemoteDescription(new RTCSessionDescription(data));
            // Create an answer
            const answer = await this.peerConnection?.createAnswer();
            // Set the local description for the answer
            await this.peerConnection?.setLocalDescription(answer);
            // Send the answer back to the signaling server
            this.socket?.send(JSON.stringify({ ...answer, type: 'answer' }));
            break;
    
          case 'answer':
            console.log('Received answer:', data);
            // Set the remote description for the answer
            await this.peerConnection?.setRemoteDescription(new RTCSessionDescription(data));
            break;
    
          case 'candidate':
            console.log('Received ICE candidate:', data.candidate);
            // Add the ICE candidate
            if (data.candidate) {
              await this.peerConnection?.addIceCandidate(new RTCIceCandidate(data.candidate));
            }
            break;
    
          default:
            console.error('Unknown message type:', data.type);
        }
      } catch (error) {
        console.error('Error processing WebSocket message:', error);
      }
    };
    
    // Alătură-te camerei implicite
    this.socket.onopen = () => {
      this.socket?.send(JSON.stringify({ type: 'join', room: this.room }));
    };
  }

  async startCall() {
    // Creează conexiunea Peer-to-Peer
    this.peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    });

    // Adaugă fluxul local
    this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    const localVideo = document.getElementById('localVideo') as HTMLVideoElement;
    localVideo.srcObject = this.localStream;

    this.localStream.getTracks().forEach((track) => {
      this.peerConnection?.addTrack(track, this.localStream!);
    });

    // Gestionează fluxul remote
    this.remoteStream = new MediaStream();
    const remoteVideo = document.getElementById('remoteVideo') as HTMLVideoElement;
    remoteVideo.srcObject = this.remoteStream;

    this.peerConnection.ontrack = (event) => {
      this.remoteStream?.addTrack(event.track);
    };

    // Gestionează candidații ICE
    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        this.socket?.send(
          JSON.stringify({ type: 'candidate', candidate: event.candidate.toJSON() })
        );
      }
    };

    const offer = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(offer);
    
    // Trimite oferta către serverul de semnalizare
    this.socket?.send(JSON.stringify({ ...offer, type: 'offer' }));
    }

  endCall() {
    this.localStream?.getTracks().forEach((track) => track.stop());
    this.peerConnection?.close();
    this.localStream = null;
    this.remoteStream = null;
    this.peerConnection = null;

    this.socket?.close();
    this.socket = null;
  }
}
