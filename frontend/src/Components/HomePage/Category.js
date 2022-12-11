import MenuItem from "./MenuItem";
import React, {Component} from 'react';
import "../Css/HomePage/Category.scss";
import suma from "../Images/suma-icon.png";
import resta from "../Images/resta-icon.png";

class category extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            visible: false
        }
    }

    handleClick(event){
        event.preventDefault();
        this.setState({
            visible: !this.state.visible
        })
    }

    render(){
        return(
            <div className="a">
                <div className="category" onClick={this.handleClick.bind(this)}>
                    <div className="icon-container"><img className="icon-category" src={this.state.visible? resta:suma}></img></div>
                    <h3>{this.props.name}</h3>
                </div>
            
                <ul className={this.state.visible?'visible':'no-visible'}>
                    {this.props.items.map((item)=> {
                        return(
                            <MenuItem name={item.Name} idFood={item.Id}  currentFoods={this.props.currentFoods} setCurrentFoods={this.props.setCurrentFoods} key={item.IdFood}/>
                        )
                    })}
                </ul>
            </div>
        )
    }

}
export default category;