import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import BLOG_POSTS from './blogData';
import './App.css';

export default function BlogPost() {
  const { slug } = useParams();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center font-sans">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 font-display">Post Not Found</h1>
          <p className="text-slate-400 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-500 text-white rounded-lg hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300 font-medium"
          >
            <ArrowLeft size={18} /> Back Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      {/* Hero banner */}
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient}`} />
        <img
          src={post.image}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

        {/* Back button */}
        <Link
          to="/"
          className="absolute top-6 left-6 z-10 inline-flex items-center gap-2 px-4 py-2 bg-black/30 backdrop-blur-sm text-white/80 hover:text-white rounded-lg transition-colors text-sm"
        >
          <ArrowLeft size={16} /> Back
        </Link>
      </div>

      {/* Content */}
      <article className="relative -mt-32 max-w-3xl mx-auto px-6 pb-24">
        <div className="bg-slate-900/80 backdrop-blur-xl border border-white/5 rounded-2xl p-8 sm:p-12 shadow-2xl">
          {/* Tag */}
          <div className={`inline-block px-3 py-1 text-xs font-semibold text-white rounded-full bg-gradient-to-r ${post.tagColor} mb-6`}>
            {post.tag}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 font-display leading-tight">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-5 text-sm text-slate-500 mb-10 pb-8 border-b border-white/5">
            <span className="flex items-center gap-2"><Calendar size={14} />{post.date}</span>
            <span className="flex items-center gap-2"><Clock size={14} />{post.readTime}</span>
          </div>

          {/* Body */}
          <div className="space-y-6">
            {post.content.split('\n\n').map((para, i) => (
              <p key={i} className="text-slate-300 text-base sm:text-lg leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* Footer nav */}
        <div className="mt-12 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors font-medium"
          >
            <ArrowLeft size={16} /> Back to portfolio
          </Link>
        </div>
      </article>
    </div>
  );
}
