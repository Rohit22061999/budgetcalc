import React, { useEffect, useRef, useState } from 'react'
import { Form, Row, Col, Table } from 'react-bootstrap'
import {Button} from '@mui/material'
import SavingsIcon from '@mui/icons-material/Savings';
import MoneyIcon from '@mui/icons-material/Money';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios'

export default function Budget() {
    let user = JSON.parse(localStorage.getItem("user"))
    const Budget = useRef(null)
    const Expensetitle = useRef(null)
    const Expensevalue = useRef(null)
    const [expense, setexpense] = useState(user.expenditure);
    const [money, setmoney] = useState({ budget: 0, expenses: 0, savings: 0 })
    const [state, updateState] = useState({ index: null, update: 0, prevAmount: 0 });
   


    const [expenditure, setexpenditure] = useState(user.expenditure)
    useEffect(() => {
        if (localStorage.getItem("user") != undefined) {
            let item = JSON.parse(localStorage.getItem("user"))
            setexpense(item.expenditure)
            setmoney({ budget: item.budget, expenses: item.expenses, savings: item.savings })
        }
    }, [])



    const addbudget = () => {
        if (Budget.current.value) {
            setmoney({ ...money, budget: money.budget + parseFloat(Budget.current.value), savings: money.savings + parseFloat(Budget.current.value) })
            let item = JSON.parse(localStorage.getItem("user"))
            item.budget = money.budget + parseFloat(Budget.current.value)
            item.savings = money.savings + parseFloat(Budget.current.value)
            localStorage.setItem("user", JSON.stringify(item))
            Budget.current.value = ""
        }
        else {
            alert("Enter Budget First")
        }

    }




    const addexpense = () => {
        if (Expensetitle.current.value && Expensevalue.current.value) {
            if ((parseFloat(Expensevalue.current.value) )<= parseFloat(money.savings)) {
                let item1 = JSON.parse(localStorage.getItem("user"))
                item1.expenses = money.expenses + parseFloat(Expensevalue.current.value)
                item1.savings = money.savings - parseFloat(Expensevalue.current.value)
                console.log(item1)
                setexpense([...expense, { title: Expensetitle.current.value, amount: Expensevalue.current.value }])

                setmoney({ ...money, expenses: money.expenses + parseFloat(Expensevalue.current.value), savings: money.savings - parseFloat(Expensevalue.current.value) })

                // localStorage.setItem("user", JSON.stringify(item1))

                setexpenditure([...expenditure, { title: Expensetitle.current.value, amount: Expensevalue.current.value }])
                item1.expenditure = [...expenditure, { title: Expensetitle.current.value, amount: Expensevalue.current.value }]
  
                localStorage.setItem('user', JSON.stringify(item1));

                Expensetitle.current.value = ""
                Expensevalue.current.value = ""
            }

            else {
                alert("OUT OF BUDGET")
               
            }
        }
        else {
            alert("Both Expense Feilds Are Required")
        }


    }
    const editexpense = (index) =>{
        let pos = index;
        updateState({
            update: 1,
            index: pos,
            prevAmount: expenditure[index].value
        });
       
        Expensetitle.current.value = expenditure[index].title
        Expensevalue.current.value = expenditure[index].value

    } 

    const deleteexpesne = (index) =>{

    }

    return (
        <div className="container mx-1 ">
            <Row>
                <Col sm={3}>

                    <div className="container my-5 mx-5 border border-success" style={{ height: "200px" }}>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Please Enter Your Budget </Form.Label>
                                <Form.Control placeholder="Enter Budget" ref={Budget} />
                            </Form.Group>
                            <button type="button" class="btn btn-outline-success" onClick={() => addbudget()}>Calculate</button>
                        </Form>

                    </div>
                </Col>

                <Col sm={3}>

                    <div className="container my-5 mx-5 border border-danger" style={{ height: "200px" }}>


                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Please Enter Your Expense </Form.Label>
                                <Form.Control placeholder="Expense Title" ref={Expensetitle} /><br />

                                <Form.Control placeholder="Expense Amount" ref={Expensevalue} />
                            </Form.Group>
                            <button type="button" class="btn btn-outline-danger" onClick={() => addexpense()}>Add Expense</button>

                        </Form>
                    </div>
                </Col>
                <Col sm={6}>
                    <div className=' container mx-4 my-5'>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Expense Title</th>
                                    <th>Expense Value</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>{
                                expense.map((element, index) =>
                                    <tr>
                                        <td>{element.title}</td>
                                        <td>{element.amount}</td>
                                        <td><Button variant="outlined" color="primary" size="small" onClick={()=>editexpense(index)}>< EditIcon /></Button> &nbsp; <Button variant="outlined" color="error" size="small" onClick={() => deleteexpesne(index)} ><DeleteIcon /></Button></td>
                                    </tr>)}
                            </tbody>
                        </Table>
                    </div>
                </Col>

            </Row>

            <Row>
                <Col sx={6}>
                    <div className="container my-1 mx-5 border border-success" style={{ height: "200px" }}>

                        <Row>
                            <Col><b>Budget</b></Col>
                            <Col><b>expense</b></Col>
                            <Col><b>Balance</b></Col>
                        </Row>
                        <Row>
                            <Col><MoneyIcon /></Col>
                            <Col><CreditCardIcon /></Col>
                            <Col><SavingsIcon /></Col>
                        </Row>
                        <Row>
                            <Col>{money.budget}</Col>
                            <Col>{money.expenses}</Col>
                            <Col>{money.savings}</Col>
                        </Row>

                    </div>

                </Col>
                <Col sx={6}>


                </Col>

            </Row>
        </div >
    )
}
