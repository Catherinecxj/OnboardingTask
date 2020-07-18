import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { StoreData } from './FetchStore';


interface AddStoreDataState {
    title: string;
    loading: boolean;
    cityList: Array<any>;
    storeData: StoreData;
}
export class AddStore extends React.Component<RouteComponentProps<{}>, AddStoreDataState> {
    constructor(props) {
        super(props);
        this.state = { title: "", loading: true, storeData: new StoreData };

        var storid = this.props.match.params["storid"];
        // This will set state for Edit Store  
        if (storid > 0) {
            fetch('api/Store/Details/' + storid)
                .then(response => response.json() as Promise<StoreData>)
                .then(data => {
                    this.setState({ title: "Edit", loading: false, storeData: data });
                });
        }
        // This will set state for Add Store  
        else {
            this.state = { title: "Create", loading: false, cityList: [], storeData: new StoreData };
        }
        // This binding is necessary to make "this" work in the callback  
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm();
        return <div>
            <h1>{this.state.title}</h1>
            <h3>Store</h3>
            <hr />
            {contents}
        </div>;
    }
    // This will handle the submit form event.  
    private handleSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        // PUT request for Edit Store.  
        if (this.state.storeData.id) {
            fetch('api/Store/Edit', {
                method: 'PUT',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchStore");
                })
        }
        // POST request for Add Store.  
        else {
            fetch('api/Store/Create', {
                method: 'POST',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchStore");
                })
        }
    }
    // This will handle Cancel button click event.  
    private handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/fetchStore");
    }
    // Returns the HTML Form to the render() method.  
    private renderCreateForm() {
        return (
            <form onSubmit={this.handleSave} >
                <div className="form-group row" >
                    <input type="hidden" name="Id" value={this.state.storeData.id} />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="name">Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="name" required defaultValue={this.state.storeData.name} required />
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="address">Address</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="address" required defaultValue={this.state.storeData.address} required />
                    </div>
                </div >
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Save</button>
                    <button className="btn" onClick={this.handleCancel}>Cancel</button>
                </div >
            </form >
        )
    }
}