import { useNavigate } from 'react-router-dom';
import Bracket from './Bracket';
import { Button } from 'react-bootstrap';
import { useContext, useState } from 'react';
import React from 'react';
import { DefaultContext } from '../contexts/DefaultContext';

export default function BracketData(props) {
  const navigate = useNavigate();

  const context = useContext(DefaultContext);

  function addBracketInput() {
    context.setAddBracket((prevBrackets) => [
      ...prevBrackets,
      React.cloneElement(<Bracket />, {
        key: context.uKey,
        ukey: context.uKey,
        onDelete: handleDeleteBracket(),
      }),
    ]);
    context.setUKey((prevKey) => prevKey + 1);
  }
  function handleDeleteBracket(indexToRemove) {
    context.setAddBracket((prevBrackets) => {
      return prevBrackets.filter((_, index) => index !== indexToRemove);
    });
  }

  return (
    <DefaultContext.Consumer>
      {(context) => (
        <div className="bracketData">
          <Bracket ukey={0} />
          {context.addBracket}
          <button className="add-bracket" key="add-btn" onClick={addBracketInput}></button>

          <Button
            className="btn-previous"
            variant="outline-secondary"
            size="sm"
            onClick={() => {
              navigate('/systdata');
            }}
          >
            Назад
          </Button>
          <Button
            className="btn-next"
            variant="outline-secondary"
            size="sm"
            onClick={() => {
              navigate('/coverdata');
            }}
          >
            Далее
          </Button>
        </div>
      )}
    </DefaultContext.Consumer>
  );
}
