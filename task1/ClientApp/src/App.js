import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchCustomer } from './components/FetchCustomer';
import { AddCustomer } from './components/AddCustomer';  
import { FetchStore } from './components/FetchStore';
import { AddStore } from './components/AddStore';  
import { FetchProduct } from './components/FetchProduct';
import { AddProduct } from './components/AddProduct';
import { FetchSales } from './components/FetchSales';
import { AddSales } from './components/AddSales';
import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={FetchSales} />

                <Route path='/fetchcustomer' component={FetchCustomer} />
                <Route path='/customer/addcustomer' component={AddCustomer} />
                <Route path='/customer/edit/:custid' component={AddCustomer} />

                <Route path='/fetchstore' component={FetchStore} />
                <Route path='/store/addstore' component={AddStore} />
                <Route path='/store/edit/:storid' component={AddStore} />

                <Route path='/fetchproduct' component={FetchProduct} />
                <Route path='/product/addproduct' component={AddProduct} />
                <Route path='/product/edit/:prodid' component={AddProduct} />

                <Route path='/fetchsales' component={FetchSales} />
                <Route path='/sales/addsales' component={AddSales} />
                <Route path='/sales/edit/:salid' component={AddSales} />
  
            </Layout>
        );
    }
}
