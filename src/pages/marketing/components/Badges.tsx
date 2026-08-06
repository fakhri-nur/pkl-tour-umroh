import { Badge, Tag } from 'antd';
import { LeadSource, LeadStatus, CampaignStatus, VerificationUrgency } from '@/store/marketingStore';

const SOURCE_COLORS: Record<LeadSource, string> = {
  'Facebook Ads': 'blue',
  'Google Search': 'red',
  Instagram: 'magenta',
  Referral: 'green',
  WhatsApp: 'green',
  Website: 'cyan',
};

interface LeadSourceBadgeProps {
  source: LeadSource;
}

const LeadSourceBadge: React.FC<LeadSourceBadgeProps> = ({ source }) => (
  <Badge color={SOURCE_COLORS[source]} text={<span className="text-xs font-medium">{source}</span>} />
);

export default LeadSourceBadge;

const LEAD_STATUS_COLORS: Record<LeadStatus, string> = {
  New: 'blue',
  Contacted: 'orange',
  Converted: 'success',
  Lost: 'error',
};

interface LeadStatusTagProps {
  status: LeadStatus;
}

const LeadStatusTag: React.FC<LeadStatusTagProps> = ({ status }) => (
  <Tag color={LEAD_STATUS_COLORS[status]} className="font-semibold">
    {status}
  </Tag>
);

export { LeadStatusTag };

interface CampaignStatusTagProps {
  status: CampaignStatus;
}

const CampaignStatusTag: React.FC<CampaignStatusTagProps> = ({ status }) => (
  <Tag color={status === 'Active' ? 'success' : 'gold'} className="font-semibold">
    {status === 'Active' ? 'ACTIVE' : 'PAUSED'}
  </Tag>
);

export { CampaignStatusTag };

const URGENCY_COLORS: Record<VerificationUrgency, string> = {
  High: 'error',
  Medium: 'warning',
  Low: 'default',
};

interface UrgencyTagProps {
  urgency: VerificationUrgency;
}

const UrgencyTag: React.FC<UrgencyTagProps> = ({ urgency }) => (
  <Tag color={URGENCY_COLORS[urgency]} className="font-semibold uppercase">
    {urgency}
  </Tag>
);

export { UrgencyTag };
