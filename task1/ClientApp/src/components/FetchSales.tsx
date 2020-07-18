
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Button, Modal } from 'react-bootstrap';

import { CustomerData } from './FetchCustomer';
import { ProductData } from './FetchProduct';
import { StoreData } from './FetchStore';

import Moment from 'moment';



interface FetchSalesDataState {
    salList: SalesData[];
    loading: boolean;
    showHide: boolean;
}
export class FetchSales extends React.Component<RouteComponentProps<{}>, FetchSalesDataState> {
    constructor() {
        super();
        this.state = { salList: [], loading: true, showHide: false };
        fetch('api/Sales/Index')
            .then(response => response.json() as Promise<SalesData[]>)
            .then(data => {
                this.setState({ salList: data, loading: false });
            });
        // This binding is necessary to make "this" work in the callback  
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }
    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderSalesTable(this.state.salList);

        return <div>
            <h1>Sales Data</h1>
            <p>This component demonstrates fetching Sales data from the server.</p>
            <p>
                <Button href="/Sales/addSales">Create New</Button>
            </p>
            {contents}


            <Modal show={this.state.showHide} size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.handleModalShowHide()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => this.handleModalShowHide()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>;
    }

    private handleModalShowHide() {
        this.setState({ showHide: !this.state.showHide })
    }

    // Handle Delete request for an Sales  
    private handleDelete(id: number) {
        if (!window.confirm("Do you want to delete Sales with Id: " + id))
            return;
        else {
            fetch('api/Sales/Delete/' + id, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        salList: this.state.salList.filter((rec) => {
                            return (rec.id != id);
                        })
                    });
            });
        }
    }
    private handleEdit(id: number) {
        this.props.history.push("/Sales/edit/" + id);
    }
    // Returns the HTML table to the render() method.  
    private renderSalesTable(salList: SalesData[]) {
        Moment.locale('en');
        return <table className='table'>
            <thead>
                <tr>
                    <th></th>
                    <th>Id</th>
                    <th>Product</th>
                    <th>Customer</th>
                    <th>Store</th>
                    <th>DateSold</th>
                    <th>EDIT</th>
                    <th>DELETE</th>
                </tr>
            </thead>
            <tbody>
                {salList.map(sal =>
                    <tr key={sal.id}>
                        <td></td>
                        <td>{sal.id}</td>
                        <td>{sal.product.name}</td>
                        <td>{sal.customer.name}</td>
                        <td>{sal.store.name}</td>
                        <td>{Moment(sal.dateSold).format('DD/MM/yyyy')}</td>
                        <td>
                            <Button className="action" variant="warning" onClick={(id) => this.handleEdit(sal.id)}>
                                <i className="far fa-edit"></i> Edit</Button>

                        </td>
                        <td>
                            <Button className="action" variant="danger" onClick={(id) => this.handleDelete(sal.id)}>
                                <i className="far fa-trash-alt"></i> Delete</Button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}
export class SalesData {
    id: number = 0;
    productId: number = 0;
    customerId: number = 0;
    storeId: number = 0;
    dateSold: Date = new Date;

    customer: CustomerData = new CustomerData;
    product: ProductData = new ProductData;
    store: StoreData = new StoreData;
}