import React, { Component } from 'react';
import RichTextEditor from 'react-rte';

class RichEditor extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      value: RichTextEditor.createEmptyValue(),
    };
  }

  onChange(value) {
    this.setState({ value });
    if (this.props.onChange) {
      this.props.onChange(
        value.toString('html')
      );
    }
  }

  render() {
    const toolbarConfig = {
      display: ['BLOCK_TYPE_DROPDOWN', 'INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'HISTORY_BUTTONS'],
      INLINE_STYLE_BUTTONS: [
        { label: 'Bold', style: 'BOLD', className: 'editor-button' },
        { label: 'Italic', style: 'ITALIC', className: 'editor-button' },
        { label: 'Underline', style: 'UNDERLINE', className: 'editor-button' },
      ],
      BLOCK_TYPE_DROPDOWN: [
        { label: 'Normal', style: 'unstyled' },
        { label: 'Heading Large', style: 'header-one' },
        { label: 'Heading Medium', style: 'header-two' },
        { label: 'Heading Small', style: 'header-three' },
      ],
      BLOCK_TYPE_BUTTONS: [
        { label: 'UL', style: 'unordered-list-item', className: 'editor-button' },
        { label: 'OL', style: 'ordered-list-item', className: 'editor-button' },
      ],
    };

    return (
      <RichTextEditor
        value={this.state.value}
        onChange={this.onChange}
        toolbarConfig={toolbarConfig}
        placeholder="Enter your message"
        spellcheck
        autoFocus
      />
    );
  }
}

RichEditor.propTypes = {
  onChange: React.PropTypes.func,
};

export default RichEditor;
