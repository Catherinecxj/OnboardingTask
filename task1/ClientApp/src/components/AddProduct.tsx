import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { ProductData } from './FetchProduct';


interface AddProductDataState {
    title: string;
    loading: boolean;
    cityList: Array<any>;
    prodData: ProductData;
}
export class AddProduct extends React.Component<RouteComponentProps<{}>, AddProductDataState> {
    constructor(props) {
        super(props);
        this.state = { title: "", loading: true, prodData: new ProductData };

        var prodid = this.props.match.params["prodid"];
        // This will set state for Edit Product  
        if (prodid > 0) {
            fetch('api/Product/Details/' + prodid)
                .then(response => response.json() as Promise<ProductData>)
                .then(data => {
                    this.setState({ title: "Edit", loading: false, prodData: data });
                });
        }
        // This will set state for Add Product  
        else {
            this.state = { title: "Create", loading: false, cityList: [], prodData: new ProductData };
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
            <h3>Product</h3>
            <hr />
            {contents}
        </div>;
    }
    // This will handle the submit form event.  
    private handleSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        // PUT request for Edit Product.  
        if (this.state.prodData.id) {
            fetch('api/Product/Edit', {
                method: 'PUT',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchProduct");
                })
        }
        // POST request for Add Product.  
        else {
            fetch('api/Product/Create', {
                method: 'POST',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchProduct");
                })
        }
    }
    // This will handle Cancel button click event.  
    private handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/fetchProduct");
    }
    // Returns the HTML Form to the render() method.  
    private renderCreateForm() {
        return (
            <form onSubmit={this.handleSave} >
                <div className="form-group row" >
                    <input type="hidden" name="Id" value={this.state.prodData.id} />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="name">Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="name" required defaultValue={this.state.prodData.name} required />
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="price">Price</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="price" required defaultValue={this.state.prodData.price} required />
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