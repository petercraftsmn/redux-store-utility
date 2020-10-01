/******************************************************************************
 * Written by Peter Craftsmn                                                  *
 * Email: peter.craftsmn@gmail.com                                            *
 * All rights reserved Copyright (c) 2019.                                    *
 ******************************************************************************/
import thunk from "redux-thunk";
import configureMockStore from 'redux-mock-store';
import fetchMock from "fetch-mock";
import { createActions, createAsyncActions } from "../lib/createActions";
import initialState from "../lib/initialState";
import { Request } from "node-fetch";


const act = createActions( "Products" );
const actAsy = createAsyncActions( "Products" );
const middleware = [ thunk ];
const mockStore = configureMockStore( middleware );


describe( 'Action creator test', () => {
    it( "productReset action creator test", () => {
        const expectedAction = {
            type: "PRODUCTS_RESET",
            payload: initialState.products
        };
        expect( act.productsReset( initialState.products ) ).toEqual( expectedAction )
    } );

    it( "productMutate action creator test", () => {
        const expectedAction = {
            type: "PRODUCTS_PENDING",
            payload: initialState.products
        };
        expect( act.productsMutate( initialState.products ) ).toEqual( expectedAction )
    } );

    it( "productSuccess action creator test", () => {
        const expectedAction = {
            type: "PRODUCTS_SUCCESS",
            payload: initialState.products
        };
        expect( act.productsSuccess( initialState.products ) ).toEqual( expectedAction )
    } );

    it( "productError action creator test", () => {
        const expectedAction = {
            type: "PRODUCTS_ERROR",
            payload: initialState.products
        };
        expect( act.productsError( initialState.products ) ).toEqual( expectedAction )
    } );
} );

describe( 'Async action creator test', () => {

    const request = new Request( 'localhost/',
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        } );

    afterEach( () => {
        fetchMock.restore();
    } );

    it( 'tests Get async function', () => {
        const store = mockStore( { products: [] } );
        fetchMock.get( "localhost/",
            {
                body: [ 'product one' ], status: 200,
                headers: { 'Content-type': 'application/json' }
            } );
        const expectedActions = [
            { type: 'PRODUCTS_PENDING', payload: { pending: true } },
            { type: 'PRODUCTS_SUCCESS', payload: [ 'product one' ] },
            { type: 'PRODUCTS_PENDING', payload: { pending: false } },
        ];

        return store.dispatch( actAsy.productsFetch( request ) )
            .then( () => {
                // console.log( store.getActions()[ 0 ] );
                // console.log( store.getActions()[ 1 ] );
                expect( store.getActions() ).toEqual( expectedActions )
            } );
    } );

    it( 'tests Get not found async function', () => {
        const store = mockStore( { products: [] } );
        fetchMock.get( "localhost/",
            {
                body: { error: "not found" }, status: 404,
                headers: { 'Content-type': 'application/json' }
            }
        );
        const expectedActions = [
            { type: 'PRODUCTS_PENDING', payload: { pending: true } },
            { type: 'PRODUCTS_ERROR', payload: { error: 'not found' } },
            { type: 'PRODUCTS_PENDING', payload: { pending: false } }, ];

        return store.dispatch( actAsy.productsFetch( request ) )
            .then( () => {
                expect( store.getActions() ).toEqual( expectedActions )
            } );
    } );
} );
