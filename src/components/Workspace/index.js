import React from 'react';
import { Form, Row, Col, Input, Button } from 'antd';
import './style.css';

export default props => (
  <div className="workspace">
    <Form layout="vertical" onFinish={values => props.renderSampleData(values)} initialValues={{
      sampleData: JSON.stringify(props.sampleData),
      inputYear: '2020',
    }}>
      <Row gutter={16}>
        <Col span={14}>
          <Form.Item
            label={
              <span>Sample JSON{' '}
                <span style={{ fontSize: '12px' }}>(Date format must be ISO (YYYY-MM-DD))</span>
              </span>
            }
            name="sampleData"
            rules={[{ required: true, message: 'Sample Data is missing' }]}
          >
            <Input.TextArea autoSize={{ minRows: 15, maxRows: 20 }} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Year"
            name="inputYear"
            rules={[{ required: true, message: 'Year is missing' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Update</Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  </div>
)