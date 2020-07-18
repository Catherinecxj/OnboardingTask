import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { SalesData } from './FetchSales';
import { CustomerData } from './FetchCustomer';
import { ProductData } from './FetchProduct';
import { StoreData } from './FetchStore';
import { Dropdown } from 'react-bootstrap';
import Moment from 'moment';


interface AddSalesDataState {
    title: string;
    loading: boolean;
    salesDetail: SalesDetail;
}

class SalesDetail {
    salData: SalesData = new SalesData;
    custList: CustomerData[] = [];
    prodList: ProductData[] = [];
    storeList: StoreData[] = [];
}

export class AddSales extends React.Component<RouteComponentProps<{}>, AddSalesDataState> {
    constructor(props) {
        super(props);
        this.state = {
            title: "", loading: true, salesDetail: new SalesDetail
        };

        var salid = this.props.match.params["salid"];

        // This will set state for Edit Sales  
        if (salid > 0) {
            fetch('api/Sales/Details/' + salid)
                .then(response => response.json() as Promise<SalesDetail>)
                .then(data => {
                    this.setState({
                        title: "Edit", loading: false, salesDetail: data });
                });
        }
        // This will set state for Add Sales  
        else {

            fetch('api/Sales/GetEmptyDetails/')
                .then(response => response.json() as Promise<SalesDetail>)
                .then(data => {
                    this.setState({
                        title: "Create", loading: false, salesDetail: data
                    });
                });
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
            <h3>Sales</h3>
            <hr />
            {contents}
        </div>;
    }


    // This will handle the submit form event.  
    private handleSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        // PUT request for Edit Sales.  
        if (this.state.salesDetail.salData.id) {
            fetch('api/Sales/Edit', {
                method: 'PUT',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchSales");
                })
        }
        // POST request for Add Sales.  
        else {
            fetch('api/Sales/Create', {
                method: 'POST',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchSales");
                })
        }
    }
    // This will handle Cancel button click event.  
    private handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/fetchSales");
    }
    // Returns the HTML Form to the render() method.  
    private renderCreateForm() {
        Moment.locale('en');
        return (
            <form onSubmit={this.handleSave} >
                <div className="form-group row" >
                    <input type="hidden" name="id" value={this.state.salesDetail.salData.id} />
                </div>

                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="dateSold">DateSold</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="dateSold" required defaultValue={Moment(this.state.salesDetail.salData.dateSold).format('DD/MM/yyyy')} required />
                    </div>
                </div >

                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="productid">Product</label>
                    <div className="col-md-4">
                        <select name="productid" className="form-control" required>
                            {this.state.salesDetail.salData.productId === 0 ? 
                                <option value="" selected>Please select product</option>
                                : null}
                            {this.state.salesDetail.prodList.map((product) => {
                                return (<option value={product.id} selected={this.state.salesDetail.salData.productId === product.id}>{product.name}</option>);
                            })}
                        </select>
                    </div>
                </div >

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="customerid">Customer</label>
                    <div className="col-md-4">
                        <select name="customerid" className="form-control" required>
                            {this.state.salesDetail.salData.customerId === 0 ?
                                <option value="" selected>Please select customer</option>
                                : null}
                            {this.state.salesDetail.custList.map((x) => {
                                return (<option value={x.id} selected={this.state.salesDetail.salData.customerId === x.id}>{x.name}</option>);
                            })}
                        </select>
                    </div>
                </div >

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="storeid">Store</label>
                    <div className="col-md-4">
                        <select name="storeid" className="form-control" required>
                            {this.state.salesDetail.salData.storeId === 0 ?
                                <option value="" selected>Please select store</option>
                                : null}
                            {this.state.salesDetail.storeList.map((x) => {
                                return (<option value={x.id} selected={this.state.salesDetail.salData.storeId === x.id}>{x.name}</option>);
                            })}
                        </select>
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