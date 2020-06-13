import React from 'react';
import { Layout, Card, Typography, Row, Col } from 'antd';
import './style.css';

const { Header, Content } = Layout;
const { Title } = Typography;
const weekDays = [
  {
    key: 1,
    value: 'Mon',
  },
  {
    key: 2,
    value: 'Tue',
  },
  {
    key: 3,
    value: 'Wed',
  },
  {
    key: 4,
    value: 'Thu',
  },
  {
    key: 5,
    value: 'Fri',
  },
  {
    key: 6,
    value: 'Sat',
  },
  {
    key: 7,
    value: 'Sun',
  }
];

class BirthdayCalendar extends React.Component {
  render() {
    return (
      <Layout className="layout">
        <Header>
          <h3 className="headerTitle">Birthday Calendar</h3>
        </Header>
        <Content className="content">
          <Card bordered={false} className="bodyCard">
            <div className="contentBody">
              <div className="title">
                <Title>Work Area</Title>
              </div>
              <Row justify="space-around">
                {weekDays.map(day =>
                  <Col span={3} key={day.key}>
                    <Card
                      headStyle={{ backgroundColor: '#aba1eb', color: '#fff' }}
                      bodyStyle={{ padding: 0 }}
                      title={<span><strong>{day.value}</strong></span>}
                    >
                      {day.value}
                    </Card>
                  </Col>
                )}
              </Row>
            </div>
          </Card>
        </Content>
      </Layout >
    )
  }
}

export default BirthdayCalendar;