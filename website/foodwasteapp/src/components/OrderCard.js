export function OrderCard(props) {
    return(
        <div>
        <div className="orderContainer">
            <div className="imageContainer">
                <img className="image" src={props.data.image_url} alt={`${props.data.name}'s food`}/>
            </div>
            <div className="orderTextContainer">
                <div className="restaurantTitle">
                    {props.data.name}
                </div>
                <div className="address">
                    {props.data.location.address}
                </div>
                <div className="description">
                    {props.data.description}
                </div>
            </div>
            {props.data.status === "expired" && 
                <div className="expirationNotifier" style = {{ backgroundColor: "#BD0008" }}>
                    <div className="emojiContainer">
                        🗑️
                    </div>
                    <div className="expiration">
                        {props.data.status}
                    </div>
                </div>
                }
                {
                    props.data.status === "closed" &&
                    <div className="expirationNotifier" style = {{ backgroundColor: "grey" }}>
                        <div className="emojiContainer">
                        ✔️
                        </div>
                            <div className="expiration">
                        {props.data.status}
                        </div>
                    </div>
                }
                {
                    props.data.status === "open" &&
                    <button className="expirationNotifier expandable" style = {{ backgroundColor: "#90C418" }} onClick={(e) => {
                        props.handleClick(e, props.data)
                    }}>
                        <div className="emojiContainer">
                        🕒
                        </div>
                        <div className="expiration" >
                        {props.data.status}
                        </div>
                    </button>
                }
            </div>
        </div>
    )
}