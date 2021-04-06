import { v4 as uuidv4 } from "uuid";
const initialState = {
    workouts: [
        { name: "Jumping Jack", cal: 100, id: uuidv4() },
        { name: "Squat", cal: 30, id: uuidv4() },
    ],
    showAdd: true,
    buttonText: "show"

}


const workoutReducer = (state = initialState, action) => {
    switch (action.type) {
        case "TOGGLE_FIELD":
            //i want this to toggle the add workout to add a new input field
            const text =(state.showAdd ?  "Show" : "Hide")
            return{
                ...state,
                showAdd:!state.showAdd,
                buttonText:text
                
            }
            // adding new workout
            case "ADD_WORK":
                const newWorkout = {
                    name:action.newNAme,
                    cal:action.newCal,
                    id:uuidv4()
                }
                console.log(newWorkout);
    
                return{
                    ...state,
                    workouts:[...state.workouts, newWorkout]
    
                }
            

        case "DELETE_WORK":
        const newArr = state.workouts.filter((currEl)=>{
            return currEl.id !== action.targetId;

        }
        
        );
        
        return {
            ...state,
            workouts : newArr
        }
        
        case "EDIT_WORK":
            console.log(action)
            let updateArr = state.workouts.map((item)=>{
                if(item.id === action.targetId){
                    return {
                        ...item,   
                        name :action.newName,
                        cal : action.newCal
                    }
                    
                }else{
                    return item
                }
            })
            return{
                ...state,
                workouts :updateArr

            }

            


        default: 
        console.log("default")
        return state
    }
}

export default workoutReducer