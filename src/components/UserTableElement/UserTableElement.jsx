import ToggleSwitch from "../ToggleSwitch/ToggleSwitch"

export default function UserTableElement({computer_id, user}) {
    return (
        <tr>
            <th scope="row">{computer_id}</th>
            <td>{user}</td>
            <td><ToggleSwitch></ToggleSwitch></td>
        </tr>
    )
}