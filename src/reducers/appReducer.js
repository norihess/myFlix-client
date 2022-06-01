export default function appReducer(state = [], action)
{
    switch (action.type)
    {
        case 'addMovies':
            return action.value
        default:
            return state;
    }
}
    