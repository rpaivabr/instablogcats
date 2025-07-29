import { inject } from '@angular/core';
import { RenderMode, ServerRoute } from '@angular/ssr';
import { Posts } from './services/posts';
import { firstValueFrom } from 'rxjs';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'posts/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const service = inject(Posts);
      console.log('Fetching posts for prerendering');
      const posts = await firstValueFrom(service.getPosts());
      // const posts = await service.getPostsPromise();
      console.log('Prerendering posts:', posts);
      // Ensure that the 'id' parameter is a string
      const postIds = posts.map(({ id }: { id: string }) => ({ id }));
      console.log('Prerendering IDs:', postIds);
      return postIds;
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  }
];
