

function MetaData({ title, value }: { title: string, value: string }) {

    return (
        <div>
            <h2 className="inter-medium">{title}</h2>
            <p className="roboto-normal">{value}</p>
        </div>
    )
}

export default MetaData;