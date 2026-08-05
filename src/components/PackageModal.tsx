import { Modal, Input, Select, DatePicker, InputNumber } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreatePackage, useUpdatePackage } from '@/hooks/usePackages';
import { IPackage, IUpdatePackageDto } from '@/types/package.type';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { packageFormSchema, PackageFormData } from '@/utils/validation';

interface IPackageModalProps {
  open: boolean;
  onCancel: () => void;
  packageData?: IPackage;
}

const formatRupiahInput = (value: number | string | undefined): string => {
  const number = Number(value || 0);
  return `Rp ${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
};

const parseRupiahInput = (value: string | undefined): number => {
  return Number(value?.replace(/[^\d]/g, '') || 0);
};

const PackageModal = ({ open, onCancel, packageData }: IPackageModalProps) => {
  const { mutate: createPackage, isPending: isCreating } = useCreatePackage();
  const { mutate: updatePackage, isPending: isUpdating } = useUpdatePackage();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PackageFormData>({
    resolver: zodResolver(packageFormSchema),
    defaultValues: {
      name: '',
      type: 'umroh',
      price: 0,
      duration: 0,
      quota: 0,
      departureDate: '',
      returnDate: '',
      description: '',
      imageUrl: '',
    },
  });

  useEffect(() => {
    if (packageData) {
      reset({
        name: packageData.name,
        type: packageData.type,
        price: packageData.price,
        duration: packageData.duration,
        quota: packageData.quota,
        departureDate: packageData.departureDate,
        returnDate: packageData.returnDate,
        description: packageData.description,
        imageUrl: packageData.imageUrl,
      });
    } else {
      reset();
    }
  }, [packageData, reset]);

  const onFinish = (values: PackageFormData) => {
    const payload = {
      ...values,
      departureDate: dayjs(values.departureDate).toISOString(),
      returnDate: dayjs(values.returnDate).toISOString(),
      facilities: [],
    };

    if (packageData) {
      updatePackage(
        { id: packageData.id, data: payload as IUpdatePackageDto },
        {
          onSuccess: () => {
            reset();
            onCancel();
          },
        }
      );
    } else {
      createPackage(payload, {
        onSuccess: () => {
          reset();
          onCancel();
        },
      });
    }
  };

  return (
    <Modal
      title={packageData ? 'Edit Paket' : 'Tambah Paket'}
      open={open}
      onCancel={onCancel}
      onOk={() => handleSubmit(onFinish)()}
      confirmLoading={isCreating || isUpdating}
      width={700}
    >
      <form onSubmit={handleSubmit(onFinish)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nama Paket</label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Nama paket" status={errors.name ? 'error' : ''} />
            )}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tipe</label>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select {...field} className="w-full" placeholder="Pilih tipe" status={errors.type ? 'error' : ''}>
                <Select.Option value="umroh">Umroh</Select.Option>
                <Select.Option value="haji">Haji</Select.Option>
              </Select>
            )}
          />
          {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Harga</label>
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <InputNumber
                {...field}
                placeholder="Harga"
                className="w-full"
                status={errors.price ? 'error' : ''}
                formatter={formatRupiahInput}
                parser={parseRupiahInput}
              />
            )}
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Durasi (hari)</label>
            <Controller
              name="duration"
              control={control}
              render={({ field }) => (
                <InputNumber
                  {...field}
                  placeholder="Durasi"
                  className="w-full"
                  min={1}
                  status={errors.duration ? 'error' : ''}
                />
              )}
            />
            {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kuota</label>
            <Controller
              name="quota"
              control={control}
              render={({ field }) => (
                <InputNumber
                  {...field}
                  placeholder="Kuota"
                  className="w-full"
                  min={1}
                  status={errors.quota ? 'error' : ''}
                />
              )}
            />
            {errors.quota && <p className="text-red-500 text-sm mt-1">{errors.quota.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Keberangkatan</label>
            <Controller
              name="departureDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  className="w-full"
                  format="DD-MM-YYYY"
                  status={errors.departureDate ? 'error' : ''}
                  onChange={(date) => field.onChange(date?.toISOString() ?? '')}
                />
              )}
            />
            {errors.departureDate && (
              <p className="text-red-500 text-sm mt-1">{errors.departureDate.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Kepulangan</label>
            <Controller
              name="returnDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  className="w-full"
                  format="DD-MM-YYYY"
                  status={errors.returnDate ? 'error' : ''}
                  onChange={(date) => field.onChange(date?.toISOString() ?? '')}
                />
              )}
            />
            {errors.returnDate && (
              <p className="text-red-500 text-sm mt-1">{errors.returnDate.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input.TextArea
                rows={4}
                placeholder="Deskripsi paket"
                {...field}
                status={errors.description ? 'error' : ''}
              />
            )}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">URL Gambar</label>
          <Controller
            name="imageUrl"
            control={control}
            render={({ field }) => <Input {...field} placeholder="URL gambar" />}
          />
        </div>
      </form>
    </Modal>
  );
};

export default PackageModal;