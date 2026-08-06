import { LeadStatus } from '@/store/marketingStore';

export const LEAD_STATUS_TEXT: Record<LeadStatus, string> = {
  New: 'New',
  Contacted: 'Contacted',
  Converted: 'Converted',
  Lost: 'Lost',
};
