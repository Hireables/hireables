import React, { Component } from 'react';
import Relay from 'react-relay';
import moment from 'moment';
import Avatar from 'material-ui/Avatar';
import {
  Card,
  CardActions,
  CardHeader,
  CardText,
} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class Receipt extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { receipt } = this.props;
    const userBadge = () => {
      const { name } = receipt.message.sender;
      const chunks = name.split(' ');
      return chunks[0][0] + chunks[1][0];
    };

    return (
      <div className="receipt">
        <Card
          style={{
            boxShadow: 'none',
            border: 0,
          }}
        >
          <CardHeader
            title={receipt.message.sender.name}
            subtitle={
              moment(receipt.message.created_at, 'YYYY-MM-DD HH:mm:ss [UTC]')
              .format('MMMM Do YYYY HH:MM')
              .toString()
            }
            avatar={
              receipt.message.sender.avatar_url ?
                receipt.message.sender.avatar_url :
                <Avatar>
                  {userBadge()}
                </Avatar>
            }
          />

          <CardText>
            {receipt.message.body}
          </CardText>

          <CardActions>
            <FlatButton label="Reply" onTouchTap={this.handleExpand} />
            <FlatButton label="Reduce" onTouchTap={this.handleReduce} />
          </CardActions>
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
