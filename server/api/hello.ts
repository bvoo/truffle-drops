export default defineEventHandler((event) => {
  return { api: 'hi :)' };
});

// nuxt routes are like
// server
//  - api
//    - hello.post.ts
//    - hello.get.ts

// get drops/user/{userId}

// post drops/user/{userId}/redeem/{id}

// (stats)
// get drops/{id}

// all drops will be global for hackathon
// post drops/create

// delete drops/{id}

// post drops/progress/{userId}
