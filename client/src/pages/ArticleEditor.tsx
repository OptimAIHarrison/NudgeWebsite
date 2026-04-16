import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Save, ArrowLeft, X, Image, Youtube, Linkedin, Instagram, Music, Upload } from 'lucide-react';
import RichTextEditor from '@/components/RichTextEditor';

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  featuredImage?: string;
  pdf?: {
    url: string;
    requiresForm: boolean;
  };
  embedLinks: string[];
  embedVideos: string[];
  status: 'draft' | 'published' | 'scheduled';
  publishedAt?: string;
  scheduledFor?: string;
  createdAt: string;
}

interface MediaEmbed {
  type: 'youtube' | 'linkedin' | 'instagram' | 'tiktok' | 'image' | 'video';
  url: string;
  id?: string;
}

export default function ArticleEditor() {
  const [, setLocation] = useLocation();
  const [article, setArticle] = useState<Article>({
    id: Date.now().toString(),
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    tags: [],
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
    embedLinks: [],
    embedVideos: [],
    status: 'draft',
    createdAt: new Date().toISOString(),
  });

  const [newTag, setNewTag] = useState('');
  const [newLink, setNewLink] = useState('');
  const [newVideo, setNewVideo] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mediaEmbed, setMediaEmbed] = useState<MediaEmbed | null>(null);
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [autoGenerateSEO, setAutoGenerateSEO] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      setLocation('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [setLocation]);

  // Auto-generate SEO when title or content changes
  useEffect(() => {
    if (autoGenerateSEO && article.title) {
      // Generate SEO title (max 60 chars)
      let seoTitle = article.title;
      if (seoTitle.length > 60) {
        seoTitle = seoTitle.substring(0, 57) + '...';
      }

      // Generate SEO description from excerpt or content (max 160 chars)
      let seoDescription = article.excerpt || article.content.replace(/<[^>]*>/g, '').substring(0, 160);
      if (seoDescription.length > 160) {
        seoDescription = seoDescription.substring(0, 157) + '...';
      }

      // Generate keywords from title
      const keywords = article.title
        .split(' ')
        .filter(word => word.length > 3)
        .slice(0, 5)
        .join(', ');

      setArticle(prev => ({
        ...prev,
        seoTitle,
        seoDescription,
        seoKeywords: keywords,
      }));
    }
  }, [article.title, article.excerpt, autoGenerateSEO]);

  const handleSave = () => {
    let publishedAt = article.publishedAt;
    if (article.status === 'scheduled' && scheduleDate && scheduleTime) {
      const dateTimeStr = `${scheduleDate}T${scheduleTime}`;
      const localDate = new Date(dateTimeStr);
      publishedAt = localDate.toISOString();
    }

    const articles = JSON.parse(localStorage.getItem('articles') || '[]');
    const existing = articles.findIndex((a: Article) => a.id === article.id);
    
    const articleToSave = {
      ...article,
      publishedAt,
      scheduledFor: article.status === 'scheduled' ? publishedAt : undefined,
    };

    if (existing >= 0) {
      articles[existing] = articleToSave;
    } else {
      articles.push(articleToSave);
    }
    
    localStorage.setItem('articles', JSON.stringify(articles));
    setLocation('/admin');
  };

  const handleAddTag = () => {
    if (newTag && !article.tags.includes(newTag)) {
      setArticle({
        ...article,
        tags: [...article.tags, newTag],
      });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setArticle({
      ...article,
      tags: article.tags.filter(t => t !== tag),
    });
  };

  const handleAddLink = () => {
    if (newLink) {
      setArticle({
        ...article,
        embedLinks: [...article.embedLinks, newLink],
      });
      setNewLink('');
    }
  };

  const handleAddVideo = () => {
    if (newVideo) {
      setArticle({
        ...article,
        embedVideos: [...article.embedVideos, newVideo],
      });
      setNewVideo('');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video' | 'pdf') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result as string;
        
        if (type === 'image') {
          setMediaEmbed({ type: 'image', url });
        } else if (type === 'video') {
          setMediaEmbed({ type: 'video', url });
        } else if (type === 'pdf') {
          setArticle(prev => ({
            ...prev,
            pdf: { url, requiresForm: false }
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const insertMediaEmbed = () => {
    if (!mediaEmbed) return;

    let embedCode = '';
    switch (mediaEmbed.type) {
      case 'youtube':
        embedCode = `[YOUTUBE: ${mediaEmbed.url}]`;
        break;
      case 'linkedin':
        embedCode = `[LINKEDIN: ${mediaEmbed.url}]`;
        break;
      case 'instagram':
        embedCode = `[INSTAGRAM: ${mediaEmbed.url}]`;
        break;
      case 'tiktok':
        embedCode = `[TIKTOK: ${mediaEmbed.url}]`;
        break;
      case 'image':
        embedCode = `<img src="${mediaEmbed.url}" alt="Article image" style="max-width: 100%; height: auto; margin: 1rem 0;" />`;
        break;
      case 'video':
        embedCode = `<video src="${mediaEmbed.url}" controls style="max-width: 100%; height: auto; margin: 1rem 0;"></video>`;
        break;
    }

    setArticle({
      ...article,
      content: article.content + '\n\n' + embedCode,
    });
    setMediaEmbed(null);
  };

  const getMediaIcon = (type: string) => {
    switch (type) {
      case 'youtube':
        return <Youtube className="w-4 h-4" />;
      case 'linkedin':
        return <Linkedin className="w-4 h-4" />;
      case 'instagram':
        return <Instagram className="w-4 h-4" />;
      case 'tiktok':
        return <Music className="w-4 h-4" />;
      case 'image':
        return <Image className="w-4 h-4" />;
      case 'video':
        return <Youtube className="w-4 h-4" />;
      default:
        return null;
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container flex items-center justify-between h-20">
          <button
            onClick={() => setLocation('/admin')}
            className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-2xl font-bold text-foreground">Article Editor</h1>
          <Button
            onClick={handleSave}
            className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-2 rounded-lg font-semibold"
          >
            <Save className="w-5 h-5" />
            Save Article
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Editor */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title & Slug */}
            <div className="glass-card p-6 space-y-4">
              <h2 className="text-xl font-bold text-foreground">Content</h2>
              
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Title</label>
                <input
                  type="text"
                  value={article.title}
                  onChange={(e) => setArticle({ ...article, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                  placeholder="Article title"
                  className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Excerpt</label>
                <textarea
                  value={article.excerpt}
                  onChange={(e) => setArticle({ ...article, excerpt: e.target.value })}
                  placeholder="Brief summary of the article"
                  rows={3}
                  className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Content</label>
                <RichTextEditor
                  value={article.content}
                  onChange={(value) => setArticle({ ...article, content: value })}
                  placeholder="Write your article content here..."
                />
              </div>
            </div>

            {/* Tags */}
            <div className="glass-card p-6 space-y-4">
              <h3 className="text-lg font-bold text-foreground">Tags</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                  placeholder="Add a tag..."
                  className="flex-1 px-4 py-2 bg-secondary/50 border border-border rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
                <Button onClick={handleAddTag} className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <div key={tag} className="flex items-center gap-2 bg-accent/20 px-3 py-1 rounded-full">
                    <span className="text-sm text-accent">{tag}</span>
                    <button onClick={() => handleRemoveTag(tag)} className="text-accent hover:text-accent/70">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Embeds */}
            <div className="glass-card p-6 space-y-6">
              <h3 className="text-lg font-bold text-foreground">Additional Embeds</h3>
              
              {/* Links */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Embed Links</label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="url"
                    value={newLink}
                    onChange={(e) => setNewLink(e.target.value)}
                    placeholder="https://example.com"
                    className="flex-1 px-4 py-2 bg-secondary/50 border border-border rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                  <Button onClick={handleAddLink} className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg">
                    Add Link
                  </Button>
                </div>
                <div className="space-y-2">
                  {article.embedLinks.map((link, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                      <a href={link} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline text-sm truncate">
                        {link}
                      </a>
                      <button onClick={() => setArticle({ ...article, embedLinks: article.embedLinks.filter((_, i) => i !== idx) })}>
                        <X className="w-4 h-4 text-foreground/60" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Videos */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Embed Videos (YouTube, Vimeo, etc.)</label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="url"
                    value={newVideo}
                    onChange={(e) => setNewVideo(e.target.value)}
                    placeholder="https://youtube.com/watch?v=..."
                    className="flex-1 px-4 py-2 bg-secondary/50 border border-border rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                  <Button onClick={handleAddVideo} className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg">
                    Add Video
                  </Button>
                </div>
                <div className="space-y-2">
                  {article.embedVideos.map((video, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                      <span className="text-accent text-sm truncate">{video}</span>
                      <button onClick={() => setArticle({ ...article, embedVideos: article.embedVideos.filter((_, i) => i !== idx) })}>
                        <X className="w-4 h-4 text-foreground/60" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status */}
            <div className="glass-card p-6 space-y-4">
              <h3 className="text-lg font-bold text-foreground">Status</h3>
              <select
                value={article.status}
                onChange={(e) => setArticle({ ...article, status: e.target.value as any })}
                className="w-full px-4 py-2 bg-secondary/50 border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="scheduled">Scheduled</option>
              </select>
            </div>

            {/* Schedule */}
            {article.status === 'scheduled' && (
              <div className="glass-card p-6 space-y-4">
                <h3 className="text-lg font-bold text-foreground">Schedule (AEST)</h3>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Date</label>
                  <input
                    type="date"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    className="w-full px-4 py-2 bg-secondary/50 border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Time</label>
                  <input
                    type="time"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="w-full px-4 py-2 bg-secondary/50 border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                </div>
                {scheduleDate && scheduleTime && (
                  <p className="text-xs text-foreground/60">
                    Will publish: {new Date(`${scheduleDate}T${scheduleTime}`).toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })} AEST
                  </p>
                )}
              </div>
            )}

            {/* SEO */}
            <div className="glass-card p-6 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-foreground">SEO</h3>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoGenerateSEO}
                    onChange={(e) => setAutoGenerateSEO(e.target.checked)}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-xs text-foreground/60">Auto-generate</span>
                </label>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">SEO Title</label>
                <input
                  type="text"
                  value={article.seoTitle}
                  onChange={(e) => setArticle({ ...article, seoTitle: e.target.value })}
                  placeholder="SEO title (60 chars)"
                  maxLength={60}
                  className="w-full px-4 py-2 bg-secondary/50 border border-border rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm"
                />
                <p className="text-xs text-foreground/40 mt-1">{article.seoTitle.length}/60</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Meta Description</label>
                <textarea
                  value={article.seoDescription}
                  onChange={(e) => setArticle({ ...article, seoDescription: e.target.value })}
                  placeholder="Meta description (160 chars)"
                  maxLength={160}
                  rows={3}
                  className="w-full px-4 py-2 bg-secondary/50 border border-border rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm"
                />
                <p className="text-xs text-foreground/40 mt-1">{article.seoDescription.length}/160</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Keywords</label>
                <input
                  type="text"
                  value={article.seoKeywords}
                  onChange={(e) => setArticle({ ...article, seoKeywords: e.target.value })}
                  placeholder="keyword1, keyword2, keyword3"
                  className="w-full px-4 py-2 bg-secondary/50 border border-border rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm"
                />
              </div>
            </div>

            {/* PDF Upload */}
            <div className="glass-card p-6 space-y-4">
              <h3 className="text-lg font-bold text-foreground">PDF Download</h3>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!article.pdf}
                  onChange={(e) => setArticle({ ...article, pdf: e.target.checked ? { url: '', requiresForm: false } : undefined })}
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm text-foreground">Include PDF download</span>
              </label>
              
              {article.pdf && (
                <div className="space-y-3">
                  {article.pdf.url ? (
                    <div className="p-3 bg-secondary/30 rounded-lg flex items-center justify-between">
                      <span className="text-sm text-accent truncate">PDF uploaded</span>
                      <button
                        onClick={() => setArticle({ ...article, pdf: { ...article.pdf!, url: '' } })}
                        className="text-foreground/60 hover:text-foreground"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex items-center gap-2 p-3 border-2 border-dashed border-accent/30 rounded-lg cursor-pointer hover:border-accent/50 transition-colors">
                      <Upload className="w-4 h-4 text-accent" />
                      <span className="text-sm text-foreground/60">Click to upload PDF</span>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleFileUpload(e, 'pdf')}
                        className="hidden"
                      />
                    </label>
                  )}
                  
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={article.pdf.requiresForm}
                      onChange={(e) => setArticle({ ...article, pdf: { ...article.pdf!, requiresForm: e.target.checked } })}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm text-foreground">Require form to download</span>
                  </label>
                </div>
              )}
            </div>

            {/* Save Button */}
            <Button
              onClick={handleSave}
              className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-3 rounded-lg"
            >
              Save Article
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
