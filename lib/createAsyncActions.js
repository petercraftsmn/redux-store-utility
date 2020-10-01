import { createActions } from "./createActions";

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
