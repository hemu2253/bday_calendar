import React from 'react';
import { Typography, Row, Col, Card, Empty } from 'antd';
import { weekDays } from './helpers';

const { Title } = Typography;

export default props => (
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
            <Row justify="center">
              {props.arrangedData.hasOwnProperty(day.key) ? (
                props.arrangedData[day.key].map(user =>
                  <Col>
                    <Card bordered bodyStyle={{ backgroundColor: 'red' }}>
                      {user.name}
                    </Card>
                  </Col>
                )
              ) : <Col><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span>No Birthdays</span>} /></Col>}
            </Row>

          </Card>
        </Col>
      )}
    </Row>
  </div>
)