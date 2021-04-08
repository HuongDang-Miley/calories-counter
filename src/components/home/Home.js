import React, { useEffect, useState } from "react";
import { Link, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from 'axios'
// import { Switch } from "@material-ui/core";
import Login from "../login/Login";
import { Register } from "../register/Register";
import { connect } from "react-redux";
import Meals from "../meals/Meals";
import Workout from "../workout/Workout";
import Sidebar from "../sidebar/Sidebar";
import { stayUp } from "../../stores/actions/authActionCreator";
import { TopNav } from "../topNav/TopNav";
import { v4 as uuidv4 } from "uuid";
import jwtDecode from 'jwt-decode';
import '../../App.css'
import '../sidebar/sidebar.css'
// import Workout from '../workout/Workout'

const Home = (props) => {
  let [userId, setUserId] = useState('')
  let [isAuth, setIsAuth] = useState(false)
  let [allMeals, setAllMeals] = useState([])

  useEffect(() => {
    let getToken = localStorage.getItem("jwtToken");
    let user = jwtDecode(getToken)
    setUserId(user.id)
    setIsAuth(true)

    // // Fetch Meals in Backend
    // axios.get('http://localhost:4000/api/meals/view-meals/606d0251a11618c9eefcb3c7')
    //   // .then(result => {return setAllMeals(result.data)})
    //   .then(result => localStorage.setItem('allMeal', result.data))

  }, []);

  // console.log(data)
  // console.log(allMeals)


  return (
    <div>
      HOME<br></br>
      {isAuth ? (
        <div className="App">
          <div className='sidebar-wrapper' >
            <Sidebar
              workouts={props.workouts}
              meals={props.meals}
              deleteAllMeals={props.deleteAllMeals}
              deleteAllWorkouts={props.deleteAllWorkouts}
            />
          </div>
          <div className='main-wrapper'>
            <div className='TopNav-wrapper' >
              <TopNav
                setIsAuth={setIsAuth}
                isAuth={isAuth}
              />
            </div>
            <div className='meals-n-workout-wrapper'>
              <div className='meals-wrapper'>
                <Meals
                  meals={props.meals}
                  addFood={props.addFood}
                  deleteFood={props.deleteFood}
                  deleteMeal={props.deleteMeal}
                  editFood={props.editFood}
                  editMeal={props.editMeal}
                  handleSelectMeal={props.handleSelectMeal}
                />
              </div>
              <div className='workout-wrapper'>
                <Workout
                  workouts={props.workouts}
                  addWorkout={props.addWorkout}
                  editWorkout={props.editWorkout}
                  deleteWorkout={props.deleteWorkout}
                />
              </div>
            </div>
          </div>
        </div>
        // {props.isAuth ? (
        // =============================================================
        // <div className='App'>
        //   <div className="TopNav-wrapper">
        //     <TopNav
        //       setIsAuth={setIsAuth}
        //       isAuth={isAuth} />
        //   </div>
        //   <div className="sidebar-wrapper">
        //     <Sidebar
        //       workouts={props.workouts}
        //       meals={props.meals}
        //       deleteAllMeals={props.deleteAllMeals}
        //       deleteAllWorkouts={props.deleteAllWorkouts}


        //     />
        //   </div>
        //   <div className="meals-wrapper">
        //     <Meals
        //       meals={props.meals}
        //       addFood={props.addFood}
        //       deleteFood={props.deleteFood}
        //       deleteMeal={props.deleteMeal}
        //       editFood={props.editFood}
        //       editMeal={props.editMeal}
        //       handleSelectMeal={props.handleSelectMeal}
        //     />
        //   </div>
        //   <div className="workout-wrapper">
        //     <Workout
        //       deleteWorkout={props.deleteWorkout}
        //       toggleField={props.toggleField}
        //       workouts={props.workouts}
        //       editWorkout={props.editWorkout}
        //       addWorkout={props.addWorkout}
        //     />{" "}
        //   </div>
        // </div>

        // =============================================================
      ) : (
        <div>
          <Link to="/login">LOGIN</Link>
          <br></br>
          <Link to="/register">REGISTER</Link>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    // state: state,
    isAuth: state.login_Reducer,
    meals: state.meals_Reducer,
    workouts: state.workout_Reducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showAllMeals: (meals) => {
      dispatch({
        type: "SHOW_ALL_MEALS",
        meals: meals
      })
    },
    addFood: (targetId, food, cal) =>
      dispatch({
        type: "ADD_FOOD",
        targetId: targetId,
        newFood: { id: uuidv4(), name: food, cal: cal },
      }),
    deleteFood: (targetMealId, targetFoodId) =>
      dispatch({
        type: "DELETE_FOOD",
        targetMealId: targetMealId,
        targetFoodId: targetFoodId,
      }),
    deleteMeal: (targetMealId) =>
      dispatch({ type: "DELETE_MEAL", targetMealId: targetMealId }),
    editFood: (targetMealId, targetFoodId, name, cal) =>
      dispatch({
        type: "EDIT_FOOD",
        targetMealId: targetMealId,
        targetFoodId: targetFoodId,
        name: name,
        cal: cal,
      }),
    editMeal: (targetMealId, name) =>
      dispatch({ type: "EDIT_MEAL", targetMealId: targetMealId, name: name }),
    handleSelectMeal: async (mealType) => {
      dispatch({ type: "ADD_MEAL", mealType: mealType });
    },

    // -------workout
    deleteWorkout: (id) => dispatch({ type: "DELETE_WORKOUT", targetId: id }),
    toggleField: () => dispatch({ type: "TOGGLE_FIELD" }),
    editWorkout: (targetId, name, cal) =>
      dispatch({ type: "EDIT_WORKOUT", targetId: targetId, newName: name, newCal: cal }),
    addWorkout: (name, cal) =>
      dispatch({ type: "ADD_WORKOUT", newName: name, newCal: cal }),

    // -------workout
    // ------sidebar
    deleteAllMeals: () => (dispatch({ type: 'DELETE_ALL_MEALS' })),
    deleteAllWorkouts: () => (dispatch({ type: 'DELETE_ALL_WORKOUTS' }))
    // ------sidebar
  };
};

// export default connect(mapStateToProps, mapDispatchToProps)(App);
export default connect(mapStateToProps, mapDispatchToProps)(Home);