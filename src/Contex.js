import React, { Component } from 'react'
import { rowData } from './appData'

const ProductContext = React.createContext();
 class ProductProvider extends Component {
  componentDidUpdate(){
  localStorage.setItem("products", JSON.stringify(this.state.AllData));
}
  state = {
    AllData : JSON.parse(localStorage.getItem("products")) || rowData,
    id : '',
    title : '',
    info : '',
    company : '',
    updateEdit : []
  }
  getRecord = (id) =>{
    const product = this.state.AllData.find(item=>item.id === id);
    return product;
  }
  onEdit = (id)=>{
    const tempProduct = this.state.AllData;
    const index = tempProduct.indexOf(this.getRecord(id));
    const slectedRecord = tempProduct[index];
    this.setState({
      id: slectedRecord['id'],
      title: slectedRecord['title'],
      info: slectedRecord['info'],
      price: slectedRecord['price'],
      company: slectedRecord['company']
      
    })
  }
  updateValue=(e,test)=>{
    if(test === 'title'){
      this.state.title = e.target.value
    }

    if(test === 'info'){
      this.state.info = e.target.value

    }if(test === 'price'){
      this.state.price = e.target.value

    }if(test === 'company'){
      this.state.company = e.target.value
    }
    const tempArr = [this.state.id,this.state.title,this.state.info,this.state.price,this.state.company]
    this.setState({
      updateEdit : tempArr
    })
  }
  onSave =()=>{
    if(!this.state.title || !this.state.info || !this.state.price || !this.state.company){
    alert("Please fill all fields");
    return;
  }
    if(this.state.id!==''){
      const saveRecord = this.state.AllData;
      const index = saveRecord.indexOf(this.getRecord(this.state.id));
      const Record = saveRecord[index]
      Record['title']=this.state.updateEdit[1];
      Record['info']=this.state.updateEdit[2];
      Record['price']=this.state.updateEdit[3];
      Record['company']=this.state.updateEdit[4];
      this.setState({
        AllData :[...this.state.AllData],
        id:"",title:"",info:"",company : ""
      })
    }else{
      const MaxId = Math.max(...this.state.AllData.map(item=>item.id));
      const id = MaxId+1;
      const newArr = {
  id: id,
  title: this.state.updateEdit[1],
  info: this.state.updateEdit[2],
  price: this.state.updateEdit[3],
  company: this.state.updateEdit[4]
};
      this.setState({
        AllData :[...this.state.AllData,newArr],
        id:"",title:"",info:"",company : ""
      })
    }
  }
  onDelete = (id)=>{
    const tempProduct = this.state.AllData.filter(item=>item.id!==id);
    this.setState({
      AllData:tempProduct
    })
  }
  render() {
    // console.log(this.state.AllData);
    
    return (
      <div>
        <ProductContext.Provider
         value={{...this.state,
          onEdit : this.onEdit,
          updateValue :this.updateValue,
          onSave : this.onSave,
          onDelete:this.onDelete
         }}
        >
           {this.props.children}
        </ProductContext.Provider>
      </div>
    )
  }
}
const ProductConsumer = ProductContext.Consumer

export {ProductProvider,ProductConsumer}