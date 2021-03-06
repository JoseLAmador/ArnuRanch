import {combineReducers} from 'redux';
import {
    EDIT_ANIMAL_SUCCESS, GET_ANIMALS_SUCCESS, SAVE_ANIMAL_SUCCESS, DELETE_ANIMAL_SUCCESS, GET_ANIMALS_DATA_SUCCESS,
    GET_SINGLE_ANIMAL_SUCCESS, GET_ANSEARCH_SUCCESS
} from "../../actions/ganado/animalsActions";
import {SAVE_ANIMAL_GASTO_SUCCESS} from '../../actions/ganado/gastoAnimalActions';
import {SAVE_PESADA_SUCCESS} from "../../actions/ganado/pesadasActions";

function object(state={}, action){
    switch(action.type){
        case GET_SINGLE_ANIMAL_SUCCESS:
            return action.animal;
        default:
            return state;
    }
}


function list(state=[], action){
    switch(action.type){
        case GET_ANIMALS_SUCCESS:
            return action.animals;
        case SAVE_ANIMAL_SUCCESS:
            return [action.animal, ...state];
        case EDIT_ANIMAL_SUCCESS:
            let newList = state.filter(a=>{
                return a.id!=action.animal.id
            });
            return [action.animal, ...newList];
        case SAVE_ANIMAL_GASTO_SUCCESS:
            let animalId = action.gasto.animal;
            let animal = state.filter(a=>{return a.id==animalId});
            console.log(animal[0]);
            animal = animal[0];
            animal['aliments'] = [...animal.aliments, action.gasto];
            console.log(animal);

            return [...state];
        case SAVE_PESADA_SUCCESS:
            animalId = action.pesada.animal;
            animal = state.filter(a=>{return a.id==animalId});
            console.log(animal[0]);
            animal = animal[0];
            animal['pesadas'] = [...animal.pesadas, action.pesada];
            return [...state];
        case DELETE_ANIMAL_SUCCESS:
            let acualList = state.filter(a=>{
                return a.id!=action.animalId;
            });
            return acualList;
        default:
            return state;
    }
}


function allData(state={}, action){
    switch(action.type){
        case GET_ANIMALS_DATA_SUCCESS:
            return action.data;
        default:
            return state;
    }
}

function animalSearch(state={}, action) {
    switch (action.type){
        case GET_ANSEARCH_SUCCESS:
            return action.animalS;
        default:
            return state;
    }
}


const animalsReducer = combineReducers({
    list:list,
    allData:allData,
    object:object,
    animalSearch:animalSearch,

});

export default animalsReducer