import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

export default function App() {
  const [tabActive, setTabActive] = useState(0);
  const [queryKeyValue, setQueryKeyValue] = useState([{
    id: uuid(),
    key: '',
    value: ''
  }]);
  const [headerKeyValue, setHeaderKeyValue] = useState([{
    id: uuid(),
    key: '',
    value: ''
  }]);

  const form = useRef(null);
  const url = useRef(null);
  const reqMethod = useRef(null);
  const keyValueForm = useRef(null);

  const addQueryKeyValue = () => {
    setQueryKeyValue([
      ...queryKeyValue,
      {
        id: uuid(),
        key: '',
        value: ''
      }
    ]);
  };
  
  const addHeaderKeyValue = () => {
    setHeaderKeyValue([
      ...headerKeyValue,
      {
        id: uuid(),
        key: '',
        value: ''
      }
    ]);
  };

  const tabClick = (idx) => {
    setTabActive(idx);
  };

  const keyValueToObj = () => {
    return
  };

  const sendRequest = (e) => {
    e.preventDefault();

    axios({
      url: url.current.value,
      method: reqMethod.current.value,
      params: '',
      headers: ''
    }).then(console.log)
  };

  // KeyValue Component
  const KeyValue = ({ id, key2, value }) => {
    const keyRef = useRef(null);
    const valueRef = useRef(null);

    const keyOnChange = (e, id) => {
      setQueryKeyValue(
        queryKeyValue.map(data => {
          if (data.id === id) {
            return {
              ...data,
              key: e.target.value
            }
          } else {
            return data;
          }
        })
      );
      console.log(queryKeyValue);
    }

    const valueOnChange = (e) => {
      setQueryKeyValue(
        queryKeyValue.map(data => {
          if (data.id === id) {
            return {
              ...data,
              value: e.target.value
            }
          } else {
            return data;
          }
        })
      );
      console.log(queryKeyValue);
    }

    const removeQueryKeyValue = (idx) => {
      keyRef.current.value = '';
      valueRef.current.value = '';
    };

    return (
      <div ref={keyValueForm} id={id} className="input-group my-2">
        <input type="text" className="form-control" placeholder="Key" onChange={e => keyOnChange(e, id)} value={key2} ref={keyRef}/>
        <input type="text" className="form-control" placeholder="Value" onChange={e => valueOnChange(e)} value={value} ref={valueRef}/>
        <button type="button" className="btn btn-outline-danger" onClick={removeQueryKeyValue}>Remove</button>
      </div>
    )
  }

  return (
    <div className="p-4">
      <form ref={form} onSubmit={e => sendRequest(e)}>
        <div className="input-group mb-4">
          <select className="form-select flex-grow-0 w-auto" defaultValue="GET" ref={reqMethod}>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="PATCH">PATCH</option>
            <option value="DELETE">DELETE</option>
          </select>
          <input required className="form-control" type="url" placeholder="https://example.com" ref={url}/>
          <button type="submit" className="btn btn-primary">Send</button>
        </div>

        <ul className="nav nav-tabs" role="tablist">
          <li className="nav-item" role="presentation">
            <button 
            className={`nav-link ${tabActive === 0 ? 'active' : ''}`}
            onClick={() => tabClick(0)}
            id="query-params-tab" type="button" role="tab" aria-controls="query-params" aria-selected="false">Query Params</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className={`nav-link ${tabActive === 1 ? 'active' : ''}`}
            onClick={() => tabClick(1)}
            id="request-headers-tab" type="button" role="tab" aria-controls="request-headers" aria-selected="false">Headers</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className={`nav-link ${tabActive === 2 ? 'active' : ''}`}
            onClick={() => tabClick(2)}
            id="json-tab" type="button" role="tab" aria-controls="json" aria-selected="false">JSON</button>
          </li>
        </ul>

        <div className="tab-content p-3 border-top-0 border">
          <div className={`tab-pane fade ${tabActive === 0 ? 'show active' : ''}`} id="query-params" role="tabpanel" aria-labelledby="query-params-tab">
            {queryKeyValue.map((data, i) => {
              console.log('rerender')
              return (
                <KeyValue key={i} id={data.id} key2={data.key} value={data.value} />
              );
            })}
            <button className="mt-2 btn btn-outline-success" type="button" onClick={e => addQueryKeyValue()}>Add</button>
          </div>
          <div className={`tab-pane fade ${tabActive === 1 ? 'show active' : ''}`} id="request-headers" role="tabpanel" aria-labelledby="request-headers-tab">
            {headerKeyValue.map((data, i) => {
              return (
                <KeyValue key={i} id={data.id} key2={data.key} value={data.value} />
              );
            })}
            <button className="mt-2 btn btn-outline-success" type="button" onClick={e => addHeaderKeyValue()}>Add</button>
          </div>
          <div className={`tab-pane fade ${tabActive === 2 ? 'show active' : ''}`} id="json" role="tabpanel" aria-labelledby="json-tab">
            <div className="overflow-auto" style={{maxHeight: '200px'}}>tab 3</div>
          </div>
        </div>
      </form>
    </div>
  );
}