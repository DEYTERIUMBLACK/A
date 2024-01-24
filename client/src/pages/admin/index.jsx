import React, { useState } from 'react';
import { Form, Input, Button, Space, Alert } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const Admin = () => {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      image: '',
      price: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      image: Yup.string().url('Invalid URL').required('Image URL is required'),
      price: Yup.number().moreThan(0, 'Price must be greater than 0').required('Price is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:3001/api/products', values);
        console.log('Product created:', response.data);

        formik.resetForm();
        setSubmitSuccess(true);
        setSubmitError(null);
      } catch (error) {
        console.error('Error creating product:', error);

        // Display error alert
        setSubmitSuccess(false);
        setSubmitError('Error creating product. Please try again.');
      }
    },
  });

  const handleAlertClose = () => {
    setSubmitSuccess(false);
    setSubmitError(null);
  };

  return (
    <div>
      {submitSuccess && (
        <Alert message="Product created successfully!" type="success" showIcon onClose={handleAlertClose} />
      )}

      {submitError && (
        <Alert message={submitError} type="error" showIcon onClose={handleAlertClose} />
      )}

      <Form onFinish={formik.handleSubmit} layout="vertical">
        <Form.Item label="Name" required>
          <Input name="name" value={formik.values.name} onChange={formik.handleChange} />
          {formik.touched.name && formik.errors.name && (
            <div style={{ color: 'red' }}>{formik.errors.name}</div>
          )}
        </Form.Item>

        <Form.Item label="Image URL" required>
          <Input name="image" value={formik.values.image} onChange={formik.handleChange} />
          {formik.touched.image && formik.errors.image && (
            <div style={{ color: 'red' }}>{formik.errors.image}</div>
          )}
        </Form.Item>

        <Form.Item label="Price" required>
          <Input
            type="number"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
          />
          {formik.touched.price && formik.errors.price && (
            <div style={{ color: 'red' }}>{formik.errors.price}</div>
          )}
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button onClick={formik.handleReset}>Reset</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Admin;
