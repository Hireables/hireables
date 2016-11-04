module ReactHelper
  def react_component(name, route = nil, props = {}, options = {})
    content_tag(:div, '', html_options(name, route, props, options))
  end

  private

  def html_options(name, route, props, options)
    attrs = options.reverse_merge(data: {})
    attrs[:data].tap do |data|
      data[:component_route] = route unless route.nil?
      data[:component_name] = name
      data[:component_props] = (props.is_a?(String) ? props : props.to_json)
    end
    attrs[:id] = "component-#{next_react_component_index}"
    attrs[:class] = 'react-component'
    # remove internally used properties so they aren't rendered to DOM
    attrs.except!(:tag)
  end

  def next_react_component_index
    @react_component_index ||= -1
    @react_component_index += 1
  end

  def props_string(props)
    props.is_a?(String) ? props : props.to_json
  end
end
