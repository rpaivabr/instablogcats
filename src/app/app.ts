import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

export interface Post {
  id: string;
  description: string;
  imageUrl: string;
  tags: string[];
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
