import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { WebSocketService } from '../services/WebSocketService';


@Component({
  selector: 'app-video-stream',
  templateUrl: './video-stream.component.html',
  styleUrls: ['./video-stream.component.css']
})
export class VideoStreamComponent implements OnInit {
  @ViewChild('videoElement') videoElement!: ElementRef;
  private mediaStream!: MediaStream;

  constructor(private wsService: WebSocketService) {}

  async ngOnInit() {
    await this.startStreaming();
    this.wsService.getMessages().subscribe((message) => {
      console.log('Received stream:', message);
    });
  }

  async startStreaming() {
    this.mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    this.videoElement.nativeElement.srcObject = this.mediaStream;
    this.wsService.sendMessage(this.mediaStream);
  }
}
