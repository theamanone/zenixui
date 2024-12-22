'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Copy, Check, Loader2 } from 'lucide-react';
import { fetchDoc } from '@/lib/docs-api';

interface DocContent {
  title: string;
  description: string;
  code?: string;
  usage?: string;
  props?: Array<{
    name: string;
    type: string;
    description: string;
    required?: boolean;
    default?: string;
  }>;
}

export function ComponentDocs({ componentId }: { componentId: string }) {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [doc, setDoc] = useState<DocContent | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDoc = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchDoc(componentId);
        setDoc(data);
      } catch (err) {
        setError('Failed to load documentation');
      } finally {
        setLoading(false);
      }
    };

    loadDoc();
  }, [componentId]);

  const copyCode = () => {
    if (doc?.code) {
      navigator.clipboard.writeText(doc.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="w-8 h-8 text-blue-500" />
        </motion.div>
      </div>
    );
  }

  if (error || !doc) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error || 'Documentation not found'}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold mb-4">{doc.title}</h1>
        <p className="text-gray-400">{doc.description}</p>
      </div>

      {doc.code && (
        <div className="relative">
          <div className="absolute right-4 top-4">
            <button
              onClick={copyCode}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
              <Code className="w-4 h-4" />
              <span>Example</span>
            </div>
            <pre className="text-sm overflow-x-auto">
              <code className="language-tsx">{doc.code}</code>
            </pre>
          </div>
        </div>
      )}

      {doc.props && (
        <div className="rounded-lg border border-white/10 overflow-hidden">
          <div className="p-4 bg-white/5">
            <h2 className="text-xl font-semibold mb-4">Props</h2>
            <div className="space-y-4">
              {doc.props.map((prop) => (
                <div key={prop.name} className="border-b border-white/10 last:border-0 pb-4 last:pb-0">
                  <div className="flex items-start justify-between mb-2">
                    <span className="font-medium text-blue-400">{prop.name}</span>
                    <span className="text-sm text-gray-400">{prop.type}</span>
                  </div>
                  <p className="text-sm text-gray-400">{prop.description}</p>
                  {prop.default && (
                    <p className="text-sm text-gray-500 mt-1">
                      Default: {prop.default}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
