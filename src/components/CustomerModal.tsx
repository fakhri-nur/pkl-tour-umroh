import { Modal, Input, Select, DatePicker } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateCustomer, useUpdateCustomer } from '@/hooks/useCustomers';
import { ICustomer, IUpdateCustomerDto } from '@/types/customer.type';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { customerFormSchema, CustomerFormData } from '@/utils/validation';

interface ICustomerModalProps {
  open: boolean;
  onCancel: () => void;
  customerData?: ICustomer;
}

const CustomerModal = ({ open, onCancel, customerData }: ICustomerModalProps) => {
  const { mutate: createCustomer, isPending: isCreating } = useCreateCustomer();
  const { mutate: updateCustomer, isPending: isUpdating } = useUpdateCustomer();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      identityNumber: '',
      passportNumber: '',
      dateOfBirth: '',
      gender: 'L',
      address: '',
    },
  });

  useEffect(() => {
    if (customerData) {
      reset({
        name: customerData.name,
        email: customerData.email,
        phone: customerData.phone,
        identityNumber: customerData.identityNumber,
        passportNumber: customerData.passportNumber,
        dateOfBirth: customerData.dateOfBirth,
        gender: customerData.gender,
        address: customerData.address,
      });
    } else {
      reset();
    }
  }, [customerData, reset]);

  const onFinish = (values: CustomerFormData) => {
    const payload = {
      ...values,
      dateOfBirth: dayjs(values.dateOfBirth).toISOString(),
    };

    if (customerData) {
      updateCustomer(
        { id: customerData.id, data: payload as IUpdateCustomerDto },
        {
          onSuccess: () => {
            reset();
            onCancel();
          },
        }
      );
    } else {
      createCustomer(payload, {
        onSuccess: () => {
          reset();
          onCancel();
        },
      });
    }
  };

  return (
    <Modal
      title={customerData ? 'Edit Pelanggan' : 'Tambah Pelanggan'}
      open={open}
      onCancel={onCancel}
      onOk={() => handleSubmit(onFinish)()}
      confirmLoading={isCreating || isUpdating}
      width={600}
    >
      <form onSubmit={handleSubmit(onFinish)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Nama lengkap"
                status={errors.name ? 'error' : ''}
              />
            )}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Email" status={errors.email ? 'error' : ''} />
            )}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Telepon</label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Telepon" status={errors.phone ? 'error' : ''} />
            )}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">NIK</label>
          <Controller
            name="identityNumber"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="NIK"
                maxLength={16}
                status={errors.identityNumber ? 'error' : ''}
              />
            )}
          />
          {errors.identityNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.identityNumber.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Paspor</label>
          <Controller
            name="passportNumber"
            control={control}
            render={({ field }) => <Input {...field} placeholder="Nomor paspor" />}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Lahir</label>
          <Controller
            name="dateOfBirth"
            control={control}
            render={({ field }) => (
              <DatePicker
                className="w-full"
                format="DD-MM-YYYY"
                status={errors.dateOfBirth ? 'error' : ''}
                onChange={(date) => field.onChange(date?.toISOString() ?? '')}
              />
            )}
          />
          {errors.dateOfBirth && (
            <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Kelamin</label>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                className="w-full"
                placeholder="Pilih jenis kelamin"
                status={errors.gender ? 'error' : ''}
              >
                <Select.Option value="L">Laki-laki</Select.Option>
                <Select.Option value="P">Perempuan</Select.Option>
              </Select>
            )}
          />
          {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Alamat</label>
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <Input.TextArea
                rows={3}
                placeholder="Alamat lengkap"
                {...field}
                status={errors.address ? 'error' : ''}
              />
            )}
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
        </div>
      </form>
    </Modal>
  );
};

export default CustomerModal;