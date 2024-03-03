import { OrderCard } from "./OrderCard"

export function OrderCardList(props) {
    if (props.displayOrder){
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
        return(
        <div>
            
        </div>)
    }
}