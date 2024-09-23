export default function LogTableElement({comp_id, time, event, username}) {
    return (
        <tr>
            <td>{comp_id}</td>
            <td>{time}</td>
            <td>{event}</td>
            <td>{username}</td>
        </tr>
    )
}