import React from 'react';
import useForm from '../../store/useForm';

// энэ функцийг гаднаас import хйиж оруулж болохгүй бна. яагаад?
// function toCamelCase(str) {
//     return str
//         .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
//             return index === 0 ? word.toLowerCase() : word.toUpperCase()
//         })
//         .replace(/\s+/g, '')
// }
function FormListGroup(props) {
    const { listName, children } = props;
    const { onChangeGroupList } = useForm();
    return (
        <div>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    // const fieldName = toCamelCase(child.props.name)
                    return React.cloneElement(child, {
                        onChange: (e) =>
                            onChangeGroupList(listName, child.props.name, e.target.value),
                    });
                }
                return child;
            })}
        </div>
    );
}

export default FormListGroup;
