
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import { AddStore } from './AddStore';

interface FetchStoreDataState {
    storList: StoreData[];
    loading: boolean;
    showHide: boolean;
}
export class FetchStore extends React.Component<RouteComponentProps<{}>, FetchStoreDataState> {
    constructor() {
        super();
        this.state = { storList: [], loading: true, showHide: false };
        fetch('api/Store/Index')
            .then(response => response.json() as Promise<StoreData[]>)
            .then(data => {
                this.setState({ storList: data, loading: false });
            });
        // This binding is necessary to make "this" work in the callback  
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }
    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderStoreTable(this.state.storList);

        return <div>
            <h1>Store Data</h1>
            <p>This component demonstrates fetching Store data from the server.</p>
            <p>
                <Button href="/Store/addStore">Create New</Button>
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

    // Handle Delete request for an Store  
    private handleDelete(id: number) {
        if (!window.confirm("Do you want to delete Store with Id: " + id))
            return;
        else {
            fetch('api/Store/Delete/' + id, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        storList: this.state.storList.filter((rec) => {
                            return (rec.id != id);
                        })
                    });
            });
        }
    }
    private handleEdit(id: number) {
        this.props.history.push("/Store/edit/" + id);
    }
    // Returns the HTML table to the render() method.  
    private renderStoreTable(storList: StoreData[]) {
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
                {storList.map(stor =>
                    <tr key={stor.id}>
                        <td></td>
                        <td>{stor.id}</td>
                        <td>{stor.name}</td>
                        <td>{stor.address}</td>
                        <td>
                            <Button className="action" variant="warning" onClick={(id) => this.handleEdit(stor.id)}>
                                <i class="far fa-edit"></i> Edit</Button>

                        </td>
                        <td>
                            <Button className="action" variant="danger" onClick={(id) => this.handleDelete(stor.id)}>
                                <i className="far fa-trash-alt"></i> Delete</Button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}
export class StoreData {
    id: number = 0;
    name: string = "";
    address: string = "";
}