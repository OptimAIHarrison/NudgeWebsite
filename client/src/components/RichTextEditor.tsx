import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { Bold, Italic, List, ListOrdered, Heading2, Heading3, Link as LinkIcon, Image as ImageIcon, Undo2, Redo2, Code } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder = 'Write your article content here...' }: RichTextEditorProps) {
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
        editor.chain().focus().setImage({ src: imageUrl }).run();
      };
      reader.readAsDataURL(file);
    }
  };

  const addLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  };

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-secondary/30">
      {/* Toolbar */}
      <div className="bg-secondary/50 border-b border-border p-3 flex flex-wrap gap-1">
        <button
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
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded hover:bg-accent/20 transition-colors ${
            editor.isActive('heading', { level: 2 }) ? 'bg-accent/30 text-accent' : 'text-foreground/70'
          }`}
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </button>

        <button
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
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-accent/20 transition-colors ${
            editor.isActive('bulletList') ? 'bg-accent/30 text-accent' : 'text-foreground/70'
          }`}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>

        <button
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

        <div className="w-px bg-border"></div>

        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className="p-2 rounded hover:bg-accent/20 transition-colors text-foreground/70 disabled:opacity-50"
          title="Undo"
        >
          <Undo2 className="w-4 h-4" />
        </button>

        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className="p-2 rounded hover:bg-accent/20 transition-colors text-foreground/70 disabled:opacity-50"
          title="Redo"
        >
          <Redo2 className="w-4 h-4" />
        </button>
      </div>

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
