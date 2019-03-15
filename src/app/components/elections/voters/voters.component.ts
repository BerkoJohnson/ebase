import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-voters',
  templateUrl: './voters.component.html',
  styleUrls: ['./voters.component.css']
})
export class VotersComponent implements OnInit {
  imgUrl = "/assets/download.png";
  selectedFile: File;

  constructor() { }

  ngOnInit() {
  }

  onChange(event: Event) {
    this.selectedFile = event.target['files'][0];
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgUrl = e.target['result'];
    }
    reader.readAsDataURL(event.target['files'][0]);
  }

  uploadData() {
    const formData = new FormData();
    formData.append('id', '12345');
    formData.append('file', this.selectedFile, this.selectedFile.name);
    return formData;
  }
}
