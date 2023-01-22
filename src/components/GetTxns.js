import { useState, useEffect } from 'react';


const GetTxns = ({ state }) => {

    const { contract } = state;
    const [memos, setMemos] = useState([]);

    useEffect(() => {
        const getAllTxns = async () => {
            const gettxns = await contract.getMemos();
            setMemos(gettxns);
            console.log(gettxns);

        }
        contract && getAllTxns();
    }, [contract])

    return (
        <>
            <p>All Transactions</p>
            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Message</th>
                        <th>Timestamp</th>
                        <th>Sender Address</th>
                    </tr>
                </tbody>
                {memos.map((memo) => {
                    return (
                        <tr>
                            <td>
                                {memo.name}
                            </td>

                            <td>
                                {memo.message}
                            </td>
                            <td>
                                {new Date(memo.timestamp * 1000).toLocaleString()}
                            </td>
                            <td>
                                {memo.sender}
                            </td>
                        </tr>
                    )
                })}
            </table>
        </>
    )

}

export default GetTxns;