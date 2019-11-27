import {Types} from './actions';

const INITIAL_STATE = [
  {
    id: 1,
    title: 'Ligações Automáticas',
    user: {
      name: 'Pedro Entringer',
    },
    likes: 10,
    dislikes: 20,
  },
  {
    id: 2,
    title: 'Ligações Automáticas',
    user: {
      name: 'Pedro Entringer',
    },
    likes: 10,
    dislikes: 20,
  },
  {
    id: 3,
    title: 'Ligações Automáticas',
    user: {
      name: 'Pedro Entringer',
    },
    likes: 10,
    dislikes: 20,
  },
];

export default function post(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.ADD:
      let insert = true;
      state.map(post => {
        if (post.id == action.post.id) {
          insert = false;
        }
      });
      return insert ? [...state, action.payload.post] : state;
    default:
      return state;
  }
}
