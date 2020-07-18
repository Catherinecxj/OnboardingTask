
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import { AddProduct } from './AddProduct';

interface FetchProductDataState {
    prodList: ProductData[];
    loading: boolean;
    showHide: boolean;
}
export class FetchProduct extends React.Component<RouteComponentProps<{}>, FetchProductDataState> {
    constructor() {
        super();
        this.state = { prodList: [], loading: true, showHide: false };
        fetch('api/Product/Index')
            .then(response => response.json() as Promise<ProductData[]>)
            .then(data => {
                this.setState({ prodList: data, loading: false });
            });
        // This binding is necessary to make "this" work in the callback  
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }
    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderProductTable(this.state.prodList);

        return <div>
            <h1>Product Data</h1>
            <p>This component demonstrates fetching Product data from the server.</p>
            <p>
                <Button href="/Product/addProduct">Create New</Button>
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

    // Handle Delete request for an Product  
    private handleDelete(id: number) {
        if (!window.confirm("Do you want to delete Product with Id: " + id))
            return;
        else {
            fetch('api/Product/Delete/' + id, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        prodList: this.state.prodList.filter((rec) => {
                            return (rec.id != id);
                        })
                    });
            });
        }
    }
    private handleEdit(id: number) {
        this.props.history.push("/Product/edit/" + id);
    }
    // Returns the HTML table to the render() method.  
    private renderProductTable(prodList: ProductData[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th></th>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>EDIT</th>
                    <th>DELETE</th>
                </tr>
            </thead>
            <tbody>
                {prodList.map(prod =>
                    <tr key={prod.id}>
                        <td></td>
                        <td>{prod.id}</td>
                        <td>{prod.name}</td>
                        <td>{prod.price}</td>
                        <td>
                            <Button className="action" variant="warning" onClick={(id) => this.handleEdit(prod.id)}>
                                <i class="far fa-edit"></i> Edit</Button>

                        </td>
                        <td>
                            <Button className="action" variant="danger" onClick={(id) => this.handleDelete(prod.id)}>
                                <i className="far fa-trash-alt"></i> Delete</Button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}
export class ProductData {
    id: number = 0;
    name: string = "";
    price: number = 0;
}