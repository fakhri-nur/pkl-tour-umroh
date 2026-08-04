import { Modal, Form, Input, Select, DatePicker } from 'antd';
import { useCreateCustomer, useUpdateCustomer } from '@/hooks/useCustomers';
import { ICustomer, ICreateCustomerDto, IUpdateCustomerDto } from '@/types/customer.type';
import { useEffect } from 'react';
import dayjs from 'dayjs';

const { Option } = Select;

interface ICustomerModalProps {
  open: boolean;
  onCancel: () => void;
  customerData?: ICustomer;
}

const CustomerModal = ({ open, onCancel, customerData }: ICustomerModalProps) => {
  const [form] = Form.useForm();
  const { mutate: createCustomer, isPending: isCreating } = useCreateCustomer();
  const { mutate: updateCustomer, isPending: isUpdating } = useUpdateCustomer();

  useEffect(() => {
    if (customerData) {
      form.setFieldsValue({
        ...customerData,
        dateOfBirth: dayjs(customerData.dateOfBirth),
      });
    } else {
      form.resetFields();
    }
  }, [customerData, form]);

  const onFinish = (values: ICreateCustomerDto & { dateOfBirth: dayjs.Dayjs }) => {
    const payload = {
      ...values,
      dateOfBirth: values.dateOfBirth.toISOString(),
    };

    if (customerData) {
      updateCustomer(
        { id: customerData.id, data: payload as IUpdateCustomerDto },
        {
          onSuccess: () => {
            form.resetFields();
            onCancel();
          },
        }
      );
    } else {
      createCustomer(payload, {
        onSuccess: () => {
          form.resetFields();
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
      onOk={() => form.submit()}
      confirmLoading={isCreating || isUpdating}
      width={600}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Nama Lengkap"
          rules={[{ required: true, message: 'Nama wajib diisi' }]}
        >
          <Input placeholder="Nama lengkap" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Email wajib diisi' },
            { type: 'email', message: 'Format email tidak valid' },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Telepon"
          rules={[{ required: true, message: 'Telepon wajib diisi' }]}
        >
          <Input placeholder="Telepon" />
        </Form.Item>

        <Form.Item
          name="identityNumber"
          label="NIK"
          rules={[
            { required: true, message: 'NIK wajib diisi' },
            { len: 16, message: 'NIK harus 16 digit' },
          ]}
        >
          <Input placeholder="NIK" maxLength={16} />
        </Form.Item>

        <Form.Item name="passportNumber" label="Nomor Paspor">
          <Input placeholder="Nomor paspor" />
        </Form.Item>

        <Form.Item
          name="dateOfBirth"
          label="Tanggal Lahir"
          rules={[{ required: true, message: 'Tanggal lahir wajib diisi' }]}
        >
          <DatePicker className="w-full" format="DD-MM-YYYY" />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Jenis Kelamin"
          rules={[{ required: true, message: 'Jenis kelamin wajib dipilih' }]}
        >
          <Select placeholder="Pilih jenis kelamin">
            <Option value="L">Laki-laki</Option>
            <Option value="P">Perempuan</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="address"
          label="Alamat"
          rules={[{ required: true, message: 'Alamat wajib diisi' }]}
        >
          <Input.TextArea rows={3} placeholder="Alamat lengkap" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CustomerModal;
