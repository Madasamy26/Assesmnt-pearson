import calendar from '../calendar.json'

const CalendarReducer = (state = [], action) => {

    switch (action.type) {
        case 'intital_people':
            return calendar.Calendar;
        case 'ADD_POST':
            return state.concat([action.data]);
        case 'DELETE_POST':
            return state.filter((calendar) => calendar.id !== action.id)

        default:
            return calendar.Calendar;
    }

}
export default CalendarReducer;


