import { responseHandler } from "~/utils/httpHandler";

export default () => {
    // Get all grant-business matchings through firebase query
    // Create a table with filters to display the data

    const mockData = [
        {
            grant: "Small business grant 123",
            business: "Andy's Drugs"
        },
        {
            grant: "Small business grant 234",
            business: "Andy's Drugs"
        },
        {
            grant: "Small business grant 34123",
            business: "Andy's Drugs"
        },
        {
            grant: "Small business grant sdgd",
            business: "Andy's Drugs"
        },
    ]
    return (<div>
        <table className="table w-full hover">
            <thead>
                <tr>
                    <th>Business Name</th>
                    <th>Grant Name</th>
                </tr>
            </thead>
            <tbody>
                {
                    mockData.map((data, idx) => {
                        return <tr className="hover">
                            <td key={idx}>{data.grant}</td>
                            <td key={idx}>{data.business}</td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    </div>)
}