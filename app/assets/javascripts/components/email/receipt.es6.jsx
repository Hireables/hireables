import React, { Component } from 'react';
import Relay from 'react-relay';
import moment from 'moment';
import Avatar from 'material-ui/Avatar';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import nameBadge from '../../utils/nameBadge.es6';

class Receipt extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { receipt } = this.props;
    return (
      <div className="receipt">
        <Card
          style={{
            boxShadow: 'none',
            border: 0,
          }}
        >
          <CardHeader
            style={{ paddingBottom: 0 }}
            title={receipt.message.sender.name}
            subtitleStyle={{ fontSize: 12, fontWeight: 400 }}
            subtitle={
              moment(receipt.message.created_at, 'YYYY-MM-DD HH:mm:ss [UTC]')
              .format('MMMM Do YYYY HH:MM')
              .toString()
            }
            avatar={
              receipt.message.sender.avatar_url ?
                receipt.message.sender.avatar_url :
                <Avatar>
                  {nameBadge(receipt.message.sender.name)}
                </Avatar>
            }
          />
          <CardText className="body">
            {receipt.message.body}
          </CardText>
        </Card>
      </div>
    );
  }
}

Receipt.propTypes = {
  receipt: React.PropTypes.object,
};

const ReceiptContainer = Relay.createContainer(Receipt, {
  fragments: {
    receipt: () => Relay.QL`
      fragment on Receipt {
        id,
        is_read,
        message {
          id,
          body,
          subject,
          created_at,
          sender {
            id,
            avatar_url,
            name,
          },
        },
      }
    `,
  },
});

export default ReceiptContainer;
