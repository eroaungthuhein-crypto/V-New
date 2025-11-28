import React from 'react';
import { Article } from '../types';

interface NewsCardProps {
  article: Article;
  onClick: (article: Article) => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ article, onClick }) => {
  return (
    <div 
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-slate-100 flex flex-col h-full"
      onClick={() => onClick(article)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-3 py-1 m-2 rounded-full uppercase tracking-wide">
          {article.category}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center text-slate-500 text-sm mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{article.date}</span>
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-3 leading-snug line-clamp-2">
          {article.title}
        </h3>
        <p className="text-slate-600 text-sm line-clamp-3 mb-4 flex-grow">
          {article.excerpt}
        </p>
        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-sm font-semibold text-red-600">ဆက်လက်ဖတ်ရှုရန် (Read More)</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;