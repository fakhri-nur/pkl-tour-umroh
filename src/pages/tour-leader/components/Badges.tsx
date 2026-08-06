import { Tag } from 'antd';
import { PaymentStatus, DocumentStatus } from '@/store/tourLeaderStore';

const PAYMENT_STATUS_COLORS: Record<PaymentStatus, string> = {
  SUCCESS: 'success',
  PENDING: 'warning',
  FAILED: 'error',
};

interface PaymentStatusTagProps {
  status: PaymentStatus;
}

const PaymentStatusTag: React.FC<PaymentStatusTagProps> = ({ status }) => (
  <Tag color={PAYMENT_STATUS_COLORS[status]} className="font-semibold uppercase">
    {status}
  </Tag>
);

const DOCUMENT_STATUS_COLORS: Record<DocumentStatus, string> = {
  VERIFIED: 'success',
  MISSING: 'error',
  'PENDING REVIEW': 'warning',
};

interface DocumentStatusTagProps {
  status: DocumentStatus;
}

const DocumentStatusTag: React.FC<DocumentStatusTagProps> = ({ status }) => (
  <Tag color={DOCUMENT_STATUS_COLORS[status]} className="font-semibold uppercase">
    {status}
  </Tag>
);

export { PaymentStatusTag, DocumentStatusTag };
