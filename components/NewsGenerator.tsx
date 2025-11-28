import React, { useState } from 'react';
import { generateNewsArticle } from '../services/geminiService';
import { Article } from '../types';

interface NewsGeneratorProps {
  onArticleCreated: (article: Article) => void;
}

const NewsGenerator: React.FC<NewsGeneratorProps> = ({ onArticleCreated }) => {
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const generated = await generateNewsArticle(topic);
      
      const newArticle: Article = {
        id: Date.now().toString(),
        title: generated.title,
        excerpt: generated.excerpt,
        content: generated.content,
        category: generated.category,
        date: new Date().toLocaleDateString('my-MM'), // Burmese format conceptually
        author: 'AI Reporter',
        imageUrl: `https://picsum.photos/seed/${Date.now()}/800/600`
      };

      onArticleCreated(newArticle);
      setTopic(''); // Reset input
    } catch (err) {
      setError("သတင်းထုတ်ယူရာတွင် အမှားအယွင်းရှိပါသည်။ ကျေးဇူးပြု၍ ပြန်လည်ကြိုးစားပါ။ (Error generating news)");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-red-100">
      <div className="text-center mb-8">
        <div className="inline-block p-3 rounded-full bg-red-50 text-red-600 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-800">AI သတင်းထောက် (AI Reporter)</h2>
        <p className="text-slate-500 mt-2">ခေါင်းစဉ်တစ်ခုပေး၍ ဗီယက်နမ်သတင်းဆောင်းပါးကို ဖန်တီးပါ။</p>
        <p className="text-slate-400 text-sm">(Enter a topic to generate a Vietnam news article in Burmese)</p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-slate-700 mb-1">
            သတင်းခေါင်းစဉ် (Topic/Headline)
          </label>
          <input
            type="text"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="ဥပမာ - ဟနွိုင်းမြို့၏ ကော်ဖီယဉ်ကျေးမှု (e.g., Hanoi Coffee Culture)"
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition shadow-sm"
          />
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-700 rounded-lg flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        <button
          onClick={handleGenerate}
          disabled={isLoading || !topic.trim()}
          className={`w-full py-4 px-6 rounded-lg text-white font-bold text-lg shadow-md transition-all flex items-center justify-center
            ${isLoading || !topic.trim() ? 'bg-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 hover:shadow-lg transform hover:-translate-y-0.5'}`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              သတင်းရေးသားနေသည်... (Generating...)
            </>
          ) : (
            'သတင်းဖန်တီးမည် (Generate News)'
          )}
        </button>
      </div>
      
      <div className="mt-6 text-center text-xs text-slate-400">
        Powered by Google Gemini 2.5 Flash
      </div>
    </div>
  );
};

export default NewsGenerator;