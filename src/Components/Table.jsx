function Table({ data }) {
    const heading = data.length > 0 ? Object.keys(data[0]) : [];
    return (
        <table className="table">
            <thead>
                <tr>
                    {heading.map((key, index) => (
                        <th key={index}>{key.toUpperCase()}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                
                {data.map((item, index) => (
                    <tr key={index}>
                        {Object.values(item).map((value, index) => (
                            <td key={index}>{value}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
export default Table;
