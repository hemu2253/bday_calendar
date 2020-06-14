import React from 'react';
import { Typography, Row, Col, Card, Empty } from 'antd';
import { weekDays, getNameSplit } from './helpers';
import './style.css';

const { Title } = Typography;
const cardHeight = '160px';

export default props => (
  <div className="contentBody">
    <div className="title">
      <Title>Work Area</Title>
    </div>
    <Row justify="space-around">
      {weekDays.map(day => {
        return (
          <Col span={3} key={day.key}>
            <Card
              headStyle={{ backgroundColor: '#aba1eb', color: '#fff' }}
              bodyStyle={{ padding: 0, height: cardHeight }}
              title={<span><strong>{day.value}</strong></span>}
              loading={props.isUpdating}
            >
              {!props.isUpdating &&
                <div className="grid">
                  {props.arrangedData[day.key].length > 0 ? (
                    props.arrangedData[day.key].map(user => (
                      <div className="userGrid" style={{ backgroundColor: "#" + ((1 << 24) * Math.random() | 0).toString(16) }}>
                        <span>
                          <strong>{getNameSplit(user.name)}</strong>
                        </span>
                      </div>
                    ))
                  ) : (
                      <div className="emptyCard">
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span>No Birthdays</span>} />
                      </div>
                    )}
                </div>
              }
            </Card>
            {!props.isUpdating && <h4 className="birthdayCount">{props.arrangedData[day.key].length} birthdays</h4>}
          </Col>
        )
      }
      )}
    </Row>
  </div>
)