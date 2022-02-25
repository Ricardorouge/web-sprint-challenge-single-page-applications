import React,{useState,useEffect} from "react";
import * as yup from 'yup'


const OrderForm =(props)=>{

    const formSchema = yup.object().shape({
        name:yup
        .string()
        .required('must provide a name for the order')
        .min(2,'name must be at least 2 characters'),
        size:yup
        .string()
        .oneOf(['small','medium','large'],'must choose a size'),
        pepperoni:yup
        .boolean(),
        sausage: yup
        .boolean(),
        pineapple: yup
        .boolean(),
        cheese: yup
        .boolean(),
        special:yup
        .string()
       
    })

    const {orderSubmit} = props
    const [error,setError]=useState({
        name:'',
        size:''
    })

    const [disabled,setDisabled] = useState(true);

    const initialFormState = {
        name:'',
        size:'',
        pepperoni: false,
        sausage: false,
        pineapple: false,
        cheese: false,
        special: ''
    }
    const [form,setForm] = useState(initialFormState)

    const formValidate = evt=>{
        yup.reach(formSchema,evt.target.name)
        .validate(evt.target.type === 'checkbox'? evt.target.checked:evt.target.value)
        .then(res=>{
            setError({...error,[evt.target.name]:''})
        }).catch(err=>{
            setError({...error,[evt.target.name]:err.errors[0]})
        })
    }

    const change = evt=>{
        formValidate(evt)
        const {name, value, checked, type,} = evt.target;
        const valueToUse = type ==='checkbox'?checked:value;
        setForm({...form,[name]:valueToUse})

    }
    const submit =evt=>{
        evt.preventDefault();
        orderSubmit(form)
        setForm(initialFormState)
    }
    useEffect(()=>{
        formSchema.isValid(form).then(valid=>setDisabled(!valid))
    },[form])
        

    return(
        <div>
            <form id ='pizza-form' onSubmit ={submit}>
                <label>Name:
                    <input
                        name='name'
                        type='text'
                        id='name-input'
                        value = {form.name}
                        onChange ={change}
                        placeholder = 'Enter Your Name'
                    />
                </label>
                <label>Pizza size:
                    <select 
                    id ='size-dropdown' value ={form.size} onChange ={change} name= 'size'>
                        <option value = ''>Select a size</option>
                        <option value = 'small'>SMALL</option>
                        <option value = 'medium'>MEDIUM</option>
                        <option value = 'large'>LARGE</option>
                    </select>
                </label>
                <label>pepperoni:
                    <input
                    type='checkbox'
                    name='pepperoni'
                    checked = {form.pepperoni}
                    onChange = {change}
                    />
                </label>
                <label>sausage:
                    <input
                    type='checkbox'
                    name='sausage'
                    checked = {form.sausage}
                    onChange = {change}
                    />
                </label>
                <label>pineapple
                    <input
                    type='checkbox'
                    name='pineapple'
                    checked = {form.pineapple}
                    onChange = {change}
                    />
                </label>
                <label>extra cheese
                    <input
                    type='checkbox'
                    name='cheese'
                    checked = {form.cheese}
                    onChange = {change}
                    />
                </label>
                <label>Special instructions:
                    <input
                        name = 'special'
                        id = 'special-text'
                        type = 'text'
                        value = {form.special}
                        onChange = {change}
                        placeholder ={'enter special instructions'}
                    />
                </label>
                <button
                disabled = {disabled}
                type = 'submit'
                id = 'order-button'

                >Order Now!!</button>
                
            </form>
            <p>{error.name}</p>
            
        </div>
    )
}

export default OrderForm