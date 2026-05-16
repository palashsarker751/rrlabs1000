document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    if (!postId) {
        window.location.href = 'blog.html';
        return;
    }

    // ১. ডাটা ফেচিং
    const fetchPostData = async (id) => {
        const { data: post, error } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('id', id)
            .single();

        if (error || !post) {
            console.error("Post not found:", error);
            document.getElementById('post-title').innerText = "Insight not found.";
            return;
        }

        renderPost(post);
    };

    // ২. ইউআই-তে ডাটা ইনজেক্ট করা
    const renderPost = (post) => {
        document.title = `${post.title} | Revenue Recovery Labs`;
        document.getElementById('post-title').innerText = post.title;
        document.getElementById('post-category').innerText = post.category || "Strategy";
        document.getElementById('post-author').innerText = post.author || "Palash Sarker";
        document.getElementById('post-date').innerText = new Date(post.created_at).toLocaleDateString('en-US', {
            month: 'long', day: 'numeric', year: 'numeric'
        });
        
        // HTML কন্টেন্ট রেন্ডার (Markdown বা HTML সাপোর্ট থাকলে)
        document.getElementById('post-content').innerHTML = post.content || "<p>No content available for this post.</p>";
    };

    // ৩. Reading Progress Indicator
    window.onscroll = () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById("reading-progress").style.width = scrolled + "%";
    };

    fetchPostData(postId);
});
