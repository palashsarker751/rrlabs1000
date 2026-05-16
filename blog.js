document.addEventListener('DOMContentLoaded', async () => {
    const blogGrid = document.getElementById('combined-blog-grid');
    const createPostBtn = document.getElementById('create-post-btn');

    // ১. ডাটাবেস থেকে পোস্ট নিয়ে আসা
    const loadBlogPosts = async () => {
        try {
            const { data: posts, error } = await supabase
                .from('blog_posts')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            renderUI(posts);
        } catch (err) {
            console.error("Fetch Error:", err.message);
            blogGrid.innerHTML = `<div class="col-span-full py-20 text-center text-slate-400 font-bold">Failed to load content. Check connection.</div>`;
        }
    };

    // ২. ইউআই রেন্ডার করা (Excellent Style)
    const renderUI = (posts) => {
        if (!posts || posts.length === 0) {
            blogGrid.innerHTML = `<div class="col-span-full py-20 text-center text-slate-400 font-bold">The lab is quiet today. No posts found.</div>`;
            return;
        }

        blogGrid.innerHTML = posts.map(post => {
            const date = new Date(post.created_at).toLocaleDateString('en-US', {
                day: 'numeric', month: 'short', year: 'numeric'
            });

            return `
            <article class="blog-card bg-white rounded-[40px] p-4 flex flex-col border border-slate-100 cursor-pointer shadow-sm" onclick="location.href='post.html?id=${post.id}'">
                <div class="image-container rounded-[32px] aspect-[16/10] bg-slate-50">
                    <img src="https://images.unsplash.com/photo-1551288049-bbbda546697a?auto=format&fit=crop&q=80&w=800" 
                         alt="${post.title}" class="w-full h-full object-cover">
                    <div class="absolute bottom-4 left-4">
                        <span class="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-extrabold text-blue-600 uppercase tracking-widest shadow-sm">
                            ${post.category || 'Revenue Insight'}
                        </span>
                    </div>
                </div>

                <div class="px-4 py-8 flex flex-col flex-grow">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="w-6 h-6 bg-slate-900 rounded-full flex items-center justify-center text-[8px] font-bold text-white">R</div>
                        <span class="text-xs font-bold text-slate-400 uppercase tracking-tight">${post.author || 'Palash Sarker'}</span>
                        <span class="w-1 h-1 bg-slate-200 rounded-full"></span>
                        <span class="text-xs font-bold text-slate-400">${date}</span>
                    </div>
                    
                    <h2 class="text-2xl font-extrabold text-slate-900 leading-[1.2] mb-4 group-hover:text-blue-600 transition">
                        ${post.title}
                    </h2>
                    
                    <p class="text-slate-500 text-sm font-medium leading-relaxed line-clamp-2 mb-8">
                        ${post.excerpt || 'Comprehensive guide on implementing automated recovery systems for modern SaaS businesses.'}
                    </p>

                    <div class="mt-auto flex justify-between items-center">
                        <span class="text-slate-900 text-xs font-extrabold uppercase tracking-widest border-b-2 border-blue-600 pb-1">Read Insight</span>
                        <div class="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-900 group-hover:bg-blue-600 group-hover:text-white transition-all">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </div>
                    </div>
                </div>
            </article>
            `;
        }).join('');
    };

    // ৩. বাটন অ্যাকশন
    createPostBtn.addEventListener('click', () => {
        window.location.href = 'admin-new-post.html'; // আপনার এডমিন পেজ লিঙ্ক
    });

    loadBlogPosts();
});
