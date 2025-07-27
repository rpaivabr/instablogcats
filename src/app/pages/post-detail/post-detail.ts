import { Component, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Posts } from '../../services/posts';

@Component({
  selector: 'app-post-detail',
  imports: [RouterLink],
  templateUrl: './post-detail.html',
  styleUrl: './post-detail.css'
})
export class PostDetail {
  private service = inject(Posts);
  id = input<string>();
  selectedPost = this.service.selectedPost;
  idEffect = effect(() => {
    console.log('Post ID changed:', this.id());
    this.service.selectedPostId.set(this.id());
  })
}
