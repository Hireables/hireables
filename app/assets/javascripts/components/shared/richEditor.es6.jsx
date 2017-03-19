import React, { Component } from 'react';
import RichTextEditor from 'react-rte';

class RichEditor extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    const initialValue = this.props.content ?
      RichTextEditor.createValueFromString(this.props.content, 'html') :
        RichTextEditor.createEmptyValue();
    this.state = {
      value: initialValue,
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
      display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'HISTORY_BUTTONS'],
      INLINE_STYLE_BUTTONS: [
        { label: 'Bold', style: 'BOLD', className: 'editor-button' },
        { label: 'Italic', style: 'ITALIC', className: 'editor-button' },
        { label: 'Underline', style: 'UNDERLINE', className: 'editor-button' },
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
        placeholder={this.props.placeholder || 'Enter your message'}
        spellcheck
      />
    );
  }
}

RichEditor.propTypes = {
  onChange: React.PropTypes.func,
  placeholder: React.PropTypes.string,
  content: React.PropTypes.string,
};

export default RichEditor;
