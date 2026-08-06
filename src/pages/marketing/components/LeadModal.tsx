import { Modal, Input, Select, message } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { leadFormSchema, LeadFormData } from '@/utils/validation';
import { useMarketingStore, LeadSource, LeadStatus } from '@/store/marketingStore';

const SOURCE_OPTIONS: { value: LeadSource; label: string }[] = [
  { value: 'Facebook Ads', label: 'Facebook Ads' },
  { value: 'Google Search', label: 'Google Search' },
  { value: 'Instagram', label: 'Instagram' },
  { value: 'Referral', label: 'Referral' },
  { value: 'WhatsApp', label: 'WhatsApp' },
  { value: 'Website', label: 'Website' },
];

const STATUS_OPTIONS: { value: LeadStatus; label: string }[] = [
  { value: 'New', label: 'New' },
  { value: 'Contacted', label: 'Contacted' },
  { value: 'Converted', label: 'Converted' },
  { value: 'Lost', label: 'Lost' },
];

const PACKAGE_OPTIONS = [
  'Haji Plus 2026',
  'Umrah Ramadhan',
  'Umrah Plus Dubai',
  'Umrah Reguler 9 Hari',
  'Umrah VIP 10 Hari',
  'Umrah Keluarga 14 Hari',
];

interface ILeadModalProps {
  open: boolean;
  onCancel: () => void;
}

const LeadModal: React.FC<ILeadModalProps> = ({ open, onCancel }) => {
  const { addLead } = useMarketingStore();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      source: 'Facebook Ads',
      status: 'New',
      packageInterest: '',
    },
  });

  const onFinish = (values: LeadFormData) => {
    addLead(values);
    message.success(`Leads baru "${values.name}" berhasil ditambahkan!`);
    reset();
    onCancel();
  };

  return (
    <Modal
      title="Tambah Leads Baru"
      open={open}
      onCancel={onCancel}
      onOk={() => handleSubmit(onFinish)()}
      width={600}
      okText="Tambah Leads"
      cancelText="Batal"
    >
      <form onSubmit={handleSubmit(onFinish)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nama Prospek</label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Nama lengkap prospek"
                status={errors.name ? 'error' : ''}
              />
            )}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon</label>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="+62 812 3456 7890"
                  status={errors.phone ? 'error' : ''}
                />
              )}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="nama@email.com" status={errors.email ? 'error' : ''} />
              )}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sumber Leads</label>
            <Controller
              name="source"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  className="w-full"
                  options={SOURCE_OPTIONS}
                  status={errors.source ? 'error' : ''}
                />
              )}
            />
            {errors.source && (
              <p className="text-red-500 text-sm mt-1">{errors.source.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  className="w-full"
                  options={STATUS_OPTIONS}
                  status={errors.status ? 'error' : ''}
                />
              )}
            />
            {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Paket yang Diminati</label>
          <Controller
            name="packageInterest"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                className="w-full"
                placeholder="Pilih paket"
                options={PACKAGE_OPTIONS.map((label) => ({ value: label, label }))}
                status={errors.packageInterest ? 'error' : ''}
              />
            )}
          />
          {errors.packageInterest && (
            <p className="text-red-500 text-sm mt-1">{errors.packageInterest.message}</p>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default LeadModal;
