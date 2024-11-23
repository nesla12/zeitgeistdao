import React, { useState } from 'react';
import { Bold, Italic, List, Link, Image, AtSign, Hash, Smile } from 'lucide-react';
import { motion } from 'framer-motion';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  onMention?: (username: string) => void;
  onHashtag?: (tag: string) => void;
  onImageUpload?: (file: File) => Promise<string>;
}

function RichTextEditor({ value, onChange, onMention, onHashtag, onImageUpload }: RichTextEditorProps) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState<number | null>(null);

  const handleFormat = (command: string) => {
    document.execCommand(command, false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && onImageUpload) {
      try {
        const url = await onImageUpload(e.target.files[0]);
        document.execCommand('insertImage', false, url);
      } catch (error) {
        console.error('Failed to upload image:', error);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === '@' && onMention) {
      setCursorPosition((e.target as HTMLDivElement).selectionStart || 0);
      // Trigger mention suggestions
    } else if (e.key === '#' && onHashtag) {
      setCursorPosition((e.target as HTMLDivElement).selectionStart || 0);
      // Trigger hashtag suggestions
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center space-x-2 p-2 border-b bg-gray-50">
        <button
          onClick={() => handleFormat('bold')}
          className="p-2 hover:bg-gray-200 rounded"
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleFormat('italic')}
          className="p-2 hover:bg-gray-200 rounded"
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleFormat('insertUnorderedList')}
          className="p-2 hover:bg-gray-200 rounded"
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>
        <div className="w-px h-6 bg-gray-300" />
        <button
          onClick={() => {/* Handle link insertion */}}
          className="p-2 hover:bg-gray-200 rounded"
          title="Insert Link"
        >
          <Link className="w-4 h-4" />
        </button>
        <label className="p-2 hover:bg-gray-200 rounded cursor-pointer" title="Upload Image">
          <Image className="w-4 h-4" />
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </label>
        <div className="w-px h-6 bg-gray-300" />
        <button
          onClick={() => {/* Handle mentions */}}
          className="p-2 hover:bg-gray-200 rounded"
          title="Mention Someone"
        >
          <AtSign className="w-4 h-4" />
        </button>
        <button
          onClick={() => {/* Handle hashtags */}}
          className="p-2 hover:bg-gray-200 rounded"
          title="Add Hashtag"
        >
          <Hash className="w-4 h-4" />
        </button>
        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="p-2 hover:bg-gray-200 rounded"
          title="Add Emoji"
        >
          <Smile className="w-4 h-4" />
        </button>
      </div>

      {/* Editor */}
      <div
        contentEditable
        className="p-4 min-h-[150px] focus:outline-none"
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
        onKeyDown={handleKeyDown}
        dangerouslySetInnerHTML={{ __html: value }}
      />

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-full right-0 bg-white border rounded-lg shadow-lg p-2"
        >
          {/* Implement emoji picker */}
        </motion.div>
      )}
    </div>
  );
}

export default RichTextEditor;