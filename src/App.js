import logo from './logo.svg';
import './App.css';
import './bootstrap.min.css';
import todos from './todos.json';
import React, { Component } from 'react';
import TodoForm from './components/TodoForm';



class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: []
    }
    this.handleAddTodo = this.handleAddTodo.bind(this)
  }


  // Cargar los todos desde el archivo JSON cuando el componente se monta
  componentDidMount() {
    // Accediendo correctamente a los datos de todos.json
    this.setState({ todos: todos.todos }); // Asignar el array de todos desde el archivo JSON
  }

  handleAddTodo(todo) {
    this.setState({
      todos: [...this.state.todos, todo]
    })
  }

  removeTodo(index) {
    if (window.confirm('Are you sure want to delete it?')) {
      this.setState({
        todos: this.state.todos.filter((e, i) => {
          return i !== index
        })
      })
    }
  }

  render() {
    // .['todos']  acceder a su propiedad para iterar
    const todos = this.state.todos.map((todo, i) => {
      return (
        <div className='cold-md-4 m-2' >

          <div className="card mt-4" key={i}>
            <div className='card-header'>
              {todo.title}
              <span className='badge badge-pill badge-danger ml-2'>{todo.priority}</span>
            </div>

            <div className="card-body">
              <p>{todo.description}</p>
              <p><mark> {todo.responsible}</mark></p>
            </div>
            <div className='card-footer'>
              <button className='btn btn-danger'
                onClick={this.removeTodo.bind(this, i)}
              >Delete</button>
            </div>
          </div>

        </div>

      )
    })


    return (
      <div className="App" >
        <nav className="navbar navbar-dark bg-dark">
          <a href='/' className='text-white'>
            Task  <span className='badge badge-pill badge-info'> {todos.length} </span>
          </a>
        </nav>

        <div className="container">
          <div className="row mt-4">
            <TodoForm onAddTodo={this.handleAddTodo} />

            {todos}
          </div>
        </div>

        <img src={logo} className='App-logo' alt="logo" />
      </div>
    );
  }
}

export default App;
