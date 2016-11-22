import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class Message extends Component {
  constructor(props) {
    super(props);
    this.handleExpand = this.handleExpand.bind(this);
    this.handleReduce = this.handleReduce.bind(this);
    this.state = {
      expanded: false,
    };
  }

  handleExpand() {
    this.setState({ expanded: true });
  }

  handleReduce() {
    this.setState({ expanded: false });
  }

  render() {
    const { message } = this.props;
    return (
      <Card expanded={this.state.expanded}>
        <CardHeader
          title="URL Avatar"
          subtitle="Subtitle"
          avatar="images/ok-128.jpg"
        />
        <CardTitle title="Card title" subtitle="Card subtitle" expandable />
        <CardText expandable>
          {message.body}
        </CardText>
        <CardActions>
          <FlatButton label="Expand" onTouchTap={this.handleExpand} />
          <FlatButton label="Reduce" onTouchTap={this.handleReduce} />
        </CardActions>
      </Card>
    );
  }
}

Message.propTypes = {
  message: React.PropTypes.object,
};

export default Message;
