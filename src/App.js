import './App.css';
import { useRef } from 'react'
import { connect } from 'react-redux'
import Meals from './components/meals/Meals'
import Workout from './components/workout/Workout'
import Sidebar from './components/sidebar/Sidebar'
import CaloriesCounter from './components/caloriesCounter/CaloriesCounter'

const App = (props) => {
  return (
    <div className="App">
      <div className='sidebar-wrapper' >
        <Sidebar />
      </div>
      <div className='main-wrapper'>
        <div className='CaloriesCounter-wrapper' >
          <CaloriesCounter />
        </div>
        <div className='cards-wrapper'>
          <div className='meals-wrapper'>
            <Meals />
          </div>
          <div className='workout-wrapper'>
            <Workout />
          </div>
        </div>
      </div>
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
    meals: state.user.meals,
    workout: state.user.workout,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
