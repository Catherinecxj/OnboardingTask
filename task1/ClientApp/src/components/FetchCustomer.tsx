
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Button, Modal  } from 'react-bootstrap';

interface FetchCustomerDataState {
    custList: CustomerData[];
    loading: boolean;
    showHide: boolean;
}
export class FetchCustomer extends React.Component<RouteComponentProps<{}>, FetchCustomerDataState> {
    constructor() {
        super();
        this.state = { custList: [], loading: true, showHide: false };
        fetch('api/Customer/Index')
            .then(response => response.json() as Promise<CustomerData[]>)
            .then(data => {
                this.setState({ custList: data, loading: false });
            });
        // This binding is necessary to make "this" work in the callback  
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }
    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCustomerTable(this.state.custList);

        return <div>
            <h1>Customer Data</h1>
            <p>This component demonstrates fetching Customer data from the server.</p>
            <p>
                <Button href="/Customer/addCustomer">Create New</Button>
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

    // Handle Delete request for an Customer  
    private handleDelete(id: number) {
        if (!window.confirm("Do you want to delete Customer with Id: " + id))
            return;
        else {
            fetch('api/Customer/Delete/' + id, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        custList: this.state.custList.filter((rec) => {
                            return (rec.id != id);
                        })
                    });
            });
        }
    }
    private handleEdit(id: number) {
        this.props.history.push("/Customer/edit/" + id);
    }
    // Returns the HTML table to the render() method.  
    private renderCustomerTable(custList: CustomerData[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th></th>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>EDIT</th>
                    <th>DELETE</th>
                </tr>
            </thead>
            <tbody>
                {custList.map(cust =>
                    <tr key={cust.id}>
                        <td></td>
                        <td>{cust.id}</td>
                        <td>{cust.name}</td>
                        <td>{cust.address}</td>
                        <td>
                            <Button className="action" variant="warning" onClick={(id) => this.handleEdit(cust.id)}>
                                <i class="far fa-edit"></i> Edit</Button>

                        </td>
                        <td>
                            <Button className="action" variant="danger" onClick={(id) => this.handleDelete(cust.id)}>
                                <i className="far fa-trash-alt"></i> Delete</Button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}
export class CustomerData {
    id: number = 0;
    name: string = "";
    address: string = "";
}