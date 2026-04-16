import { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { Bold, Italic, List, ListOrdered, Heading2, Heading3, Link as LinkIcon, Image as ImageIcon, Undo2, Redo2, Code, Youtube, Linkedin, Instagram, Music } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder = 'Write your article content here...' }: RichTextEditorProps) {
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [embedType, setEmbedType] = useState<'youtube' | 'linkedin' | 'instagram' | 'tiktok'>('youtube');
  const [embedUrl, setEmbedUrl] = useState('');
  const [imageWidth, setImageWidth] = useState(100);
  const [showImageResize, setShowImageResize] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      Image.configure({
        allowBase64: true,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setShowImageResize(true);
        // Store the image URL temporarily
        (window as any).__pendingImageUrl = imageUrl;
      };
      reader.readAsDataURL(file);
    }
  };

  const insertImage = () => {
    const imageUrl = (window as any).__pendingImageUrl;
    if (imageUrl) {
      const width = Math.round((imageWidth / 100) * 600); // Max width 600px
      editor
        .chain()
        .focus()
        .setImage({
          src: imageUrl,
          alt: 'Article image',
          title: 'Article image',
        })
        .run();
      
      // Apply width styling
      const lastImage = editor.view.dom.querySelector('img:last-of-type') as HTMLImageElement;
      if (lastImage) {
        lastImage.style.width = `${width}px`;
        lastImage.style.height = 'auto';
      }
      
      setShowImageResize(false);
      setImageWidth(100);
      delete (window as any).__pendingImageUrl;
    }
  };

  const addLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  };

  const insertEmbed = () => {
    if (!embedUrl.trim()) {
      alert('Please enter a URL');
      return;
    }

    let embedHtml = '';
    switch (embedType) {
      case 'youtube':
        embedHtml = `<iframe width="100%" height="400" src="https://www.youtube.com/embed/${extractYoutubeId(embedUrl)}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="margin: 1rem 0; border-radius: 8px;"></iframe>`;
        break;
      case 'linkedin':
        embedHtml = `<div style="margin: 1rem 0;"><a href="${embedUrl}" target="_blank" rel="noopener noreferrer" style="color: #0A66C2; text-decoration: none; font-weight: 500;">View on LinkedIn</a></div>`;
        break;
      case 'instagram':
        embedHtml = `<div style="margin: 1rem 0;"><a href="${embedUrl}" target="_blank" rel="noopener noreferrer" style="color: #E1306C; text-decoration: none; font-weight: 500;">View on Instagram</a></div>`;
        break;
      case 'tiktok':
        embedHtml = `<div style="margin: 1rem 0;"><a href="${embedUrl}" target="_blank" rel="noopener noreferrer" style="color: #000; text-decoration: none; font-weight: 500;">View on TikTok</a></div>`;
        break;
    }

    editor.chain().focus().insertContent(embedHtml).run();
    setEmbedUrl('');
    setShowEmbedModal(false);
  };

  const extractYoutubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : url;
  };

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-secondary/30">
      {/* Toolbar */}
      <div className="bg-secondary/50 border-b border-border p-3 flex flex-wrap gap-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-accent/20 transition-colors ${
            editor.isActive('bold') ? 'bg-accent/30 text-accent' : 'text-foreground/70'
          }`}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-accent/20 transition-colors ${
            editor.isActive('italic') ? 'bg-accent/30 text-accent' : 'text-foreground/70'
          }`}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={`p-2 rounded hover:bg-accent/20 transition-colors ${
            editor.isActive('code') ? 'bg-accent/30 text-accent' : 'text-foreground/70'
          }`}
          title="Code"
        >
          <Code className="w-4 h-4" />
        </button>

        <div className="w-px bg-border"></div>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded hover:bg-accent/20 transition-colors ${
            editor.isActive('heading', { level: 2 }) ? 'bg-accent/30 text-accent' : 'text-foreground/70'
          }`}
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded hover:bg-accent/20 transition-colors ${
            editor.isActive('heading', { level: 3 }) ? 'bg-accent/30 text-accent' : 'text-foreground/70'
          }`}
          title="Heading 3"
        >
          <Heading3 className="w-4 h-4" />
        </button>

        <div className="w-px bg-border"></div>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-accent/20 transition-colors ${
            editor.isActive('bulletList') ? 'bg-accent/30 text-accent' : 'text-foreground/70'
          }`}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-accent/20 transition-colors ${
            editor.isActive('orderedList') ? 'bg-accent/30 text-accent' : 'text-foreground/70'
          }`}
          title="Ordered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        <div className="w-px bg-border"></div>

        <button
          type="button"
          onClick={addLink}
          className={`p-2 rounded hover:bg-accent/20 transition-colors ${
            editor.isActive('link') ? 'bg-accent/30 text-accent' : 'text-foreground/70'
          }`}
          title="Add Link"
        >
          <LinkIcon className="w-4 h-4" />
        </button>

        <label className="p-2 rounded hover:bg-accent/20 transition-colors cursor-pointer text-foreground/70 hover:text-foreground">
          <ImageIcon className="w-4 h-4" />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>

        <button
          type="button"
          onClick={() => setShowEmbedModal(true)}
          className="p-2 rounded hover:bg-accent/20 transition-colors text-foreground/70 hover:text-foreground"
          title="Embed Media"
        >
          <Youtube className="w-4 h-4" />
        </button>

        <div className="w-px bg-border"></div>

        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className="p-2 rounded hover:bg-accent/20 transition-colors text-foreground/70 disabled:opacity-50"
          title="Undo"
        >
          <Undo2 className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className="p-2 rounded hover:bg-accent/20 transition-colors text-foreground/70 disabled:opacity-50"
          title="Redo"
        >
          <Redo2 className="w-4 h-4" />
        </button>
      </div>

      {/* Image Resize Modal */}
      {showImageResize && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background border border-border rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-foreground mb-4">Resize Image</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Width: {imageWidth}%</label>
                <input
                  type="range"
                  min="25"
                  max="100"
                  value={imageWidth}
                  onChange={(e) => setImageWidth(Number(e.target.value))}
                  className="w-full h-2 bg-secondary/50 rounded-lg appearance-none cursor-pointer accent-accent"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowImageResize(false);
                    delete (window as any).__pendingImageUrl;
                  }}
                  className="flex-1 px-4 py-2 bg-secondary/50 border border-border rounded-lg text-foreground hover:bg-secondary transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={insertImage}
                  className="flex-1 px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-lg font-semibold transition-colors"
                >
                  Insert
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Embed Modal */}
      {showEmbedModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background border border-border rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-foreground mb-4">Embed Media</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Type</label>
                <select
                  value={embedType}
                  onChange={(e) => setEmbedType(e.target.value as any)}
                  className="w-full px-4 py-2 bg-secondary/50 border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                >
                  <option value="youtube">YouTube</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="instagram">Instagram</option>
                  <option value="tiktok">TikTok</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">URL</label>
                <input
                  type="url"
                  value={embedUrl}
                  onChange={(e) => setEmbedUrl(e.target.value)}
                  placeholder={
                    embedType === 'youtube'
                      ? 'https://youtube.com/watch?v=...'
                      : embedType === 'linkedin'
                      ? 'https://linkedin.com/...'
                      : embedType === 'instagram'
                      ? 'https://instagram.com/p/...'
                      : 'https://tiktok.com/@...'
                  }
                  className="w-full px-4 py-2 bg-secondary/50 border border-border rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowEmbedModal(false);
                    setEmbedUrl('');
                  }}
                  className="flex-1 px-4 py-2 bg-secondary/50 border border-border rounded-lg text-foreground hover:bg-secondary transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={insertEmbed}
                  className="flex-1 px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-lg font-semibold transition-colors"
                >
                  Insert
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Editor */}
      <div className="p-6 prose prose-invert max-w-none">
        <EditorContent
          editor={editor}
          className="min-h-96 text-foreground focus:outline-none"
        />
      </div>

      {/* Character count */}
      <div className="bg-secondary/30 border-t border-border px-6 py-2 text-xs text-foreground/60">
        {editor.storage.characterCount?.characters() || 0} characters
      </div>
    </div>
  );
}
