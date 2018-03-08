function initializeClasses() {
    class Post {
        constructor(title, content) {
            this.title = title
            this.content = content
        }

        toString() {
            return `Post: ${this.title}\nContent: ${this.content}`
        }
    }

    class SocialMediaPost extends Post {
        constructor(title, content, likes, dislikes) {
            super(title, content)
            this.likes = likes
            this.dislikes = dislikes
            this.comments = []
        }

        addComment(comment) {
            this.comments.push(comment)
        }

        toString() {
            let result = super.toString() + `\nRating: ${this.likes - this.dislikes}`
            if (this.comments.length > 0) {
                result += `\nComments:\n`
                result += ` * ${this.comments.join('\n * ')}`
            }
            return result
        }
    }

    class BlogPost extends Post {
        constructor(title, content, views) {
            super(title, content)
            this.views = views
        }

        view() {
            ++this.views
            return this
        }

        toString() {
            return super.toString() + `\nViews: ${this.views}`
        }
    }

    return {Post, SocialMediaPost, BlogPost}
}

let Post = initializeClasses().Post
let SocialMediaPost = initializeClasses().SocialMediaPost
let BlogPost = initializeClasses().BlogPost
let blog = new BlogPost('blogPost', 'this is blog post', 2)
console.log(blog.view().view().view().view());


let post = new Post("Post", "Content");

console.log(post.toString());

// Post: Post
// Content: Content

let scm = new SocialMediaPost("TestTitle", "TestContent", 25, 30);

scm.addComment("Good post");
scm.addComment("Very good post");
scm.addComment("Wow!");

console.log(scm.toString());

// Post: TestTitle
// Content: TestContent
// Rating: -5
// Comments:
//  * Good post
//  * Very good post
//  * Wow!


