import { computed, inject, Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { rxResource } from "@angular/core/rxjs-interop";
import { Observable } from "rxjs";

export interface Post {
  id: string;
  description: string;
  imageUrl: string;
  tags: string[];
}

@Injectable({ providedIn: 'root' })
export class Posts {
  private http = inject(HttpClient);
  private postsRes = rxResource<Post[], unknown>({ stream: () => this.getPosts() });
  // private postsRes = resource<Post[], unknown>({ loader: () => this.getPostsPromise() });
  posts = this.postsRes.value;
  isLoading = this.postsRes.isLoading;
  selectedPostId = signal<string | undefined>(undefined);
  selectedPost = computed(() => this.posts()?.find(post => post.id === this.selectedPostId()));

  getPosts(): Observable<Post[]> {
    console.log('Fetching posts from API');
    return this.http.get<Post[]>('http://localhost:3000/posts');
  }

  // async getPostsPromise(): Promise<Post[]> {
  //   console.log('Fetching posts from API');
  //   return fetch('http://localhost:3000/posts')
  //     .then(response => response.json() as Promise<Post[]>)
  // }
}

