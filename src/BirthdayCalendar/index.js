import React from 'react';
import { Form, Layout, Card, Row, Col, Button, Input, message } from 'antd';
import BirthdayCards from '../components/BirthdayCards';
import './style.css';
import { weekDays } from '../components/BirthdayCards/helpers';
import { sort_date } from './helper';

const { Header, Content } = Layout;

class BirthdayCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sampleData: [
        { name: "Hemanth Byrisetti", birthday: "1995-04-09" },
        { name: "Rama Krishna", birthday: "1964-08-25" },
        { name: "Bharathi", birthday: "1973-07-26" },
        { name: "Divya Chandana", birthday: "1998-07-17" },
        { name: "Vedhasree K", birthday: "1994-08-23" },
        { name: "Hemanth Byrisetti1", birthday: "1995-05-09" },
        { name: "Rama Krishna2", birthday: "1964-10-25" },
        { name: "Bharathi1", birthday: "1973-07-26" },
        { name: "Divya Chandana1", birthday: "1998-02-17" },
        { name: "Vedhasree K1", birthday: "1994-01-23" },
      ],
      inputYear: new Date().getFullYear(),
      arrangedData: {},
      isUpdating: true,
    };
  };

  componentDidMount() {
    this.renderSampleData();
  };

  renderSampleData = async values => {
    const { sampleData, inputYear } = this.state;
    if (values) {
      try {
        JSON.parse(values.sampleData);
        this.updateCardData(JSON.parse(values.sampleData), +values.inputYear);
      } catch (error) {
        return message.error('Entered sample data is not valid JSON');;
      };
    } else {
      this.updateCardData(sampleData, inputYear);
    }
  };

  updateCardData = async (sampleData, inputYear) => {
    const parsedData = sampleData;
    const localArrangedData = {};
    parsedData.forEach(user => {
      const bdayToPresentYear = new Date(user.birthday).setFullYear(inputYear);
      const fallenOnDay = new Date(bdayToPresentYear).getDay();
      if (!localArrangedData.hasOwnProperty(fallenOnDay)) {
        localArrangedData[fallenOnDay] = [];
      }
      localArrangedData[fallenOnDay].push(user);
      localArrangedData[fallenOnDay].sort(sort_date);
      weekDays.forEach(day => {
        if (!localArrangedData.hasOwnProperty(day.key)) {
          localArrangedData[day.key] = [];
        }
      });
    });
    console.log(localArrangedData);
    await this.setState({ sampleData, inputYear, arrangedData: localArrangedData, isUpdating: false });
    for (const grid of document.querySelectorAll('.grid')) {
      grid.style.setProperty('--cols', Math.ceil(Math.sqrt(grid.children.length)));
    }
  }

  render() {
    const { sampleData, arrangedData, isUpdating } = this.state;
    return (
      <Layout className="layout">
        <Header>
          <h3 className="headerTitle">Birthday Calendar</h3>
        </Header>
        <Content className="content">
          <Card bordered={false} className="bodyCard">
            <BirthdayCards arrangedData={arrangedData} isUpdating={isUpdating} />
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