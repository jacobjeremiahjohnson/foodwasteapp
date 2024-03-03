import { OrderCard } from "./OrderCard"

function statusToValue(status) {
    switch(status) {
        case "open":
            return 0;
        case "claimed":
            return 1;
        case "closed":
            return 2;
        case "expired":
            return 3;
        default:
            return 4;
    }
}

export function OrderCardList(props) {
    if (props.displayOrder){
        const arr = props.orderObject.orders || []
        arr.sort((a, b) => {
            const aValue = statusToValue(a.status);
            const bValue = statusToValue(b.status);
            return aValue - bValue;
        });

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