import React, { useState } from 'react';
import { mockFiles } from '../services/mockData';
import { FileItem, FileType } from '../types/file';
import { UploadCloud, FileText, Image as ImageIcon, FileCode, HardDrive, Trash2, Download, Search, Eye } from 'lucide-react';
import { Button } from '../components/Common/Button';
import { Modal } from '../components/Common/Modal';

export const Files: React.FC = () => {
  const [files, setFiles] = useState<FileItem[]>(mockFiles);
  const [filter, setFilter] = useState<'all' | 'pdf' | 'image' | 'document' | 'code'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewFile, setPreviewFile] = useState<FileItem | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [downloadSuccessNotice, setDownloadSuccessNotice] = useState<string | null>(null);

  const filteredFiles = files.filter((f) => {
    const matchesSearch =
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (f.description && f.description.toLowerCase().includes(searchQuery.toLowerCase()));
    if (!matchesSearch) return false;
    if (filter === 'all') return true;
    return f.type === filter;
  });

  const handleSimulatedUpload = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setIsUploading(true);

    const uploaded = Array.from(fileList).map((f) => {
      let type: FileType = 'document';
      if (f.name.endsWith('.pdf')) type = 'pdf';
      else if (f.type.startsWith('image/')) type = 'image';
      else if (f.name.endsWith('.ts') || f.name.endsWith('.js') || f.name.endsWith('.py')) type = 'code';

      return {
        id: `file-${Date.now()}-${Math.random()}`,
        name: f.name,
        type,
        size: `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadedAt: 'Just now',
        description: 'Uploaded in current session for NOVA context analysis.',
      };
    });

    setTimeout(() => {
      setFiles((prev) => [...uploaded, ...prev]);
      setIsUploading(false);
    }, 1200);
  };

  const handleDelete = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const getFileIcon = (type: FileType) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-5 h-5 text-rose-500" />;
      case 'image':
        return <ImageIcon className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />;
      case 'code':
        return <FileCode className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'document':
      default:
        return <HardDrive className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            File Intelligence & Storage
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage vector documents, code repositories, datasets and research PDFs for NOVA.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-xl self-start shadow-xs">
          <span>Used: </span>
          <span className="text-cyan-600 dark:text-cyan-400 font-semibold tabular-nums">412 MB</span> / 5.0 GB
        </div>
      </div>

      {downloadSuccessNotice && (
        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs sm:text-sm">
          {downloadSuccessNotice}
        </div>
      )}

      {/* Drag & Drop Upload Dropzone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleSimulatedUpload(e.dataTransfer.files);
        }}
        className="relative group border-2 border-dashed border-slate-300 dark:border-slate-800 hover:border-cyan-500/50 bg-white dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-slate-900/70 rounded-2xl p-8 text-center transition-all cursor-pointer shadow-xs"
      >
        <input
          type="file"
          id="file-upload"
          multiple
          onChange={(e) => handleSimulatedUpload(e.target.files)}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        />

        <div className="flex flex-col items-center justify-center gap-2">
          <div className="p-3 rounded-2xl bg-cyan-50 dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform">
            <UploadCloud className="w-6 h-6" />
          </div>

          <h3 className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200">
            {isUploading ? 'Processing and embedding files...' : 'Drag & drop files here, or browse files'}
          </h3>

          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
            Supports PDF, images (PNG, JPG), CSV documents, and source code files up to 50 MB.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search files..."
            className="w-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 shadow-xs"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900/80 p-1 rounded-xl border border-slate-200 dark:border-slate-800 self-stretch sm:self-auto overflow-x-auto">
          {(['all', 'pdf', 'image', 'document', 'code'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase transition-colors cursor-pointer whitespace-nowrap ${
                filter === tab ? 'bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Files Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFiles.map((file) => (
          <div
            key={file.id}
            className="group flex flex-col justify-between p-4 rounded-xl bg-white dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-xs"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/60 shrink-0">
                  {getFileIcon(file.type)}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setPreviewFile(file)}
                    className="p-1.5 text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                    title="Preview file"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(file.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                    title="Delete file"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-200 group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors truncate">
                {file.name}
              </h4>

              {file.description && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {file.description}
                </p>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 font-mono">
              <span className="tabular-nums">{file.size}</span>
              <span>{file.uploadedAt}</span>
            </div>
          </div>
        ))}
      </div>

      {/* File Preview Modal */}
      <Modal
        isOpen={!!previewFile}
        onClose={() => setPreviewFile(null)}
        title={previewFile?.name || 'File Details'}
        description="NOVA AI document vector metadata"
        maxWidth="md"
      >
        {previewFile && (
          <div className="space-y-4 pt-2 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500">File Type:</span>
                <span className="text-cyan-600 dark:text-cyan-400 font-semibold uppercase">{previewFile.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Size:</span>
                <span className="text-slate-800 dark:text-slate-200">{previewFile.size}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Uploaded:</span>
                <span className="text-slate-800 dark:text-slate-200">{previewFile.uploadedAt}</span>
              </div>
              {previewFile.pages && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Document Pages:</span>
                  <span className="text-slate-800 dark:text-slate-200">{previewFile.pages}</span>
                </div>
              )}
            </div>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {previewFile.description || 'This file is indexed into NOVA memory embeddings for quick contextual recall during conversations.'}
            </p>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              <Button variant="ghost" size="sm" onClick={() => setPreviewFile(null)}>
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                leftIcon={<Download className="w-3.5 h-3.5" />}
                onClick={() => {
                  setDownloadSuccessNotice(`Downloaded ${previewFile.name} successfully.`);
                  setTimeout(() => setDownloadSuccessNotice(null), 3000);
                  setPreviewFile(null);
                }}
              >
                Download
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
