import { Card, Button, Alert, Tag, message } from 'antd';
import {
  UploadOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  PaperClipOutlined,
} from '@ant-design/icons';
import { useJemaahStore, IJemaahDocument } from '@/store/jemaahStore';

const DocumentsPage = () => {
  const { documents, uploadDocument } = useJemaahStore();

  const handleUpload = (doc: IJemaahDocument) => {
    uploadDocument(doc.id);
    message.success(`Berkas "${doc.name}" berhasil diunggah dan akan direview`);
  };

  const renderStatus = (doc: IJemaahDocument) => {
    if (doc.status === 'validated') {
      return <Tag color="success" className="font-semibold">Tervalidasi</Tag>;
    }
    if (doc.status === 'pending') {
      return (
        <Tag color="warning" className="font-semibold">Menunggu Review</Tag>
      );
    }
    return <Tag color="error" className="font-semibold">Belum diunggah</Tag>;
  };

  return (
    <div className="p-8">
      {/* Banner Header */}
      <div className="mb-6 bg-gradient-to-r from-[#0c2340] to-[#1a3a5c] rounded-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Dokumen Anda</h1>
        <p className="text-blue-200">Unggah dan kelola berkas persyaratan keberangkatan Anda</p>
      </div>

      {/* List Berkas */}
      <div className="space-y-4">
        {documents.map((doc, index) => (
          <Card key={doc.id} className="hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <FileTextOutlined className="text-xl" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-800">{doc.name}</h3>
                    {index === 0 && <span className="text-red-500 text-xs">*</span>}
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{doc.description}</p>
                  {doc.fileName ? (
                    <Button
                      type="link"
                      size="small"
                      icon={<PaperClipOutlined />}
                      className="!p-0 text-blue-600"
                    >
                      {doc.fileName}
                    </Button>
                  ) : null}
                  {doc.status === 'missing' && index === 0 && (
                    <Alert
                      type="error"
                      message="Belum diunggah"
                      description="Paspor wajib diunggah untuk memproses visa. Masa aktif minimal 7 bulan."
                      showIcon
                      className="max-w-md mt-2"
                    />
                  )}
                </div>
              </div>

              <div className="flex flex-col items-end gap-3 flex-shrink-0">
                {renderStatus(doc)}
                {doc.status === 'validated' ? (
                  <div className="flex items-center gap-2 text-green-600 text-xs font-medium">
                    <CheckCircleOutlined /> Dokumen sah
                  </div>
                ) : (
                  <Button
                    type="primary"
                    icon={<UploadOutlined />}
                    onClick={() => handleUpload(doc)}
                    className={doc.status === 'missing' ? '!bg-[#0c2340]' : '!bg-blue-500'}
                  >
                    Unggah {index === 0 || doc.name.includes('Kartu Keluarga') ? 'File' : 'File'}
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DocumentsPage;