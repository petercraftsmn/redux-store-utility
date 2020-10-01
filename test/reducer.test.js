import { createReducer } from "../lib/createReducer";
import { createActions } from "../lib/createActions";

const pr = createReducer( "Products" );
const ac = createActions( "Products" );

describe( 'createReducer test', () => {
    it( 'tests reducer undefined action', () => {
        const initialState = { title: "should be same", pending: false, error: false };
        const finalState = { title: "should be same", pending: false, error: false };

        expect( pr.productsReducer( initialState ) ).toEqual( finalState );
        expect( pr.productsReducer( initialState, {} ) ).toEqual( finalState );
    } );

    it( 'tests reducer reset action', () => {
        const initialState = { title: "should be same", pending: false, error: false };
        const finalState = { pending: false, error: false };

        expect( pr.productsReducer( initialState, ac.productsReset( { pending: false, error: false } ) ) )
            .toEqual( finalState );
    } );

    it( 'tests reducer mutate action', () => {
        const initialState = { title: "should be same", pending: false, error: false };
        const finalState = { title: "should be same", pending: true, error: false };

        expect( pr.productsReducer( initialState, ac.productsMutate( { pending: true } ) ) )
            .toEqual( finalState );
    } );

    it( 'tests reducer success action', () => {
        const initialState = { title: "should be same", pending: true, error: false };
        const finalState = { title: "changed", pending: false, error: false };

        expect( pr.productsReducer( initialState, ac.productsSuccess( { title: "changed", pending: false } ) ) )
            .toEqual( finalState );
    } );

    it( 'tests reducer error action', () => {
        const initialState = { title: "should be same", lead: "lead", pending: true, error: false };
        const finalState = { title: "should be same", lead: "lead", pending: false, error: true };

        expect( pr.productsReducer( initialState, ac.productsSuccess( { pending: false, error: true } ) ) )
            .toEqual( finalState );
    } );
} );
