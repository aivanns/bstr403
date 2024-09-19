import GetUsers from "../PanelTab/GetUsers";

export default function UserTableElement({computer_id, user, state, onClick}) {
    return (
        <tr>
            <th scope="row">{computer_id}</th>
            <td>{user}</td>
            <td><button className="button" onClick={() => {
                onClick(!state);
                GetUsers();
            }
                }>{state ? 'Скрыть' : 'Показать'}</button></td>
        </tr>
    )
}