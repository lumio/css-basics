import React, { useState } from 'react';
import paramCase from 'param-case';
import './App.css';

const convertToCss = (styles) => {
  const classCollection = [];
  const classNames = Object.keys(styles);
  for (const className of classNames) {
    const propertyCollection = [];
    const properties = Object.entries(styles[className]);

    for (const propertyEntry of properties) {
      if (propertyEntry[1] === undefined || propertyEntry[1] === '') {
        continue;
      }
      const propertyName = paramCase(propertyEntry[0]);
      propertyCollection.push(`  ${ propertyName }: ${ propertyEntry[1] };`);
    }

    classCollection.push(
      `.${ className } {\n`
      + propertyCollection.join('\n')
      + `\n}`
    );
  }

  return classCollection.join('\n\n');
};

const renderForm = (form, state, fieldHandler) => {
  return (
    <form>
      <ul>
        { form.map( ( item, index ) => {
          const additionalProps = {};
          const value = state[ item.name ];

          if ( item.type === 'checkbox' || item.type === 'radio' ) {
            additionalProps.checked = value;
          }
          else {
            additionalProps.value = value;
          }

          let field;

          if ( item.type === 'select' ) {
            field = (
              <select name={ item.name } onChange={ fieldHandler } { ...additionalProps }>
                { item.options.map( ( option, optIndex ) => (
                  <option key={ optIndex } value={ option }>{ option }</option>
                ) ) }
              </select>
            );
          }
          else {
            field = (
              <input
                type={ item.type }
                name={ item.name }
                onChange={ fieldHandler }
                { ...additionalProps }
              />
            );
          }

          return (
            <li key={ index }>
              <label>
                { item.label }
                { field }
              </label>
            </li>
          );
        } ) }
      </ul>
    </form>
  );
};

const App = (props) => {
  const [ state, setState ] = useState({
    useFlex: false,
    alignItems: '',
    cell1MinHeight: 100,
    cell1Order: '',
    cell2Order: '',
    cell3Order: '',
  });

  const fieldHandler = (e) => {
    const newState = { ...state };
    const name = e.target.name;
    const fieldType = e.target.type;
    let value;

    switch (fieldType) {
      case 'checkbox':
        value = e.target.checked;
        break;

      case 'number':
        value = parseInt( e.target.value, 10 );
        break;

      default:
        value = e.target.value;
    }

    newState[name] = value;
    setState(newState);
  };

  const styles = {
    parentWrapper: {
      display: state.useFlex ? 'flex' : 'block',
      justifyContent: state.justifyContent,
      alignItems: state.alignItems,
    },
    cell1: {
      background: 'pink',
      minHeight: '' + state.cell1MinHeight + 'px',
      order: state.cell1Order,
    },
    cell2: {
      background: 'lightgreen',
      order: state.cell2Order,
    },
    cell3: {
      background: 'lightblue',
      order: state.cell3Order,
    },
  };

  const form = [
    {
      name: 'useFlex',
      type: 'checkbox',
      label: <span>Enable <code>display: flex;</code></span>,
    },
    {
      name: 'justifyContent',
      type: 'select',
      options: [ '', 'flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly' ],
      label: <code>justify-content</code>,
    },
    {
      name: 'alignItems',
      type: 'select',
      options: [ '', 'flex-start', 'flex-end', 'center', 'stretch', 'baseline' ],
      label: <code>align-items</code>,
    },
    {
      name: 'cell1MinHeight',
      type: 'number',
      label: <span><code>min-height</code> of cell 1</span>,
    },
    {
      name: 'cell1Order',
      type: 'number',
      label: <span>Order of cell 1</span>,
    },
    {
      name: 'cell2Order',
      type: 'number',
      label: <span>Order of cell 2</span>,
    },
    {
      name: 'cell3Order',
      type: 'number',
      label: <span>Order of cell 3</span>,
    },
  ];

  return (
    <div className="App">
      { renderForm(form, state, fieldHandler) }

      <div className='parentWrapper' style={ styles.parentWrapper }>
        <div style={ styles.cell1 }>
          cell 1 with a <code>min-height: { styles.cell1.minHeight }</code>
        </div>

        <div style={ styles.cell2 }>
          cell 2
        </div>

        <div style={ styles.cell3 }>
          cell 3
        </div>
      </div>
      <pre>{ convertToCss(styles) }</pre>
    </div>
  );
};

export default App;
