import React, { useState } from 'react';
import paramCase from 'param-case';
import './App.css';

let hashed = {};
try {
  const h = decodeURI( window.location.hash.substring( 1 ) );
  if ( h ) {
    hashed = JSON.parse( h );
  }
} catch ( e ) {}
const defaultState = {
  useFlex: false,
  justifyContent: '',
  alignItems: '',
  flexWrap: '',
  additionalCells: 0,
  cell2AlignSelf: '',
  cell1MinHeight: 100,
  cell1Order: '',
  cell2Order: '',
  cell3Order: '',
  cell1Grow: '',
  cell2Grow: '',
  cell3Grow: '',

  ...hashed,
};

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
      propertyCollection.push(
        <div key={ propertyCollection.length }>
          { '  ' }
          <span className='property-name'>{ propertyName }</span>:
          { ' ' }<span className='property-value'>{ propertyEntry[1] }</span>;
        </div>
      );
    }

    classCollection.push(
      <div key={ classCollection.length }>
        <span className='class-name'>.{ className }</span> { '{' }
          { propertyCollection }
        { '}\n\n' }
      </div>
    );
  }

  return <div>{ classCollection }</div>;
};

const renderForm = (form, state, fieldHandler) => {
  const sections = Object.entries( form );
  return (
    <form>
      { sections.map( ( section, sectionIndex ) => (
        <ul key={ sectionIndex }>
          <h4>{ section[ 0 ] }</h4>
          { section[ 1 ].map( ( item, index ) => {
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
                <select size={ 6 } name={ item.name } onChange={ fieldHandler } { ...additionalProps }>
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
      ) ) }
    </form>
  );
};

const App = (props) => {
  const [ state, setState ] = useState(defaultState);

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
        value = e.target.value !== '' ? parseInt( e.target.value, 10 ) : '';
        break;

      default:
        value = e.target.value;
    }

    newState[name] = value;
    window.location.hash = encodeURI( JSON.stringify( newState ) );
    setState(newState);
  };

  const styles = {
    parentWrapper: {
      display: state.useFlex ? 'flex' : 'block',
      flexWrap: state.flexWrap,
      justifyContent: state.justifyContent,
      alignItems: state.alignItems,
    },
    cell1: {
      margin: '.5em',
      padding: '.5em',
      background: 'pink',
      minHeight: state.cell1MinHeight && '' + state.cell1MinHeight + 'px',
      order: state.cell1Order,
      flexGrow: state.cell1Grow,
    },
    cell2: {
      margin: '.5em',
      padding: '.5em',
      background: 'lightgreen',
      order: state.cell2Order,
      flexGrow: state.cell2Grow,
      alignSelf: state.cell2AlignSelf,
    },
    cell3: {
      margin: '.5em',
      padding: '.5em',
      background: 'lightblue',
      order: state.cell3Order,
      flexGrow: state.cell3Grow,
    },
    additionalCell: {
      margin: '.5em',
      padding: '.5em',
      background: '#ccc',
    },
  };

  const form = {
    parent: [
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
        name: 'flexWrap',
        type: 'select',
        options: [ '', 'nowrap', 'wrap', 'wrap-reverse' ],
        label: <code>flex-wrap</code>,
      },
      {
        name: 'additionalCells',
        type: 'number',
        label: 'Additional cells',
      },
    ],
    cells: [
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
      {
        name: 'cell1Grow',
        type: 'number',
        label: <span><code>flex-grow</code> for cell 1</span>,
      },
      {
        name: 'cell2Grow',
        type: 'number',
        label: <span><code>flex-grow</code> for cell 2</span>,
      },
      {
        name: 'cell3Grow',
        type: 'number',
        label: <span><code>flex-grow</code> for cell 3</span>,
      },
      {
        name: 'cell2AlignSelf',
        type: 'select',
        options: [ '', 'flex-start', 'flex-end', 'center', 'stretch', 'baseline' ],
        label: <span><code>self-align</code> for cell 2</span>,
      },
    ],
  };

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

        { Array.apply( null, { length: state.additionalCells } ).map( ( _, index ) => (
          <div key={ index } style={ styles.additionalCell }>
            cell { index + 4 }
          </div>
        ) ) }
      </div>
      <pre>{ convertToCss(styles) }</pre>
    </div>
  );
};

export default App;
