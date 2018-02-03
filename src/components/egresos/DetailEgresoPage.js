import React, {Component} from 'react';
import {Card, Select} from 'antd';
import EgresoInfo from "./InfoEgreso";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as egresoActions from '../../redux/actions/egresosActions';
import MainLoader from "../common/Main Loader";
const Option = Select.Option;

const opciones = [{
    name :'Cerdos',
    id: 1
},
    {
        name:'Ganado',
        id:2
    },
    {
        name:'Granos',
        id:3
    },
    {
        name:'Planta de alimentos',
        id:4
    },
    {
        name:'Campo',
        id:5
    },

];

class DetailEgresoPage extends Component{
    state={
        editMode:false,
    };

    handleEditMode=()=>{
        this.setState({editMode:!this.state.editMode})
    };

    render(){
        let {egreso, fetched} = this.props;
        let {editMode} = this.state;
        if(!fetched)return(<MainLoader/>);
        let options = opciones.map(o => <Option title={o.name} value={o.name} key={o.id}>{o.name}</Option>);
        return(
            <div style={{width:'40%', margin: '0 auto'}} >
                <Card title={"Detalle"}>
                    <EgresoInfo
                        {...egreso}
                        editEgreso={this.props.egresoActions.editEgreso}
                        handleEditMode={this.handleEditMode}
                        editMode={editMode}
                        options={options}
                    />
                </Card>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    let id = ownProps.match.params.eg;
    let egreso = state.egresos.list.filter(a=>{
        return id == a.id;
    });
    egreso = egreso[0];
    return {
        egreso,
        fetched: egreso!==undefined && state.egresos.list!==undefined,
    }
}

function mapDispatchToProps(dispatch) {
    return{
        egresoActions: bindActionCreators(egresoActions, dispatch),
    }
}

DetailEgresoPage = connect(mapStateToProps, mapDispatchToProps)(DetailEgresoPage);
export default DetailEgresoPage;