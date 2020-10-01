/******************************************************************************
 * Written by Peter Craftsmn                                                  *
 * Email: peter.craftsmn@gmail.com                                            *
 * All rights reserved Copyright (c) 2019.                                    *
 ******************************************************************************/
import { createConstants } from "./createConstants";


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
