import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as mutations from '../store/mutations';
import { ConnectedCustomerNavigation } from './CustomerNavigation';
import CSVReader from "react-csv-reader";

const CustomerUpload = ({
    sessionID,
    uploadData,
    parserOptions,
    uploadCustomer
    }) => (
    <div className="row">
        <ConnectedCustomerNavigation />
        <div>
            <h2 className="p-2 m-2">Upload Customer</h2>
            <form className="card p-2 m-2" onSubmit={(e)=>uploadCustomer(sessionID, e, uploadData)}>
                <div className="form-group">
                    <CSVReader
                        cssInputClass="form-control"
                        label="Select CSV"
                        onFileLoaded={(data, fileInfo) => {uploadData = data; console.log(data);}}
                        parserOptions={parserOptions}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Upload</button>
            </form>    
        </div>    
    </div>
);

const mapStateToProps = (state, ownProps) => {
    let id = state.session.id;
    let parserOptions = {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
    }
    return {
        sessionID: id,
        uploadData: [],
        parserOptions: parserOptions
    }

}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        uploadCustomer(ownerID, e, uploadData) {
            e.preventDefault();
            //Validate
            if (uploadData.length !== 0) {
                dispatch(mutations.requestCustomersCreation(ownerID, uploadData));
            }
        }
    }
};

export const ConnectedCustomerUpload = connect(mapStateToProps, mapDispatchToProps) (CustomerUpload)