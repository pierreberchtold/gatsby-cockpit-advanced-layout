import React, { PureComponent } from 'react';
import upperFirst from 'lodash.upperfirst';
import isEmpty from 'is-empty';
import propTypes from 'prop-types';

// Components


// CockpitLayout
import CockpitGrid from '../CockpitGrid';
import CockpitSection from '../CockpitSection';

const components = {
  Grid: CockpitGrid,
  Section: CockpitSection,
};

class CockpitLayout extends PureComponent {
  static defaultProps = {
    path: '',
    onEdit() {},
    id: '',
    className: '',
    style: {},
  };

  static propTypes = {
    path: propTypes.string,
    onEdit: propTypes.func,
    id: propTypes.string,
    className: propTypes.string,
    style: propTypes.object,
  };

  renderComponent(layout, data) {
    const { objects, floors, files } = data;
    return (!isEmpty(layout) &&
      layout.map(
        (
          {
            component,
            children,
            columns,
            settings: { style: _, class: className, id, ...settings },
          },
          key,
        ) => {
          const Tag = components[upperFirst(component)];
          const { onEdit, path } = this.props;

          if (!Tag)
            return (
              <pre key={`comp-${key}`}>
                CockpitLayout Component: <b>{component}</b> - Not found
                {JSON.stringify(settings, null, '  ')}
              </pre>
            );

          return (
            <div id={id} className={className} key={`comp-${component}-${key}`}>
              <Tag
                key={`comp-${component}-${key}`}
                className={className}
                {...settings}
                layoutChildren={children}
                layoutColumns={columns}
                onEdit={onEdit}
                layoutPath={`${path}[${key}]`}
                objects={objects}
                floors={floors}
                files={files}
              />
            </div>
          );
        },
      )
    );
  }

  render() {
    const { layout, data } = this.props;
    if (!layout) return <div />;

    return <div>{this.renderComponent(layout, data)}</div>;
  }
}

export default CockpitLayout;
