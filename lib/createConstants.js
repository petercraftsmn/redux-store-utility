/******************************************************************************
 * Written by Peter Craftsmn                                                  *
 * Email: peter.craftsmn@gmail.com                                            *
 * All rights reserved Copyright (c) 2019.                                    *
 ******************************************************************************/

const createConstants = objectName => {
    const nameUpperCase = objectName.toUpperCase();
    return {
        [ nameUpperCase + "_RESET" ]: nameUpperCase + "_RESET",
        [ nameUpperCase + "_PENDING" ]: nameUpperCase + "_PENDING",
        [ nameUpperCase + "_SUCCESS" ]: nameUpperCase + "_SUCCESS",
        [ nameUpperCase + "_ERROR" ]: nameUpperCase + "_ERROR",
    };
}

export default createConstants;

