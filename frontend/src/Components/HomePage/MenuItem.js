import React, {Component} from 'react';


class MenuItem extends Component{

    newArrays(event){
        if(event.target.checked === true){
            this.props.setCurrentFoods([...this.props.currentFoods, {Name:event.target.value, Id:event.target.id}])
        } else {
            this.props.setCurrentFoods(this.props.currentFoods.filter(item => item.Name !== event.target.value));
        }
    }

    render(){
        return(
            <div className="items">
                <li className="item">
                <input type="checkbox" name="newAdd" onChange={this.newArrays.bind(this)} value={this.props.name} id={this.props.idFood}></input>
                <label>{this.props.name}</label>
                </li>
            </div>
        )     
    }

}
export default MenuItem;