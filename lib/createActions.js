/******************************************************************************
 * Written by Peter Craftsmn                                                  *
 * Email: peter.craftsmn@gmail.com                                            *
 * All rights reserved Copyright (c) 2019.                                    *
 ******************************************************************************/
import createConstants from "./createConstants";


export const createActions = objectName => {
    const nameLowerCase = objectName.toLowerCase();
    const nameUpperCase = objectName.toUpperCase();
    const co = createConstants( objectName );
    return {
        [ nameLowerCase + "Reset" ]: ( resetValue ) => {
            return {
                type: co[ nameUpperCase + "_RESET" ],
                payload: resetValue
            }
        },
        [ nameLowerCase + "Mutate" ]: ( pendingValue ) => {
            return {
                type: co[ nameUpperCase + "_PENDING" ],
                payload: pendingValue
            }
        },
        [ nameLowerCase + "Success" ]: ( successValue ) => {
            return {
                type: co[ nameUpperCase + "_SUCCESS" ],
                payload: successValue
            }
        },
        [ nameLowerCase + "Error" ]: ( errorValue ) => {
            return {
                type: co[ nameUpperCase + "_ERROR" ],
                payload: errorValue
            }
        },
    };
};

export const createAsyncActions = objectName => {
    const nameLowerCase = objectName.toLowerCase();
    const ac = createActions( objectName );
    return {
        [ nameLowerCase + "Fetch" ]: ( requestObject ) => {
            return dispatch => {
                dispatch( ac[ nameLowerCase + "Mutate" ]( { pending: true } ) );
                return fetch( requestObject )
                    .then( res => {
                        if ( !res.ok ) {
                            Promise.resolve( res.json() )
                                .then( res => {
                                    dispatch( ac[ nameLowerCase + "Error" ]( { error: res.error } ) );
                                    dispatch( ac[ nameLowerCase + "Mutate" ]( { pending: false } ) );
                                } )
                                .catch( error => {
                                    dispatch( ac[ nameLowerCase + "Error" ]( { error: error } ) );
                                    dispatch( ac[ nameLowerCase + "Mutate" ]( { pending: false } ) );
                                } )
                        } else {
                            Promise.resolve( res.json() )
                                .then( res => {
                                    dispatch( ac[ nameLowerCase + "Success" ]( res ) );
                                    dispatch( ac[ nameLowerCase + "Mutate" ]( { pending: false } ) );
                                } )
                                .catch( error => {
                                    dispatch( ac[ nameLowerCase + "Error" ]( { error: error } ) );
                                    dispatch( ac[ nameLowerCase + "Mutate" ]( { pending: false } ) );
                                } )
                        }
                    } )
                    .catch( error => {
                        dispatch( ac[ nameLowerCase + "Error" ]( { error: error } ) );
                        dispatch( ac[ nameLowerCase + "Mutate" ]( { pending: false } ) )
                    } );
            }
        }
    };
};
