/******************************************************************************
 * Written by Peter Craftsmn                                                  *
 * Email: peter.craftsmn@gmail.com                                            *
 * All rights reserved Copyright (c) 2019.                                    *
 ******************************************************************************/
import createConstants from "./createConstants";


export const createReducer = objectName => {

    const nameLowerCase = objectName.toLowerCase();
    const nameUpperCase = objectName.toUpperCase();
    const co = createConstants( objectName );

    return {
        [ nameLowerCase + "Reducer" ]: ( state = {}, action ) => {

            if ( action === undefined ) return state;

            switch ( action.type ) {
                case co[ nameUpperCase + "_RESET" ]:
                    return action.payload;

                case co[ nameUpperCase + "_PENDING" ]:
                case co[ nameUpperCase + "_SUCCESS" ]:
                case co[ nameUpperCase + "_ERROR" ]:
                    return {
                        ...state, ...action.payload
                    };
                default:
                    return state;
            }
        }
    };
};


