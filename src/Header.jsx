const Header = () => {
    return (
        <div className={"header"}>
            <div>
                <button
                    type="button"
                    disabled={true}
                    className="btn btn-outline-success"
                >
                    <i className="fa fa-check"/>
                </button> Complete
            </div>
            <div>
                <button
                    type="button"
                    disabled={true}
                    className="btn btn-outline-danger"
                >
                    <i className="fa fa-trash-o"/>
                </button> Delete
            </div>
            <div>
                <button
                    type="button"
                    disabled={true}
                    className="btn btn-outline-success"
                >
                    <i className="fa fa-refresh"/>
                </button> reComplete
            </div>
            <div>
                on click => "done"
            </div>
        </div>
    )
}

export default Header