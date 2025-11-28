import React, { useState } from 'react';
import Header from './components/Header';
import NewsCard from './components/NewsCard';
import NewsGenerator from './components/NewsGenerator';
import { Article } from './types';

// Mock Data for Initial State
const INITIAL_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'ဗီယက်နမ် ခရီးသွားလုပ်ငန်း ၂၀၂၄ ခုနှစ်တွင် အရှိန်အဟုန်ဖြင့် တိုးတက်လာ',
    excerpt: 'ဗီယက်နမ်နိုင်ငံ၏ ခရီးသွားလုပ်ငန်းသည် ၂၀၂၄ ခုနှစ် ပထမသုံးလပတ်တွင် နိုင်ငံတကာခရီးသွား ၄.၆ သန်းကျော် ဝင်ရောက်ခဲ့ပြီး ကိုဗစ်မတိုင်မီကာလ အခြေအနေသို့ ပြန်လည်ရောက်ရှိနေပြီဖြစ်သည်။',
    content: 'ဗီယက်နမ်နိုင်ငံ၏ ခရီးသွားလုပ်ငန်းသည် ၂၀၂၄ ခုနှစ် ပထမသုံးလပတ်တွင် သိသာထင်ရှားသော တိုးတက်မှုများကို ပြသလျက်ရှိသည်။ နိုင်ငံတကာခရီးသွား ၄.၆ သန်းကျော် ဝင်ရောက်ခဲ့ပြီး ၎င်းသည် ၂၀၁၉ ခုနှစ် အလားတူကာလနှင့် နှိုင်းယှဉ်ပါက ၃.၂% မြင့်တက်လာခြင်းဖြစ်သည်။ အထူးသဖြင့် အာရှဒေသတွင်း နိုင်ငံများမှ ခရီးသွားများ ဝင်ရောက်မှု များပြားလျက်ရှိသည်။ ဟနွိုင်း၊ ဟိုချီမင်းစီးတီးနှင့် ဒါနန်းကဲ့သို့သော မြို့ကြီးများတွင် ဟိုတယ်ကြိုတင်မှာယူမှုများ ပြည့်နှက်နေပြီး ဒေသခံစီးပွားရေးလုပ်ငန်းများအတွက် အကျိုးအမြတ်များစွာ ဖြစ်ထွန်းစေသည်။ ဗီယက်နမ်အစိုးရသည် ဗီဇာကင်းလွတ်ခွင့်မူဝါဒများကို ဖြေလျှော့ပေးခဲ့ခြင်းကလည်း ခရီးသွားလုပ်ငန်း ဖွံ့ဖြိုးတိုးတက်မှုကို အဓိက တွန်းအားဖြစ်စေသည်။',
    imageUrl: 'https://picsum.photos/id/16/800/600',
    category: 'Travel',
    date: '24/05/2024',
    author: 'မောင်လှ (Maung Hla)'
  },
  {
    id: '2',
    title: 'ဗီယက်နမ် ကော်ဖီဈေးကွက် ကမ္ဘာ့အဆင့်တွင် နေရာယူလာ',
    excerpt: 'ဗီယက်နမ် ရိုဘတ်စတာကော်ဖီသည် ကမ္ဘာ့ဈေးကွက်တွင် ဝယ်လိုအားမြင့်တက်လျက်ရှိပြီး ဈေးနှုန်းများလည်း စံချိန်တင် မြင့်တက်လျက်ရှိသည်။',
    content: 'ဗီယက်နမ်နိုင်ငံသည် ကမ္ဘာ့ဒုတိယအကြီးဆုံး ကော်ဖီတင်ပို့သည့် နိုင်ငံဖြစ်ပြီး အထူးသဖြင့် ရိုဘတ်စတာ (Robusta) ကော်ဖီမျိုးတွင် ဦးဆောင်လျက်ရှိသည်။ ယခုနှစ်တွင် ရာသီဥတုဖောက်ပြန်မှုကြောင့် ကမ္ဘာ့ကော်ဖီထွက်ရှိမှု လျော့ကျနိုင်သော်လည်း ဗီယက်နမ်ကော်ဖီစိုက်ပျိုးသူများမှာမူ ဈေးကောင်းရရှိနေကြသည်။ ဥရောပသမဂ္ဂ၏ သစ်တောပြုန်းတီးမှုကင်းစင်ရေး စည်းမျဉ်းများ (EUDR) နှင့် ကိုက်ညီစေရန် ဗီယက်နမ်အစိုးရက တောင်သူများကို ပညာပေးလုပ်ငန်းများ လုပ်ဆောင်လျက်ရှိသည်။',
    imageUrl: 'https://picsum.photos/id/1060/800/600',
    category: 'Economy',
    date: '23/05/2024',
    author: 'ခင်စန်း (Khin San)'
  },
  {
    id: '3',
    title: 'ဟိုချီမင်းစီးတီးတွင် နည်းပညာစွန့်ဦးတီထွင်မှုများ ထွန်းကားလာ',
    excerpt: 'ဟိုချီမင်းစီးတီးသည် အရှေ့တောင်အာရှ၏ ဆီလီကွန်တောင်ကြားအသစ် ဖြစ်လာရန် ရည်မှန်းထားပြီး နည်းပညာ start-up ပေါင်းများစွာ ပေါ်ထွန်းလျက်ရှိသည်။',
    content: 'ဟိုချီမင်းစီးတီးသည် နည်းပညာနှင့် ဆန်းသစ်တီထွင်မှု ဗဟိုချက်မအဖြစ် လျင်မြန်စွာ ပြောင်းလဲလျက်ရှိသည်။ FinTech၊ E-commerce နှင့် AI နည်းပညာနယ်ပယ်များတွင် ရင်းနှီးမြှုပ်နှံမှုများ ဝင်ရောက်လာပြီး နိုင်ငံတကာ ကုမ္ပဏီကြီးများသည်လည်း ၎င်းတို့၏ ရုံးခွဲများကို ဖွင့်လှစ်လျက်ရှိသည်။ လူငယ် လုပ်သားအင်အားစု၏ နည်းပညာကျွမ်းကျင်မှု မြင့်မားခြင်းက ဗီယက်နမ်နိုင်ငံ၏ ဒစ်ဂျစ်တယ်စီးပွားရေးကို အားဖြည့်ပေးလျက်ရှိသည်။',
    imageUrl: 'https://picsum.photos/id/180/800/600',
    category: 'Technology',
    date: '22/05/2024',
    author: 'ကျော်စွာ (Kyaw Swar)'
  },
  {
    id: '4',
    title: 'ရိုးရာအစားအစာ "ဖိုး" (Pho) ၏ ဆွဲဆောင်မှု',
    excerpt: 'ဗီယက်နမ်ရိုးရာခေါက်ဆွဲပြုတ် ဖိုး (Pho) သည် ကမ္ဘာလှည့်ခရီးသွားများကြားတွင် ရေပန်းအစားဆုံး အစားအစာတစ်ခုအဖြစ် ဆက်လက်ရပ်တည်နေသည်။',
    content: 'ဗီယက်နမ်နိုင်ငံသို့ ရောက်ရှိပါက မဖြစ်မနေ စားသုံးသင့်သည့် အစားအစာမှာ ဖိုး (Pho) ဖြစ်သည်။ အမဲသား သို့မဟုတ် ကြက်သားပြုတ်ရည် ကြည်လင်မွှေးကြိုင်သော အရသာသည် နိုင်ငံခြားသားများ၏ ခံတွင်းကို စွဲဆောင်နိုင်ခဲ့သည်။ ယခုအခါ ဖိုးဆိုင်များကို ကမ္ဘာအနှံ့အပြားတွင် တွေ့ရှိနိုင်သော်လည်း ဗီယက်နမ်လမ်းဘေးဆိုင်များတွင် စားသုံးရသည့် အရသာမှာ အထူးခြားဆုံးဖြစ်သည်။',
    imageUrl: 'https://picsum.photos/id/493/800/600',
    category: 'Culture',
    date: '21/05/2024',
    author: 'နီလာ (Nilar)'
  }
];

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'create'>('home');
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const handleNavigate = (page: 'home' | 'create') => {
    setCurrentPage(page);
    setSelectedArticle(null);
    window.scrollTo(0, 0);
  };

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    window.scrollTo(0, 0);
  };

  const handleArticleCreated = (newArticle: Article) => {
    setArticles(prev => [newArticle, ...prev]);
    setCurrentPage('home');
    setSelectedArticle(newArticle); // Directly view the created article
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header onNavigate={handleNavigate} currentPage={currentPage} />

      <main className="flex-grow container mx-auto px-4 py-8">
        {selectedArticle ? (
          // Article Detail View
          <article className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden animate-fade-in">
             <div className="relative h-64 md:h-96 w-full">
                <img 
                  src={selectedArticle.imageUrl} 
                  alt={selectedArticle.title} 
                  className="w-full h-full object-cover"
                />
                 <div className="absolute top-0 left-0 p-6 bg-gradient-to-b from-black/60 to-transparent w-full">
                    <button 
                        onClick={() => setSelectedArticle(null)}
                        className="text-white flex items-center hover:text-yellow-400 transition"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        ပြန်ထွက်ရန် (Back)
                    </button>
                 </div>
             </div>
             <div className="p-8 md:p-12">
                <div className="flex items-center justify-between mb-6">
                    <span className="bg-red-100 text-red-800 text-sm font-bold px-3 py-1 rounded-full uppercase">
                        {selectedArticle.category}
                    </span>
                    <div className="text-slate-500 text-sm">
                        {selectedArticle.date} • By <span className="text-slate-800 font-semibold">{selectedArticle.author}</span>
                    </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                    {selectedArticle.title}
                </h1>
                <p className="text-lg text-slate-700 italic border-l-4 border-yellow-400 pl-4 mb-8">
                    {selectedArticle.excerpt}
                </p>
                <div className="prose prose-lg text-slate-800 max-w-none leading-loose">
                    {selectedArticle.content.split('\n').map((paragraph, index) => (
                        <p key={index} className="mb-4">{paragraph}</p>
                    ))}
                </div>
                
                {/* Simulated Engagement */}
                <div className="mt-12 pt-8 border-t border-slate-100 flex items-center space-x-6">
                    <button className="flex items-center text-slate-500 hover:text-red-600 transition">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        ကြိုက်နှစ်သက်သည် (Like)
                    </button>
                    <button className="flex items-center text-slate-500 hover:text-blue-600 transition">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                        မျှဝေရန် (Share)
                    </button>
                </div>
             </div>
          </article>
        ) : currentPage === 'create' ? (
          // Create Article View
          <NewsGenerator onArticleCreated={handleArticleCreated} />
        ) : (
          // Home View
          <div className="space-y-12">
            {/* Hero Section */}
            <section className="bg-red-900 rounded-2xl overflow-hidden shadow-2xl text-white relative">
              <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `url('${articles[0].imageUrl}')` }}></div>
              <div className="relative z-10 p-8 md:p-16 flex flex-col justify-end h-[400px] md:h-[500px] bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                 <span className="bg-yellow-400 text-red-900 text-xs font-bold px-3 py-1 rounded uppercase w-fit mb-4">
                    {articles[0].category}
                 </span>
                 <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                    {articles[0].title}
                 </h2>
                 <p className="text-gray-200 text-lg mb-6 line-clamp-2 max-w-2xl">
                    {articles[0].excerpt}
                 </p>
                 <button 
                    onClick={() => handleArticleClick(articles[0])}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition w-fit flex items-center"
                 >
                    ဆက်လက်ဖတ်ရှုရန် (Read Now)
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                 </button>
              </div>
            </section>

            {/* Latest News Grid */}
            <section>
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-800 border-l-4 border-red-600 pl-4">
                        နောက်ဆုံးရသတင်းများ (Latest News)
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.slice(1).map(article => (
                        <NewsCard 
                            key={article.id} 
                            article={article} 
                            onClick={handleArticleClick}
                        />
                    ))}
                </div>
            </section>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
         <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
                <h3 className="text-white text-lg font-bold mb-4">ဗီယက်နမ် သတင်း</h3>
                <p className="text-sm leading-relaxed mb-4">
                    ဗီယက်နမ်နိုင်ငံနှင့် ပတ်သက်သော စီးပွားရေး၊ လူမှုရေး၊ ခရီးသွားလုပ်ငန်းနှင့် အခြားစိတ်ဝင်စားဖွယ်ရာ သတင်းများကို မြန်မာဘာသာဖြင့် တင်ဆက်ပေးနေသော ဝက်ဘ်ဆိုက်ဖြစ်ပါသည်။
                </p>
            </div>
            <div>
                <h3 className="text-white text-lg font-bold mb-4">အမြန်လင့်ခ်များ (Quick Links)</h3>
                <ul className="space-y-2 text-sm">
                    <li><button onClick={() => handleNavigate('home')} className="hover:text-yellow-400 transition">ပင်မစာမျက်နှာ</button></li>
                    <li><button className="hover:text-yellow-400 transition">ကျွန်ုပ်တို့အကြောင်း</button></li>
                    <li><button className="hover:text-yellow-400 transition">ဆက်သွယ်ရန်</button></li>
                </ul>
            </div>
            <div>
                 <h3 className="text-white text-lg font-bold mb-4">ဆက်သွယ်ရန် (Contact)</h3>
                 <p className="text-sm mb-2">Email: contact@vietnamnews-mm.com</p>
                 <p className="text-sm">Phone: +95 9 123 456 789</p>
            </div>
         </div>
         <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-xs">
            &copy; 2024 Vietnam News Daily. All rights reserved.
         </div>
      </footer>
    </div>
  );
};

export default App;