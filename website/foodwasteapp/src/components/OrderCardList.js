import { OrderCard } from "./OrderCard"

export function OrderCardList(props) {
    if (props.displayOrder){
        console.log(props.orderObject.orders)
        const arr = props.orderObject.orders || []

        return(
            <ul>
                {arr.map(function(order){
                    return (
                    <li key={order.id}>
                        <OrderCard data={order} handleClick={props.handleClick}/>
                    </li>
                    )
                }
                )}
            </ul>
        )
    } else {
        console.log("not displaying orders")
        return(
        <div>
            
        </div>)
    }
}