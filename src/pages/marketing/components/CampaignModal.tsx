import { useEffect } from 'react';
import { Modal, Input, Select, DatePicker } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { campaignFormSchema, CampaignFormData } from '@/utils/validation';
import { useMarketingStore, IMarketingCampaign, CampaignPlatform } from '@/store/marketingStore';

const PLATFORM_OPTIONS: { value: CampaignPlatform; label: string }[] = [
  { value: 'Facebook Ads', label: 'Facebook Ads' },
  { value: 'Google Search', label: 'Google Search' },
  { value: 'Instagram', label: 'Instagram' },
  { value: 'Referral', label: 'Referral' },
  { value: 'WhatsApp', label: 'WhatsApp' },
  { value: 'Website', label: 'Website' },
];

interface ICampaignModalProps {
  open: boolean;
  onCancel: () => void;
  campaignData?: IMarketingCampaign;
}

const CampaignModal: React.FC<ICampaignModalProps> = ({ open, onCancel, campaignData }) => {
  const { addCampaign, updateCampaign } = useMarketingStore();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CampaignFormData>({
    resolver: zodResolver(campaignFormSchema),
    defaultValues: {
      name: '',
      platform: 'Facebook Ads',
      status: 'Active',
      budget: 0,
      spent: 0,
      conversions: 0,
      startDate: '',
      endDate: '',
    },
  });

  useEffect(() => {
    if (campaignData) {
      reset({
        name: campaignData.name,
        platform: campaignData.platform,
        status: campaignData.status,
        budget: campaignData.budget,
        spent: campaignData.spent,
        conversions: campaignData.conversions,
        startDate: campaignData.startDate,
        endDate: campaignData.endDate,
      });
    } else {
      reset();
    }
  }, [campaignData, reset]);

  const onFinish = (values: CampaignFormData) => {
    if (campaignData) {
      updateCampaign(campaignData.id, values);
    } else {
      addCampaign(values);
    }
    reset();
    onCancel();
  };

  return (
    <Modal
      title={campaignData ? 'Edit Kampanye' : 'Buat Kampanye Baru'}
      open={open}
      onCancel={onCancel}
      onOk={() => handleSubmit(onFinish)()}
      width={600}
      okText={campaignData ? 'Simpan Perubahan' : 'Buat Kampanye'}
      cancelText="Batal"
    >
      <form onSubmit={handleSubmit(onFinish)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nama Kampanye</label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Contoh: Promo Haji 2025"
                status={errors.name ? 'error' : ''}
              />
            )}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Platform Iklan</label>
            <Controller
              name="platform"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  className="w-full"
                  placeholder="Pilih platform"
                  options={PLATFORM_OPTIONS}
                  status={errors.platform ? 'error' : ''}
                />
              )}
            />
            {errors.platform && (
              <p className="text-red-500 text-sm mt-1">{errors.platform.message}</p>
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
                  options={[
                    { value: 'Active', label: 'Active' },
                    { value: 'Paused', label: 'Paused' },
                  ]}
                  status={errors.status ? 'error' : ''}
                />
              )}
            />
            {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Anggaran (Rp)</label>
            <Controller
              name="budget"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  min={0}
                  placeholder="25.000.000"
                  status={errors.budget ? 'error' : ''}
                />
              )}
            />
            {errors.budget && (
              <p className="text-red-500 text-sm mt-1">{errors.budget.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Terpakai (Rp)</label>
            <Controller
              name="spent"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  min={0}
                  placeholder="5.000.000"
                  status={errors.spent ? 'error' : ''}
                />
              )}
            />
            {errors.spent && <p className="text-red-500 text-sm mt-1">{errors.spent.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Konversi</label>
            <Controller
              name="conversions"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  min={0}
                  placeholder="23"
                  status={errors.conversions ? 'error' : ''}
                />
              )}
            />
            {errors.conversions && (
              <p className="text-red-500 text-sm mt-1">{errors.conversions.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Mulai</label>
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  className="w-full"
                  format="DD-MM-YYYY"
                  status={errors.startDate ? 'error' : ''}
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date) => field.onChange(date ? date.format('YYYY-MM-DD') : '')}
                />
              )}
            />
            {errors.startDate && (
              <p className="text-red-500 text-sm mt-1">{errors.startDate.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Selesai</label>
            <Controller
              name="endDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  className="w-full"
                  format="DD-MM-YYYY"
                  status={errors.endDate ? 'error' : ''}
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date) => field.onChange(date ? date.format('YYYY-MM-DD') : '')}
                />
              )}
            />
            {errors.endDate && (
              <p className="text-red-500 text-sm mt-1">{errors.endDate.message}</p>
            )}
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default CampaignModal;
