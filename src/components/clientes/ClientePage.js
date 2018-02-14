import React, {Component, Fragment} from 'react';
import {Table, Button, message, Popconfirm, Divider} from 'antd';
import ClienteForm from './ClienteForm';
import * as clientesActions from '../../redux/actions/clientesActions';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {Link} from 'react-router-dom';
import MainLoader from "../common/Main Loader";

const columns = [
    {
        title: 'Cliente',
        dataIndex: 'client',
    },
    {
        title: 'Dirección',
        dataIndex: 'address',
    },
    {
        title: 'E-mail',
        dataIndex: 'email'
    },
    {
        title: 'RFC',
        dataIndex: 'rfc'
    },
    {
        title: 'Actions',
        fixed:'right',
        width:100,
        key: 'action',
        render: (text, record) => (
            <span>
              <Link to={`/admin/clientes/${record.id}`}>Detalle</Link>
            </span>
        ),
    }
];

class ClientePage extends Component {

    state = {
            visible: false,
            selectedRowKeys:[],
            contacto_directo:true,
        };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    deleteCliente=()=>{
        let keys = this.state.selectedRowKeys;
        for(let i in keys){
            this.props.clientesActions.deleteCliente(keys[i])
                .then(r=>{
                    console.log(r)
                }).catch(e=>{
                console.log(e)
            })
        }
        this.setState({selectedRowKeys:[]})
    };
    confirm=(e)=> {
        console.log(e);
        this.deleteCliente();
        message.success('Deleted successfully');
    };

    cancel=(e) =>{
        console.log(e);
    };

    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };
    saveFormRef = (form) => {
        this.form = form;
    };

    handleCreate = (e) => {
        const form = this.form;
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                this.props.clientesActions.saveCliente(values);
                message.success('Guardado con éxito');

                form.resetFields();
                this.setState({ visible: false });
            }else{message.error('Algo fallo, verifica los campos');}

        });
    };

    checkRfc = (rule, value, callback) => {
        if (value === undefined) {
            callback('Verifica el RFC ingresado');
        } else {
            if(value.length < 13){
                callback('Recuerda que son trece dígitos');
            }
            callback()
        }
    };

    checkPhone = (rule, value, callback) => {
        if (value === undefined) {
            callback('El número ingresa debe contener 10 dígitos.');
        } else {
            if(value.length < 10){
                callback('Ingresa un número de 10 dígitos');
            }
            callback()
        }
    };

    handleChange = e => {
        this.setState({
            contacto_directo: e.target.checked
        })
    };

    render() {
        const { visible, selectedRowKeys } = this.state;
        const canDelete = selectedRowKeys.length > 0;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        let {clientes, fetched} = this.props;
        if(!fetched)return(<MainLoader/>);
        return (
            <Fragment>
                <h1>Clientes</h1>

                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={clientes}
                    rowKey={record => record.id}
                    scroll={{x:650}}
                    pagination={false}
                    style={{marginBottom:10}}
                />

                <Button type="primary" onClick={this.showModal}>Agregar</Button>
                <ClienteForm
                    ref={this.saveFormRef}
                    visible={visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    rfc={this.checkRfc}
                    phone={this.checkPhone}
                    handleChange={this.handleChange}
                    contacto={this.state.contacto_directo}

                />


                <Divider type={'vertical'} />

                <Popconfirm title="Are you sure delete this cliente?" onConfirm={this.confirm} onCancel={this.cancel} okText="Yes" cancelText="No">
                    <Button disabled={!canDelete} type="primary" >Delete</Button>
                </Popconfirm>

            </Fragment>
        );
    }
}




function mapStateToProps(state, ownProps) {
    return {
        clientes:state.clientes.list,
        fetched:state.clientes.list!==undefined,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        clientesActions:bindActionCreators(clientesActions, dispatch)
    }
}

ClientePage = connect(mapStateToProps,mapDispatchToProps)(ClientePage);
export default ClientePage;