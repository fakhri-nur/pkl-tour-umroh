import { useMemo, useState } from 'react';
import { Card, Button, Avatar } from 'antd';
import { SearchOutlined, CalendarOutlined, FileProtectOutlined } from '@ant-design/icons';
import { useTourLeaderStore, IJemaahDocument, DocumentStatus } from '@/store/tourLeaderStore';
import { DocumentStatusTag } from './components/Badges';

type DocumentFilter = 'ALL' | DocumentStatus;

const FILTERS: { key: DocumentFilter; label: string }[] = [
  { key: 'ALL', label: 'Semua' },
  { key: 'VERIFIED', label: 'VERIFIED' },
  { key: 'PENDING REVIEW', label: 'PENDING REVIEW' },
  { key: 'MISSING', label: 'MISSING' },
];

const DOC_TYPE_ICON: Record<IJemaahDocument['docType'], string> = {
  'Buku Kuning': 'bg-emerald-100 text-emerald-600',
  KK: 'bg-blue-100 text-blue-600',
  Passport: 'bg-amber-100 text-amber-600',
  Visa: 'bg-purple-100 text-purple-600',
};

const initialsFromName = (name: string): string =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');

const TourLeaderDocumentsPage = () => {
  const { documents } = useTourLeaderStore();
  const [filter, setFilter] = useState<DocumentFilter>('ALL');
  const [searchText, setSearchText] = useState('');

  const filteredDocuments = useMemo(() => {
    const keyword = searchText.trim().toLowerCase();
    return documents.filter((doc) => {
      const matchFilter = filter === 'ALL' || doc.status === filter;
      const matchSearch = keyword === '' || doc.jemaahName.toLowerCase().includes(keyword);
      return matchFilter && matchSearch;
    });
  }, [documents, filter, searchText]);

  return (
    <div className="p-8">
      {/* Header Banner Navy */}
      <div className="mb-6 rounded-2xl bg-gradient-to-r from-[#0c2340] to-[#1a3a5c] text-white p-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-1">Document Center</h1>
            <p className="text-gray-300 text-sm">
              Kelola dan pantau status kelengkapan dokumen perjalanan jamaah.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-white/10 border border-white/20 px-5 py-3 flex items-center gap-3">
              <FileProtectOutlined className="text-green-400 text-xl" />
              <div>
                <p className="text-xs text-gray-300 font-medium">DOKUMEN</p>
                <p className="text-2xl font-bold text-white">{documents.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          {FILTERS.map((item) => (
            <Button
              key={item.key}
              className={filter === item.key ? '!bg-[#0c2340] !text-white' : ''}
              onClick={() => setFilter(item.key)}
            >
              {item.label}
            </Button>
          ))}
        </div>
        <div className="flex items-center rounded-lg bg-white border border-gray-200 px-3 py-2 w-full sm:w-72">
          <SearchOutlined className="text-gray-400 mr-2" />
          <input
            className="w-full border-none outline-none bg-transparent text-sm focus:outline-none focus:ring-0"
            placeholder="Cari nama jamaah..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>

      {/* Grid Card Items */}
      {filteredDocuments.length === 0 ? (
        <div className="py-16 text-center">
          <FileProtectOutlined className="text-4xl text-gray-300 mb-3" />
          <p className="text-gray-500 font-medium">Tidak ada dokumen yang cocok dengan filter ini.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredDocuments.map((doc) => (
            <Card key={doc.id} className="hover:shadow-lg transition-shadow" bodyStyle={{ padding: '18px' }}>
              <div className="flex items-center gap-3 mb-4">
                <Avatar size={42} className={`${DOC_TYPE_ICON[doc.docType]} font-bold`}>
                  {initialsFromName(doc.jemaahName)}
                </Avatar>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-800 truncate">{doc.jemaahName}</p>
                  <p className="text-xs text-gray-500">{doc.docType}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <CalendarOutlined /> {doc.uploadedAt}
                </span>
                <DocumentStatusTag status={doc.status} />
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TourLeaderDocumentsPage;
