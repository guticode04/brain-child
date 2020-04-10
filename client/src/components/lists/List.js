import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useState, useRef, useEffect } from 'react';
import Loading from '../ui/Loading';
import Card from '../cards/Card';
import { GET_LIST } from '../../graphql/queries/list';
import CardCreateForm from '../cards/CardCreateForm';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { UPDATE_LIST_CARDS } from '../../graphql/mutations/list';

const List = (props) => {
  const { listId, list } = props;

  const [createMode, setCreateMode] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (ref && ref.current) {
      const documentClick = function (e) {
        if (!ref.current.contains(e.target)) {
          setCreateMode(false);
        }
      };
      document.addEventListener('click', documentClick);
      return () => {
        document.removeEventListener('click', documentClick);
      };
    }
  });

  const handleClick = (e) => {
    e.preventDefault();
    if (!createMode) {
      setCreateMode(true);
    }
  };

  return (
    <Droppable droppableId={listId}>
      {(provided, snapshot) => (
        <div
          className={
            snapshot.isDraggingOver
              ? 'transparent-black text-black shadow-md p-2 mx-5 rounded list-min-width self-start'
              : 'bg-gray-300 shadow-md p-2 mx-5 rounded list-min-width self-start'
          }
        >
          <h3>{list.name}</h3>
          <ul
            className="min-list-height"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {list.cards.map((card, index) => {
              return (
                <Draggable draggableId={card._id} key={card._id} index={index}>
                  {(provided, snapshot) => (
                    <li
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      key={card._id}
                    >
                      <Card card={card} isDragging={snapshot.isDragging} />
                    </li>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </ul>
          {createMode ? (
            <div ref={ref}>
              <CardCreateForm listId={listId} setCreateMode={setCreateMode} />
            </div>
          ) : (
            <button onClick={(e) => handleClick(e)}>Add a Card</button>
          )}
        </div>
      )}
    </Droppable>
  );
};

export default List;
