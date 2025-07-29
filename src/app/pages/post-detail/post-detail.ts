import { afterNextRender, Component, effect, inject, Injector, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Posts } from '../../services/posts';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-post-detail',
  imports: [RouterLink],
  templateUrl: './post-detail.html',
  styleUrl: './post-detail.css'
})
export class PostDetail {
  private injector = inject(Injector);
  private service = inject(Posts);
  private meta = inject(Meta);
  id = input<string>();
  liked = signal(false);

  clientRenderRef = afterNextRender(() => {
    const id = this.id()!;
    const likes: { [key: string]: boolean } = JSON.parse(window.localStorage.getItem('likes') || '{}')
    const isLiked = likes[id] || false;
    this.liked.set(isLiked);

    effect(() => {
      const liked = this.liked();
      likes[id] = liked;
      window.localStorage.setItem('likes', JSON.stringify(likes));
    }, { injector: this.injector })
  })

  toggleLike() {
    this.liked.update(state => !state);
  }

  selectedPost = this.service.selectedPost;
  idEffect = effect(() => {
    console.log('Post ID changed:', this.id());
    this.service.selectedPostId.set(this.id());

  });
  postEffect = effect(() => {
    const post = this.selectedPost();
    if (post) {
      console.log('Selected post:', post);
      const baseUrl = 'https://rpaivabr.github.io/instablogcats';
      const imageUrl = `${baseUrl}/${post?.imageUrl}`;
      console.log('Image URL:', imageUrl);
      // Update meta tags for SEO
      this.meta.addTags([
        { name: 'description', content: 'New Post!' },
        { property: 'og:url', content: `${baseUrl}/posts/${post.id}` || 'https://instablogcats.web.app/' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: post.description || 'No title available' },
        { property: 'og:description', content: post.description || 'No description available' },
        { property: 'og:image', content: imageUrl || 'https://via.placeholder.com/150' },
        { property: 'twitter:card', content: 'summary_large_image' },
        { property: 'twitter:domain', content: 'rpaivabr.github.io/instablogcats' },
        { property: 'twitter:url', content: `${baseUrl}/posts/${post.id}` },
        { property: 'twitter:title', content: post.description || 'No title available' },
        { property: 'twitter:description', content: post.description || 'No description available' },
        { property: 'twitter:image', content: imageUrl || 'https://via.placeholder.com/150' }  
      ])
    }
  })
}
