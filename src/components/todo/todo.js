import React from 'react'
import { useState , useEffect } from 'react'
import './style.css'

const getLocalData = () =>{
    const lists = localStorage.getItem("todo")
    
    if(lists){
       
        return(JSON.parse(lists))
    }
    else{
        return ([])
    }

}

const Todo = () => {
    const [input,setInputData] = useState('')
    const [items,setItems] = useState(getLocalData())
    const [editItem,setEditItem] = useState('')
    const [toggleButton,setToggleButton]=useState(false)

    const newInputItems = {
        id: new Date().getTime().toString(),
        name:input
    }




    const addItems = () =>{
        if(!input){
            alert("fill up the item")
        }
        else if(input && toggleButton){
            
            setItems(
                items.map((ele)=>{
                    if(ele.id === editItem){
                        console.log(editItem)
                        return(
                            {...ele,name:input}
                        )
                        
                    }
                    return(ele)
                    
                })
            )
            setToggleButton(false)
            setInputData("")
            setEditItem("")
        }
        else{
            setItems([...items,newInputItems])
            setInputData('')
        }
    }
    const deleteItem=(id)=>{
        
        const newItem=items.filter((item)=>
        item.id !== id)
       
        setItems(newItem)
    }
    const removeAll=()=>{
        setItems([])
    }
    const editItems = (id) =>{
        const edit_element_id = items.find((edit_item)=>
            edit_item.id === id
        )
        setToggleButton(true)
        setInputData(edit_element_id.name)
        setEditItem(id)

    } 


    
    useEffect(() => {
        // const localStorageKey = new Date().toDateString()
       
        localStorage.setItem("todo",JSON.stringify(items))
    
    }, [items])

    useEffect(()=>{
        document.title=`Tasks(${items.length})`
    })
    
  return (
    <> 
    
    <div className="main-div">
        <div className="child-div">
        <figure>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/GNOME_Todo_icon_2019.svg/1024px-GNOME_Todo_icon_2019.svg.png" alt="Todo" width={50}/>
            <figcaption>Add your daily list here</figcaption>
        </figure>
        <div className="addItems">
            <input 
            type="text" 
            placeholder="📝 Add items"
            className='form-control'
            value={input}
            onChange={(e)=>{
                setInputData(e.target.value)
            }}
            />
            {toggleButton ? 
            <i className='fa fa-solid fa-edit add-btn' onClick={addItems}></i> :
            <i className='fa fa-solid fa-plus add-btn' onClick={addItems}></i>}

        </div>
        <div className="showItems">

            {items.map((value)=>{
                return(
                <div className="eachItem" key={value.id}>
                <h3>{value.name}</h3>
                    <div className="todo-btn">
                        <i className='far fa-solid fa-edit add-btn' onClick={()=>editItems(value.id)}></i>
                        <i className='far fa-solid fa-trash-alt add-btn' onClick={()=>deleteItem(value.id)}></i>
                    </div>
                </div>
                )

            })}
            
        </div>
        <div className="showItems">
            <button className="btn effect04" data-sm-link-text ="Remove All">
                <span onClick={removeAll}>Check List</span>
            </button>
        </div>
       
        </div>
        
    </div>
    </>
  )
}

export default Todo