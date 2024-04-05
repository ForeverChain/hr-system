import React from 'react';
import useForm from 'components/ui/form/store/useForm';
import tw from 'tailwind-styled-components';

// энэ функцийг гаднаас import хйиж оруулж болохгүй бна. яагаад?
function toCamelCase(str) {
    return str
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
            return index === 0 ? word.toLowerCase() : word.toUpperCase();
        })
        .replace(/\s+/g, '');
}

function CheckboxGroup(props) {
    const { groupName, children, flexdirection } = props;
    const { onChangeGroupCheckbox } = useForm();
    // const { toCamelCase } = useString()
    const handleCheckboxChange = (groupName, fieldName, checked, item) => {
        const itemObj = item && {
            ...item,
            checked,
        };
        onChangeGroupCheckbox(groupName, fieldName, checked, itemObj);
    };

    return (
        <CheckBoxContainer flexdirection={flexdirection}>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    const fieldName = toCamelCase(child.props.name);
                    const { item } = child.props;
                    return React.cloneElement(child, {
                        onChange: (e) =>
                            handleCheckboxChange(groupName, fieldName, e.target.checked, item),
                    });
                }
                return child;
            })}
        </CheckBoxContainer>
    );
}

const CheckBoxContainer = tw.div`
    flex
    ${(props) => (props.flexdirection === 'column' ? 'flex-col' : 'flex-row')}
    gap-3
    flex-wrap
`;

export default CheckboxGroup;
