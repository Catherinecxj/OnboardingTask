import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { CustomerData } from './FetchCustomer';

interface AddCustomerDataState {
    title: string;
    loading: boolean;
    cityList: Array<any>;
    custData: CustomerData;
}
export class AddCustomer extends React.Component<RouteComponentProps<{}>, AddCustomerDataState> {
    constructor(props) {
        super(props);
        this.state = { title: "", loading: true, custData: new CustomerData };
       
        var custid = this.props.match.params["custid"];
        // This will set state for Edit Customer  
        if (custid > 0) {
            fetch('api/Customer/Details/' + custid)
                .then(response => response.json() as Promise<CustomerData>)
                .then(data => {
                    this.setState({ title: "Edit", loading: false, custData: data });
                });
        }
        // This will set state for Add Customer  
        else {
            this.state = { title: "Create", loading: false, cityList: [], custData: new CustomerData };
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
            <h3>Customer</h3>
            <hr />
            {contents}
        </div>;
    }
    // This will handle the submit form event.  
    private handleSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        // PUT request for Edit Customer.  
        if (this.state.custData.id) {
            fetch('api/Customer/Edit', {
                method: 'PUT',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchCustomer");
                })
        }
        // POST request for Add Customer.  
        else {
            fetch('api/Customer/Create', {
                method: 'POST',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchCustomer");
                })
        }
    }
    // This will handle Cancel button click event.  
    private handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/fetchCustomer");
    }
    // Returns the HTML Form to the render() method.  
    private renderCreateForm() {
        return (
            <form onSubmit={this.handleSave} >
                <div className="form-group row" >
                    <input type="hidden" name="Id" value={this.state.custData.id} />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="name">Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="name" required defaultValue={this.state.custData.name} required />
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="address">Address</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="address" required defaultValue={this.state.custData.address} required />
                    </div>
                </div >
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Save</button>
                    <button className="btn btn-default" onClick={this.handleCancel}>Cancel</button>
                </div >
            </form >
        )
    }
}