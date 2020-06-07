import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  SERVER_API = '//localhost:8080';

  isResponseReceived = true;
  isServerAvailable: boolean = undefined;
  timeElapsed: string = undefined;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    setInterval(() => {
      this.ping();
    }, 2500);
  }

  ping(): void {
    this.httpClient.get(this.SERVER_API + '/ping').subscribe((response: boolean) => {
      this.isServerAvailable = response;
    }, (error) => {
      this.isServerAvailable = false;
    });
  }

  downloadFile(): void {
    this.isResponseReceived = false;
    this.timeElapsed = undefined;

    this.httpClient.post(this.SERVER_API + '/file-download', {}).subscribe((response: Response) => {
      this.isResponseReceived = true;
    }, (error) => {
      this.isResponseReceived = true;
    });
  }

  uploadFile(event): void {
    this.isResponseReceived = false;
    this.timeElapsed = undefined;

    const file: File = event.target.files[0];
    const params: FormData = new FormData();
    params.append('file', file);

    this.httpClient.post(this.SERVER_API + '/file-upload', params).subscribe((response: Response) => {
      this.isResponseReceived = true;
      this.timeElapsed = response.toString();
    }, (error) => {
      this.isResponseReceived = true;
    });
  }

}
