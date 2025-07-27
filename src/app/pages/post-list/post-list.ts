import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Posts } from '../../services/posts';

@Component({
  selector: 'app-post-list',
  imports: [RouterLink],
  templateUrl: './post-list.html',
  styleUrl: './post-list.css'
})
export class PostList {
  private service = inject(Posts);
  posts = this.service.posts;
  isLoading = this.service.isLoading;
}
