import React from 'react';
import { Form, Layout, Card, Row, Col, Button, Input, message } from 'antd';
import './style.css';
import BirthdayCards from '../components/BirthdayCards';

const { Header, Content } = Layout;

class BirthdayCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sampleData: [
        { name: "User 1", birthday: "1990-02-15" },
        { name: "User 2", birthday: "1991-12-12" },
        { name: "User 3", birthday: "1991-12-12" },
        { name: "User 4", birthday: "1991-12-12" },
      ],
      inputYear: new Date().getFullYear(),
      arrangedData: {},
    };
  };

  componentDidMount() {
    this.renderSampleData();
  };

  renderSampleData = values => {
    console.log(values)
    if (values) {
      try {
        JSON.parse(values.sampleData);
        this.updateCardData();
        this.setState({ sampleData: JSON.parse(values.sampleData), inputYear: +values.inputYear });
      } catch (error) {
        return message.error('Entered sample data is not valid JSON');;
      };
    } else {
      this.updateCardData();
    }
  };

  updateCardData = () => {
    const { sampleData, inputYear } = this.state;
    const parsedData = sampleData;
    const localArrangedData = {};
    parsedData.forEach(user => {
      const bdayToPresentYear = new Date(user.birthday).setFullYear(inputYear);
      const fallenOnDay = new Date(bdayToPresentYear).getDay();
      if (!localArrangedData.hasOwnProperty(fallenOnDay)) {
        localArrangedData[fallenOnDay] = [];
      }
      localArrangedData[fallenOnDay].push(user)
    });
    this.setState({ arrangedData: localArrangedData });
  }

  render() {
    const { sampleData, arrangedData } = this.state;
    return (
      <Layout className="layout">
        <Header>
          <h3 className="headerTitle">Birthday Calendar</h3>
        </Header>
        <Content className="content">
          <Card bordered={false} className="bodyCard">
            <BirthdayCards arrangedData={arrangedData} />
            <div className="workspace">
              <Form layout="vertical" onFinish={values => this.renderSampleData(values)} initialValues={{
                sampleData: JSON.stringify(sampleData),
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
          </Card>
        </Content>
      </Layout >
    )
  }
}

export default BirthdayCalendar;