// app.js

function loadNavbar() {
  const currentPath = window.location.pathname;
  const isAuth = true; // এটাকে পরে Supabase Auth দিয়ে রিপ্লেস করবেন

  const navbarHTML = `
    <nav class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <img src="https://ibb.co.com/7tM7RmPw" alt="RRLabs Logo" class="h-8 w-auto">
          <span class="font-black text-xl tracking-tight text-slate-900">RRLabs</span>
        </div>
        
        <div class="hidden md:flex items-center gap-8 text-sm font-bold text-slate-600">
          ${isAuth ? `
            <a href="dashboard.html" class="${currentPath.includes('dashboard') ? 'text-blue-600' : 'hover:text-blue-600'}">Dashboard</a>
            <a href="recovery.html" class="${currentPath.includes('recovery') ? 'text-blue-600' : 'hover:text-blue-600'}">Manager</a>
            <a href="settings.html" class="hover:text-blue-600">Settings</a>
            <button class="bg-slate-100 text-slate-900 px-4 py-2 rounded-lg" onclick="logout()">Logout</button>
          ` : `
            <a href="index.html#features" class="hover:text-blue-600">Features</a>
            <a href="index.html#pricing" class="hover:text-blue-600">Pricing</a>
            <a href="auth.html" class="bg-blue-600 text-white px-6 py-2.5 rounded-lg shadow-md">Get Started</a>
          `}
        </div>
      </div>
    </nav>
  `;
  
  const placeholder = document.getElementById('navbar-placeholder');
  if (placeholder) placeholder.innerHTML = navbarHTML;
}

document.addEventListener('DOMContentLoaded', loadNavbar);
